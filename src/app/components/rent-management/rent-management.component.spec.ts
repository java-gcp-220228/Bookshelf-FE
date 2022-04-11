import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentManagementComponent } from './rent-management.component';

describe('RentManagementComponent', () => {
  let component: RentManagementComponent;
  let fixture: ComponentFixture<RentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
