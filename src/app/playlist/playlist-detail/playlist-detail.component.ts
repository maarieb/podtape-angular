import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCirclePlay, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Episode } from 'src/app/_common/_data/episode';
import { Playlist } from 'src/app/_common/_data/playlist';
import { PlaylistEpisodes } from 'src/app/_common/_data/playlistEpisodes';
import { Podcast } from 'src/app/_common/_data/podcast';
import { User } from 'src/app/_common/_data/user';
import { BackdataService } from 'src/app/_common/_services/_global/backdata.service';
import { BackuserService } from 'src/app/_common/_services/_global/backuser.service';
import { PlaylistService } from 'src/app/_common/_services/_specific/playlist.service';
import { SessionStorageService } from 'src/app/_common/_services/_specific/session-storage.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit {

  playlistId : number = 0;
  episodeId : string = "";
  podcastId : string = "";
  playlistStatus : string = "";
  username : string = "";
  removeMessage : string = "";
  deleteMessage : string = "";
  submitted : boolean = false;
  message : string = "";
  faDelete = faXmark;
  faPlay = faCirclePlay;
  episodeAudio : string = "";
  episodeTitle : string = "";
  
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
    listening : [],
  };

playlist : Playlist = {
  id: 0,
  name : "",
  description : "",
  creationDate : new Date(),
  status : "",
  episodes : []
}

playlistEpisodes : Episode[] = [];

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

playlistForm : FormGroup = new FormGroup({
  name : new FormControl(""),
  description : new FormControl(""),
  status : new FormControl("")
});

  constructor(private activatedRoute : ActivatedRoute, private _storageService : SessionStorageService, private _backuserService : BackuserService, private formBuilder : FormBuilder, private _playlistService : PlaylistService, private _backdataService : BackdataService){}
  ngOnInit(): void {
    this.playlistId = this.activatedRoute.snapshot.params['id'];
    this.username = this._storageService.getUserUsername();
    this._backuserService.getUserInfos(this.username, "", "").subscribe({
      next:(user : User) => {
        this.user = user;
        var playlistToFind = this.user.playlists.find(e => e.id == this.playlistId);
        if (playlistToFind) {
          this.playlist = playlistToFind;
          if (this.playlist.status === "PUBLIC"){
            this.playlistStatus = "Publique";
          } else {
            this.playlistStatus = "Privée";
          }
        }
        this.getEpisodesDetails();
      },
      error: (err : Error) => console.error(err),
    })

    this.playlistForm = this.formBuilder.group ({
      name : ['', [Validators.maxLength(20)]],
      description : ['', [Validators.maxLength(200)]],
      status : [this.playlistStatus]
    });

  }

  get playlistCtrl() {
    return this.playlistForm.controls;
  }

  public getEpisodesDetails(){
    for (let ep of this.playlist.episodes){
      this._backdataService.searchEpisodeById(ep.podcastId, ep.episodeId).subscribe({
        next : (episode : Episode) => {
          episode.podcastId = ep.podcastId;
          this._backdataService.getPodcastFromAllPodcastById(ep.podcastId).subscribe({
            next : (podcast : Podcast[]) => {
              this.podcast = podcast[0];
              episode.podcastTitle = this.podcast.title;
            }, 
            error: (err : Error) => console.error(err),
          })
          this.playlistEpisodes.push(episode);
        }, 
        error: (err : Error) => console.error(err),
      })
    }
  }

  public updatePlaylist(){
    this.submitted = true;
    if (!this.playlistForm.invalid){
      if (this.playlistForm.get("name")?.value != ""){
        this.playlist.name = this.playlistForm.get("name")?.value;
      } else {
        this.playlist.name = this.playlist.name;
      }
      if (this.playlistForm.get("description")?.value != ""){
        this.playlist.description = this.playlistForm.get("description")?.value;
      } else {
        this.playlist.description = this.playlist.description;
      }

      this.playlist.status = this.playlistForm.get("status")?.value;
      console.log(this.playlist.status);

      this._playlistService.updatePlaylist(this.playlistId, this.playlist.name, this.playlist.description, this.playlist.status).subscribe({
        next : (response : any) => {
          this.message = response.message;
        },
        error : (err : Error) => {
          console.error(err);
          this.message = "Oups.. une erreur est survenue désolé !"
        }
      })
    }
  }

  public deletePlaylist(){
    this._playlistService.deletePlaylist(this.playlistId).subscribe({
      next : (response : any) => {
        this.deleteMessage = response.message;
      },
      error : (err : Error) => {
        console.error(err);
        this.deleteMessage = "Oups.. une erreur est survenue désolé !"
      }
    })
  }

  public removeFromPlaylist(episodeId : string){
    this.episodeId = episodeId;
    var episode = this.playlist.episodes.find((e) => e.episodeId == this.episodeId)
    if (episode){
      this.podcastId = episode.podcastId;
    }
    this._playlistService.removeEpisode(this.playlistId,this.episodeId, this.podcastId).subscribe({
      next : (response : any) => {
        this.removeMessage = response.message;
        var episodeInTab = this.playlistEpisodes.find((e) => e.episodeId == this.episodeId)
        if (episodeInTab){
          var index = this.playlistEpisodes.indexOf(episodeInTab);
          this.playlistEpisodes.slice(index, 1)
        }
      },
      error : (err : Error) => {
        console.error(err);
        this.removeMessage = "Oups.. une erreur est survenue désolé !"
      }
    })

  }

  public displayForm(){
    var form = document.getElementById("divForm");
    if (form?.className == "divForm"){
      form.className += " active";
    } else if (form?.className == "divForm active"){
      form.className = "divForm";
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

}


