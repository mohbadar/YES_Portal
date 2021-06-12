import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared.module';
import { AboutUsComponent } from './about-us/about-us.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'about-us', component: AboutUsComponent
  }
]



@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class HomeModule { }
