import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingPackagesComponent } from './training-packages/training-packages.component';
import { MemorySportComponent } from './training-packages/components/memory-sport/memory-sport.component';
import { MotivationalVideosComponent } from './motivational-videos/motivational-videos.component';
import { ELearningComponent } from './e-learning.component';
import { SharedModule } from 'src/app/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { VideoPipe } from './video.pipe';



const routes: Routes = [
  {
    path: '',
    component: ELearningComponent,
    // children: [
    //   {
    //     path: 'training-packages',
    //     component: TrainingPackagesComponent,
    //     children: [
    //       {
    //         path: 'memory-sport',
    //         component: MemorySportComponent
    //       },
    //     ]
    //   },
    //   {
    //     path: 'motivational-videos',
    //     component: MotivationalVideosComponent
    //   }
    // ]
  }
];


@NgModule({
  declarations: [ELearningComponent, TrainingPackagesComponent, MemorySportComponent, MotivationalVideosComponent, VideoPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ELearningModule { }
