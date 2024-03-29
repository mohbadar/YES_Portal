import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'app-inventor-details',
  templateUrl: './inventor-details.component.html',
  styleUrls: ['./inventor-details.component.css']
})
export class InventorDetailsComponent implements OnInit {

  lang;
  loading: boolean = false;
  inventorId;
  inventorDetails;
  componentName = "inventor_details";
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private pageService: PageService
  ) {
    this.inventorId = this.route.snapshot.paramMap.get('inventor_id');
    console.log("🚀 ~ file: inventor-details.component.ts ~ line 24 ~ InventorDetailsComponent ~ inventorDetails", this.inventorId)
  }

  ngOnInit(): void {
    this.galleryOptions = [
      { image: false, height: "40vh", width: "100%", thumbnailsMoveSize: 4, previewAutoPlay: true, previewAutoPlayPauseOnHover: true, previewCloseOnClick: true, previewCloseOnEsc: true },
      { breakpoint: 500, thumbnailsColumns: 2, imageAutoPlay: true }
    ];

    this.lang = this.translate.currentLang;
    this.getInventorDetails();

  }

  getInventorDetails() {

    this.loading = true;
    const graphQuery = `
      
 { 
  invention(id: "${this.inventorId}") 
  {
    title
    inventor_name
    contents
    photos
    { 
      url 
    } 
    localizations(where: { locale: "${this.lang}" }) 
    {
     title
    inventor_name
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
      if (res.data.invention.localizations.length > 0) {
        this.inventorDetails = res.data.invention.localizations[0];
        console.log("🚀 ~ file: inventor-details.component.ts ~ line 65 ~ InventorDetailsComponent ~ this.pageService.getData ~ inventorDetails", this.inventorDetails);
      } else {
        this.inventorDetails = res.data.invention;
        console.log("🚀 ~ file: inventor-details.component.ts ~ line 68 ~ InventorDetailsComponent ~ this.pageService.getData ~ inventorDetails", this.inventorDetails)

      }

      this.galleryImages = res.data.invention.photos.map(item => {
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
