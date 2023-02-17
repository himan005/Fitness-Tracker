import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  // @Output() trainingExit = new EventEmitter()

  progress:number=0;
  timer:any;
  showButtons:boolean = false

  constructor(private dialog: MatDialog, private trainingService:TrainingService) { }

  ngOnInit(): void {
    this.startOrResumeTraining()
  }

  startOrResumeTraining(){
    const duration = this.trainingService.getRunningExercise().duration / 100 * 1000;
    console.log(duration)
    this.timer = setInterval(() =>{
      this.progress = this.progress +  1
      if(this.progress >= 100){
         this.trainingService.exerciseCompleted()
        clearInterval(this.timer)
      }
    }, duration)

  }

  stopTraining(){
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {data:{
      progress: this.progress
    }
  })
  dialogRef.afterClosed().subscribe(result =>{
    if(result){
      // this.trainingExit.emit()
      this.trainingService.exerciseCancelled(this.progress )
    } else{
      this.startOrResumeTraining()
    }
  })
  }

  // paused(){
  //   this.showButtons = true
  //   clearInterval(this.timer)
  // }

  // continued(){
  //   this.showButtons =false
  //   this.startOrResumeTraining()
  // }
















}
