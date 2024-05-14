import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTechnicalComponent } from './menu-technical.component';

describe('MenuTechnicalComponent', () => {
  let component: MenuTechnicalComponent;
  let fixture: ComponentFixture<MenuTechnicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuTechnicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuTechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
