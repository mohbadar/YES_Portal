import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {

  componentName = "deputy_ministry_of_youth_affairs";
  lang;
  activityId
  activityDetails;
  loading: boolean = false;
  photos;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private pageService: PageService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService) {
    this.activityId = this.route.snapshot.paramMap.get('id');
    console.log("🚀 ~ file: news-details.component.ts ~ line 23 ~ NewsDetailsComponent ~ newsId", this.activityId)

  }

  ngOnInit(): void {

    this.galleryOptions = [
      { image: false, height: "40vh", width: "100%", thumbnailsMoveSize: 4, previewAutoPlay: true, previewAutoPlayPauseOnHover: true, previewCloseOnClick: true, previewCloseOnEsc: true },
      { breakpoint: 500, thumbnailsColumns: 2, imageAutoPlay: true }
    ];

    this.lang = this.translate.currentLang;
    console.log('Current Lang: ', this.lang);
    this.getActivityDetails();
  }

  getActivityDetails() {
    this.loading = true;
    const graphQuery = `
    {
      youthDeputyMinistryActivity(id: "${this.activityId}")
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
      if (res.data.youthDeputyMinistryActivity.localizations.length > 0) {
        this.activityDetails = res.data.youthDeputyMinistryActivity.localizations[0];
        console.log("🚀 ~ file: news-details.component.ts ~ line 50 ~ NewsDetailsComponent ~ this.pageService.getData ~ newsDetails", this.activityDetails)
      } else {
        this.activityDetails = res.data.youthDeputyMinistryActivity;
        console.log("🚀 ~ file: news-details.component.ts ~ line 53 ~ NewsDetailsComponent ~ this.pageService.getData ~ newsDetails", this.activityDetails)
      }
      this.galleryImages = res.data.youthDeputyMinistryActivity.photos.map(item => {
        let imageSize: any = {};
        imageSize.small = item.url;
        imageSize.medium = item.url;
        imageSize.big = item.url;
        return imageSize;
      });
      this.photos = this.activityDetails.photos;
      const date = new Date(this.activityDetails.publishedAt);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      this.activityDetails.createdMonth = month;
      this.activityDetails.createdYear = year;
      this.activityDetails.createdDay = day;
    }, err => {
      this.loading = false;
      console.log(err);

    })
  }

}
