import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { SharedModule } from "src/app/shared.module";
import { BlogdetailsComponent } from "./blogs/blogdetails/blogdetails.component";
import { BlogleftComponent } from "./blogleft/blogleft.component";
import { BlogrightComponent } from "./blogright/blogright.component";
import { BlogsComponent } from './blogs/blogs.component';

const routes: Routes = [
    {
        path: 'blogs', component: BlogsComponent
    },
    {
        path: 'blogdetails/:id', component: BlogdetailsComponent
    },
    {
        path: 'blogright', component: BlogrightComponent
    }
]

@NgModule({
    declarations: [
        BlogdetailsComponent,
        BlogleftComponent,
        BlogrightComponent,
        BlogsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    exports: []
})
export class eLearningModule { }