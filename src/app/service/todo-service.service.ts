import { Injectable, OnDestroy, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, BehaviorSubject, throwError, switchMap, tap } from 'rxjs';import { TodoItem } from './../models/todo-item';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService implements OnDestroy{

  apiUrl = 'http://localhost:8080';

  private db: IDBDatabase | undefined;
  private dbSubject = new BehaviorSubject<IDBDatabase | undefined>(undefined);
  private fromBin: boolean = false;

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
            const todoItemsStore = this.db.createObjectStore('todo_items', { keyPath: 'id', autoIncrement: true });
            const deletedTodoItemsStore = this.db.createObjectStore('deleted_todo_items', { keyPath: 'id', autoIncrement: true });
            
            todoItemsStore.createIndex("subjectIndex", "subject", { unique: true});
            deletedTodoItemsStore.createIndex("subjectIndex", "subject", { unique: true });
          }

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

  
  private todoItemsSubject = new BehaviorSubject<TodoItem[]>([]);
  todoItems$ = this.todoItemsSubject.asObservable(); 

  constructor(private http: HttpClient, private userservice: UserServiceService) {
      this.db$.subscribe({
        error: (error) => console.error("Database error", error)
      });
  }
  initializeItems(fromBin: boolean): void {
    this.fromBin = fromBin;
    this.getAllItemsForPage(1, fromBin).subscribe((items) => {
      this.todoItemsSubject.next(items);
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
              subscriber.next(target.result.reverse());
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

  addItem(todoItem:  Omit<TodoItem, 'id'>): void {
    const txn = this.db?.transaction(["todo_items"], "readwrite");
    txn?.objectStore("todo_items").add(todoItem) 
    
    if(this.userservice.getIsLoggedIn())
      this.http.post<TodoItem>(`${this.apiUrl}/todo-items`, todoItem);
    
    this.updateItemList();
  }

  updateItem(todoItem: TodoItem): void {
    
    const txn = this.db?.transaction(["todo_items"],"readwrite");
    txn?.objectStore("todo_items").put(todoItem);
    
    if(this.userservice.getIsLoggedIn())
      this.http.patch<TodoItem>(`${this.apiUrl}/todo-items/${todoItem.id}`, todoItem); 
    
    this.updateItemList();
  }

   deleteItem(todoItem: TodoItem, fromBin?: boolean): void { 
    let txn = this.db?.transaction(["todo_items","deleted_todo_items"],"readwrite");
    if(!fromBin){
      txn?.objectStore("todo_items").delete(todoItem.id);
      txn?.objectStore("deleted_todo_items").add(todoItem);
    }else{
      txn?.objectStore("deleted_todo_items").delete(todoItem.id);
    }
    
    if(this.userservice.getIsLoggedIn())
      this.http.delete<void>(`${this.apiUrl}/todo-items/${todoItem.id}`);
    
    this.updateItemList();
  }

  searchTodos(subjectQuery: string, tagsFilter: string[] = [], fromBin:boolean): Observable<TodoItem[]> {
    return this.db$.pipe(
      switchMap((db) => {
        return new Observable<TodoItem[]>((observer) => {
          let itemStore = !fromBin?'todo_items':'deleted_todo_items';
          const transaction = db.transaction(itemStore, 'readonly');
          const store = transaction.objectStore(itemStore);
          const index = store.index('subjectIndex');
          const results: TodoItem[] = [];

          const request = index.openCursor(IDBKeyRange.bound(subjectQuery, subjectQuery + '\uffff', false, false)); //prefix search

          
          request.onsuccess = (event) => {
            const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
            if (cursor) {
              const item = cursor.value;
              if (tagsFilter.length === 0 || tagsFilter.every(tag => item.tags.includes(tag))) {
                results.push(item);
              }
              cursor.continue();
            } else {
              observer.next(results.reverse());
              observer.complete();
            }
          };

          request.onerror = (event) => {
            observer.error((event.target as IDBRequest).error);
          };
        });
      })
    );
  }

  private updateItemList(): void {
   this.initializeItems(this.fromBin);
  }
  
  clearBin(){
    let txn = this.db?.transaction(["todo_items","deleted_todo_items"],"readwrite");
    txn?.objectStore("deleted_todo_items").clear();
    if(this.userservice.getIsLoggedIn())
      this.http.delete<void>(`${this.apiUrl}/todo-items/all`);
  }

  ngOnDestroy(){
    if(this.dbSubject) this.dbSubject.unsubscribe();
    if(this.todoItemsSubject) this.todoItemsSubject.unsubscribe();
  }

}
