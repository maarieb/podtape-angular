import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BackuserService {
  private _backuserApiUrl = environment.apiBackuser;
  constructor(private _http: HttpClient) { }

  public addNewUser(username : string, password : string, email : string) : Observable<any>{
    let url = this._backuserApiUrl + "/auth/register";
    let body = {
      username: username,
      password : password,
      email : email
    }
    return this._http.post(url, body);
  }

  public getUserInfos(username : string, password : string, email : string) : Observable<any>{
    let url = this._backuserApiUrl + "/user/info";
    let body = {
      username: username,
      password : password,
      email : email
    }
    return this._http.post(url, body);
  }

  public updateUser(id : number, email : string, bio : string) : Observable<any>{
    let url = this._backuserApiUrl + "/user/update";
    let body = {
      id : id,
      email : email,
      bio : bio
    }
    return this._http.post(url, body);
  }

  public addToListeningList(username : string, episodeId : string, podcastId : string) : Observable<any>{
    let url = this._backuserApiUrl + "/listening/add";
    let body = {
      username : username,
      episodeId : episodeId,
      podcastId : podcastId
    }
    return this._http.post(url, body);
  }

  
}
