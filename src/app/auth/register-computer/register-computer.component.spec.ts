import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComputerComponent } from './register-computer.component';

describe('RegisterComputerComponent', () => {
  let component: RegisterComputerComponent;
  let fixture: ComponentFixture<RegisterComputerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComputerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
