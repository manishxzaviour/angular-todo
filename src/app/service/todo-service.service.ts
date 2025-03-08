import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, BehaviorSubject, throwError, switchMap, tap } from 'rxjs';import { TodoItem } from './../models/todo-item';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  apiUrl = 'http://localhost:8080';

  private db: IDBDatabase | undefined;
  private dbSubject = new BehaviorSubject<IDBDatabase | undefined>(undefined);
  public db$: Observable<IDBDatabase> = this.dbSubject.asObservable().pipe(
    switchMap((db) => {
      if (db) {
        return from(Promise.resolve(db));
      } else {
        return new Observable<IDBDatabase>((subscriber) => {
          const request = indexedDB.open('todo_items_db', 2);

          request.onerror = (error) => {
            subscriber.error(error);
          };

          request.onupgradeneeded = (event) => {
            this.db = (event.target as IDBOpenDBRequest).result;
            if (!this.db.objectStoreNames.contains('todo_items')) {
              this.db.createObjectStore('todo_items', { keyPath: 'id', autoIncrement: true });
            }
            if (!this.db.objectStoreNames.contains('deleted_todo_items')) {
              this.db.createObjectStore('deleted_todo_items', { keyPath: 'id', autoIncrement: true });
            }
          };

          request.onsuccess = (event) => {
            this.db = (event.target as IDBOpenDBRequest).result;
            if (this.db) {
              this.db.onerror = (err) => {
                console.error(err);
              };
              this.dbSubject.next(this.db); // Emit the database
              subscriber.next(this.db);
              subscriber.complete();
            } else {
              subscriber.error('IndexedDB database is undefined after success.');
            }
          };
        });
      }
    })
  );

  constructor(private http: HttpClient, private userservice: UserServiceService) {
      this.db$.subscribe({
        error: (error) => console.error("Database error", error)
      });
  }

  getAllItemsForPage(pageNo: Number, fromBin?: boolean): Observable<TodoItem[]> {
    if (this.userservice.getIsLoggedIn()) {
      return this.http.get<TodoItem[]>(`${this.apiUrl}/${(fromBin)?'':'/bin/'}todo-items`);
    } else {
    return this.db$.pipe(
      switchMap((db) => {
          return new Observable<TodoItem[]>((subscriber) => {
            let storeName = (fromBin)? 'deleted_todo_items':'todo_items';
            const txn = db.transaction(storeName, 'readonly');
            const store = txn.objectStore(storeName);
            const request = store.getAll();

            if (!request) {
              subscriber.error('Could not create getAll request');
              return;
            }

            request.onsuccess = (event: Event) => {
              const target = event.target as IDBRequest<TodoItem[]>;
              subscriber.next(target.result);
              subscriber.complete();
            };

            request.onerror = (event: Event) => {
              const target = event.target as IDBRequest;
              subscriber.error(target.error);
            };
          });
        })
      );
    }
  }

  addItem(todoItem: Partial<TodoItem>): Observable<TodoItem | null> {
    const txn = this.db?.transaction(["todo_items"], "readwrite");
    txn?.objectStore("todo_items").add(todoItem) 
    if(this.userservice.getIsLoggedIn()){
      return this.http.post<TodoItem>(`${this.apiUrl}/todo-items`, todoItem);
    }
    return new Observable();
  }
  updateItem(todoItem: TodoItem): Observable<TodoItem | null> {
    if(this.userservice.getIsLoggedIn())
    return this.http.patch<TodoItem>(`${this.apiUrl}/todo-items/${todoItem.id}`, todoItem); 
    return new Observable();
  }

   deleteItem(todoItem: TodoItem, fromBin?: boolean): Observable<void> { 
    let txn = this.db?.transaction(["todo_items","deleted_todo_items"],"readwrite");
    if(!fromBin){
      txn?.objectStore("todo_items").delete(todoItem.id);
      txn?.objectStore("deleted_todo_items").add(todoItem);
    }else{
      txn?.objectStore("deleted_todo_items").delete(todoItem.id);
    }
    if(this.userservice.getIsLoggedIn()){
      return this.http.delete<void>(`${this.apiUrl}/todo-items/${todoItem.id}`);
    }
    return new Observable();
  }
  
  clearBin(){
    let txn = this.db?.transaction(["todo_items","deleted_todo_items"],"readwrite");
    txn?.objectStore("deleted_todo_items").clear();
    if(this.userservice.getIsLoggedIn())
      this.http.delete<void>(`${this.apiUrl}/todo-items/all`);
  }

}
