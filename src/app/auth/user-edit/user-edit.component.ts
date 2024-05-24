import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
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
}
