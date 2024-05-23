import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module'; // Importa el módulo AuthModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar ambos módulos aquí solo una vez
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Importar FormsModule aquí
    ReactiveFormsModule, // Importar ReactiveFormsModule aquí
    AuthModule // Importar AuthModule aquí
  ],
  providers: [
    provideClientHydration(),
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
