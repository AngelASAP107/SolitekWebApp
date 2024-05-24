import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})

export class ManageUsersComponent {
  constructor(private router: Router) { }

  navigateToMenu() {
    this.router.navigate(['/menu-admin']);
  }

  navigateToCreateUser() {
    this.router.navigate(['/register']);
  }
}
