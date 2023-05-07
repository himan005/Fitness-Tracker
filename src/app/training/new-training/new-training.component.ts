import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Observable} from 'rxjs'
import { map} from 'rxjs/operators'
import { NgForm } from '@angular/forms';
import { Exercise } from './../exercise';
import { TrainingService } from './../training.service';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  public exercises:Exercise[] = []

  constructor(public trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingService.fetchAvailableExercises()
    this.trainingService.exercisesChanged.subscribe(exercises =>{
      this.exercises = exercises
      console.log(this.exercises)
    })

  }

  onStartTraining(form:NgForm){
    // this.trainingStart.emit()
    console.log(form.value)
    this.trainingService.startExercise(form.value.exercise)

  }

}
