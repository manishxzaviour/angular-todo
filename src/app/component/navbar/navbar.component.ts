import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router){}

  searchItems(event: Event): void{
    let inputValue = (event.target as HTMLInputElement).value;
    let url = this.router.url;
    url = url.substring(url.indexOf('/'),url.indexOf('?'))
    this.router.navigate([],{queryParams: {search: inputValue}});
  }
}
