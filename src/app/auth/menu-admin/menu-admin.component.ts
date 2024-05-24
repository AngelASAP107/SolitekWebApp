import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent {
  menuVisible: boolean = false;
  
  constructor(private router: Router) { }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.menuVisible = false; // Oculta el menú después de la navegación
  }

  logout(): void {
    // Lógica para cerrar sesión
    this.menuVisible = false; // Oculta el menú después de cerrar sesión
  }

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
