import { Component, OnInit } from '@angular/core';
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

  constructor(
    private translate: TranslateService,
    private pageService: PageService
  ) {

  }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.getVideosTypes();
  }

  getVideosTypes() {
    this.loading = true;
    const graphqlQuery = `{
      videoTypes(locale: "${this.lang}", sort: "order") {
        id
        name
        slug
      }
    }`;
    this.pageService.getData(graphqlQuery).subscribe((res: any) => {
      this.loading = false;
      this.videosTypes = res.data.videoTypes;
      this.getVideosByType(this.videosTypes[0].id);
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
      console.log("🚀 ~ file: e-learning.component.ts ~ line 68 ~ ELearningComponent ~ this.pageService.getData ~ res", res)
      this.loading = false;
      this.videos = res.data.videoTypes[0].videos;
    }, err => {
      this.loading = false;
      console.log(err);

    });

  }

}
