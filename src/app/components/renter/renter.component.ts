import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { AvailibityPipe } from 'src/app/pipes/availibity.pipe';
import { Router } from '@angular/router';
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
  selector: 'app-renter',
  templateUrl: './renter.component.html',
  styleUrls: ['./renter.component.css']
})
export class RenterComponent implements OnInit {
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
    private cartServie: CartService,
    private router: Router,
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

  editRequest(row: any) {}

  confirmDialog(id: number, isbn: number, title: string, author: string, publisher: string, 
    publish_date: string, genre: string, status: string) {
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
          this.rentBook(id, isbn, title, author, publisher, publish_date, genre, status);
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

  rentBook(id: number, isbn: number,title: string, author: string, publisher: string, 
    publish_date: string, genre: string, status: string) {
    if(status !== "Available") {
      return;
    }
    
    if(this.cartServie.addToRentQueue(id, isbn, title, author, publisher, publish_date, genre, status)){
      this.openSnackBar('Added to cart successfully.');
    } else {
      this.openSnackBar('Item already in cart')
    };/*.subscribe({
      next: (res) => {
        //add to rent books queue array
        
        this.openSnackBar('Added to cart successfully.');
      },
      error: (err) => {
        this.openSnackBar(err.error);
      },
    });*/
  }
  toCart(){
      this.router.navigate(['cart'])
  }
  
  
}
