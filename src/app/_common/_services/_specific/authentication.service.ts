import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private _backuserApiUrl = environment.apiBackuser;
  constructor(private _http: HttpClient) { }

  public login(username : string, password : string) : Observable<any>{
    let url = this._backuserApiUrl + "/auth/login";
    let body = {
      username : username,
      password : password
    }
    return this._http.post(url, body)
  }

  public logout() : Observable<any>{
    let url = this._backuserApiUrl + "/auth/logout";
    let body = { }
    return this._http.post(url, body)
  }

}
