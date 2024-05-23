import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private usersApiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  login(nombre: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { nombre, contrasena });
  }

  register(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.usersApiUrl}/register`, usuario);
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
