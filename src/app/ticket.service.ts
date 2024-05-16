// src/app/ticket.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Ticket {
  nombres: string;
  apellidos: string;
  documento: string;
  fechaIngreso: Date;
  telefono: string;
  numeroOrden: string;
  servicio: string;
  estadoEquipo: string;
  especificaciones: string;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketsSubject = new BehaviorSubject<Ticket[]>([]);
  tickets$ = this.ticketsSubject.asObservable();

  constructor() { }

  getTickets() {
    return this.ticketsSubject.value;
  }

  addTicket(ticket: Ticket) {
    const currentTickets = this.getTickets();
    this.ticketsSubject.next([...currentTickets, ticket]);
  }

  updateTicket(index: number, ticket: Ticket) {
    const currentTickets = this.getTickets();
    currentTickets[index] = ticket;
    this.ticketsSubject.next([...currentTickets]);
  }

  deleteTicket(index: number) {
    const currentTickets = this.getTickets();
    currentTickets.splice(index, 1);
    this.ticketsSubject.next([...currentTickets]);
  }
}
