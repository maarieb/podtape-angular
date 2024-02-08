import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Podcast } from 'src/app/_common/_data/podcast';
import { BackdataService } from 'src/app/_common/_services/_global/backdata.service';
import { faStar as faStar, faXmark, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar as nofaStar, faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { FavoriteService } from 'src/app/_common/_services/_specific/favorite.service';
import { SessionStorageService } from 'src/app/_common/_services/_specific/session-storage.service';
import { BackuserService } from 'src/app/_common/_services/_global/backuser.service';

@Component({
  selector: 'app-podcast-details',
  templateUrl: './podcast-details.component.html',
  styleUrls: ['./podcast-details.component.scss']
})

export class PodcastDetailsComponent implements OnInit {

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

  favIcon = faStar;
  nofavIcon = nofaStar;
  faPlay = faCirclePlay;
  faClose = faXmark;
  faAdd = faPlusCircle;
  isFavorite : boolean = false;
  moreThanOne : boolean = false;
  date : Date | undefined;
  description : string | undefined;
  message : string = "";
  episodeAudio : string = "";
  episodeTitle : string = "";

  constructor(private activatedRoute : ActivatedRoute, private _backdataService : BackdataService, private _backuserService : BackuserService, private _favoriteService : FavoriteService, private _sessionService : SessionStorageService){}

  ngOnInit(): void {
   
    this.podcast.podcastId = this.activatedRoute.snapshot.params['id'];
    
    //needs treatments for display: for Date (ms in DB), descriptions (remove all html markups)

    this._backdataService.getPodcastFromAllPodcastById(this.podcast.podcastId).subscribe({
      next: (podcast: Podcast []) => {
        this.podcast = podcast[0];

        this.description = this.podcast.description.replace(/<[^>]+>|=&gt;|&nbsp;/g, '');

        if (this.podcast.genres.length > 1){
          this.moreThanOne = true;
        }

        this.date = new Date(this.podcast.latestPubDateMs);
        for(let episode of this.podcast.episodes){
          episode.publicationDate = new Date(episode.publicationDate);
          episode.cleanDescription = episode.description.replace(/<[^>]+>|=&gt;|&nbsp;/g, '');
        }
      },
      error: (err : Error) => console.error(err),
    });

    this._favoriteService.isAlreadyFavorite(this._sessionService.getUserUsername(), this.podcast.podcastId).subscribe({
      next: (isAlreadyFavorite : boolean) => {
        if(isAlreadyFavorite){
          this.isFavorite = true
        } else {
          this.isFavorite = false
        }
      }
    })
  }

  addToFavorite(){
    if (!this.isFavorite) {
      this.isFavorite = true;
      this._favoriteService.addToFavorite(this._sessionService.getUserUsername(), this.podcast.podcastId).subscribe({
        next: () => {
          this.message = "Ajouté en favoris !"
        },
        error: (err : Error) => console.error(err)
      })
    } else {
      this.isFavorite = false;
    }
  }

  removeFromFavorite(){
    if (this.isFavorite) {
      this.isFavorite = false;
      this._favoriteService.removeFromFavorite(this._sessionService.getUserUsername(), this.podcast.podcastId).subscribe({
        next: () => {
          this.message = "Retiré des favoris !"
        },
        error: (err : Error) => console.error(err)
      })
    } else {
      this.isFavorite = true;
    }
  }

  playAudio(episodeAudio : string, episodeTitle : string, episodeId : string){
    this.episodeAudio = episodeAudio;
    this.episodeTitle = episodeTitle;
    var audio = document.querySelector("audio");
    if (audio){
      audio.play();
    }
    var audioDiv = document.getElementById("audio");
    if (audioDiv?.className == "audio"){
      audioDiv.className += " active";
    }
    this._backuserService.addToListeningList(this._sessionService.getUserUsername(), episodeId, this.podcast.podcastId).subscribe({
      next: () => {
      },
      error: (err : Error) => console.error(err)
    })
  }

  stopAudio(){
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
