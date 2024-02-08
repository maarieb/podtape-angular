import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  login = new BehaviorSubject<boolean>(this.hasUser());

  isLoggedIn() : Observable<boolean> {
    return this.login.asObservable();
  }

  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getUserUsername(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      const myUser = JSON.parse(user);
      return myUser.username;
    }

    return {};
  }
  
  public hasUser(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

}
