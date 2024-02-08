import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private _backuserApiUrl = environment.apiBackuser;
  constructor(private _http: HttpClient) { }

  public addToFavorite(username : string, podcastId : string) : Observable<any>{
    let url = this._backuserApiUrl + "/favorite/add";
    let body = {
      username: username,
      podcastId : podcastId
    }
    return this._http.post(url, body);
  }

  public removeFromFavorite(username : string, podcastId : string) : Observable<any>{
    let url = this._backuserApiUrl + "/favorite/remove";
    let body = {
      username: username,
      podcastId : podcastId
    }
    return this._http.post(url, body);
  }

  public isAlreadyFavorite(username : string, podcastId : string) : Observable<any>{
    let url = this._backuserApiUrl + "/favorite/check";
    let body = {
      username: username,
      podcastId : podcastId
    }
    return this._http.post(url, body);
  }

}
