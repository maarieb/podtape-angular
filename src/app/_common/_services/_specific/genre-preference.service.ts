import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenrePreferenceService {

  private _backuserApiUrl = environment.apiBackuser;
  constructor(private _http: HttpClient) { }

  public createUserGenrePreference(username : string, selectedGenres : string[]) : Observable<any>{
    let url = this._backuserApiUrl + "/genre/create";
    let body = {
      username: username,
      genres: selectedGenres,
    }
    console.log(username)
    console.log(selectedGenres)
    return this._http.post(url, body);
  }

  public updateGenrePreference(username : string, selectedGenres : string[]) : Observable<any>{
    let url = this._backuserApiUrl + "/genre/update";
    let body = {
      username: username,
      genres: selectedGenres,
    }
    console.log(username)
    console.log(selectedGenres)
    return this._http.post(url, body);
  }
}
