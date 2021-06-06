import { CommonModule } from "@angular/common";
import { Route } from "@angular/compiler/src/core";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared.module";
import { BlogdetailsComponent } from "./blogdetails/blogdetails.component";
import { BlogleftComponent } from "./blogleft/blogleft.component";
import { BlogrightComponent } from "./blogright/blogright.component";

const routes: Routes = [
    {
        path: 'blogleft', component: BlogleftComponent
    },
    {
        path: 'blogright', component: BlogrightComponent
    },
    {
        path: 'blogdetails/:blog-id', component: BlogdetailsComponent
    },
    {
        path: '',
        redirectTo: 'blogleft'
    }
]

@NgModule({
    declarations: [
        BlogdetailsComponent,
        BlogleftComponent,
        BlogrightComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    exports: []
})
export class eLearningModule { }