import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './_front_elements/header/header.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PodcastComponent } from './podcast/podcast.component';
import { BorderCardDirective } from './_common/_directives/border-card.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PodthequeComponent } from './podtheque/podtheque.component';
import { SignupInComponent } from './_authentication/signup-in/signup-in.component';
import { AuthenticationInterceptor } from './_common/_interceptor/authentication.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './_authentication/logout/logout.component';
import { GenreSelectionComponent } from './_authentication/genre-selection/genre-selection.component';
import { PodcastDetailsComponent } from './podcast/podcast-details/podcast-details.component';
import { AuthenticationGuard } from './_common/_guard/authentication.guard';
import { ChipsDirective } from './_common/_directives/chips.directive';
import { PodcastsLinksInFavoriteDirective } from './_common/_directives/podcasts-links-in-favorite.directive';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { DurationFormatPipe } from './_common/_services/_global/duration-format.pipe';
import { PlaylistComponent } from './playlist/playlist.component';
import { GenreCardDirective } from './_common/_directives/genre-card.directive';
import { PlaylistDetailComponent } from './playlist/playlist-detail/playlist-detail.component';
import { FooterComponent } from './_front_elements/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PublicPlaylistsComponent } from './public-playlists/public-playlists.component';
import { PublicPlaylistsDetailsComponent } from './public-playlists/public-playlists-details/public-playlists-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PodcastComponent,
    BorderCardDirective,
    PodthequeComponent,
    SignupInComponent,
    ProfileComponent,
    LogoutComponent,
    GenreSelectionComponent,
    PodcastDetailsComponent,
    ChipsDirective,
    PodcastsLinksInFavoriteDirective,
    RecommendationsComponent,
    DurationFormatPipe,
    PlaylistComponent,
    GenreCardDirective,
    PlaylistDetailComponent,
    FooterComponent,
    HomeComponent,
    PublicPlaylistsComponent,
    PublicPlaylistsDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
      },
    AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
