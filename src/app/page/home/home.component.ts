import { Component, OnInit } from '@angular/core';
import { TodoItem } from './../../models/todo-item';
import { TodoServiceService } from './../../service/todo-service.service';
import data from './sampleData';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './../../component/todo-item/todo-item.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TodoItemComponent],
templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  itemList: TodoItem[] = [];
  
  constructor(private todoService: TodoServiceService){ }

  ngOnInit(): void {
    // this.todoService.getAllItemsForPage(1).subscribe(
    //   (itemList)=>{
    //     this.itemList = itemList
    //   },
    //   (error)=>{
    //     console.error('error fetching tasks ',error);
    //   }
    // );
    this.itemList = data;
  }
}
