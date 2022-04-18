import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { RentDetailsService } from 'src/app/services/rent-details.service';
import { RentService } from 'src/app/services/rent.service';
import { UserService } from 'src/app/services/user.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RentsComponent } from './rents.component';

describe('RentsComponent', () => {
  let component: RentsComponent;
  let fixture: ComponentFixture<RentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentsComponent ],
      providers: [RentService, UserService, RentDetailsService],
      imports: [RouterTestingModule, MatDialogModule, MatSnackBarModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
