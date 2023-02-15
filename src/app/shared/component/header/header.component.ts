import { Observable, Subject, pipe } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$!:Observable<any> ;

  unsubscribe$ = new Subject<void>();

  isAuth:boolean= false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe((data) =>{
      this.isAuth = data
    }, (error) =>{
      console.log(error)
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout(){
    this.authService.logout()
  }



  toggleMenu(){
    this.sidenavToggle.emit()
  }



}
