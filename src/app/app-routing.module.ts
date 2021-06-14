import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'e-learning',
                loadChildren: () => import('./pages/e-learning/e-learning.module').then(m => m.eLearningModule)
            },
            {
                path: 'news-opportunities',
                loadChildren: () => import('./pages/news-opportunities/news-opportunities.module').then(m => m.NewsOpportunitiesModule)
            },
            {
                path: 'yhc',
                loadChildren: () => import('./pages/yhc/yhc.module').then(m => m.YhcModule)
            },
            {
                path: 'more',
                loadChildren: () => import('./pages/more/more.module').then(m => m.MoreModule)
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
