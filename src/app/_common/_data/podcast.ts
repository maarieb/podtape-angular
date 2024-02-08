import {Episode} from '../_data/episode';

export class Podcast {
    constructor (
        public podcastId : string,
        public title : string,
        public publisher : string,
        public image : string,
        public description : string,
        public latestPubDateMs : number,
        public totalEpisode : number,
        public episodes : Episode[],
        public genres : [string]) {}
  }