import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-computers',
  templateUrl: './manage-computers.component.html',
  styleUrls: ['./manage-computers.component.css']  // corregido styleUrl a styleUrls
})
export class ManageComputersComponent {
  constructor(private router: Router) { }

  navigateToMenu() {
    this.router.navigate(['/menu-admin']);
  }

  navigateToCreateUser() {
    this.router.navigate(['/register-computer']);
  }
}
