import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PublicPlaylist } from '../../_data/publicPlaylist';
import { Playlist } from '../../_data/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private _backuserApiUrl = environment.apiBackuser;
  constructor(private _http: HttpClient) { }

  public createPlaylist(username : string, name : string, description : string, status : string, episodeId : string, podcastId : string) : Observable<any>{
    let url = this._backuserApiUrl + "/playlist/create";
    let body = {
      username: username,
      name : name,
      description : description,
      status : status,
      episodeId : episodeId,
      podcastId : podcastId
    }
    return this._http.post(url, body);
  }

  public addToPlaylist(playlistId : number, episodeId : string, podcastId : string) : Observable<any>{
    let url = this._backuserApiUrl + "/playlist/add";
    let body = {
      playlistId : playlistId,
      episodeId : episodeId,
      podcastId : podcastId
    }
    return this._http.post(url, body);
  }

  public updatePlaylist(playlistId : number, name : string, description : string, status : string) : Observable<any>{
    let url = this._backuserApiUrl + "/playlist/update";
    let body = {
      playlistId : playlistId,
      name : name,
      description : description,
      status : status
    }
    return this._http.post(url, body);
  }

  public deletePlaylist(playlistId : number) : Observable<any>{
    let url = this._backuserApiUrl + "/playlist/delete/" + playlistId;
    let body = { }
    return this._http.post(url, body);
  }

  public removeEpisode(playlistId : number, episodeId : string, podcastId : string) : Observable<any>{
    let url = this._backuserApiUrl + "/playlist/removeep";
    let body = {
      playlistId : playlistId,
      episodeId : episodeId,
      podcastId : podcastId
     }
    return this._http.post(url, body);
  }

  public getPublicPlaylist() : Observable<PublicPlaylist[]>{
    let url = this._backuserApiUrl + "/playlist/public/";
    return this._http.get<PublicPlaylist[]>(url);
  }

  public getPlaylistById(playlistId : number) : Observable<Playlist>{
    let url = this._backuserApiUrl + "/playlist/public/"+ playlistId;
    return this._http.get<Playlist>(url);
  }

}
