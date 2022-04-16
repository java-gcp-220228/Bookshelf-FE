import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RentService } from 'src/app/services/rent.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RentDetailsService } from 'src/app/services/rent-details.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../confirm-dialog/confirm-dialog.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
//import { nextTick } from 'process';

@Component({
  selector: 'app-rents',
  templateUrl: './rents.component.html',
  styleUrls: ['./rents.component.css']
})
export class RentsComponent implements OnInit {
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
    'dueDate',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private rentService : RentService,
    private userService : UserService,
    private rentDetailService : RentDetailsService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getAllRents();
  }


  getAllRents(): any {
    //console.log('User' + this.userService.getUser().id);
    this.rentDetailService.getAllRentDetailByRentId(2).subscribe({
      next: (res:any) => {
        //console.log("do I see this " + res);
        res.forEach((value :any)=> {
          //console.log(value);
        })
        
        
      }
    })
    
    this.rentService.getALLRentsByID().subscribe({
      next: (res: any) => {
        //console.log("has failed?1")        
        //console.log("datasouce " + res);
        let books: any[] = [];
        res.forEach((value : any) =>{
          //console.log("value id" +value.id);
          this.rentDetailService.getAllRentDetailByRentId(value.id).subscribe({
            next: (res1: any) => {
              //console.log(res1);
              
              res1.forEach((value : any, index : number)=>{
                books.push(value.book); 
              })
              //console.log("books length: " +books.length);
              //console.log("book after push" + books.length)
              this.dataSource = new MatTableDataSource(books);
                
              this.dataSource.paginator = this.paginator;
              this.dataSource.paginator.pageSize = 10;
              this.sort.sort({
                id: 'id',
                start: 'desc',
                disableClear: false,
              });
            }, error: (err: any) => {
              //console.log("has failed?2")
              console.log(err);
            },
          })

        })

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
         // this.rentBook(id, isbn, title, author, publisher, publish_date, genre, status);
         // this.getAllBooks();
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

  
  backTORenter(){
      this.router.navigate(['renter'])
  }

}
