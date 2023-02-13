import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth.component';
import {Routes, RouterModule } from '@angular/router';
import { NgModule} from '@angular/core';

const routes: Routes = [
  {
    path:'',
    component: AuthComponent,
    children:[
      {
        path:'',
        component:LoginComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'signup',
        component:SignupComponent
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class AuthRoutingModule{}
