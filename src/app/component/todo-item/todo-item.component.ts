import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from '../../models/todo-item';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import * as marked from 'marked';

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

  parsedMD: string = "";

  optionsDisplayed: boolean = false;

  ngOnInit(): void {
    this.parsedMD = marked.parse(this.item.description).toString();
  }
}
