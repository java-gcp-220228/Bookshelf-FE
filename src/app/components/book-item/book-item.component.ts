import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BookService } from 'src/app/services/book.service';
import { AutomaticEntryDialogComponent } from '../automatic-entry-dialog/automatic-entry-dialog.component';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css'],
})
export class BookItemComponent implements OnInit {
  @Input() bookItem: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AutomaticEntryDialogComponent>
  ) {}

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['blue-snackbar'],
    });
  }

  ngOnInit(): void {}

  addBook() {
    if (this.bookItem) {
      this.bookService.createBook(this.bookItem).subscribe({
        next: (res) => {
          this.openSnackBar('Book added successfully.');
          this.dialogRef.close();
        },
        error: (err) => {
          this.openSnackBar('Could not add book. Error: ' + err.error);
        },
      });
    }
  }
}
