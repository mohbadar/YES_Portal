import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/pages/page.service';
import { NewsOpportunitiesService } from '../../../news-opportunities.service';

@Component({
    selector: 'app-success-story-details',
    templateUrl: './success-story-details.component.html',
    styleUrls: ['./success-story-details.component.css']
})
export class SuccessStoryDetailsComponent implements OnInit {
    lang;
    loading: boolean = false;
    successStoryId;
    successStoryDetails;

    constructor(
        private route: ActivatedRoute,
        private translate: TranslateService,
        private pageService: PageService
    ) {
        this.successStoryId = this.route.snapshot.paramMap.get('story_id');
    }

    ngOnInit(): void {
        this.lang = this.translate.currentLang;
        this.getSuccessStoryDetails();

    }

    getSuccessStoryDetails() {

        this.loading = true;
        const graphQuery = `{successStory(id: "${this.successStoryId}") {id name brief description publishedAt: published_at photos { url } localizations(where: { locale: "${this.lang}" }) {id name brief description publishedAt: published_at photos { url }}}}`;
        this.pageService.getData(graphQuery).subscribe((res: any) => {
            this.loading = false;
            if (res.data.successStory.localizations.length > 0) {
                this.successStoryDetails = res.data.successStory.localizations[0];
                console.log("🚀 ~ file: success-story-details.component.ts ~ line 40 ~ SuccessStoryDetailsComponent ~ this.pageService.getData ~ this.successStoryDetails", this.successStoryDetails)
            } else {
                this.successStoryDetails = res.data.successStory;
                console.log("🚀 ~ file: success-story-details.component.ts ~ line 43 ~ SuccessStoryDetailsComponent ~ this.pageService.getData ~  this.successStoryDetails", this.successStoryDetails)
            }
            const date = new Date(this.successStoryDetails.publishedAt);
            const year = date.getFullYear();
            const month = date.toLocaleString('default', { month: 'long' });
            const day = date.getDate();
            this.successStoryDetails.createdMonth = month;
            this.successStoryDetails.createdYear = year;
            this.successStoryDetails.createdDay = day;
        });

    }

}
