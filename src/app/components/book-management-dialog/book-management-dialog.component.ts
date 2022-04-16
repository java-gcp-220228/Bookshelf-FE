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
      publishDate: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      imageUrl: [''],
    });

    if (this.editData) {
      this.actionTitle = 'Update book';
      this.actionBtn = 'Update';

      this.bookForm.controls['isbn'].setValue(this.editData.isbn);
      this.bookForm.controls['title'].setValue(this.editData.title);
      this.bookForm.controls['author'].setValue(this.editData.author);
      this.bookForm.controls['publisher'].setValue(this.editData.publisher);
      this.bookForm.controls['publishDate'].setValue(this.editData.publishDate);
      this.bookForm.controls['genre'].setValue(this.editData.genre);
      this.bookForm.controls['imageUrl'].setValue(this.editData.imageUrl);
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
      if (this.bookForm.valid) {
        this.bookService.createBook(this.bookForm.value).subscribe({
          next: (res) => {
            console.log(this.bookForm.value);
            console.log(res);
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
    this.bookService
      .updateBook(this.editData.id, this.bookForm.value)
      .subscribe({
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
