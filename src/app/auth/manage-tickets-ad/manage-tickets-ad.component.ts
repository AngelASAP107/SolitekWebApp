import { Component } from '@angular/core';
import { TicketService, Ticket } from '../../ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-tickets-ad',
  templateUrl: './manage-tickets-ad.component.html',
  styleUrls: ['./manage-tickets-ad.component.css']
})
export class ManageTicketsAdComponent {
  tickets: Ticket[] = [];
  showModal: boolean = false;

  constructor(private ticketService: TicketService, private router: Router) {
    this.ticketService.tickets$.subscribe(tickets => this.tickets = tickets);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  navigateToMenu() {
    this.router.navigate(['/menu-admin']);
  }
}
