import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {

  componentName = "news-details";
  lang;
  newsId
  newsDetails;
  loading: boolean = false;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private pageService: PageService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService) {
    this.newsId = this.route.snapshot.paramMap.get('id');
    console.log("🚀 ~ file: news-details.component.ts ~ line 23 ~ NewsDetailsComponent ~ newsId", this.newsId)

  }

  ngOnInit(): void {
    this.galleryOptions = [
      { image: false, height: "40vh", width: "100%", thumbnailsMoveSize: 4, previewAutoPlay: true, previewAutoPlayPauseOnHover: true, previewCloseOnClick: true, previewCloseOnEsc: true },
      { breakpoint: 500, thumbnailsColumns: 2, imageAutoPlay: true, }
    ];

    this.lang = this.translate.currentLang;
    console.log('Current Lang: ', this.lang);
    this.getNewsDetails();
  }

  getNewsDetails() {
    this.loading = true;
    const graphQuery = `
    {
      youthNew(id: "${this.newsId}")
      {
        title 
        contents
        publishedAt: published_at 
        photos
        {
          url
        } 
        localizations(where: { locale: "${this.lang}" }) {title contents publishedAt: published_at photos { url }}}}
    `;
    this.pageService.getData(graphQuery).subscribe((res: any) => {
      this.loading = false;
      if (res.data.youthNew.localizations.length > 0) {
        this.newsDetails = res.data.youthNew.localizations[0];
        console.log("🚀 ~ file: news-details.component.ts ~ line 50 ~ NewsDetailsComponent ~ this.pageService.getData ~ newsDetails", this.newsDetails)
      } else {
        this.newsDetails = res.data.youthNew;
        console.log("🚀 ~ file: news-details.component.ts ~ line 53 ~ NewsDetailsComponent ~ this.pageService.getData ~ newsDetails", this.newsDetails)
      }
      const date = new Date(this.newsDetails.publishedAt);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      this.newsDetails.createdMonth = month;
      this.newsDetails.createdYear = year;
      this.newsDetails.createdDay = day;

      this.galleryImages = res.data.youthNew.photos.map(item => {
        let imageSize: any = {};
        imageSize.small = item.url;
        imageSize.medium = item.url;
        imageSize.big = item.url;
        return imageSize;
      });
    }, err => {
      this.loading = false;
      console.log(err);

    })
  }

}
