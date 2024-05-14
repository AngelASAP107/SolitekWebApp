import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTicketsAdComponent } from './manage-tickets-ad.component';

describe('ManageTicketsAdComponent', () => {
  let component: ManageTicketsAdComponent;
  let fixture: ComponentFixture<ManageTicketsAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageTicketsAdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageTicketsAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
