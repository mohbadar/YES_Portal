import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventorsPlatformComponent } from './inventors-platform.component';
import { IdeasComponent } from './components/ideas/ideas.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';


const routes: Routes = [
  {
    path: '',
    component: InventorsPlatformComponent,
    children: [
      {
        path: 'ideas',
        component: IdeasComponent
      }
    ]
  }
];

@NgModule({
  declarations: [InventorsPlatformComponent, IdeasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class InventorsPlatformModule { }
