import { Component, OnInit } from '@angular/core';
import { BackdataService } from '../_common/_services/_global/backdata.service';
import { Podcast } from '../_common/_data/podcast';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import Genres from '../_common/_services/_global/genre.service';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss']
})

export class PodcastComponent implements OnInit {

  podcastList: Podcast [] = [];
  genres = Genres.genreTable.sort();
  selectedGenre: string = "";
  keywordSubject = new Subject<string>();
  keyword : string = "";
  
  constructor(private _backdataService: BackdataService) {}
  
  ngOnInit(): void {
    this.getPodcastSelection();
    
    this.keywordSubject
    .pipe(
      debounceTime(200), // wait 300ms after last modification
      distinctUntilChanged(), // wait for actual changes

    )
    .subscribe(keyword => {
      if (keyword != ""){
        this._backdataService.searchPodcasts(keyword)
        .subscribe({
          next: (podcasts: Podcast []) => {
            this.podcastList = podcasts;
          },
          error: (err : Error) => console.error(err),
        });
      } else {
        this.getPodcastSelection();
      }
    });
  }

  public getPodcastSelection(){
    this._backdataService.getPodcastSelection()
      .subscribe({
          next: (podcasts: Podcast[]) => { 
            this.podcastList = podcasts;
          },
          error: (err : Error) => console.error(err),
        }
      );
  }

  public getPodcastByGenre() {
    if (this.selectedGenre === "all"){
      this.getPodcastSelection();
    } else {
      this._backdataService.getPodcastByGenre(this.selectedGenre)
        .subscribe({
          next: (podcasts: Podcast []) => {
            this.podcastList = podcasts;
          },
          error: (err : Error) => console.error(err),
        });
    }
  }
}