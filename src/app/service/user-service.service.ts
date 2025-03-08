import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private userEmailSubject = new BehaviorSubject<string | null>(null);
  private userAuthTokenSubject = new BehaviorSubject<string | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean | null>(false);
  private themeSubject = new BehaviorSubject<string | null>(null);
  
  // $ is a common convention to indicate that a variable holds a observable

  setUserEmail(email: string | null): void{
    this.userEmailSubject.next(email);
  }

  getUserEmail(): string | null {
    return this.userEmailSubject.getValue();
  }

  setIsLoggedIn(status: boolean | null): void{
    this.isLoggedInSubject.next(status);
  }

  getIsLoggedIn(): boolean | null {
    return this.isLoggedInSubject.getValue();
  }

  setUserAuthToken(token: string | null): void{
    this.userAuthTokenSubject.next(token);
  }

  getUserAuthToken(): string | null {
    return this.userAuthTokenSubject.getValue();
  }
  constructor() { }
}
