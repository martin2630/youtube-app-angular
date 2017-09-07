import { Component, OnInit } from '@angular/core';
import {YoutubeService} from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public videos:  any[];
  public videoSel: any;

  constructor(
                private _youtubeService: YoutubeService
  ) {
    this.videos = [];

    this._youtubeService.getVideos().subscribe(
      resp => this.videos = resp,
      error => console.log(error)
    );

  }

  ngOnInit() {
  }

  verVideo(video: any) {
    this.videoSel = video;
    $('#myModal').modal();
  }

  cerrarModal() {

    this.videoSel = null;
    $('#myModal').modal('hide');
  }

  loadMore() {

    this._youtubeService.getVideos().subscribe(
      resp => this.videos.push.apply( this.videos, resp ),
      error => console.log(error)
    );

  }

}
