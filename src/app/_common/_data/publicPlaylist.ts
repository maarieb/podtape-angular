import { Playlist } from "./playlist";

export class PublicPlaylist {
    constructor (
        public username : string,
        public playlist: Playlist,
        public image: string ) {}
  }