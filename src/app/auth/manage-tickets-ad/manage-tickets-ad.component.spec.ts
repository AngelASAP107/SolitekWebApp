import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTicketsAdComponent } from './ManageTicketsAdComponent';

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
