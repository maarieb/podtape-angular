import { Component, OnInit } from '@angular/core';
import { BackdataService } from '../_common/_services/_global/backdata.service';
import { SessionStorageService } from '../_common/_services/_specific/session-storage.service';
import { BackuserService } from '../_common/_services/_global/backuser.service';
import { User } from '../_common/_data/user';
import { Podcast } from '../_common/_data/podcast';
import { Router } from '@angular/router';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  recommendations : Podcast[] = [];
  currentUser : string = "";
  faThumbs = faThumbsUp;
  faRepeat = faRepeat;

  user : User = {
    id : 0,
    username:"",
    password:"",
    email:"",
    bio:"",
    creationDate: new Date(),
    nbFavorites: 0,
    nbPlaylists: 0,
    genrePref:[""],
    favorites:[""],
    playlists: [],
    listening: []
  };

  constructor(private _backdataService : BackdataService, private _backuserService: BackuserService, private _storageService : SessionStorageService, private router : Router){}

  ngOnInit(): void {

    this.currentUser = this._storageService.getUserUsername();
    
    this._backuserService.getUserInfos(this.currentUser, "", "").subscribe({
      next:(user : User) => {
        this.user = user;
      },
      error: (err : Error) => console.error(err),
    })

    setTimeout(() => {
      this.getNewRecommendation(); 
    }, 2000);
    
    console.log(this.user.username)
  }

  public getNewRecommendation(){
    this._backdataService.getRecommendations(this.user.favorites, this.user.genrePref).subscribe({
      next:(recommendations : Podcast[]) => {
        this.recommendations = recommendations;
      }
    })   
  }

}
