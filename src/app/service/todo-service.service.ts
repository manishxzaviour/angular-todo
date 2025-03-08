import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { TodoItem } from './../models/todo-item';
import data from './../page/home/sampleData';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllItemsForPage(pageNo: Number): Observable<TodoItem[]>{
    return this.http.get<TodoItem[]>(`${this.apiUrl}/todo-items`);
  }

  addTask(todoItem: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(`${this.apiUrl}/todo-items`, todoItem); 
  }
  updateTask(todoItem: TodoItem): Observable<TodoItem> {
    return this.http.patch<TodoItem>(`${this.apiUrl}/todo-items/${todoItem.id}`, todoItem); 
  }

   deleteTask(todoItem: TodoItem): Observable<void> { 
    localStorage.setItem(`deleted_item_${todoItem.id}`,todoItem.toString());
    return this.http.delete<void>(`${this.apiUrl}/todo-items/${todoItem.id}`);
  }

}
