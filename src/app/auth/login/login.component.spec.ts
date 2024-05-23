import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [ AuthService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login on form submit', () => {
    const loginSpy = spyOn(authService, 'login').and.callThrough();
    component.nombre = 'testuser';
    component.contrasena = 'password';
    component.onSubmit();
    expect(loginSpy).toHaveBeenCalled();
  });

  it('should redirect to appropriate route based on user role', () => {
    spyOn(authService, 'login').and.returnValue(of({
      token: 'fake-token',
      role: 'Administrador'
    }));
    const routerSpy = spyOn(component['router'], 'navigate');
    component.nombre = 'admin';
    component.contrasena = 'adminpass';
    component.onSubmit();
    expect(routerSpy).toHaveBeenCalledWith(['/menu-admin']);
  });
});
