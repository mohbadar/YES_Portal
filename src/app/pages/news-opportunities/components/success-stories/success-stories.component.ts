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
    lang;
    loading: boolean = false;
    successStories: any[] = [];
    MAX_BRIEF_LENGTH = 80;


    constructor(
        private router: Router,
        private translate: TranslateService,
        private pageService: PageService
    ) { }

    ngOnInit(): void {
        this.lang = this.translate.currentLang;
        this.getSuccessStories();
    }

    getSuccessStories() {
        this.loading = true;
        const graphQuery = `{
            successStories(locale:"${this.lang}") 
            { 
              id name brief description publishedAt: published_at photos{ url }
            }
          }`;
        this.pageService.getData(graphQuery).subscribe((res: any) => {
            this.loading = false;
            this.successStories = res.data.successStories;
            console.log("🚀 ~ file: success-stories.component.ts ~ line 40 ~ SuccessStoriesComponent ~ this.pageService.getData ~ successStories", this.successStories)
            for (let success of this.successStories) {
                success.shortBrief = this.getBrief(success.brief);
            }

            this.formatDate();
            console.log("🚀 ~ file: success-stories.component.ts ~ line 30 ~ SuccessStoriesComponent ~ this.newsOpportunitiesService.getSuccessStories ~ res.data", res.data)
        });
    }

    getBrief(data) {
        if (data && data.length > this.MAX_BRIEF_LENGTH) {
            return data.substring(0, this.MAX_BRIEF_LENGTH) + '...';
        }
    }

    formatDate() {
        this.successStories.forEach(element => {
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
        el.src = '../../../../../assets/images/post-1.jpg';
        return true;
    }

    redirectToStoryDetails(id) {
        console.log("🚀 ~ file: success-stories.component.ts ~ line 56 ~ SuccessStoriesComponent ~ redirectToStoryDetails ~ id", id)
        this.router.navigate(['/news-opportunities/success-story-details', id])
    }

}


