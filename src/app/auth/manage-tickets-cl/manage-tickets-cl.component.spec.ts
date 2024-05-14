import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTicketsClComponent } from './manage-tickets-cl.component';

describe('ManageTicketsClComponent', () => {
  let component: ManageTicketsClComponent;
  let fixture: ComponentFixture<ManageTicketsClComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageTicketsClComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageTicketsClComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
