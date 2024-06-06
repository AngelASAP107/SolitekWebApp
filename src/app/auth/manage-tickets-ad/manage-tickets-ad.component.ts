import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-manage-tickets-ad',
  templateUrl: './manage-tickets-ad.component.html',
  styleUrls: ['./manage-tickets-ad.component.css']
})
export class ManageTicketsAdComponent implements OnInit {
  tickets: any[] = [];
  filteredTickets: any[] = [];
  showModal: boolean = false;
  showEditModal: boolean = false;
  menuVisible: boolean = false;
  selectedTicket: Ticket | null = null;
  searchText: string = '';
  userName: string | null = '';

  constructor(
    private ticketService: TicketService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTickets();
    this.userName = this.authService.getUserInfo()?.nombre || ''; // Obtiene el nombre del usuario
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

  updateTicket(ticket: any): void {
    if (ticket.ticket_id) {
      this.ticketService.updateTicket(ticket.ticket_id, ticket).subscribe(() => {
        this.loadTickets();
      });
    }
  }

  editTicket(ticket: Ticket): void {
    this.selectedTicket = ticket;
    this.showEditModal = true;
  }

  completarTicket(id: number): void {
    this.ticketService.completarTicket(id).subscribe(response => {
      console.log('Ticket completed:', response);
      this.loadTickets(); // Recargar la lista de tickets después de finalizar
    }, error => {
      console.error('Error finalizing ticket:', error);
    });
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.menuVisible = false; // Oculta el menú después de la navegación
  }

  logout(): void {
    this.authService.logout(); // Lógica para cerrar sesión
    this.router.navigate(['/login']); // Redirigir al login después de cerrar sesión
  }

  openModal(): void {
    this.selectedTicket = null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.loadTickets(); // Asegura que los tickets se recarguen al cerrar el modal
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.loadTickets(); // Recargar los tickets después de cerrar el modal de edición
  }

  navigateToMenu(): void {
    this.router.navigate(['/menu-admin']);
  }
}
