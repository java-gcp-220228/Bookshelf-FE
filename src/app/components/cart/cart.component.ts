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

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = [
    'isbn',
    'title',
    'author',
    'publisher',
    'publish_date',
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
    ) { }

  ngOnInit(): void {
    this.getAllBooks();
  }
  rentedBooks: number[] = [2,3];

  getAllBooks(): any {
    this.bookService.getAllBooks().subscribe({
      next: (res: any) => {
        console.log(res.id, res.status);
        this.rentedBooks.forEach((value) =>{
          if(res.id !== value){
            console.log(res.id, res.status);
            this.includeBook(res);
          }
        });

      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  includeBook(res: any){
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 10;        
    
    this.sort.sort({
      id: 'id',
      start: 'desc',
      disableClear: false,
    });
  };
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRequest(row: any) {}

  confirmDialog(id: number, status: string) {
    const message = 'Are you sure you want to check out this book?';
    const dialogData = new ConfirmDialogModel('Confirm Add', message);
    this.dialog
      .open(ConfirmDialogComponent, {
        maxWidth: '400px',
        data: dialogData,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === true) {
          this.rentBook(id, status);
          this.getAllBooks();
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

  testMethod(){
    console.log("is enabled")
  }

  rentBook(id: number, status : String) {
    if(status !== "Available") {
      return;
    }
    this.bookService.rentBook(id).subscribe({
      next: (res) => {
        this.openSnackBar('Added to cart successfully.');
      },
      error: (err) => {
        this.openSnackBar(err.error);
      },
    });
  }

  checkOut(){

  }

}
