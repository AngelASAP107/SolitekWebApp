import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(loginForm: NgForm): void {
    if (!loginForm.form.valid) {
      this.errorMessage = 'Por favor, complete todos los campos obligatorios.';
      return;
    }
    
    this.authService.login(this.nombre, this.contrasena).subscribe(
      response => {
        console.log('Login successful', response);
        this.authService.saveToken(response.token);
        this.authService.saveUserInfo(response.user);
        this.redirectUser(response.user.role);
      },
      error => {
        console.error('Login failed', error);
        this.errorMessage = 'Nombre de usuario o contraseña incorrectos';
      }
    ); 
  }

  redirectUser(role: number) {
    if (role === 1) {
      this.router.navigate(['/menu-admin']);
    } else if (role === 2) {
      this.router.navigate(['/menu-tecnico']);
    } else if (role === 3) {
      this.router.navigate(['/menu-cliente']);
    } else {
      console.error('Unknown role:', role);
    }
  }
}
