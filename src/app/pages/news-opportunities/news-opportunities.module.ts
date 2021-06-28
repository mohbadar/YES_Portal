import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NewsOpportunitiesComponent } from './news-opportunities.component';
import { RouterModule, Routes } from '@angular/router';
import { DpDatePickerModule } from 'ng2-date-picker';
import { SuccessStoriesComponent } from './components/success-stories/success-stories.component';
import { SharedModule } from 'src/app/shared.module';
import { NewsDetailsComponent } from './components/youth-news/news-details/news-details.component';
import { SuccessStoryDetailsComponent } from './components/success-stories/success-story-details/success-story-details.component';
import { YouthNewsComponent } from './components/youth-news/youth-news.component';
import { EmploymentComponent } from './components/employment/employment.component';

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
            },
            {
                path: 'employment',
                component: EmploymentComponent
            }
        ]
    }
];


@NgModule({
    declarations: [NewsOpportunitiesComponent, SuccessStoriesComponent, NewsDetailsComponent, SuccessStoryDetailsComponent, YouthNewsComponent, EmploymentComponent],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        DpDatePickerModule,
        CommonModule,
        SharedModule
    ]
})
export class NewsOpportunitiesModule { }
