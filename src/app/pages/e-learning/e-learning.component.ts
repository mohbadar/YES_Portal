import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from '../page.service';

@Component({
  selector: 'app-e-learning',
  templateUrl: './e-learning.component.html',
  styleUrls: ['./e-learning.component.css']
})
export class ELearningComponent implements OnInit {


  lang;
  loading: boolean = false;
  videosTypes;
  videos;
  firstArray;

  constructor(
    private translate: TranslateService,
    private pageService: PageService,
    private sanitizar: DomSanitizer
  ) {

  }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.getVideosTypes();
  }

  getVideosTypes() {
    this.loading = true;
    const graphqlQuery = `{
      videoTypes(locale: "${this.lang}") {
        id
         name
        slug
      }
    }`;
    this.pageService.getData(graphqlQuery).subscribe((res: any) => {
      this.loading = false;
      this.videosTypes = res.data.videoTypes;
      console.log("🚀 ~ file: e-learning.component.ts ~ line 41 ~ ELearningComponent ~ this.pageService.getData ~ videosTypes", this.videosTypes)
    }, err => {
      this.loading = false;
      console.log(err);

    });
  }

  getVideosByType(id) {
    console.log("🚀 ~ file: e-learning.component.ts ~ line 50 ~ ELearningComponent ~ getVideosByType ~ id", id)
    this.loading = true;
    const graphqlQuery = `{
      videoTypes(locale: "${this.lang}" where: { id: "${id}"}) {
        id
         name
        videos {
          id
          title
          youtube_url
        }
      }
    }`;
    this.pageService.getData(graphqlQuery).subscribe((res: any) => {
      this.loading = false;
      this.firstArray = res.data.videoTypes;
      this.firstArray.forEach(element => {
        this.videos = element.videos;
        console.log("🚀 ~ file: e-learning.component.ts ~ line 68 ~ ELearningComponent ~ this.pageService.getData ~ vid", this.videos)
      });
    }, err => {
      this.loading = false;
      console.log(err);

    });

  }

}
