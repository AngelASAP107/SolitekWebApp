import { Component, EventEmitter, Output, ElementRef, Renderer2, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-create-tickets',
  templateUrl: './create-tickets.component.html',
  styleUrls: ['./create-tickets.component.css']
})
export class CreateTicketsComponent implements AfterViewInit, OnInit {
  @Output() formClose = new EventEmitter<void>();
  ticketForm: FormGroup;
  tecnicos: any[] = [];
  clientes: any[] = [];
  equipos: any[] = [];
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private el: ElementRef,
    private renderer: Renderer2
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
      console.log('Técnicos:', this.tecnicos);
    });

    this.ticketService.getClients().subscribe(data => {
      this.clientes = data;
      console.log('Clientes:', this.clientes);
    });

    this.ticketService.getEquipos().subscribe(data => {
      this.equipos = data;
      console.log('Equipos:', this.equipos);
    });
  }

  ngAfterViewInit(): void {
    this.updateSelectColors();
  }

  updateSelectColors(): void {
    const selects = this.el.nativeElement.querySelectorAll('select');
    selects.forEach((select: HTMLSelectElement) => {
      this.updateSelectColor(select);
      this.renderer.listen(select, 'change', () => this.updateSelectColor(select));
    });
  }

  updateSelectColor(select: HTMLSelectElement): void {
    if (select.value === '') {
      this.renderer.setStyle(select, 'color', '#9e9e9e');
    } else {
      this.renderer.setStyle(select, 'color', '#000000');
    }
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      const ticket: Ticket = {
        cliente: this.ticketForm.value.cliente,
        equipo: this.ticketForm.value.equipo,
        tecnico: this.ticketForm.value.tecnico,
        fechaIngreso: this.ticketForm.value.fechaIngreso,
        estado: this.ticketForm.value.estado,
        prioridad: this.ticketForm.value.prioridad,
        tipoServicio: this.ticketForm.value.tipoServicio
      };
      console.log('Submitting ticket:', ticket);
      this.ticketService.createTicket(ticket).subscribe(response => {
        console.log('Ticket created:', response);
        this.formClose.emit();
      });
    } else {
      this.errorMessage = 'Por favor complete todos los campos.';
    }
  }

  onClose(): void {
    this.formClose.emit();
  }
}
