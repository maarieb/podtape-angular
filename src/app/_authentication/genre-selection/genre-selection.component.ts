import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Genres from '../../_common/_services/_global/genre.service';
import { GenrePreferenceService } from '../../_common/_services/_specific/genre-preference.service';
import { Observable } from 'rxjs';
import { SessionStorageService } from 'src/app/_common/_services/_specific/session-storage.service';

@Component({
  selector: 'app-genre-selection',
  templateUrl: './genre-selection.component.html',
  styleUrls: ['./genre-selection.component.scss']
})

export class GenreSelectionComponent implements OnInit {

  username : string = "";
  password : string = "";
  genre : string = "";
  genres = Genres.genreTable.sort();
  selectedGenres : string[] = [];
  isLoggedIn : Observable<boolean>;

  constructor(private route : ActivatedRoute, private router : Router, private _genreService : GenrePreferenceService, private _storageService : SessionStorageService){
    this.isLoggedIn = this._storageService.isLoggedIn();
  }

  ngOnInit(): void {

    this.username = this.route.snapshot.queryParams['user'];

  }

  addToList(genre : string){
    if (!this.selectedGenres.includes(genre)){
      this.selectedGenres.push(genre);
    }
  }

  createUserGenrePreference(selectedGenres : string[]){
    this._genreService.createUserGenrePreference(this.username, selectedGenres).subscribe({
      next: () => {
          this.router.navigate(['/login']);
      },
      error: (err : Error) => console.error(err),
    })
  }

  updateGenrePreference(selectedGenres : string[]){
    this.username = this._storageService.getUserUsername();
    this._genreService.updateGenrePreference(this.username, selectedGenres).subscribe({
      next: () => {
          this.router.navigate(['/profile']);
      },
      error: (err : Error) => console.error(err),
    })
  }

  remove(genre : string) {
    var index = this.selectedGenres.indexOf(genre);
    if(index != -1) {
      this.selectedGenres.splice(index, 1);
    }
  }

}
