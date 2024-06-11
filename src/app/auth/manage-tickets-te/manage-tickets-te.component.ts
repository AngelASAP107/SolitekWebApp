import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { HistorialTicketService } from '../../services/historial-ticket.service';
import { Router } from '@angular/router';
import { Ticket } from '../../models/ticket.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-manage-tickets-te',
  templateUrl: './manage-tickets-te.component.html',
  styleUrls: ['./manage-tickets-te.component.css']
})
export class ManageTicketsTeComponent implements OnInit {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  advances: any[] = [];
  showModal: boolean = false;
  menuVisible: boolean = false;
  selectedTicketId: number | null = null;
  newAdvanceMessage: string = '';
  selectedFile: File | null = null;
  searchText: string = '';
  filterHigh: boolean = false;
  filterMedium: boolean = false;
  filterLow: boolean = false;
  userName: string | null = null;
  technicianId: number | null = null;
  errorMessage: string = '';
  charCount: number = 0;

  constructor(
    private ticketService: TicketService,
    private historialTicketService: HistorialTicketService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo();
    this.userName = userInfo ? userInfo.nombre : null;
    this.technicianId = userInfo ? userInfo.usuario_id : null;
    if (this.technicianId) {
      this.loadTickets(this.technicianId);
    }
  }

  loadTickets(technicianId: number): void {
    this.ticketService.getTicketsByTechnician(technicianId).subscribe(
      (tickets: Ticket[]) => {
        this.tickets = tickets;
        this.filteredTickets = tickets;
      },
      (error: any) => {
        console.error('Error al cargar los tickets:', error);
      }
    );
  }

  searchTickets(): void {
    this.filterTickets();
  }

  filterTickets(): void {
    let filtered = this.tickets;

    if (this.searchText) {
      filtered = filtered.filter(ticket => 
        ticket.ticket_id!.toString().includes(this.searchText)
      );
    }

    if (this.filterHigh || this.filterMedium || this.filterLow) {
      filtered = filtered.filter(ticket => {
        if (this.filterHigh && ticket.prioridad === 'alta') return true;
        if (this.filterMedium && ticket.prioridad === 'media') return true;
        if (this.filterLow && ticket.prioridad === 'baja') return true;
        return false;
      });
    }

    this.filteredTickets = filtered;
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

  openModal(ticketId: number): void {
    this.selectedTicketId = ticketId;
    this.showModal = true;
    this.resetForm();
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.newAdvanceMessage = '';
    this.selectedFile = null;
    this.errorMessage = '';
    this.charCount = 0;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (file && allowedExtensions.exec(file.name)) {
      this.selectedFile = file;
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Solo se permiten archivos JPG y PNG.';
      this.selectedFile = null;
    }
  }

  countCharacters(): void {
    this.charCount = this.newAdvanceMessage.length;
    if (this.charCount > 500) {
      this.errorMessage = 'El mensaje no puede exceder los 500 caracteres.';
    } else {
      this.errorMessage = '';
    }
  }

  addAdvance(): void {
    if (!this.newAdvanceMessage.trim()) {
      this.errorMessage = 'Debe escribir un mensaje de avance.';
      return;
    }

    if (this.charCount > 500) {
      this.errorMessage = 'El mensaje no puede exceder los 500 caracteres.';
      return;
    }

    if (this.selectedTicketId !== null && this.newAdvanceMessage) {
      const formData = new FormData();
      formData.append('mensaje', this.newAdvanceMessage);
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      this.historialTicketService.addAdvance(this.selectedTicketId, formData).subscribe(
        () => {
          this.loadAdvances(this.selectedTicketId!);
          this.closeModal(); // Cierra el modal después de agregar el avance
        },
        (error: any) => {
          console.error('Error al agregar el avance:', error);
          this.errorMessage = 'Error al agregar el avance.';
        }
      );
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
