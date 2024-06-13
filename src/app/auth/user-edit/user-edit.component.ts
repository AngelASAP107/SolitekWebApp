import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  menuVisible: boolean = false;
  user: User | null = null;
  userForm: any = {};
  editing: any = {
    nombre: false,
    correo_electronico: false,
    telefono: false,
  };
  showPasswordChange: boolean = false;
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  passwordError: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.user = this.authService.getUserInfo();
    if (this.user) {
      this.userForm = { ...this.user };
    } else {
      // Si la información del usuario no está disponible, cargarla desde el backend
      this.authService.getUserProfile().subscribe(
        (user: User) => {
          this.user = user;
          this.userForm = { ...user };
          this.authService.updateUserInfo(user);
        },
        error => {
          console.error('Error al cargar la información del usuario', error);
        }
      );
    }
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.menuVisible = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleEdit(field: string): void {
    this.editing[field] = !this.editing[field];
    if (!this.editing[field]) {
      this.saveChanges(false);
    }
  }

  saveChanges(navigate: boolean): void {
    if (this.user) {
      this.authService.updateProfile(this.user.usuario_id!, this.userForm).subscribe(updatedUser => {
        this.authService.updateUserInfo(updatedUser);
        this.user = updatedUser;
        this.userForm = { ...updatedUser };
        if (navigate) {
          this.navigateToMenu();
        }
      });
    }
  }

  goToMainMenu(): void {
    this.saveChanges(true);
  }

  navigateToMenu(): void {
    if (this.user) {
      if (this.user.id_rol === 1) {
        this.router.navigate(['/menu-admin']);
      } else if (this.user.id_rol === 2) {
        this.router.navigate(['/menu-tecnico']);
      } else if (this.user.id_rol === 3) {
        this.router.navigate(['/menu-cliente']);
      } else {
        console.error('Unknown role:', this.user.id_rol);
      }
    } else {
      console.error('User information not found');
    }
  }

  togglePasswordChange(): void {
    this.showPasswordChange = !this.showPasswordChange;
  }

  changePassword(): void {
    if (this.newPassword !== this.confirmNewPassword) {
      this.passwordError = 'Las nuevas contraseñas no coinciden';
      return;
    }

    this.authService.changePassword(this.currentPassword, this.newPassword).subscribe(
      response => {
        console.log('Contraseña cambiada con éxito');
        this.showPasswordChange = false;
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
        this.passwordError = '';
      },
      error => {
        console.error('Error al cambiar la contraseña:', error);
        this.passwordError = 'Contraseña actual incorrecta';
      }
    );
  }
}
