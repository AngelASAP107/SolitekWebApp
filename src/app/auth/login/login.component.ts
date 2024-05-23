import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.nombre, this.contrasena).subscribe(
      response => {
        console.log('Login successful', response); // Añadir log para verificar la respuesta
        this.authService.saveToken(response.token);
        const role = response.role; // Suponiendo que el rol se devuelve en la respuesta
        this.redirectUser(role);
      },
      error => {
        console.error('Login failed', error); // Añadir log para verificar el error
      }
    );
  }

  redirectUser(role: number) { // Cambiar tipo de role a number
    if (role === 1) {
      this.router.navigate(['/menu-admin']);
    } else if (role === 2) {
      this.router.navigate(['/menu-tecnico']);
    } else if (role === 3) {
      this.router.navigate(['/menu-cliente']);
    } else {
      console.error('Unknown role:', role); // Añadir log para roles desconocidos
    }
  }
}
