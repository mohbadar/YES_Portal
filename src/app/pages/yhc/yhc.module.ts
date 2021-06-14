import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YhcComponent } from './yhc.component';
import { DiasporaComponent } from './components/diaspora/diaspora.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';


const routes: Routes = [
  {
    path: '',
    component: YhcComponent,
    children: [
      {
        path: 'diaspora',
        component: DiasporaComponent
      }
    ]
  }
];



@NgModule({
  declarations: [YhcComponent, DiasporaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class YhcModule { }
