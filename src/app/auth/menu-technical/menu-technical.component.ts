import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-technical',
  templateUrl: './menu-technical.component.html',
  styleUrls: ['./menu-technical.component.css']
})
export class MenuTechnicalComponent implements OnInit {
  menuVisible: boolean = false;
  userName: string | null = null;
  technicianId: number | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    this.userName = userInfo ? userInfo.nombre : null;
    this.technicianId = userInfo ? userInfo.usuario_id : null;
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
  }

  navigateToManageTicketsTecnico() {
      this.router.navigate(['/gestion-tecnico']);
  }
}
