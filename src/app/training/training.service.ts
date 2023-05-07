import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {AngularFirestore } from '@angular/fire/compat/firestore';
import { map} from 'rxjs/operators'
import { Exercise } from './exercise';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  exercisesChanged:BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>(null!);
  exerciseChanged:BehaviorSubject<Exercise> = new BehaviorSubject<Exercise>(null!);
  finishedExercisesChanged: BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>(null!)

  private availableExercises:Exercise[] = []
  private runningExercise:any;

  constructor(private db:AngularFirestore){}

  fetchAvailableExercises(){
    return this.db.collection('availableExercises').snapshotChanges().pipe(map((docArray:any) =>{
      return docArray.map((doc:any) =>{
        return {
          id:doc.payload.doc.id,
          name:doc.payload.doc.data().name,
          duration:doc.payload.doc.data().duration,
          calories:doc.payload.doc.data().calories
        }
      })
    })).subscribe((exercises:Exercise[]) =>{
      this.availableExercises = exercises;
      this.exercisesChanged.next([...this.availableExercises])
    })
  }

  startExercise(selectId:string){
    this.runningExercise = this.availableExercises.find((exercise:Exercise) => exercise.id === selectId)
    this.exerciseChanged.next({...this.runningExercise})
  }

  getRunningExercise(){
    return {...this.runningExercise}
  }

  exerciseCompleted(){
    this.addDataToDatabase(
      {
        ...this.runningExercise,
        date: new Date(),
        state:'completed'
      })
    this.runningExercise = null;
    this.exerciseChanged.next(null!)
  }

  exerciseCancelled(progress:number){
    this.addDataToDatabase(
      {
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress /100),
        calories: this.runningExercise.calories * (progress/100),
        date: new Date(),
        state:'cancelled'
      })
    this.runningExercise = null;
    this.exerciseChanged.next(null!)
  }

  fetchFinishedExercisesData(){
    this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises:any) =>{
        this.finishedExercisesChanged.next(exercises)
    })
  }

  private addDataToDatabase(exercise: Exercise){
    this.db.collection('finishedExercises').add(exercise)
  }







 }
