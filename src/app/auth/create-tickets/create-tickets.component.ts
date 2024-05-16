// src/app/create-tickets/create-tickets.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService, Ticket } from '../../ticket.service';

@Component({
  selector: 'app-create-tickets',
  templateUrl: './create-tickets.component.html',
  styleUrls: ['./create-tickets.component.css']
})
export class CreateTicketsComponent {
  @Output() formClose = new EventEmitter<void>();
  ticketForm: FormGroup;

  constructor(private fb: FormBuilder, private ticketService: TicketService) {
    this.ticketForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      documento: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      telefono: ['', Validators.required],
      numeroOrden: ['', Validators.required],
      servicio: ['', Validators.required],
      estadoEquipo: ['', Validators.required],
      especificaciones: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      this.ticketService.addTicket(this.ticketForm.value as Ticket);
      this.formClose.emit();
    }
  }

  onClose() {
    this.formClose.emit();
  }
}
