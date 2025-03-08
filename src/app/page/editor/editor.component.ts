import { Component, HostListener } from '@angular/core';
import * as marked from 'marked';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import {MatIconModule} from '@angular/material/icon'
import { BeanItemComponent } from '../../component/bean-item/bean-item.component';
import { TodoServiceService } from './../../service/todo-service.service';
import { TodoItem } from '../../models/todo-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  imports: [FormsModule, CommonModule, MatIconModule, BeanItemComponent]
})
export class EditorComponent {
  markdownText: string = '';
  convertedMarkdown: string = '';
  option: string = 'MD Preview';
  title: string = '';

  constructor(private todoServie : TodoServiceService, private router: Router){}

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Tab' && event.target instanceof HTMLTextAreaElement) {
      event.preventDefault();

      const target = event.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      target.value = target.value.substring(0, start) + '\t' + target.value.substring(end);

      target.selectionStart = target.selectionEnd = start + 1;
    }
  }
  @HostListener('input', ['$event.target'])
  onInput(target: HTMLTextAreaElement): void {
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
  }

  onOptionClick() {
    this.option = this.option === 'MD Preview' ? 'Editor' : 'MD Preview';
    if(this.option === 'Editor'){
      this.convertedMarkdown = marked.parse(this.markdownText).toString();
      this.convertedMarkdown = this.convertedMarkdown.replace(/\n/g, '<br>');
      this.convertedMarkdown = `<h1>${this.title}</h1><br>`+this.convertedMarkdown;
    }
  }
  onAddClick(){
    const item: Partial<TodoItem> = {
      subject: this.title,
      description: this.markdownText
    }
    this.todoServie.addItem(item);
    this.router.navigate(['/home']);
  }

  onReminderClick(){
    
  }
}
