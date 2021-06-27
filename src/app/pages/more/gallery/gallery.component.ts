import { Component, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from '../../page.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  componentName = "gallery";
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  loading: boolean = false;
  photos;

  constructor(private translate: TranslateService,
    private pageService: PageService) { }

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '1200px',
        height: '600px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageAutoPlay: true,
        previewAutoPlay: true,
        previewAutoPlayPauseOnHover: true,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.getGalleryPhotos();
  }


  getGalleryPhotos() {
    this.loading = true;
    const graphQuery = `
    {
      galleries(sort: "published_at:DESC") {
        photo {
          url
        }
      }
    }
      `;
    this.pageService.getData(graphQuery).subscribe((res: any) => {
      this.loading = false;
      console.log('Photo Details are : ', res);
      this.photos = res.data.galleries;
      console.log("🚀 ~ file: gallery.component.ts ~ line 46 ~ GalleryComponent ~ this.pageService.getData ~ photos", this.photos)
      this.galleryImages = this.photos.map(item => {
        let imageSize: any = {};
        imageSize.small = item.photo.url;
        imageSize.medium = item.photo.url;
        imageSize.big = item.photo.url;
        return imageSize;
      });
    }, err => {
      this.loading = false;
    });
  }

  imageError(el) {
    el.onerror = '';
    el.src = '../../assets/img/placeholders/img-avatar.png';
    return true;
  }

}
