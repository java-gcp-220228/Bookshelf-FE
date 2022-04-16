import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { RentService } from 'src/app/services/rent.service';
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
    private cartService: CartService,
    private rentService: RentService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getAllBooks();
  }
  rentedBooks: number[] = [2,3];

  getAllBooks(): any {
    let fullcart = this.cartService.getItemsInCart();

    this.dataSource = new MatTableDataSource(this.cartService.getItemsInCart());
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

  confirmDialog(id: number) {
    const message = 'Are you sure you want to remove this book?';
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
          this.removeBook(id);
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

  removeBook(id: number) {

    if(this.cartService.removeFromRentQueue(id)){
      this.openSnackBar('Removed from Shopping Cart')
    } else {
      this.openSnackBar('Could not remove')
    };
    
  }

  checkOut(){
    this.rentService.postRents(this.cartService.getItemsInCartID()).subscribe({
      next:(res) => {
        this.openSnackBar('Book rented successfully.');
        this.cartService.clearCart();
        this.router.navigate(['rents'])
      },
      error: (err) => {
        this.openSnackBar('Could not rent books: '+ err.error);
      }
    });
    
    
  }

  returnTorenterPage(){
    this.router.navigate(['renter'])
  }


}
