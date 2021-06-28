import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';

@Component({
    selector: 'app-success-stories',
    templateUrl: './success-stories.component.html',
    styleUrls: ['./success-stories.component.css']
})
export class SuccessStoriesComponent implements OnInit {

    limit: number = 2;
    offset: number = 1;
    total: number = 1;
    lang;
    componentName = "success-stories";
    loading: boolean = false;
    successStories;
    successStroriesArr = [];
    MAX_BRIEF_LENGTH = 80;


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
        this.pageService.getTotalCount('success-stories', this.lang).subscribe((res: any) => {
            this.total = res;
            this.getSuccessStories(this.offset);
        }, err => {
            this.loading = false;
            console.log(err);

        });
    }

    getSuccessStories(offset: number) {
        this.offset = offset;
        let start = (this.offset - 1) * this.limit;
        const graphQuery = `{
            successStories(locale:"${this.lang}",start:${start},limit:${this.limit}, sort: "published_at:DESC") 
            { 
              id name brief description publishedAt: published_at photos{ url }
            }
          }`;

        if ((this.successStroriesArr.length < 1) || (this.successStroriesArr.filter(d => d.page === this.offset)).length < 1) {
            this.pageService.getData(graphQuery).subscribe((res: any) => {
                this.loading = false;
                const newData = {
                    page: offset,
                    data: res.data.successStories
                };
                this.successStroriesArr.push(newData);
                this.successStories = newData.data;
            }, err => {
                this.loading = false;
                console.log(err);

            });
        } else {
            this.successStories = (this.successStroriesArr.filter(d => d.page === this.offset))[0].data;
        }
    }

    getBrief(data) {
        if (data && data.length > this.MAX_BRIEF_LENGTH) {
            return data.substring(0, this.MAX_BRIEF_LENGTH) + '...';
        }
    }




    pageChanged(page: number) {
        this.offset = page;
        this.getSuccessStories(page);
    }

    imageError(el) {
        el.onerror = '';
        el.src = '../../../../../assets/images/post-1.jpg';
        return true;
    }

    redirectToStoryDetails(id) {
        console.log("🚀 ~ file: success-stories.component.ts ~ line 56 ~ SuccessStoriesComponent ~ redirectToStoryDetails ~ id", id)
        this.router.navigate(['/news-opportunities/success-story-details', id])
    }

}


