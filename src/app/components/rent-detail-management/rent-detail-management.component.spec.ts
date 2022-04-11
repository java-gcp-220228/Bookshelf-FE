import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentDetailManagementComponent } from './rent-detail-management.component';

describe('RentDetailManagementComponent', () => {
  let component: RentDetailManagementComponent;
  let fixture: ComponentFixture<RentDetailManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentDetailManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentDetailManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
