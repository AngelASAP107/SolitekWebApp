import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-client',
  templateUrl: './menu-client.component.html',
  styleUrls: ['./menu-client.component.css']
})
export class MenuClientComponent implements OnInit {
  menuVisible: boolean = false;
  userName: string | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    this.userName = userInfo ? userInfo.nombre : null;
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
    this.router.navigate(['/login']);
    this.menuVisible = false; // Oculta el menú después de cerrar sesión
  }

  navigateToManageTicketsClient() {
    this.router.navigate(['/gestion-cliente']);
  }
}
