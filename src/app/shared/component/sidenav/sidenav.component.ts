import { Observable, Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @Output() closeSideNav = new EventEmitter<void>();

  isAuth:boolean = false

  unsubscribe$ = new Subject<void>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe((data) =>{
      this.isAuth= data
    }, (error) =>{
      console.log(error)
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout(){
    this.onClose()
    this.authService.logout()

  }


  onClose(){
    this.closeSideNav.emit()
  }

}
