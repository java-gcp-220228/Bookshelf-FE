import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterComponent } from './renter.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('RenterComponent', () => {
  let component: RenterComponent;
  let fixture: ComponentFixture<RenterComponent>;
  let mockCartService : any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [BookService, CartService],
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
      declarations: [ RenterComponent ]
    })
    .compileComponents();

    mockCartService = jasmine.createSpyObj(['addToRentQueue']);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should rent a book', () => {
    mockCartService.addToRentQueue.and.returnValue(of(true))

    //expect(mockCartService.addToRentQueue).toBe(true);
    
  })
});
