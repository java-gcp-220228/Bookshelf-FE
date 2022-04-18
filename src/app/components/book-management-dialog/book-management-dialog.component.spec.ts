import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { BookManagementDialogComponent } from './book-management-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


describe('BookManagementDialogComponent', () => {
  let component: BookManagementDialogComponent;
  let fixture: ComponentFixture<BookManagementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [FormBuilder, BookService, UserService],
      imports: [MatDialogModule, MatSnackBarModule, HttpClientTestingModule, MAT_DIALOG_DATA, MatDialogRef],
      declarations: [ BookManagementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookManagementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
