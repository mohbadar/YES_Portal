import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'app-research-details',
  templateUrl: './research-details.component.html',
  styleUrls: ['./research-details.component.css']
})
export class ResearchDetailsComponent implements OnInit {

  lang;
  loading: boolean = false;
  researchId;
  researchDetails;
  componentName = "research_papers";
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private pageService: PageService
  ) {
    this.researchId = this.route.snapshot.paramMap.get('research_id');
  }

  ngOnInit(): void {
    this.galleryOptions = [
      { image: false, height: "40vh", width: "100%", thumbnailsMoveSize: 4, previewAutoPlay: true, previewAutoPlayPauseOnHover: true, previewCloseOnClick: true, previewCloseOnEsc: true },
      { breakpoint: 500, thumbnailsColumns: 2, imageAutoPlay: true }
    ];

    this.lang = this.translate.currentLang;
    this.getResearchDetails();

  }

  getResearchDetails() {

    this.loading = true;
    const graphQuery = `
    { 
      researchPaper(id: "${this.researchId}") 
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
      console.log("🚀 ~ file: research-details.component.ts ~ line 70 ~ ResearchDetailsComponent ~ this.pageService.getData ~ res", res)
      this.loading = false;
      if (res.data.researchPaper.localizations.length > 0) {
        this.researchDetails = res.data.researchPaper.localizations[0];
        console.log("🚀 ~ file: research-details.component.ts ~ line 73 ~ ResearchDetailsComponent ~ this.pageService.getData ~ researchDetails", this.researchDetails)
      } else {
        this.researchDetails = res.data.researchPaper;
        console.log("🚀 ~ file: research-details.component.ts ~ line 76 ~ ResearchDetailsComponent ~ this.pageService.getData ~ researchDetails", this.researchDetails)

      }

      this.galleryImages = res.data.researchPaper.photos.map(item => {
        let imageSize: any = {};
        imageSize.small = item.url;
        imageSize.medium = item.url;
        imageSize.big = item.url;
        return imageSize;
      });
    });

  }



}
