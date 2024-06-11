import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tickets-history',
  templateUrl: './tickets-history.component.html',
  styleUrls: ['./tickets-history.component.css']
})
export class TicketsHistoryComponent implements OnInit {
  tickets: any[] = [];
  filteredTickets: any[] = [];
  searchText: string = '';
  userName: string | null = '';
  menuVisible: boolean = false;

  constructor(
    private ticketService: TicketService, 
    private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.loadTickets();
    this.userName = this.authService.getUserInfo()?.nombre || '';
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

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  navigateToUserProfile(): void {
    if (this.authService.getUserInfo()) {
      this.router.navigate(['/user-edit', this.authService.getUserInfo().usuario_id]);
    }
    this.menuVisible = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.menuVisible = false;
  }
}
