import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar ambos módulos aquí solo una vez

import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterComputerComponent } from './register-computer/register-computer.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { ManageTicketsAdComponent } from './manage-tickets-ad/manage-tickets-ad.component';
import { CreateTicketsComponent } from './create-tickets/create-tickets.component';
import { TicketsHistoryComponent } from './tickets-history/tickets-history.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MenuClientComponent } from './menu-client/menu-client.component';
import { ManageTicketsClComponent } from './manage-tickets-cl/manage-tickets-cl.component';
import { MenuTechnicalComponent } from './menu-technical/menu-technical.component';
import { ManageTicketsTeComponent } from './manage-tickets-te/manage-tickets-te.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageComputersComponent } from './manage-computers/manage-computers.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterUserComponent,
    RegisterComputerComponent,
    MenuAdminComponent,
    ManageTicketsAdComponent,
    CreateTicketsComponent,
    TicketsHistoryComponent,
    UserEditComponent,
    MenuClientComponent,
    ManageTicketsClComponent,
    MenuTechnicalComponent,
    ManageTicketsTeComponent,
    ManageUsersComponent,
    ManageComputersComponent,
    EditTicketComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, // Importar FormsModule aquí
    ReactiveFormsModule // Importar ReactiveFormsModule aquí
  ],
  exports: [
    RegisterUserComponent,
    LoginComponent,
    RegisterComputerComponent,
    MenuAdminComponent,
    MenuClientComponent,
    MenuTechnicalComponent,
    CreateTicketsComponent,
    ManageTicketsTeComponent,
    ManageTicketsClComponent,
    ManageComputersComponent,
    UserEditComponent,
  ]
})
export class AuthModule { }
