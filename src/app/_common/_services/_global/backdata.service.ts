import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Podcast } from '../../_data/podcast';
import { Episode } from '../../_data/episode';

@Injectable({
  providedIn: 'root'
})

export class BackdataService {
  private _backdataApiUrl = environment.apiBackdata;
  constructor(private _http: HttpClient) { }

  public getPodcastSelection(): Observable<Podcast[]> {
    let url = this._backdataApiUrl + "/podcast";
    return this._http.get<Podcast[]>(url);
  }

  public getPodtheque(): Observable<Podcast[]> {
    let url = this._backdataApiUrl + "/podtheque";
    return this._http.get<Podcast[]>(url);
  }

  public getPodcastByGenre(genre : string): Observable<Podcast[]> {
      let url = this._backdataApiUrl + "/podcast/" + genre;
      return this._http.get<Podcast[]>(url);
  }

  public getPodthequeByGenre(genre : string): Observable<Podcast[]> {
      let url = this._backdataApiUrl + "/podtheque/" + genre;
      return this._http.get<Podcast[]>(url);
  }

  public getPodcastById(id : string): Observable<Podcast[]> {
    let url = this._backdataApiUrl + "/podcast/detail/" + id;
    return this._http.get<Podcast[]>(url);
  }

  public getPodcastFromAllPodcastById(id : string): Observable<Podcast[]> {
    let url = this._backdataApiUrl + "/podtheque/detail/" + id;
    return this._http.get<Podcast[]>(url);
  }

  public searchPodcasts(keyword : string): Observable<Podcast[]> {
    let url = this._backdataApiUrl + "/podcast/search/" + keyword;
    return this._http.get<Podcast[]>(url);
  }

  public searchPodcastsFromPodtheque(keyword : string): Observable<Podcast[]> {
    let url = this._backdataApiUrl + "/podtheque/search/" + keyword;
    return this._http.get<Podcast[]>(url);
  }

  public getRecommendations(podcastsId : string[], genres : string[]): Observable<Podcast[]> {
    let url = this._backdataApiUrl + "/podtheque/recommendations";
    let body = {
      podcastsId : podcastsId,
      genres : genres
    }
    return this._http.post<Podcast[]>(url, body);
  }

  public searchEpisodeById(podcastId : string, episodeId : string): Observable<Episode> {
    let url = this._backdataApiUrl + "/podtheque/searchepisode";
    let body = {
      podcastId : podcastId,
      episodeId : episodeId
    }
    return this._http.post<Episode>(url,body);
  }

}
