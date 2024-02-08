import { Episode } from "./episode";
import { Playlist } from "./playlist";

export class User {
    constructor (
        public id : number,
        public username : string,
        public password : string,
        public email : string,
        public bio : string,
        public creationDate : Date,
        public nbFavorites : number,
        public nbPlaylists : number,
        public genrePref : string[],
        public favorites : string[],
        public playlists : Playlist[],
        public listening : Episode[],
    ){}
}