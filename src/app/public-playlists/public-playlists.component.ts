import { Component, OnInit } from '@angular/core';
import { BackuserService } from '../_common/_services/_global/backuser.service';
import { Playlist } from '../_common/_data/playlist';
import { Episode } from '../_common/_data/episode';
import { Podcast } from '../_common/_data/podcast';
import { PlaylistService } from '../_common/_services/_specific/playlist.service';
import { PublicPlaylist } from '../_common/_data/publicPlaylist';

@Component({
  selector: 'app-public-playlists',
  templateUrl: './public-playlists.component.html',
  styleUrls: ['./public-playlists.component.scss']
})
export class PublicPlaylistsComponent implements OnInit {


  publicPlaylists : PublicPlaylist[] = [];

  publicPlaylist : PublicPlaylist = {
    username : "",
    playlist : {
      id : 0,
      name : "",
      description : "",
      creationDate : new Date(),
      status : "",
      episodes : [] 
    },
    image : ""

  }

  playlist : Playlist = {
    id: 0,
    name : "",
    description : "",
    creationDate : new Date(),
    status : "",
    episodes : []
  }

  constructor( private _backuserService : BackuserService, private _playlistService : PlaylistService){}

  ngOnInit(): void {

    this._playlistService.getPublicPlaylist().subscribe({
      next : (publicPlaylists : PublicPlaylist[]) => {
        this.publicPlaylists = publicPlaylists;
        for (let publicPlaylist of this.publicPlaylists){
          publicPlaylist.image = this.setImage();
        }
      }
    })
      
  }

  public setImage(){
    var images = ["../../assets/audiotape.png", "../../assets/audiotape2.png", "../../assets/audiotape3.png", "../../assets/audiotape4.png", "../../assets/audiotape5.png", "../../assets/audiotape6.png"];
    var index = Math.floor(Math.random()*images.length);
    return images[index];
  }

}
