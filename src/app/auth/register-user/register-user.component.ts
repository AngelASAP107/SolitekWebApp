import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackgroundService } from '../../background.service'; // Importar el servicio de fondo

@Component({
  selector: 'app-register',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterComponent {

  constructor(private router: Router, private backgroundService: BackgroundService) { }

  ngOnInit() {
    // Actualizar la imagen de fondo al inicializar el componente
    this.backgroundService.updateBackground('/assets/images/your_custom_image.png');
  }

  navigateToLogin() {
    this.router.navigate(['/login']); // Navegar a la página de login
  }
}
