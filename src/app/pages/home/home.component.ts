import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { PageService } from '../page.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    coverDetails;
    aboutUs;
    youthNews;
    topYouths;
    recentBlogs;
    lang;
    imageUrl = 'assets/images/afg-cover2.jpg';
    customOptions: OwlOptions;

    constructor(
        private pageService: PageService,
        private spinner: NgxSpinnerService,
        private translate: TranslateService,
        private router: Router
    ) { }

    publishedAt: any = {};
    monthNames = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    languages = [
        {
            name: 'English',
            icon: 'us.png',
            value: 'en'
        }, {
            name: 'پښتو',
            icon: 'afg.png',
            value: 'ps-AF'
        }, {
            name: 'دری',
            icon: 'afg.png',
            value: 'fa-AF'
        }
    ];


    ngOnInit(): void {



        this.lang = this.translate.currentLang;
        console.log('Current Lang: ', this.lang);
        this.getCoverDetails();
        this.getYouthNews();
        this.getAboutUsDetails();
        this.getTopYouth();
        this.getRecentBlogs();


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


    getYouthNews() {
        this.spinner.show();
        const graphqlQuery = `
        {
            youthNews(locale: "${this.lang}") {
            id
            title
            photos {
              url
            }
            publishedAt:published_at
          }
        }`;
        this.pageService.getData(graphqlQuery).subscribe((res: any) => {
            this.spinner.hide();
            console.log('YouthNews ', res.data);
            this.youthNews = res.data.youthNews;
            this.formatDate(this.youthNews);
        }, err => {
            this.spinner.hide();
            console.log(err);

        });
    }


    getCoverDetails() {
        this.spinner.show();
        const graphQuery = `
        {
            cover(locale: "${this.lang}") {
              slogan
              quote
              quotee_name
              photo{
                url
              }
            }
          }
        `;
        this.pageService.getData(graphQuery).subscribe((res: any) => {
            this.spinner.hide();
            this.coverDetails = res.data.cover;
            console.log(' data: ', this.coverDetails);
        }, err => {
            this.spinner.hide();
            console.log(err);

        });
    }

    getAboutUsDetails() {
        const graphQuery = `{
            aboutUs(locale: "${this.lang}") {
            id
            title
            brief
            photos {
              url
            }
          }
        }`;
        this.pageService.getData(graphQuery).subscribe((res: any) => {
            this.aboutUs = res.data.aboutUs;
            console.log('ABOUT-US: ', this.aboutUs);
        }, err => {
            console.log(err);

        });
    }

    getTopYouth() {
        const graphQuery = `
        {
            topYouths(locale:"${this.lang}", limit:3) {
              id
              name
              brief
              photos {
                url
              }
              
            }
          }`;
        this.pageService.getData(graphQuery).subscribe((res: any) => {
            this.topYouths = res.data.topYouths;
            console.log('YTouth: ', this.topYouths);
        }, err => {
            console.log(err);

        });
    }

    getRecentBlogs() {
        const graphQuery = `{
            blogs(locale:"${this.lang}", limit: 3) 
            { 
              id title brief author publishedAt: published_at photos{ url }
            }
          }`;
        this.pageService.getData(graphQuery).subscribe((res: any) => {
            this.recentBlogs = res.data.blogs;
            this.formatDate(this.recentBlogs);
            console.log('Blogs: ', this.recentBlogs);
        }, err => {
            console.log(err);

        });
    }


    formatDate(data) {
        data.forEach(element => {
            const date = new Date(element.publishedAt);
            const year = date.getFullYear();
            const month = date.toLocaleString('default', { month: 'long' });
            const day = date.getDay();
            element.createdMonth = month;
            element.createdYear = year;
            element.createdDay = day;
        });
    }

    imageError(el) {
        el.onerror = '';
        el.src = '../../../assets/images/placeholder/img-avatar.png';
        return true;
    }


    showBlogDetails(id) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['//e-learning/blogdetails/' + id])

        )
    }

    showNewsDetails(id) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['//news-opportunities/news-details/' + id])

        )
    }

}
