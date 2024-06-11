import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  usuario = {
    nombre: '',
    correo_electronico: '',
    contrasena: '',
    confirmar_contrasena: '',
    telefono: '',
    id_rol: '' // Valor por defecto: Técnico
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(registerForm: NgForm): void {
    if (!registerForm.form.valid) {
      this.setFormErrors(registerForm);
      return;
    }

    if (this.usuario.contrasena !== this.usuario.confirmar_contrasena) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (this.usuario.contrasena.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    this.authService.register(this.usuario).subscribe(
      response => {
        console.log('Registro exitoso', response);
        this.router.navigate(['/manage-users']); // Redirige a la página de gestión de usuarios
      },
      error => {
        console.error('Error en el registro', error);
        if (error.message === 'El nombre de usuario ya existe.') {
          this.errorMessage = 'El nombre de usuario ya está registrado. Por favor, use uno diferente.';
        } else {
          this.errorMessage = 'Error en el registro. Por favor, inténtelo de nuevo.';
        }
      }
    );
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  private setFormErrors(registerForm: NgForm): void {
    this.errorMessage = 'Por favor, complete todos los campos obligatorios.';
  }
}
