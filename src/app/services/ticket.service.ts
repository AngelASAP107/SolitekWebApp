import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:3000/api/tickets';
  private userApiUrl = 'http://localhost:3000/api/users';
  private equipoApiUrl = 'http://localhost:3000/api/equipos/equipos';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  updateTicket(id: number, ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/${id}`, ticket);
  }

  completarTicket(id: number): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/${id}/completar`, {});
  }

  getTechnicians(): Observable<any[]> {
    return this.http.get<any[]>(`${this.userApiUrl}/tecnicos`);
  }

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.userApiUrl}/clientes`);
  }

  getEquipos(): Observable<any[]> {
    return this.http.get<any[]>(this.equipoApiUrl);
  }
}
