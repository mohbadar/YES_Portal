import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { BlogleftComponent } from './pages/e-learning/blogleft/blogleft.component';
import { BlogrightComponent } from './pages/e-learning/blogright/blogright.component';
import { BlogdetailsComponent } from './pages/e-learning/blogdetails/blogdetails.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '', component: HomeComponent
			},
			{
				path: 'e-learning',
				loadChildren: () => import('./pages/e-learning/e-learning.module').then(m => m.eLearningModule)
			}
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
