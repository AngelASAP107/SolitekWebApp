import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register-user/register-user.component';
import { RegisterComputerComponent } from './register-computer/register-computer.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { Route } from '@angular/router';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterComputerComponent,
    MenuAdminComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    RegisterComputerComponent,
    MenuAdminComponent
  ]
  
})
export class AuthModule { }

