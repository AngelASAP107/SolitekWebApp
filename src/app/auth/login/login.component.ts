import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Asegura que loginForm se inicialice antes de su uso
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos obligatorios.';
      return;
    }

    const { nombre, contrasena } = this.loginForm.value;

    this.authService.login(nombre, contrasena).subscribe(
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

  redirectUser(role: number): void {
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
