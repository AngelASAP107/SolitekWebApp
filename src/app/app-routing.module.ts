import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { RegisterComputerComponent } from './auth/register-computer/register-computer.component';
import { MenuAdminComponent } from './auth/menu-admin/menu-admin.component';
import { MenuClientComponent } from './auth/menu-client/menu-client.component';
import { MenuTechnicalComponent } from './auth/menu-technical/menu-technical.component';
import { ManageTicketsAdComponent } from './auth/manage-tickets-ad/manage-tickets-ad.component';
import { TicketsHistoryComponent } from './auth/tickets-history/tickets-history.component';
import { UserEditComponent } from './auth/user-edit/user-edit.component';
import { ManageTicketsTeComponent } from './auth/manage-tickets-te/manage-tickets-te.component';
import { ManageTicketsClComponent } from './auth/manage-tickets-cl/manage-tickets-cl.component';
import { ManageUsersComponent } from './auth/manage-users/manage-users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'register-computer', component: RegisterComputerComponent },
  { path: 'menu-admin', component: MenuAdminComponent },
  { path: 'menu-cliente', component: MenuClientComponent },
  { path: 'menu-tecnico', component: MenuTechnicalComponent },
  { path: 'manage-tickets-ad', component: ManageTicketsAdComponent},
  { path: 'tickets-history', component: TicketsHistoryComponent},
  { path: 'user-edit', component: UserEditComponent},
  { path: 'gestion-tecnico', component: ManageTicketsTeComponent},
  { path: 'gestion-cliente', component: ManageTicketsClComponent},
  {path: 'manage-users', component: ManageUsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
