import { NgForm } from '@angular/forms';
import { Exercise } from './../exercise';
import { TrainingService } from './../training.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  // @Output() trainingStart = new EventEmitter<void>()

  exercises:Exercise[] =[]

  constructor(public trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining(form:NgForm){
    // this.trainingStart.emit()
    console.log(form.value)
    this.trainingService.startExercise(form.value.exercise)

  }

}
