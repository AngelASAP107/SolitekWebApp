import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-user-manage',
  templateUrl: './edit-user-manage.component.html',
  styleUrls: ['./edit-user-manage.component.css']
})
export class EditUserManageComponent implements OnInit, OnChanges {
  @Input() user: User | null = null;
  @Input() show: boolean = false;
  @Output() formClose = new EventEmitter<void>();
  userForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private authService: AuthService // Inyectar AuthService
  ) {
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      correo_electronico: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      id_rol: ['', Validators.required],
      contrasena: [''] // Campo de contraseña opcional
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.userForm.patchValue(this.user);
      // Limpiar el campo de contraseña al abrir el modal
      this.userForm.get('contrasena')?.setValue('');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.userForm.patchValue(this.user);
      // Limpiar el campo de contraseña al abrir el modal
      this.userForm.get('contrasena')?.setValue('');
    }
  }

  closeModal(): void {
    this.formClose.emit();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser = { ...this.user, ...this.userForm.value };

      // Verificar si se proporcionó una nueva contraseña
      if (!updatedUser.contrasena) {
        delete updatedUser.contrasena; // Eliminar el campo de contraseña si está vacío
      }

      this.userService.updateUser(updatedUser.usuario_id!, updatedUser).subscribe(
        updatedUser => {
          this.formClose.emit();
        },
        error => {
          console.error('Error updating user', error);
          this.errorMessage = 'Error al actualizar el usuario.';
        }
      );
    }
  }
}
