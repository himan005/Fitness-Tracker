import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Exercise } from './exercise';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  exerciseChanged:BehaviorSubject<Exercise> = new BehaviorSubject<Exercise>(null!);

   private availableExercises: Exercise[] = [
    {id:'crunches', name:'Crunches', duration:30, calories:8},
    {id:'toes-touch', name:'Toe Touch', duration:180, calories:90},
    {id:'side-lunges', name:'Side Lunges', duration:120, calories:130},
    {id:'burpees', name:'Burpees', duration:60, calories:8},
  ]

  private runningExercise!:any;
  private exercises:any = [];



  getAvailableExercises(){
    return this.availableExercises.slice()
  }

  startExercise(selectId:string){
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectId)
    console.log("select Exercises", this.runningExercise)
    this.exerciseChanged.next({...this.runningExercise})
  }

  getRunningExercise(){
    return {...this.runningExercise}
  }

  exerciseCompleted(){
    this.exercises.push(
      {
        ...this.runningExercise,
        date: new Date(),
        state:'completed'
      })
    this.runningExercise = null;
    this.exerciseChanged.next(null!)
  }

  exerciseCancelled(progress:number){
    this.exercises.push(
      {
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress /100),
        calories: this.runningExercise.duration * (progress/100),
        date: new Date(),
        state:'cancelled'
      })
    this.runningExercise = null;
    this.exerciseChanged.next(null!)
  }


 }
