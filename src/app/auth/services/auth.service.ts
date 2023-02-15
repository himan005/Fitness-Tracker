import { AuthData } from './../../shared/models/auth-data';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import {Subject, BehaviorSubject} from 'rxjs'
import {Router} from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  private user!:User | null;

  constructor(private router:Router){}

  registerUser(authData: AuthData){
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 100000).toString()
    }
    this.successfullyAuth()
  }

  login(authData:AuthData){
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
    this.successfullyAuth()
  }

  logout(){
    this.user = null
    this.isAuthenticated.next(false)
    this.router.navigate(['/auth/login'])
  }

  getUser(){
    return {...this.user}
  }

  isAuth(){
    return this.user != null
  }

  successfullyAuth(){
    this.isAuthenticated.next(true)
    this.router.navigate(['/training'])
  }








}
