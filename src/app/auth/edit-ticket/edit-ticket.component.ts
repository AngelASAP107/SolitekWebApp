import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit, OnChanges {
  @Input() ticket: Ticket | null = null;
  @Output() formClose = new EventEmitter<void>();
  ticketForm: FormGroup;
  tecnicos: any[] = [];
  clientes: any[] = [];
  equipos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService
  ) {
    this.ticketForm = this.fb.group({
      cliente: ['', Validators.required],
      equipo: ['', Validators.required],
      tecnico: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      estado: ['', Validators.required],
      prioridad: ['', Validators.required],
      tipoServicio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ticketService.getTechnicians().subscribe(data => {
      this.tecnicos = data;
    });

    this.ticketService.getClients().subscribe(data => {
      this.clientes = data;
    });

    this.ticketService.getEquipos().subscribe(data => {
      this.equipos = data;
    });

    this.patchForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ticket'] && this.ticket) {
      this.patchForm();
    }
  }

  patchForm(): void {
    if (this.ticket) {
      this.ticketForm.patchValue({
        cliente: this.ticket.cliente,
        equipo: this.ticket.equipo,
        tecnico: this.ticket.tecnico,
        fechaIngreso: this.ticket.fechaIngreso,
        estado: this.ticket.estado,
        prioridad: this.ticket.prioridad,
        tipoServicio: this.ticket.tipoServicio
      });
    }
  }

  onSubmit(): void {
    if (this.ticketForm.valid && this.ticket) {
      const updatedTicket: Ticket = {
        ...this.ticket,
        cliente: this.ticketForm.value.cliente,
        equipo: this.ticketForm.value.equipo,
        tecnico: this.ticketForm.value.tecnico,
        fechaIngreso: this.ticketForm.value.fechaIngreso,
        estado: this.ticketForm.value.estado,
        prioridad: this.ticketForm.value.prioridad,
        tipoServicio: this.ticketForm.value.tipoServicio
      };

      this.ticketService.updateTicket(this.ticket.ticket_id!, updatedTicket).subscribe(response => {
        console.log('Ticket updated:', response);
        this.formClose.emit();
      }, error => {
        console.error('Error updating ticket:', error);
      });
    }
  }

  onClose(): void {
    this.formClose.emit();
  }
}
