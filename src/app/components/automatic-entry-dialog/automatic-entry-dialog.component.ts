import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BookService } from 'src/app/services/book.service';
import { BookItemComponent } from '../book-item/book-item.component';

interface BookItem {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publishDate: string;
  genre: string;
  imageUrl: string;
  description?: string;
}

@Component({
  selector: 'app-automatic-entry-dialog',
  templateUrl: './automatic-entry-dialog.component.html',
  styleUrls: ['./automatic-entry-dialog.component.css'],
})
export class AutomaticEntryDialogComponent implements OnInit {
  isbn = '';
  bookItem = {} as BookItem;
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

  searchBookByTitle() {
    let bookWork = '';

    if (this.isbn) {
      this.bookService.searchBooks(this.isbn).subscribe({
        next: (res) => {
          if (Object.keys(res).length !== 0) {
            const isbnKey = 'ISBN:' + this.isbn;
            const bookOL = res[isbnKey].key.split('/')[2];

            if (bookOL !== '') {
              this.bookService.getGenre(bookOL).subscribe((data: any) => {
                this.bookItem.genre = data.genres ? data.genres[0] : 'Unknown';

                bookWork = data.works[0].key.split('/')[2];
                this.bookService
                  .getDescription(bookWork)
                  .subscribe((data: any) => {
                    this.bookItem.description = data.description?.value;
                  });
              });
            }

            this.bookItem.title = res[isbnKey].title;
            this.bookItem.author = res[isbnKey].authors[0]?.name;
            this.bookItem.isbn = this.isbn;
            this.bookItem.publisher = res[isbnKey].publishers[0]?.name;
            this.bookItem.publishDate = res[isbnKey].publish_date;
            this.bookItem.imageUrl = res[isbnKey].cover?.medium;
          } else {
            this.openSnackBar(
              'Could not found book with the ISBN number ' + this.isbn
            );
          }
        },
        error: (err) => {
          this.openSnackBar('Could not search book. Error: ' + err.error);
        },
      });
    }
  }
}
