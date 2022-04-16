import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../confirm-dialog/confirm-dialog.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BookManagementDialogComponent } from '../book-management-dialog/book-management-dialog.component';
import { AutomaticEntryDialogComponent } from '../automatic-entry-dialog/automatic-entry-dialog.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = [
    'isbn',
    'title',
    'author',
    'publisher',
    'publishDate',
    'genre',
    'status',
    'actions',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(): any {
    this.bookService.getAllBooks().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.pageSize = 10;
        this.sort.sort({
          id: 'id',
          start: 'desc',
          disableClear: false,
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editBook(row: any) {
    this.dialog
      .open(BookManagementDialogComponent, {
        width: '50%',
        data: row,
      })
      .afterClosed()
      .subscribe((value) => {
        this.getAllBooks();
      });
  }

  confirmDialog(id: number) {
    const message = 'Are you sure you want to delete this book?';
    const dialogData = new ConfirmDialogModel('Confirm Delete', message);
    this.dialog
      .open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: dialogData,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.deleteBook(id);
        }
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['blue-snackbar'],
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe({
      next: (res) => {
        this.openSnackBar(res);
        this.getAllBooks();
      },
      error: (err) => {
        this.openSnackBar(err.error);
      },
    });
  }

  openManualEntryDialog() {
    this.dialog
      .open(BookManagementDialogComponent, {
        width: '50%',
      })
      .afterClosed()
      .subscribe((value) => {
        this.getAllBooks();
      });
  }

  openAutomaticEntryDialog() {
    this.dialog
      .open(AutomaticEntryDialogComponent, {
        width: '50%',
      })
      .afterClosed()
      .subscribe((value) => {
        this.getAllBooks();
      });
  }
}
