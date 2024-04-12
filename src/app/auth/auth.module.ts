import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterComputerComponent } from './register-computer/register-computer.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterUserComponent,
    RegisterComputerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RegisterUserComponent
  ]
})
export class AuthModule { }
