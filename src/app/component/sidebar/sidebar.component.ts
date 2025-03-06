import { Component } from '@angular/core';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarItemComponent, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
