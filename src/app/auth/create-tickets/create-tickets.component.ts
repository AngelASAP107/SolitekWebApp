import { Component, EventEmitter, Output, ElementRef, Renderer2, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';

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
    });

    this.ticketService.getClients().subscribe(data => {
      this.clientes = data;
    });

    this.ticketService.getEquipos().subscribe(data => {
      this.equipos = data;
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
      this.renderer.setStyle(select, 'color', '#9e9e9e'); // Color del placeholder
    } else {
      this.renderer.setStyle(select, 'color', '#000000'); // Color del texto seleccionado
    }
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      this.ticketService.createTicket(this.ticketForm.value).subscribe(() => {
        this.formClose.emit();
      });
    }
  }

  onClose(): void {
    this.formClose.emit();
  }
}
