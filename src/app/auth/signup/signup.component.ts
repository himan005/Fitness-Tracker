import { AuthData } from './../../shared/models/auth-data';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate:any;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18)
  }

  onSubmit(data:NgForm){
      if(data.invalid){
        return
      }
      const signUpData:AuthData = {...data.value}
      this.authService.registerUser(signUpData)
  }

}
