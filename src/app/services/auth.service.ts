import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private usersApiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  login(nombre: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { nombre, contrasena }).pipe(
      tap(response => {
        if (response.token) {
          this.saveToken(response.token);
          this.saveUserInfo(response.user);
        }
      })
    );
  }

  register(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.usersApiUrl}/register`, usuario);
  }

  saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('auth_token', token);
    }
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('auth_token') : null;
  }

  saveUserInfo(user: any): void {
    if (this.isBrowser()) {
      localStorage.setItem('user_info', JSON.stringify(user));
    }
  }

  getUserInfo(): any {
    if (this.isBrowser()) {
      const userInfo = localStorage.getItem('user_info');
      return userInfo ? JSON.parse(userInfo) : null;
    }
    return null;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
