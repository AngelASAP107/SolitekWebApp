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

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(registerForm: NgForm): void {
    if (!registerForm.form.valid) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    if (this.usuario.contrasena !== this.usuario.confirmar_contrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.authService.register(this.usuario).subscribe(
      response => {
        console.log('Registro exitoso', response);
        this.router.navigate(['/register-computer']); // Redirige a la siguiente página de registro
      },
      error => {
        console.error('Error en el registro', error);
      }
    );
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
