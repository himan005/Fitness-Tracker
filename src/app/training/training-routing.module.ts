import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { TrainingComponent } from './training.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes =[
  {
    path:'',
    component:TrainingComponent,
    children:[
      // {
      //   path:'new-training',
      //   component: NewTrainingComponent
      // },
      // {
      //   path:'past-training',
      //   component: PastTrainingsComponent
      // },
      // {
      //   path:'current-training',
      //   component: CurrentTrainingComponent
      // },
      {
        path:'**',
        component: TrainingComponent
      }
    ]
  }
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class TrainingRoutingModule{}
