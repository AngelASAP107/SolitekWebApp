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
    this.router.navigate(['/user-edit']);
  }

  navigateToCreateUser() {
    this.router.navigate(['/register']);
  }

  navigateToCreateTickets() {
    this.router.navigate(['/manage-tickets-ad']);
  }
  
}
