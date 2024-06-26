import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipoService } from '../../services/equipo.service';
import { Equipo } from '../../models/equipo.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-manage-computers',
  templateUrl: './manage-computers.component.html',
  styleUrls: ['./manage-computers.component.css']
})
export class ManageComputersComponent implements OnInit {
  equipos: Equipo[] = [];
  filteredEquipos: Equipo[] = [];
  searchText: string = '';
  showEditModal: boolean = false;
  selectedEquipo: Equipo | null = null;
  userName: string | null = '';
  menuVisible: boolean = false;

  constructor(
    private equipoService: EquipoService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadEquipos();
    this.userName = this.authService.getUserInfo()?.nombre || '';
  }

  loadEquipos(): void {
    this.equipoService.getEquipos().subscribe(data => {
      this.equipos = data;
      this.filteredEquipos = data;
    });
  }

  searchEquipos(): void {
    const searchQuery = this.searchText.trim().toLowerCase();
    if (searchQuery === '') {
      this.filteredEquipos = this.equipos;
    } else {
      this.filteredEquipos = this.equipos.filter(equipo =>
        equipo.id_equipo!.toString().includes(searchQuery)
      );
    }
  }

  editEquipo(equipo: Equipo): void {
    this.selectedEquipo = equipo;
    this.showEditModal = true;
  }

  deleteEquipo(id: number): void {
    this.equipoService.deleteEquipo(id).subscribe(() => {
      this.loadEquipos();
    });
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.loadEquipos();
  }

  navigateToRegister(): void {
    this.router.navigate(['/register-computer']);
  }

  navigateToMenu(): void {
    this.router.navigate(['/menu-admin']);
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  navigateToUserProfile(): void {
    if (this.authService.getUserInfo()) {
      this.router.navigate(['/user-edit', this.authService.getUserInfo().usuario_id]);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
