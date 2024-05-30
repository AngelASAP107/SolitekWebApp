import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipoService } from '../../services/equipo.service';

@Component({
  selector: 'app-register-computer',
  templateUrl: './register-computer.component.html',
  styleUrls: ['./register-computer.component.css']
})
export class RegisterComputerComponent {
  equipoForm: FormGroup;

  constructor(private fb: FormBuilder, private equipoService: EquipoService) {
    this.equipoForm = this.fb.group({
      fecha: ['', Validators.required],
      especificaciones: ['', Validators.required],
      estado: ['', Validators.required],
      servicio: ['', Validators.required],
      observaciones: ['']
    });
  }

  onSubmit() {
    if (this.equipoForm.valid) {
      this.equipoService.addEquipo(this.equipoForm.value).subscribe(
        response => {
          console.log('Equipo agregado exitosamente', response);
        },
        error => {
          console.error('Error al agregar el equipo', error);
        }
      );
    }
  }
}
