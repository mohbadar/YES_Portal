import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogdetailsComponent } from './components/blogdetails/blogdetails.component';
import { BlogleftComponent } from './components/blogleft/blogleft.component';
import { BlogrightComponent } from './components/blogright/blogright.component';
import { HomeComponent } from './components/home/home.component';
import { TemplateComponent } from './template.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'blogleft', component: BlogleftComponent },
            { path: 'blogright', component: BlogrightComponent },
            { path: 'blogdetails', component: BlogdetailsComponent },
        ]
    },
];

@NgModule({
    declarations: [HomeComponent,
        BlogleftComponent,
        BlogrightComponent,
        BlogdetailsComponent,
        TemplateComponent,
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ]
})
export class TemplateModule { }
