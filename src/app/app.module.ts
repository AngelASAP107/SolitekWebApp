import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlaceholderSelectDirective } from './auth/create-tickets/placeholder-select.directive';

@NgModule({
  declarations: [
    AppComponent,
    PlaceholderSelectDirective, // Declarar la directiva aquí
    // otros componentes y directivas
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule 
  ],
  providers: [
    provideClientHydration(),
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
