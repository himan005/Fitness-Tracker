import { AuthService } from './../services/auth.service';
import { AuthData } from './../../shared/models/auth-data';
import { NgForm, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  formErrors ={
    email:'',
    password:''
  }

  loginFormErrorMessage ={
    email:{
      required:'Email is required',
      pattern:'Email must be in correct format'
    },
    password:{
      required:'Password is required',
      minlength:'Password must be of least 6 Character'
    }
  }

  constructor(private fb:FormBuilder, private authService:AuthService) { }

  ngOnInit(): void {
    this.loadForm()
  }

  loadForm():void{
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password:['', [Validators.required, Validators.minLength(6)]]
    })
    this.loginForm.valueChanges.subscribe(data =>{
      this.onValueChanges()
    })
    this.onValueChanges()
  }

  onValueChanges(): void{
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        (this.formErrors as any)[field] = '';
        const control = form.get(field);
        if (control && (control.dirty || control.touched) && !control.valid) {
          const messages = (this.loginFormErrorMessage as any)[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              (this.formErrors as any)[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  login(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
      this.onValueChanges()
      return
    }
    const loginData: AuthData = {...this.loginForm.value}
    this.authService.login(loginData)
  }

}
