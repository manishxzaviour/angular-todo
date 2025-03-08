import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { TodoItem } from '../../models/todo-item';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import * as marked from 'marked';
import { TodoServiceService } from '../../service/todo-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  imports: [MatIconModule, CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent implements OnInit {
  @Input() item: TodoItem = {
    id:0,
    subject: "",
    description: "",
    tags: [],
    completionStatus: false,
    setForReminder: false,
    creationTimestamp: Date.now().toString(),
    updationTimestamp: Date.now().toString()
  };
  showTags: boolean = false;
  parsedMD: string = "";

  optionsDisplayed: boolean = false;
  constructor(private todoService: TodoServiceService, private cdr: ChangeDetectorRef, private router: Router) {}
  ngOnInit(): void {
    this.parsedMD = marked.parse(this.item.description).toString();
  }

  onClickDelete(){
    let fromBin = this.router.url === '/bin';
    if(!fromBin){
      this.todoService.deleteItem(this.item);
      this.router.navigate(['/bin']);
    }else{
      this.todoService.deleteItem(this.item, fromBin);
      this.router.navigate(['/home']);  
    }
  }
}
