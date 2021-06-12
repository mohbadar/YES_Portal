import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsOpportunitiesComponent } from './news-opportunities.component';
import { RouterModule, Routes } from '@angular/router';
import { SuccessStoriesComponent } from './components/success-stories/success-stories.component';
import { SharedModule } from 'src/app/shared.module';
import { NewsDetailsComponent } from './components/youth-news/news-details/news-details.component';
import { SuccessStoryDetailsComponent } from './components/success-stories/success-story-details/success-story-details.component';
import { YouthNewsComponent } from './components/youth-news/youth-news.component';

const routes: Routes = [
    {
        path: '',
        component: NewsOpportunitiesComponent,
        children: [
            {
                path: 'success-stories',
                component: SuccessStoriesComponent
            }, {
                path: 'success-story-details/:story_id',
                component: SuccessStoryDetailsComponent
            },
            {
                path: 'youth-news',
                component: YouthNewsComponent
            },
            {
                path: 'news-details/:id',
                component: NewsDetailsComponent
            }
        ]
    }
];


@NgModule({
    declarations: [NewsOpportunitiesComponent, SuccessStoriesComponent, NewsDetailsComponent, SuccessStoryDetailsComponent, YouthNewsComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule
    ]
})
export class NewsOpportunitiesModule { }
