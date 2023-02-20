import { Exercise } from './../exercise';
import { TrainingService } from './../training.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit  {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sortData!:MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;




  constructor(public trainingService: TrainingService) { }

  ngOnInit(): void {
    this.getTrainingData()
  }

  getTrainingData(){
    this.dataSource.data = this.trainingService.exerciseData()
  }

  doFilter(filterValue :string){
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  ngAfterViewInit(): void {
      this.dataSource.sort = this.sortData;
      this.dataSource.paginator = this.paginator

  }

}
