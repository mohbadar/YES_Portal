import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PageService } from '../page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  coverDetails;
  aboutUs;
  postData;
  topYouths;
  lang;
  imageUrl = 'assets/images/afg-cover2.jpg';
  customOptions: OwlOptions;

  constructor(
    private pageService: PageService,
    private translate: TranslateService
  ) { }

  languages = [
    {
      name: 'English',
      icon: 'us.png',
      value: 'en'
    }, {
      name: 'پښتو',
      icon: 'afg.png',
      value: 'ps'
    }, {
      name: 'دری',
      icon: 'afg.png',
      value: 'dr'
    }
  ];


  ngOnInit(): void {

    this.lang = this.translate.currentLang;
    console.log('Current Lang: ', this.lang);
    this.getCoverDetails();
    this.getPostData();
    this.getAboutUsDetails();
    this.getTopYouth();


    this.customOptions = {
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      autoplaySpeed: 2000,
      dotsSpeed: 500,
      autoplayMouseleaveTimeout: 5000,
      smartSpeed: 400,
      dragEndSpeed: 350,
      rtl: this.lang != 'en',
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 4
        }
      },
      nav: true
    }

  }


  getPostData() {
    const graphqlQuery = `{
      posts {
        _id
        title:title_${this.lang},
        image {
          formats
        }
      }
    }`;
    this.pageService.getPostData(graphqlQuery).subscribe((res: any) => {
      // this.loading = false;
      console.log('PostData ', res.data);
      this.postData = res.data.posts;
    }, err => {
      // this.loading = false;
      console.log(err);

    });
  }


  getCoverDetails() {
    const graphQuery = `{cover {slogan:slogan_${this.lang} quote:quote_${this.lang} quotee_name:quotee_name_${this.lang} media{url} }}`;
    this.pageService.getCoverDetails(graphQuery).subscribe((res: any) => {
      this.coverDetails = res.data.cover;
      console.log(' data: ', this.coverDetails);
    }, err => {
      console.log(err);

    });
  }

  getAboutUsDetails() {
    const graphQuery = `{
      aboutUs {
        title: title_${this.lang}
        brief:brief_${this.lang}
        media {
          url
        }
      }
    }`;
    this.pageService.getAboutUsDetails(graphQuery).subscribe((res: any) => {
      this.aboutUs = res.data.aboutUs;
      console.log('ABOUT-US: ', this.aboutUs);
    }, err => {
      console.log(err);

    });
  }

  getTopYouth() {
    const graphQuery = `{
      topYouths {
        _id
        name:name_${this.lang}
        brief: brief_${this.lang}
        photo {
          url
        }
      }
    }`;
    this.pageService.getTopYouth(graphQuery).subscribe((res: any) => {
      this.topYouths = res.data.topYouths;
      console.log('Touth: ', this.aboutUs);
    }, err => {
      console.log(err);

    });
  }

}
