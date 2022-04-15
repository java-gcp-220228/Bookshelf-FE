import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RentDetailService } from 'src/app/services/rent-detail.service';
import { RentService } from 'src/app/services/rent.service';
import { UserService } from 'src/app/services/user.service';

interface Rent {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-rent-detail-management',
  templateUrl: './rent-detail-management.component.html',
  styleUrls: ['./rent-detail-management.component.css'],
})
export class RentDetailManagementComponent implements OnInit {
  selectedRentId = 0;
  rentList: Rent[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = [
    'renterName',
    'bookISBN',
    'bookTitle',
    'expiryDate',
    'returnDate',
    'fineAmount',
    'actions',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private rentService: RentService,
    private rentDetailService: RentDetailService,
    private userService: UserService,
    private dialog: MatDialog,
    public receiptDialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['blue-snackbar'],
    });
  }

  ngOnInit(): void {
    this.populateDataRentSelect();
  }

  populateDataRentSelect() {
    this.rentService.getAllRents().subscribe({
      next: (res) => {
        res.map((rent: { id: any; date: any }) => {
          this.rentList.push({
            value: rent.id,
            viewValue: rent.id + ' - ' + rent.date,
          });
        });
      },
      error: (err) => {
        this.openSnackBar('Something went wrong.');
      },
    });
  }

  onStatusChange() {
    this.getAllRentDetailsByRentId(this.selectedRentId);
    //console.log(this.selectedRentId);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllRentDetailsByRentId(rentId: number) {
    this.rentDetailService.getAllRentDetailsByRentId(rentId).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.pageSize = 10;
        this.sort.sort({
          id: 'reimbursementStatus',
          start: 'desc',
          disableClear: false,
        });
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
