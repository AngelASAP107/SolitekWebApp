import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {
  menuVisible: boolean = false;
  user: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserInfo();
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.menuVisible = false; // Oculta el menú después de la navegación
  }

  logout(): void {
    this.authService.logout();
    this.menuVisible = false; // Oculta el menú después de cerrar sesión
    this.router.navigate(['/login']);
  }

  navigateToManageTickets() {
    this.router.navigate(['/tickets-history']);
  }

  navigateToEditUsers() {
    this.router.navigate(['/manage-users']);
  }

  navigateToManageComputers(){
    this.router.navigate(['/manage-computers']);
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
