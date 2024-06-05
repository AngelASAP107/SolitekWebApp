import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { HistorialTicketService } from '../../services/historial-ticket.service';
import { Router } from '@angular/router';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-manage-tickets-te',
  templateUrl: './manage-tickets-te.component.html',
  styleUrls: ['./manage-tickets-te.component.css']
})
export class ManageTicketsTeComponent implements OnInit {
  tickets: Ticket[] = [];
  showModal: boolean = false;
  menuVisible: boolean = false;
  selectedTicketId: number | null = null;
  newAdvanceMessage: string = '';

  constructor(
    private ticketService: TicketService,
    private historialTicketService: HistorialTicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTicketsByTechnician(1).subscribe(
      (tickets: Ticket[]) => {
        this.tickets = tickets;
      },
      (error: any) => {
        console.error('Error al cargar los tickets:', error);
      }
    );
  }

  openModal(ticketId: number): void {
    this.selectedTicketId = ticketId;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedTicketId = null;
    this.newAdvanceMessage = '';
  }

  addAdvance(): void {
    if (this.selectedTicketId !== null && this.newAdvanceMessage) {
      this.historialTicketService.addAdvance(this.selectedTicketId, { mensaje: this.newAdvanceMessage })
        .subscribe(() => {
          this.closeModal();
        }, (error: any) => {
          console.error('Error al agregar el avance:', error);
        });
    }
  }

  navigateToMenu(): void {
    this.router.navigate(['/menu-tecnico']);
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.menuVisible = false;
  }

  logout(): void {
    this.menuVisible = false;
  }
}
