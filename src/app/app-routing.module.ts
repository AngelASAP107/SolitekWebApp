// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './auth/inicio/inicio.component';
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
import { ManageComputersComponent } from './auth/manage-computers/manage-computers.component';
import { EditEquipoComponent } from './auth/edit-equipo/edit-equipo.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'menu-admin', component: MenuAdminComponent, canActivate: [AuthGuard] },
  { path: 'menu-cliente', component: MenuClientComponent, canActivate: [AuthGuard] },
  { path: 'menu-tecnico', component: MenuTechnicalComponent, canActivate: [AuthGuard] },
  { path: 'manage-tickets-ad', component: ManageTicketsAdComponent, canActivate: [AuthGuard] },
  { path: 'tickets-history', component: TicketsHistoryComponent, canActivate: [AuthGuard] },
  { path: 'user-edit/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'gestion-tecnico', component: ManageTicketsTeComponent, canActivate: [AuthGuard] },
  { path: 'gestion-cliente', component: ManageTicketsClComponent, canActivate: [AuthGuard] },
  { path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthGuard] },
  { path: 'manage-computers', component: ManageComputersComponent, canActivate: [AuthGuard] },
  { path: 'register-computer', component: RegisterComputerComponent, canActivate: [AuthGuard] },
  { path: 'edit-equipo', component: EditEquipoComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
