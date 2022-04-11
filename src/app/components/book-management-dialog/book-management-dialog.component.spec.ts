import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookManagementDialogComponent } from './book-management-dialog.component';

describe('BookManagementDialogComponent', () => {
  let component: BookManagementDialogComponent;
  let fixture: ComponentFixture<BookManagementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookManagementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookManagementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
