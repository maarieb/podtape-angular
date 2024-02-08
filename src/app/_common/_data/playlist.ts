import { Episode } from "./episode";
import { PlaylistEpisodes } from "./playlistEpisodes";

export class Playlist {
    constructor (
        public id : number,
        public name : string,
        public description : string,
        public creationDate : Date,
        public status : string,
        public episodes : PlaylistEpisodes[] ) {}
  }