import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTicketsTeComponent } from './manage-tickets-te.component';

describe('ManageTicketsTeComponent', () => {
  let component: ManageTicketsTeComponent;
  let fixture: ComponentFixture<ManageTicketsTeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageTicketsTeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageTicketsTeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
