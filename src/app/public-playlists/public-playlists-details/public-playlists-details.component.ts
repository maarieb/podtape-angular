import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCirclePlay, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Episode } from 'src/app/_common/_data/episode';
import { Playlist } from 'src/app/_common/_data/playlist';
import { Podcast } from 'src/app/_common/_data/podcast';
import { BackdataService } from 'src/app/_common/_services/_global/backdata.service';
import { PlaylistService } from 'src/app/_common/_services/_specific/playlist.service';

@Component({
  selector: 'app-public-playlists-details',
  templateUrl: './public-playlists-details.component.html',
  styleUrls: ['./public-playlists-details.component.scss']
})
export class PublicPlaylistsDetailsComponent implements OnInit {

  playlistId : number = 0;
  playlistUser : string = "";
  playlistEpisodes : Episode [] = [];
  episodeAudio : string = "";
  episodeTitle :  string = "";
  faDelete = faXmark;
  faPlay = faCirclePlay;

  playlist : Playlist = {
    id: 0,
    name : "",
    description : "",
    creationDate : new Date(),
    status : "",
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

  constructor(private activatedRoute : ActivatedRoute, private _playlistService : PlaylistService, private _backdataService : BackdataService){}

  ngOnInit(): void {

    this.playlistId = this.activatedRoute.snapshot.params['id'];
    this.playlistUser = this.activatedRoute.snapshot.params['user'];

    this._playlistService.getPlaylistById(this.playlistId).subscribe({
      next : (playlist : Playlist) => {
        this.playlist = playlist;
        this.getEpisodesDetails();
      }
    })
      
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
              console.log(this.podcast)
            }, 
            error: (err : Error) => console.error(err),
          })
          this.playlistEpisodes.push(episode);
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

}
