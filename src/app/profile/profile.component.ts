import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../_common/_services/_specific/session-storage.service';
import { faStar, faUser, faVolumeLow, faUpRightFromSquare, faXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { BackuserService } from '../_common/_services/_global/backuser.service';
import { User } from '../_common/_data/user';
import { UpdatedUser } from '../_common/_data/updatedUser';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackdataService } from '../_common/_services/_global/backdata.service';
import { Podcast } from '../_common/_data/podcast';
import { Episode } from '../_common/_data/episode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser : any;
  tab : number = 1;
  faStar = faStar;
  faUser = faUser;
  faVolume = faVolumeLow;
  faPlay = faCirclePlay;
  faLink = faUpRightFromSquare;
  faDelete = faXmark;
  faPen = faPenToSquare;
  submitted : boolean = false;
  message : string = "";
  favoritePodcasts : Podcast[] = [];
  randomImg : string = "";
  episodeAudio : string = "";
  episodeTitle : string = "";
  listeningList : Episode [] = [];

  userForm : FormGroup = new FormGroup({
    username : new FormControl(""),
    email : new FormControl(""),
    bio : new FormControl("")
  });

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
    playlists : [],
    listening: []
  };

  episode : Episode = {
    episodeId : "",
    title : "",
    description : "",
    cleanDescription : "",
    publicationDateMs : 0,
    publicationDate: new Date(),
    audioUrl : "",
    audioLength : 0,
    podcastId : "",
    podcastTitle: "",
    listeningDate: new Date(),
  }

  podcast : Podcast = {
    podcastId : "",
    title : "",
    publisher : "",
    image : "",
    description : "",
    latestPubDateMs : 0,
    totalEpisode : 0,
    genres : [""],
    episodes : []
  }

  updatedUser : UpdatedUser = {
    id : 0,
    email : "",
    bio : "",
  }

  constructor(private storageService : SessionStorageService, private _backuserService : BackuserService, private formBuilder : FormBuilder, private router : Router, private _backdataService : BackdataService){}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUserUsername();

    this._backuserService.getUserInfos(this.currentUser, "", "").subscribe({
      next:(user : User) => {
        this.user = user;
        for (let id of this.user.favorites) {
          this.getUserFavorites(id)
        }
        this.getEpisodesDetails();
      },
      error: (err : Error) => console.error(err),
    })

    this.userForm = this.formBuilder.group ({
      email : ['', [Validators.required, Validators.email]],
      bio : ['', [Validators.maxLength(200)]]
    });

  }

  get userCtrl() {
    return this.userForm.controls;
  }

  public updateUser(){
    var email = this.userForm.get("email")?.value;
    var bio = this.userForm.get("bio")?.value;
    this.updatedUser.id = this.user.id;
    this.submitted = true;
      email != "" ? this.updatedUser.email = email : this.updatedUser.email = this.user.email;
      bio != "" ? this.updatedUser.bio = bio : this.updatedUser.bio = this.user.bio;

      if (email == "" && bio == ""){
        this.message = "Il n'y a rien à modifier !"
        return;
      }
      this._backuserService.updateUser(this.updatedUser.id, this.updatedUser.email, this.updatedUser.bio)
      .subscribe({
        next: (response : any) => {
          this.message = response.message;
        },  
        error: (err : Error) => {
          console.error(err);
          this.message = "Oups.. une erreur est survenue désolé !"
        }
      });
  }

  public getUserFavorites(id : string){
    this._backdataService.getPodcastFromAllPodcastById(id).subscribe({
      next: (podcast: Podcast[]) => { 
        this.favoritePodcasts.push(podcast[0]);
      },
      error: (err : Error) => console.error(err),
    }
  );
  }

  public getEpisodesDetails(){
    for (let ep of this.user.listening){
      this._backdataService.searchEpisodeById(ep.podcastId, ep.episodeId).subscribe({
        next : (episode : Episode) => {
          episode.podcastId = ep.podcastId;
          episode.listeningDate = ep.listeningDate;
          this._backdataService.getPodcastFromAllPodcastById(ep.podcastId).subscribe({
            next : (podcast : Podcast[]) => {
              this.podcast = podcast[0];
              episode.podcastTitle = this.podcast.title;
            }, 
            error: (err : Error) => console.error(err),
          })
          this.listeningList.push(episode);
          this.sortListeningTable();
        }, 
        error: (err : Error) => console.error(err),
      })
    }
  }

  public playAudio(episodeAudio : string, episodeTitle : string, episodeId : string, podcastId : string){
    this._backdataService.searchEpisodeById(podcastId, episodeId).subscribe({
      next : (episode : Episode) => {
        this.episode = episode;
        this.episodeAudio = this.episode.audioUrl;
        this.episodeTitle = this.episode.title;
        this.play();
        }, 
          error: (err : Error) => console.error(err),
        })   
  }

  public play(){
    var audio = document.querySelector("audio");
    if (audio){
      audio.play();
    }
    var audioDiv = document.getElementById("audio");
    if (audioDiv?.className == "audio"){
      audioDiv.className += " active";
    }
  }

  public stopAudio(){
    var audio = document.querySelector("audio");
    if (audio){
      audio.pause();
    }
    var audioDiv = document.getElementById("audio");
    if (audioDiv?.className == "audio active"){
      audioDiv.className = "audio";
    }

  }

  public sortListeningTable(){
    this.listeningList.sort(function(a, b) {
      var dateA = new Date(a.listeningDate);
      var dateB = new Date(b.listeningDate);
      return dateA.getTime() - dateB.getTime();
      
    });
  }

}
