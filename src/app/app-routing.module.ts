import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { BlogleftComponent } from './pages/blogleft/blogleft.component';
import { BlogrightComponent } from './pages/blogright/blogright.component';
import { BlogdetailsComponent } from './pages/blogdetails/blogdetails.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '', component: HomeComponent},
			{
				path: 'blogleft', component: BlogleftComponent},
			{
				path: 'blogright', component: BlogrightComponent},
			{
				path: 'blogdetails', component: BlogdetailsComponent},
		]
	},
	{
		path: 'template',
		loadChildren: () => import('./template/template.module').then(m => m.TemplateModule)
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
