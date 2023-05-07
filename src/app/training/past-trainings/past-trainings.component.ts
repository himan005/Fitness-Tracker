import { takeUntil } from 'rxjs/operators';
import { Exercise } from './../exercise';
import { TrainingService } from './../training.service';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs'

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy  {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sortData!:MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  unsubscribe$ = new Subject()

  constructor(public trainingService: TrainingService) { }

  ngOnInit(): void {
    this.getTrainingData()
  }

  getTrainingData(){
    this.trainingService.fetchFinishedExercisesData()
    this.trainingService.finishedExercisesChanged.pipe(takeUntil(this.unsubscribe$)).subscribe((exercises:Exercise[]) =>{
       this.dataSource.data = exercises
       console.log(exercises)
    })

  }

  doFilter(filterValue :string){
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  ngAfterViewInit(): void {
      this.dataSource.sort = this.sortData;
      this.dataSource.paginator = this.paginator

  }

  ngOnDestroy(): void {
      this.unsubscribe$.next(null)
      this.unsubscribe$.complete()
  }



}
