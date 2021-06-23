import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreComponent } from './more.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogdetailsComponent } from './blogs/blogdetails/blogdetails.component';
import { EventsComponent } from './events/events.component';
import { DeputyYouthMinistryComponent } from './deputy-youth-ministry/deputy-youth-ministry.component';
import { ActivityDetailsComponent } from './deputy-youth-ministry/activity-details/activity-details.component';


const routes: Routes = [
  {
    path: '',
    component: MoreComponent,
    children: [
      {
        path: 'deputy-ministry-of-youth-affairs', component: DeputyYouthMinistryComponent
      },
      {
        path: 'activity-details/:id', component: ActivityDetailsComponent
      },
      {
        path: 'blogs', component: BlogsComponent
      },
      {
        path: 'blogdetails/:id', component: BlogdetailsComponent
      },
      {
        path: 'events', component: EventsComponent
      }
    ]
  }

]

@NgModule({
  declarations: [MoreComponent, BlogsComponent, BlogdetailsComponent, EventsComponent, DeputyYouthMinistryComponent, ActivityDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MoreModule { }
