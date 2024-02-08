import { Component, Input, OnInit, HostListener } from '@angular/core';
import { SessionStorageService } from '../../_common/_services/_specific/session-storage.service';
import { AuthenticationService } from '../../_common/_services/_specific/authentication.service';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Input()
  title = "Podtape"
  isLoggedIn : Observable<boolean>;
  username : string = "";
  faBars = faBars;
  isMenuOpen :boolean = false;

  constructor(private storageService : SessionStorageService, private authService : AuthenticationService, private router : Router){
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  ngOnInit(): void {
    
   }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    var headerTitle = document.getElementById("h1Header");
    var h1 = document.getElementById("ah1");
    var header = document.getElementById("header");
    var icon = document.getElementById("icon");
    if (headerTitle && header && h1 && icon){
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerTitle.style.fontSize = "50px";
        headerTitle.style.textShadow = "3px 3px 0px #AB3428, 6px 6px 0px #656d4a";
        header.style.height = "60px";
        header.style.opacity = "0.95";
        header.style.transition = "all 0.5s ease";
        icon.style.width = "50px";
        icon.style.position = "absolute";
        icon.style.top = "15px";
        icon.style.paddingTop = "5px";
      } else {
        headerTitle.style.fontSize = "90px";
        header.style.height = "100px";
        header.style.opacity = "1";
        headerTitle.style.textShadow = "3px 3px 0px #AB3428, 6px 6px 0px #656d4a";
        header.style.transition = "all 0.5s ease";
        icon.style.width = "65px";
        icon.style.position = "absolute";
        icon.style.top = "25px";
      }
    }
  }

  activateMenu(){
    let menu = document.getElementById("menubox");
    let navbar = document.getElementById("navbar");
    if (menu?.className === "menubox" && navbar) {
      menu.className += " active";
      navbar.className += " active";
    } else if (menu?.className === "menubox active" && navbar){
      menu.className = "menubox";
      navbar.className = "navbar";
    }
  }

}