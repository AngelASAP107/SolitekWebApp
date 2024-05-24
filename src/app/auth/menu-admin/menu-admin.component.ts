import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent {
  
  constructor(private router: Router) { }

  navigateToManageTickets() {
    this.router.navigate(['/tickets-history']);
  }

  navigateToEditUsers() {
    this.router.navigate(['/manage-users']);
  }

  navigateToCreateUser() {
    this.router.navigate(['/register']);
  }

  navigateToRegisterComuter() {
    this.router.navigate(['/register-computer']);
  }

  navigateToCreateTickets() {
    this.router.navigate(['/manage-tickets-ad']);
  }
  
}
