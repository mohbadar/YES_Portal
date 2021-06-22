import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YhcComponent } from './yhc.component';
import { DiasporaComponent } from './components/diaspora/diaspora.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { YhcMembershipComponent } from './components/yhc-membership/yhc-membership.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ElectedComponent } from './components/profile/elected/elected.component';
import { AppointedComponent } from './components/profile/appointed/appointed.component';
import { HonoraryComponent } from './components/profile/honorary/honorary.component';


const routes: Routes = [
  {
    path: '',
    component: YhcComponent,
    children: [
      {
        path: 'diaspora',
        component: DiasporaComponent
      },
      {
        path: 'yhc-membership',
        component: YhcMembershipComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: 'elected',
            component: ElectedComponent
          },
          {
            path: 'appointed',
            component: AppointedComponent
          },
          {
            path: 'honorary',
            component: HonoraryComponent
          }
        ]
      }
    ]
  }
];



@NgModule({
  declarations: [YhcComponent, DiasporaComponent, YhcMembershipComponent, ProfileComponent, ElectedComponent, AppointedComponent, HonoraryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class YhcModule { }
