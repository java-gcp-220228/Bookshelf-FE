import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterSidebarComponent } from './renter-sidebar.component';

describe('RenterSidebarComponent', () => {
  let component: RenterSidebarComponent;
  let fixture: ComponentFixture<RenterSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenterSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenterSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
