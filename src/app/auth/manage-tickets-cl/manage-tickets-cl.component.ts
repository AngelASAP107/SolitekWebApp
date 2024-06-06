import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { HistorialTicketService } from '../../services/historial-ticket.service';
import { Router } from '@angular/router';
import { Ticket } from '../../models/ticket.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-manage-tickets-cl',
  templateUrl: './manage-tickets-cl.component.html',
  styleUrls: ['./manage-tickets-cl.component.css']
})
export class ManageTicketsClComponent implements OnInit {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  advances: any[] = [];
  showModal: boolean = false;
  menuVisible: boolean = false;
  selectedTicketId: number | null = null;
  searchText: string = '';
  userName: string | null = null;
  clientId: number | null = null;

  constructor(
    private ticketService: TicketService,
    private historialTicketService: HistorialTicketService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    console.log('User info:', userInfo); // Verificar que userInfo está presente y tiene los campos necesarios
    if (userInfo) {
      this.userName = userInfo.nombre;
      this.clientId = userInfo.usuario_id;
      console.log('Client ID:', this.clientId); // Verificar que clientId tiene un valor correcto
      this.loadTickets(this.clientId!);
    } else {
      console.error('User information not found');
    }
  }

  loadTickets(clientId: number): void {
    this.ticketService.getTicketsByClient(clientId).subscribe(
      (tickets: Ticket[]) => {
        console.log('Tickets received:', tickets); // Verificar que los tickets se están recibiendo correctamente
        this.tickets = tickets;
        this.filteredTickets = tickets;
      },
      (error: any) => {
        console.error('Error al cargar los tickets:', error);
      }
    );
  }

  searchTickets(): void {
    const search = this.searchText.toLowerCase();
    this.filteredTickets = this.tickets.filter(ticket => 
      ticket.ticket_id!.toString().toLowerCase().includes(search) ||
      ticket.equipo.especificaciones.toLowerCase().includes(search) ||
      ticket.tecnico.nombre.toLowerCase().includes(search)
    );
  }

  selectTicket(ticketId: number): void {
    this.selectedTicketId = ticketId;
    this.loadAdvances(ticketId);
  }

  loadAdvances(ticketId: number): void {
    this.historialTicketService.getAdvancesByTicket(ticketId).subscribe(
      (advances: any[]) => {
        this.advances = advances;
      },
      (error: any) => {
        console.error('Error al cargar los avances:', error);
      }
    );
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  navigateToMenu(): void {
    this.router.navigate(['/menu-cliente']);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.menuVisible = false;
  }

  logout(): void {
    this.menuVisible = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
