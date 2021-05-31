import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BlogleftComponent } from './components/blogleft/blogleft.component';
import { BlogrightComponent } from './components/blogright/blogright.component';
import { BlogdetailsComponent } from './components/blogdetails/blogdetails.component';

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'blogleft', component: BlogleftComponent},
  {path: 'blogright', component: BlogrightComponent},
  {path: 'blogdetails', component: BlogdetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
