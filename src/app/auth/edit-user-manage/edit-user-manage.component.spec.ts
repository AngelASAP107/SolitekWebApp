import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserManageComponent } from './edit-user-manage.component';

describe('EditUserManageComponent', () => {
  let component: EditUserManageComponent;
  let fixture: ComponentFixture<EditUserManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUserManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
