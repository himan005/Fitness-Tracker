import { AuthData } from './../../shared/models/auth-data';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  public isAccess:boolean = false


  constructor(private router:Router, private afAuth:AngularFireAuth){}

  registerUser(authData: AuthData){
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 100000).toString()
    // }
    // this.successfullyAuth()
    this.afAuth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then((result) =>{
      this.successfullyAuth()
    })
    .catch((error) =>{
      console.log(error)
    })
  }

  login(authData:AuthData){
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // }
    this.afAuth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then((result) =>{
      this.isAccess = true
      this.successfullyAuth()
    })
    .catch((error) =>{
      console.log(error)
    })
  }

  logout(){
    // this.user = null
    this.isAccess = false
    this.isAuthenticated.next(false)
    this.router.navigate(['/auth/login'])
  }

  // getUser(){
  //   return {...this.user}
  // }

  isAuth(){
    return this.isAccess
  }

  successfullyAuth(){
    this.isAccess = true
    this.isAuthenticated.next(true)
    this.router.navigate(['/training'])
  }








}
