import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class YoutubeService {
  private youtubeUrl: string;
  private apiKey: string;
  private playlist: string;
  private nextPageToken: string;

  constructor(
                private _http: Http
  ) {
    this.youtubeUrl = 'https://www.googleapis.com/youtube';
    this.apiKey = 'AIzaSyC9aUBgfkn_rTjObEn5RukM3UeP0KrpXIY';
    this.playlist = 'UUunw-c0EKIX5LpPo8GpA2Aw';
    this.nextPageToken = null;
  }

  getVideos() {

    let url = `${this.youtubeUrl}/v3/playlistItems`;
    let params = new URLSearchParams();
    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', this.playlist );
    params.set('key', this.apiKey );

    if ( this.nextPageToken ) {
      params.set( 'pageToken', this.nextPageToken );
    }

    return this._http.get( url, { search: params } )
      .map( res => {

        console.log(res.json().nextPageToken );
        this.nextPageToken = res.json().nextPageToken;
        let videos: any[] = [];

        for (let video of res.json().items ){
          let snippet = video.snippet;
          videos.push( snippet );
        }
        return videos;

      });

  }

}
