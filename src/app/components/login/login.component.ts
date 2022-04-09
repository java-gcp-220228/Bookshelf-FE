import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // if user logged in before then redirect to renter or manager page
    // based on their role (remember user login using localstorage)
    if (this.userService.isLoggedIn()) {
      const roleId = this.userService.getUser().role_id;
      if (roleId === 1) {
        this.router.navigate(['/manager']);
      } else {
        this.router.navigate(['/renter']);
      }
    }

    // if user is not logged in then show them the login page
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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

  login() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.userService.setToken(res.headers.get('token'));
          this.userService.setUser(res.body);

          const role = res.body.userRole.id;
          if (role === 1) {
            this.router.navigate(['/manager']);
          } else {
            this.router.navigate(['/renter']);
          }
        },
        error: (err) => {
          this.openSnackBar(err.error);
        },
      });
    }
  }
}
