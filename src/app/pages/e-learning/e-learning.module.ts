import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared.module";
import { BlogleftComponent } from "./blogleft/blogleft.component";
import { BlogrightComponent } from "./blogright/blogright.component";

const routes: Routes = [
    {
        path: 'blogright', component: BlogrightComponent
    }
]

@NgModule({
    declarations: [
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