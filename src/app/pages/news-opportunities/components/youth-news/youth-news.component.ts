import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
    selector: 'app-youth-news',
    templateUrl: './youth-news.component.html',
    styleUrls: ['./youth-news.component.css']
})
export class YouthNewsComponent implements OnInit {
    componentName = "youth-news";
    limit: number = 2;
    offset: number = 1;
    total: number = 1;
    lang;
    loading: boolean = true;
    youthNews = [];
    youthNewsArr = [];
    MAX_NEWS_TITLE_LENGTH = 40;

    constructor(
        private router: Router,
        private translate: TranslateService,
        private pageService: PageService
    ) { }

    ngOnInit(): void {
        this.lang = this.translate.currentLang;
        this.getTotal();
    }

    getTotal() {
        this.pageService.getTotalCount('youth-news', this.lang).subscribe((res: any) => {
            this.total = res;
            this.getAllYouthNews(this.offset);
        }, err => {
            this.loading = false;
            console.log(err);

        });
    }

    getAllYouthNews(offset: number) {
        this.offset = offset;
        let start = (this.offset - 1) * this.limit;
        const graphqlQuery = `
        {
            youthNews(locale: "${this.lang}",start:${start},limit:${this.limit}) {
            id
            title
            contents
            photos {
            url
            }
            publishedAt:published_at
        }
        }`;

        if ((this.youthNewsArr.length < 1) || (this.youthNewsArr.filter(d => d.page === this.offset)).length < 1) {
            this.pageService.getData(graphqlQuery).subscribe((res: any) => {
                this.loading = false;
                const newData = {
                    page: offset,
                    data: this.formatDate(res.data.youthNews)
                };
                this.youthNewsArr.push(newData);
                this.youthNews = newData.data;
            }, err => {
                this.loading = false;
                console.log(err);

            });
        } else {
            this.youthNews = (this.youthNewsArr.filter(d => d.page === this.offset))[0].data;
        }

    }

    formatDate(data) {
        data.forEach(element => {
            element.title = this.getNewsTitle(element.title)
            const date = new Date(element.publishedAt);
            const year = date.getFullYear();
            const month = date.toLocaleString('default', { month: 'long' });
            const day = date.getDate();
            element.createdMonth = month;
            element.createdYear = year;
            element.createdDay = day;
        });
        return data;
    }

    getNewsTitle(data) {
        if (data && data.length > this.MAX_NEWS_TITLE_LENGTH) {
            return data.substring(0, this.MAX_NEWS_TITLE_LENGTH) + '...';
        } else {
            return data;
        }
    }

    pageChanged(page: number) {
        this.offset = page;
        this.getAllYouthNews(page);
    }

    imageError(el) {
        el.onerror = '';
        el.src = '../../../assets/images/placeholder/img-avatar.png';
        return true;
    }

    showNewsDetails(id) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['//news-opportunities/news-details/' + id])

        )
    }

}
