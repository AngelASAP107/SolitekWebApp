import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipoService } from '../../services/equipo.service';

@Component({
  selector: 'app-register-computer',
  templateUrl: './register-computer.component.html',
  styleUrls: ['./register-computer.component.css']
})
export class RegisterComputerComponent {
  equipoForm: FormGroup;

  constructor(private fb: FormBuilder, private equipoService: EquipoService, private router: Router) {
    this.equipoForm = this.fb.group({
      especificaciones: ['', Validators.required],
      estado_equipo: ['', Validators.required],
      servicio: ['', Validators.required],
      observaciones: ['']
    });
  }

  onSubmit() {
    if (this.equipoForm.valid) {
      this.equipoService.addEquipo(this.equipoForm.value).subscribe(
        response => {
          console.log('Equipo agregado exitosamente', response);
          this.router.navigate(['/manage-computers']); // Redirige a la página de gestión de equipos
        },
        error => {
          console.error('Error al agregar el equipo', error);
        }
      );
    }
  }
}
