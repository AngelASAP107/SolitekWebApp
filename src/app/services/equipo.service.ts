import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private apiUrl = 'http://localhost:3000/api/equipos'; // Asegúrate de que esta URL es correcta

  constructor(private http: HttpClient) {}

  addEquipo(equipo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, equipo);
  }
}
