import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-book-management-dialog',
  templateUrl: './book-management-dialog.component.html',
  styleUrls: ['./book-management-dialog.component.css'],
})
export class BookManagementDialogComponent implements OnInit {
  bookForm!: FormGroup;
  actionTitle: string = 'Add new book';
  actionBtn: string = 'Save';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<BookManagementDialogComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      isbn: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      publish_date: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      status: ['', [Validators.required]],
      image_url: [''],
    });

    if (this.editData) {
      this.actionTitle = 'Update book';
      this.actionBtn = 'Update';
      //this.receiptUrl = this.editData.reimbursementReceipt;

      this.bookForm.controls['isbn'].setValue(this.editData.isbn);
      this.bookForm.controls['author'].setValue(this.editData.author);
      this.bookForm.controls['publisher'].setValue(this.editData.publisher);
      this.bookForm.controls['publish_date'].setValue(
        this.editData.publish_date
      );
      this.bookForm.controls['genre'].setValue(this.editData.genre);
      this.bookForm.controls['status'].setValue(this.editData.status);
      this.bookForm.controls['image_url'].setValue(this.editData.image_url);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['blue-snackbar'],
    });
  }

  addBook() {
    if (!this.editData) {
      var formData: any = new FormData();
      formData.append('isbn', this.bookForm.get('isbn')?.value);
      formData.append('title', this.bookForm.get('title')?.value);
      formData.append('author', this.bookForm.get('author')?.value);
      formData.append('publisher', this.bookForm.get('publisher')?.value);
      formData.append('publish_date', this.bookForm.get('publish_date')?.value);
      formData.append('genre', this.bookForm.get('genre')?.value);
      formData.append('status', this.bookForm.get('status')?.value);
      formData.append('image_url', this.bookForm.get('image_url')?.value);

      if (this.bookForm.valid) {
        this.bookService.createBook(formData).subscribe({
          next: (res) => {
            this.openSnackBar('Book added successfully.');
            this.bookForm.reset();
            this.dialogRef.close();
          },
          error: (err) => {
            this.openSnackBar('Could not add book. Error: ' + err.error);
          },
        });
      } else {
        this.openSnackBar('Please enter all of the requirement fields.');
      }
    } else {
      this.updateBook();
    }
  }

  updateBook() {
    var formData: any = new FormData();
    formData.append('isbn', this.bookForm.get('isbn')?.value);
    formData.append('title', this.bookForm.get('title')?.value);
    formData.append('author', this.bookForm.get('author')?.value);
    formData.append('publisher', this.bookForm.get('publisher')?.value);
    formData.append('publish_date', this.bookForm.get('publish_date')?.value);
    formData.append('genre', this.bookForm.get('genre')?.value);
    formData.append('status', this.bookForm.get('status')?.value);
    formData.append('image_url', this.bookForm.get('image_url')?.value);

    this.bookService.updateBook(this.editData.id, formData).subscribe({
      next: (res) => {
        this.openSnackBar('Book updated successfully.');
        this.bookForm.reset();
        this.dialogRef.close();
      },
      error: (err) => {
        alert(err.error);
      },
    });
  }
}
