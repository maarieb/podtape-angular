import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageService } from '../_common/_services/_specific/session-storage.service';
import { Podcast } from '../_common/_data/podcast';
import { BackdataService } from '../_common/_services/_global/backdata.service';
import { Episode } from '../_common/_data/episode';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Playlist } from '../_common/_data/playlist';
import { PlaylistService } from '../_common/_services/_specific/playlist.service';
import { BackuserService } from '../_common/_services/_global/backuser.service';
import { User } from '../_common/_data/user';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  username : string = "";
  episodeId : string = "";
  podcastId : string = "";
  submitted : boolean = false;
  messageAdd : string = "";
  messageCreate : string = "";
  userPlaylists : Playlist[] = [];

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
      listeningDate : new Date(),
  }

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
    playlists:[],
    listening: []
  };

  playlist : Playlist = {
        id: 0,
        name : "",
        description : "",
        creationDate : new Date(),
        status : "",
        episodes : []
  }

  playlistForm : FormGroup = new FormGroup({
    name : new FormControl(""),
    description : new FormControl(""),
    status : new FormControl(""),
  });

  existingPlaylistForm : FormGroup = new FormGroup({
    playlist : new FormControl(""),
  });

  constructor(private activatedRoute : ActivatedRoute, private _sessionService : SessionStorageService, private _backdataService : BackdataService, private formBuilder : FormBuilder, private _storageService : SessionStorageService, private _playlistService : PlaylistService, private _backuserService : BackuserService){}

  ngOnInit(): void {
    this.episodeId = this.activatedRoute.snapshot.params['epId'];
    this.podcastId = this.activatedRoute.snapshot.params['podId'];
    this.username = this._storageService.getUserUsername();

    this._backdataService.getPodcastFromAllPodcastById(this.podcastId).subscribe({
      next: (podcast: Podcast []) => {
        this.podcast = podcast[0];
        var episodeToFind = this.podcast.episodes.find((e) => e.episodeId === this.episodeId);
        if (episodeToFind){
          this.episode = episodeToFind;
        }
      },
      error: (err : Error) => console.error(err),
    });

    this.playlistForm = this.formBuilder.group ({
      name : ['', [Validators.required, Validators.maxLength(20)]],
      description : ['', [Validators.maxLength(200)]],
      status : ['private']
    });

    this.existingPlaylistForm = this.formBuilder.group ({
      playlist : ['', [Validators.required]],
    });

    this._backuserService.getUserInfos(this.username, "", "").subscribe({
      next : (user : User) => {
        this.user = user;
        this.userPlaylists = this.user.playlists;
        console.log(this.userPlaylists)
      },
      error: (err : Error) => console.error(err),
    });

  }

  get playlistCtrl() {
    return this.playlistForm.controls;
  }

  get existingPlaylistCtrl() {
    return this.existingPlaylistForm.controls;
  }

  public createPlaylist(){
    this.submitted = true;
    if (!this.playlistForm.invalid){
      this.playlist.name = this.playlistForm.get("name")?.value;
      this.playlist.description = this.playlistForm.get("description")?.value;
      this.playlist.status = this.playlistForm.get("status")?.value;
      this._playlistService.createPlaylist(this.username, this.playlist.name, this.playlist.description, this.playlist.status, this.episodeId, this.podcastId).subscribe({
        next : (response : any) => {
          this.messageCreate = response.message;
        },
        error : (err : Error) => {
          console.error(err);
          this.messageCreate = "Oups.. une erreur est survenue désolé !"
        }
      })
    }
  }

  public addToPlaylist(){
    this.playlist.id = this.existingPlaylistForm.get("playlist")?.value;
    if(this.playlist.id != null){
    this._playlistService.addToPlaylist(this.playlist.id, this.episodeId, this.podcastId).subscribe({
      next : (response : any) => {
        this.messageAdd = response.message;
      },
      error : (err : Error) => {
        console.error(err);
        this.messageAdd = "Oups.. une erreur est survenue désolé !"
      }
    })
  }
  }

}
