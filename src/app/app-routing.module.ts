import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PodcastComponent } from './podcast/podcast.component';
import { PodthequeComponent } from './podtheque/podtheque.component';
import { SignupInComponent } from './_authentication/signup-in/signup-in.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationGuard } from './_common/_guard/authentication.guard';
import { LogoutComponent } from './_authentication/logout/logout.component';
import { AppComponent } from './app.component';
import { GenreSelectionComponent } from './_authentication/genre-selection/genre-selection.component';
import { PodcastDetailsComponent } from './podcast/podcast-details/podcast-details.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistDetailComponent } from './playlist/playlist-detail/playlist-detail.component';
import { HomeComponent } from './home/home.component';
import { PublicPlaylistsComponent } from './public-playlists/public-playlists.component';
import { PublicPlaylistsDetailsComponent } from './public-playlists/public-playlists-details/public-playlists-details.component';

const routes: Routes = [
  {
    path: "podcast", component: PodcastComponent, canActivate:[AuthenticationGuard],
  },
  { path : 'podcast/detail/:id', component: PodcastDetailsComponent, canActivate:[AuthenticationGuard]
  },
  {
    path: "podtheque", component: PodthequeComponent, canActivate:[AuthenticationGuard]
  },
  { 
    path : 'podtheque/detail/:id', component: PodcastDetailsComponent, canActivate:[AuthenticationGuard]
  },
  {
    path: "login", component: SignupInComponent
  },
  {
    path: "profile", component: ProfileComponent, canActivate:[AuthenticationGuard]
  },
  {
    path: "playlist/:epId/:podId", component: PlaylistComponent, canActivate:[AuthenticationGuard]
  },
  {
    path: "profile/playlist/:id", component: PlaylistDetailComponent, canActivate:[AuthenticationGuard]
  },
  {
    path: "logout", component: LogoutComponent
  },
  {
    path: "genre", component: GenreSelectionComponent
  },
  {
    path: "station", component: PublicPlaylistsComponent, canActivate:[AuthenticationGuard]
  },
  {
    path: "station/detail/:id/:user", component: PublicPlaylistsDetailsComponent, canActivate:[AuthenticationGuard]
  },
  {
    path: "home", component: RecommendationsComponent, canActivate:[AuthenticationGuard]
  },
  {
    path: "", component: HomeComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
