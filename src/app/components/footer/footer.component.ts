import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
  selector: 'yes-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  lang;
  pageYoffset = 0;
  contactInfo;
  socialMediaIcon;

  @HostListener('window:scroll', ['$event']) onScroll(event) {
    this.pageYoffset = window.pageYOffset;
  }

  constructor(private scroll: ViewportScroller,
    private pageService: PageService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.lang = this.translate.currentLang;
    this.getContactInfo();
    this.getSocialMedia();
  }

  scrollToTop() {
    this.scroll.scrollToPosition([10, 10]);
  }


  getContactInfo() {
    const graphqlQuery = `
    {
      contactInfo{
        email
        mobile_number
      }
    }
  `;
    this.pageService.getData(graphqlQuery).subscribe((res: any) => {
      this.contactInfo = res.data.contactInfo;
      console.log("🚀 ~ file: footer.component.ts ~ line 41 ~ FooterComponent ~ this.pageService.getData ~ contactInfo", this.contactInfo)

    }, err => {
      console.log(err);

    });

  }


  getSocialMedia() {
    const graphqlQuery = `
    {
      socialMediaIcons {
        name
        class_name
        link
      }
    }
  `;
    this.pageService.getData(graphqlQuery).subscribe((res: any) => {
      this.socialMediaIcon = res.data.socialMediaIcons;
      console.log("🚀 ~ file: footer.component.ts ~ line 67 ~ FooterComponent ~ this.pageService.getData ~ socialMediaIcon", this.socialMediaIcon)

    }, err => {
      console.log(err);

    });

  }



}
