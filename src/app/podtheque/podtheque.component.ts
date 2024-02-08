import { Component, OnInit, Input } from '@angular/core';
import { BackdataService } from '../_common/_services/_global/backdata.service';
import { Podcast } from '../_common/_data/podcast';
import Genres from '../_common/_services/_global/genre.service';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-podtheque',
  templateUrl: './podtheque.component.html',
  styleUrls: ['./podtheque.component.scss']
})
export class PodthequeComponent implements OnInit{

  podthequeList: Podcast [] = [];
  genres = Genres.genreTable.sort();
  selectedGenre: string = "";
  keywordSubject = new Subject<string>();
  keyword : string = "";
  
  constructor(private _backdataService: BackdataService) {
    }
  
  ngOnInit(): void {
    this.getPodtheque();

    this.keywordSubject
    .pipe(
      debounceTime(200), // wait 300ms after last modification
      distinctUntilChanged(), // wait for actual changes

    )
    .subscribe(keyword => {
      if (keyword != ""){
        this._backdataService.searchPodcastsFromPodtheque(keyword)
        .subscribe({
          next: (podcasts: Podcast []) => {
            this.podthequeList = podcasts;
          },
          error: (err : Error) => console.error(err),
        });
      } else {
        this.getPodtheque();
      }
    });
  }

  public getPodtheque(){
    this._backdataService.getPodtheque()
      .subscribe({
          next: (podcasts: Podcast[]) => { 
            this.podthequeList = podcasts;
          },
          error: (err : Error) => console.error(err),
        }
      );
  }

  public getPodthequeByGenre() {
    if (this.selectedGenre === "all"){
      this.getPodtheque();
    } else {
      this._backdataService.getPodthequeByGenre(this.selectedGenre)
    .subscribe({
      next: (podcasts: Podcast []) => {
        this.podthequeList = podcasts;
      },
      error: (err : Error) => console.error(err),
    });
    }
  }
}
