import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register-user/register-user.component';
import { RegisterComputerComponent } from './auth/register-computer/register-computer.component';
import { MenuAdminComponent } from './auth/menu-admin/menu-admin.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-computer', component: RegisterComputerComponent },
  { path: 'menu-admin', component: MenuAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
