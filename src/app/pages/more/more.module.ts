import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreComponent } from './more.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogdetailsComponent } from './blogs/blogdetails/blogdetails.component';


const routes: Routes = [
  {
    path: '',
    component: MoreComponent,
    children: [
      {
        path: 'blogs', component: BlogsComponent
      },
      {
        path: 'blogdetails/:id', component: BlogdetailsComponent
      }
    ]
  }

]

@NgModule({
  declarations: [MoreComponent, BlogsComponent, BlogdetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MoreModule { }
