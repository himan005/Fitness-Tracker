import { TrainingService } from './training.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  onGoingTraining: boolean = false
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.exerciseChanged.subscribe(exercise =>{
      if(exercise){
        this.onGoingTraining = true
      } else{
        this.onGoingTraining = false
      }
    })
  }

}
