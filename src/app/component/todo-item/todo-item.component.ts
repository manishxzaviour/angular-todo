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
  parsedMD: string = '';
  fromBin: boolean;
  bgColour: string = 'bg-emerald-400';

  optionsDisplayed: boolean = false;
  constructor(private todoService: TodoServiceService, private cdr: ChangeDetectorRef, private router: Router) {
    let url = this.router.url;    
    this.fromBin = (url.substring(0,5) !== '/home');
  }
  ngOnInit(): void {
    if (this.item.setForReminder) {
      this.bgColour = 'bg-amber-400'
    }
    if (this.item.completionStatus) {
      this.bgColour = 'bg-blue-300'
    }
    this.parsedMD = marked.parse(this.item.description).toString();
  }

  onClickDelete(){
    if(!this.fromBin){
      this.todoService.deleteItem(this.item);
    }else{
      this.todoService.deleteItem(this.item, this.fromBin);
    }
  }

  onClickCompletionStatus(){
    this.item.completionStatus =! this.item.completionStatus;
    this.todoService.updateItem(this.item);
  }

  onClickSetReminder(){
    this.item.setForReminder =! this.item.setForReminder;
    this.todoService.updateItem(this.item);
  }

  onClickAddTag(){
  }
}
