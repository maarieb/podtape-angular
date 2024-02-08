import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../_common/_services/_specific/session-storage.service';
import { AuthenticationService } from '../../_common/_services/_specific/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

export class LogoutComponent implements OnInit {

  isLoggedIn : Observable<boolean>;
  message : string = "";

  constructor(private storageService : SessionStorageService, private router : Router, private _authService : AuthenticationService){
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  ngOnInit(): void {
    if (this.isLoggedIn){
      this.storageService.clean();
      this.storageService.login.next(false);
      this.message = "Tu es bien déconnecté(e) !";
    }
  }
}
