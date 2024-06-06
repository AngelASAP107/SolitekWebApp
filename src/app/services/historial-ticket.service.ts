import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialTicketService {
  private apiUrl = 'http://localhost:3000/api/historial-tickets';

  constructor(private http: HttpClient) {}

  getAdvancesByTicket(ticketId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${ticketId}/avances`);
  }

  addAdvance(ticketId: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${ticketId}/avances`, formData);
  }
}
