export class Episode {
    constructor (
        public episodeId : string,
        public title : string,
        public description : string,
        public cleanDescription : string,
        public publicationDateMs : number,
        public publicationDate: Date,
        public audioUrl : string,
        public audioLength : number,
        public podcastId : string,
        public podcastTitle : string,
        public listeningDate : Date) {}
  }