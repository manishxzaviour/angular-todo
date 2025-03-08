import { Component, OnInit } from '@angular/core';
import { TodoItem } from './../../models/todo-item';
import { TodoServiceService } from './../../service/todo-service.service';
import data from './sampleData';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './../../component/todo-item/todo-item.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TodoItemComponent, RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  itemList: TodoItem[] = [];
  fromBin: boolean;
  
  constructor(private todoService: TodoServiceService, private router: Router){
    if(this.router.url === '/bin/clear') todoService.clearBin();
    this.fromBin = (this.router.url !== '/home');
   }

  ngOnInit(): void {    
    // this.todoService.getAllItemsForPage(1, this.fromBin).subscribe(
    //   (itemList)=>{
    //     this.itemList = itemList;        
    //   },
    //   (error)=>{
    //     console.error('error fetching tasks ',error);
    //   }
    // );
    this.itemList = data;
  }
}
