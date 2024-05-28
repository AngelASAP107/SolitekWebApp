import { Component } from '@angular/core';
import { TicketService, Ticket } from '../../ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-tickets-cl',
  templateUrl: './manage-tickets-cl.component.html',
  styleUrls: ['./manage-tickets-cl.component.css']
})
export class ManageTicketsClComponent {
  tickets: Ticket[] = [];
  showModal: boolean = false;
  menuVisible: boolean = false;

  constructor(private ticketService: TicketService, private router: Router) {
    this.ticketService.tickets$.subscribe(tickets => this.tickets = tickets);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  navigateToMenu() {
    this.router.navigate(['/menu-cliente']);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.menuVisible = false; // Oculta el menú después de la navegación
  }

  logout(): void {
    // Lógica para cerrar sesión
    this.menuVisible = false; // Oculta el menú después de cerrar sesión
  }
}
