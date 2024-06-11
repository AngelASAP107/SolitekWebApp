import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';
  menuVisible: boolean = false;
  filterRoles = { admin: false, tech: false, user: false };
  userName: string | null = '';
  showEditModal: boolean = false;
  selectedUser: User | null = null;

  constructor(
    private userService: UserService, 
    private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.userName = this.authService.getUserInfo()?.nombre || '';
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  searchUsers(): void {
    this.applyFilters();
  }

  filterUsers(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    const searchQuery = this.searchText.trim().toLowerCase();
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = !searchQuery || 
        user.nombre.toLowerCase().includes(searchQuery) ||
        user.usuario_id!.toString().includes(searchQuery) ||
        user.correo_electronico.toLowerCase().includes(searchQuery);

      const matchesRole = 
        (this.filterRoles.admin && user.id_rol === 1) ||
        (this.filterRoles.tech && user.id_rol === 2) ||
        (this.filterRoles.user && user.id_rol === 3) ||
        (!this.filterRoles.admin && !this.filterRoles.tech && !this.filterRoles.user);

      return matchesSearch && matchesRole;
    });
  }

  editUser(user: User): void {
    this.selectedUser = user;
    this.showEditModal = true;
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.menuVisible = false;
  }

  navigateToMenu(): void {
    this.router.navigate(['/menu-admin']);
  }

  navigateToUserProfile(): void {
    if (this.authService.getUserInfo()) {
      this.router.navigate(['/user-edit', this.authService.getUserInfo().usuario_id]);
    }
  }

  logout(): void {
    this.authService.logout();
    this.menuVisible = false;
    this.router.navigate(['/login']);
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.loadUsers();
  }
}
