import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageComputersComponent } from './manage-computers.component';

describe('ManageComputersComponent', () => {
  let component: ManageComputersComponent;
  let fixture: ComponentFixture<ManageComputersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageComputersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageComputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
