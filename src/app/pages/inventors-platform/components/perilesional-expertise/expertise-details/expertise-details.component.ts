import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'app-expertise-details',
  templateUrl: './expertise-details.component.html',
  styleUrls: ['./expertise-details.component.css']
})
export class ExpertiseDetailsComponent implements OnInit {


  lang;
  loading: boolean = false;
  expertiseId;
  expertiseDetails;
  componentName = "expertise_details";
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private pageService: PageService
  ) {
    this.expertiseId = this.route.snapshot.paramMap.get('expertise_id');
  }

  ngOnInit(): void {
    this.galleryOptions = [
      { image: false, height: "40vh", width: "100%", thumbnailsMoveSize: 4, previewAutoPlay: true, previewAutoPlayPauseOnHover: true, previewCloseOnClick: true, previewCloseOnEsc: true },
      { breakpoint: 500, thumbnailsColumns: 2, imageAutoPlay: true }
    ];

    this.lang = this.translate.currentLang;
    this.getExpertiseDetails();

  }

  getExpertiseDetails() {

    this.loading = true;
    const graphQuery = `
    { 
      perilesionalExpertise(id: "${this.expertiseId}") 
      {
        title
        name
        contents
        photos
        { 
          url 
        } 
        localizations(where: { locale: "${this.lang}" }) 
        {
         title
        name
        contents
        photos
        { 
          url 
        } 
      }
    }
    
    }
     `;
    this.pageService.getData(graphQuery).subscribe((res: any) => {
      this.loading = false;
      if (res.data.perilesionalExpertise.localizations.length > 0) {
        this.expertiseDetails = res.data.perilesionalExpertise.localizations[0];
      } else {
        this.expertiseDetails = res.data.perilesionalExpertise;
      }

      this.galleryImages = res.data.perilesionalExpertise.photos.map(item => {
        let imageSize: any = {};
        imageSize.small = item.url;
        imageSize.medium = item.url;
        imageSize.big = item.url;
        return imageSize;
      });
      console.log("🚀 ~ file: inventor-details.component.ts ~ line 89 ~ InventorDetailsComponent ~ this.pageService.getData ~ galleryImages", this.galleryImages)
    });

  }

}
