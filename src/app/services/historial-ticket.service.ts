import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialTicketService {
  private apiUrl = 'http://localhost:3000/api/historial-tickets';

  constructor(private http: HttpClient) {}

  addAdvance(ticketId: number, avance: { mensaje: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ticketId}/avances`, avance);
  }

  getAdvances(ticketId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${ticketId}/avances`);
  }
}
