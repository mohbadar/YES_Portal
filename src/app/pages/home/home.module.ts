import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ComplainsComponent } from './complains/complains.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'about-us', component: AboutUsComponent
  },
  {
    path: 'contact-us', component: ContactUsComponent
  },
  {
    path: 'complains', component: ComplainsComponent
  }
]



@NgModule({
  declarations: [AboutUsComponent, ContactUsComponent, ComplainsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class HomeModule { }
