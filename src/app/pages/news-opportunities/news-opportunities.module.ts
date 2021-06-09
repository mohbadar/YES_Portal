import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsOpportunitiesComponent } from './news-opportunities.component';
import { RouterModule, Routes } from '@angular/router';
import { SuccessStoriesComponent } from './components/success-stories/success-stories.component';
import { SharedModule } from 'src/app/shared.module';

const routes: Routes = [
    {
        path: '',
        component: NewsOpportunitiesComponent,
        children: [
            {
                path: 'success-stories',
                component: SuccessStoriesComponent
            }
        ]
    }
];


@NgModule({
    declarations: [NewsOpportunitiesComponent, SuccessStoriesComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule
    ]
})
export class NewsOpportunitiesModule { }
