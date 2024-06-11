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
  formErrors: string[] = [];
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private equipoService: EquipoService, private router: Router) {
    this.equipoForm = this.fb.group({
      especificaciones: ['', Validators.required],
      estado_equipo: ['', Validators.required],
      servicio: ['', Validators.required],
      observaciones: ['', Validators.required]
    });
  }

  onSubmit() {
    this.formErrors = [];

    if (this.equipoForm.valid) {
      this.equipoService.addEquipo(this.equipoForm.value).subscribe(
        response => {
          console.log('Equipo agregado exitosamente', response);
          this.router.navigate(['/manage-computers']); // Redirige a la página de gestión de equipos
        },
        error => {
          console.error('Error al agregar el equipo', error);
          if (error.error && error.error.error) {
            this.errorMessage = error.error.error;
          } else {
            this.errorMessage = 'Hubo un problema al agregar el equipo.';
          }
        }
      );
    } else {
      this.markAllFieldsAsTouched();
      this.setFormErrors();
    }
  }

  markAllFieldsAsTouched() {
    Object.values(this.equipoForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  setFormErrors() {
    Object.keys(this.equipoForm.controls).forEach(key => {
      const controlErrors = this.equipoForm.controls[key].errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(errorKey => {
          this.formErrors.push(this.getErrorMessage(key, errorKey));
        });
      }
    });
  }

  getErrorMessage(controlName: string, errorKey: string): string {
    const errorMessages: { [key: string]: { [key: string]: string } } = {
      especificaciones: {
        required: 'Especificaciones son requeridas.'
      },
      estado_equipo: {
        required: 'Estado del equipo es requerido.'
      },
      servicio: {
        required: 'Servicio es requerido.'
      },
      observaciones: {
        required: 'Observaciones son requeridas.'
      }
    };
    return errorMessages[controlName][errorKey];
  }
}
