import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventorsPlatformComponent } from './inventors-platform.component';
import { IdeasComponent } from './components/ideas/ideas.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { InventionsComponent } from './components/inventions/inventions.component';
import { InventorDetailsComponent } from './components/inventions/inventor-details/inventor-details.component';
import { AddInventorComponent } from './components/inventions/add-inventor/add-inventor.component';
import { PerilesionalExpertiseComponent } from './components/perilesional-expertise/perilesional-expertise.component';
import { ResearchComponent } from './components/research/research.component';
import { AddExpertiseComponent } from './components/perilesional-expertise/add-expertise/add-expertise.component';
import { ExpertiseDetailsComponent } from './components/perilesional-expertise/expertise-details/expertise-details.component';


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
      },
      {
        path: 'add-inventor',
        component: AddInventorComponent
      },
      {
        path: 'perilesional-expertise',
        component: PerilesionalExpertiseComponent
      },
      {
        path: 'add-expertise',
        component: AddExpertiseComponent
      },
      {
        path: 'expertise-details/:expertise_id',
        component: ExpertiseDetailsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [InventorsPlatformComponent, IdeasComponent, InventionsComponent, InventorDetailsComponent, AddInventorComponent, PerilesionalExpertiseComponent, ResearchComponent, AddExpertiseComponent, ExpertiseDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class InventorsPlatformModule { }
