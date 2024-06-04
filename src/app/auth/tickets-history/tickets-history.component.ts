import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-tickets-history',
  templateUrl: './tickets-history.component.html',
  styleUrls: ['./tickets-history.component.css']
})
export class TicketsHistoryComponent implements OnInit {
  tickets: any[] = [];
  filteredTickets: any[] = [];
  searchText: string = '';

  constructor(private ticketService: TicketService, private router: Router) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets().subscribe((data: any[]) => {
      this.tickets = data;
      this.filteredTickets = data; // Inicializar filteredTickets con todos los tickets
    });
  }

  searchTickets(): void {
    const searchQuery = this.searchText.trim().toLowerCase();
    if (searchQuery === '') {
      this.filteredTickets = this.tickets;
    } else {
      this.filteredTickets = this.tickets.filter(ticket =>
        ticket.ticket_id.toString().includes(searchQuery)
      );
    }
  }

  navigateToMenu(): void {
    this.router.navigate(['/menu-admin']);
  }

  exportPDF(ticket: any): void {
    // Implementa la lógica para exportar el ticket a PDF
  }
}
