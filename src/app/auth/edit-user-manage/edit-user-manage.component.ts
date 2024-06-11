import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user-manage',
  templateUrl: './edit-user-manage.component.html',
  styleUrls: ['./edit-user-manage.component.css']
})
export class EditUserManageComponent implements OnInit {
  @Input() user: User | null = null;
  @Input() show: boolean = false;
  @Output() formClose = new EventEmitter<void>();
  userForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      correo_electronico: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      id_rol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  closeModal(): void {
    this.formClose.emit();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const { nombre } = this.userForm.value;
      const originalNombre = this.user?.nombre;

      // Solo validar si se cambió el nombre
      if (nombre !== originalNombre) {
        this.userService.checkUserExistsByName(nombre).subscribe(exists => {
          if (exists) {
            this.errorMessage = 'El nombre de usuario ya está en uso.';
          } else {
            this.updateUser();
          }
        });
      } else {
        this.updateUser();
      }
    }
  }

  private updateUser(): void {
    const updatedUser = { ...this.user, ...this.userForm.value };
    this.userService.updateUser(updatedUser.usuario_id, updatedUser).subscribe(
      () => {
        this.closeModal();
      },
      error => {
        console.error('Error updating user', error);
        this.errorMessage = 'Error al actualizar el usuario.';
      }
    );
  }
}
