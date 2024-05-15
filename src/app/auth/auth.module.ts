import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register-user/register-user.component';
import { RegisterComputerComponent } from './register-computer/register-computer.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { Route } from '@angular/router';
import { ManageTicketsAdComponent } from './manage-tickets-ad/manage-tickets-ad.component';
import { CreateTicketsComponent } from './create-tickets/create-tickets.component';
import { TicketsHistoryComponent } from './tickets-history/tickets-history.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { MenuClientComponent } from './menu-client/menu-client.component';
import { ManageTicketsClComponent } from './manage-tickets-cl/manage-tickets-cl.component';
import { MenuTechnicalComponent } from './menu-technical/menu-technical.component';
import { ManageTicketsTeComponent } from './manage-tickets-te/manage-tickets-te.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterComputerComponent,
    MenuAdminComponent,
    ManageTicketsAdComponent,
    CreateTicketsComponent,
    TicketsHistoryComponent,
    UserEditComponent,
    MenuClientComponent,
    ManageTicketsClComponent,
    MenuTechnicalComponent,
    ManageTicketsTeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    RegisterComputerComponent,
    MenuAdminComponent,
    MenuClientComponent
  ]
  
})
export class AuthModule { }

