import { Component } from '@angular/core';
import { faHeadphones, faMagnifyingGlass, faMicrophone, faStar } from '@fortawesome/free-solid-svg-icons';
import { SessionStorageService } from '../_common/_services/_specific/session-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private storageService : SessionStorageService){
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  faListen = faHeadphones;
  faFavorite = faStar;
  faReco = faMagnifyingGlass;
  faPod = faMicrophone;
  isLoggedIn : Observable<boolean>;

}
