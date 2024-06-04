import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipoService } from '../../services/equipo.service';
import { Equipo } from '../../models/equipo.model';

@Component({
  selector: 'app-edit-equipo',
  templateUrl: './edit-equipo.component.html',
  styleUrls: ['./edit-equipo.component.css']
})
export class EditEquipoComponent implements OnInit {
  @Input() equipo: Equipo | null = null;
  @Output() formClose = new EventEmitter<void>();

  equipoForm: FormGroup;

  constructor(private fb: FormBuilder, private equipoService: EquipoService) {
    this.equipoForm = this.fb.group({
      especificaciones: ['', Validators.required],
      estado_equipo: ['', Validators.required],
      servicio: ['', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    if (this.equipo) {
      this.equipoForm.patchValue(this.equipo);
    }
  }

  onSubmit(): void {
    if (this.equipoForm.valid && this.equipo) {
      this.equipoService.updateEquipo(this.equipo.id_equipo!, this.equipoForm.value).subscribe(() => {
        this.formClose.emit();
      });
    }
  }

  closeModal(): void {
    this.formClose.emit();
  }
}
