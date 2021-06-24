import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventorsPlatformComponent } from './inventors-platform.component';
import { IdeasComponent } from './components/ideas/ideas.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { InventionsComponent } from './components/inventions/inventions.component';
import { InventorDetailsComponent } from './components/inventions/inventor-details/inventor-details.component';


const routes: Routes = [
  {
    path: '',
    component: InventorsPlatformComponent,
    children: [
      {
        path: 'ideas',
        component: IdeasComponent
      },
      {
        path: 'inventions',
        component: InventionsComponent
      },
      {
        path: 'inventor-details/:inventor_id',
        component: InventorDetailsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [InventorsPlatformComponent, IdeasComponent, InventionsComponent, InventorDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class InventorsPlatformModule { }
