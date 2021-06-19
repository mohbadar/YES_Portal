import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from '../../page.service';

@Component({
  selector: 'app-motivational-videos',
  templateUrl: './motivational-videos.component.html',
  styleUrls: ['./motivational-videos.component.css']
})
export class MotivationalVideosComponent implements OnInit {

  lang;
  loading: boolean = false;
  videos;


  constructor(
    private translate: TranslateService,
    private pageService: PageService,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.getLearningVideos();
  }

  getLearningVideos() {
    this.loading = true;
    const graphqlQuery = `{
      videos(locale:"${this.lang}") {
        id
        title
        youtube_url
      }
    }`;
    this.pageService.getData(graphqlQuery).subscribe((res: any) => {
      this.loading = false;
      console.log('motivationalVideos ', res.data);
      this.videos = res.data.videos;
    }, err => {
      this.loading = false;
      console.log(err);

    });
  }


}
