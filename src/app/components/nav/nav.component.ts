import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    data: { expectedRole: 1 }
  }

  public isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  public getUserFullName() {
    const fistName = this.userService.getUser().firstName;
    const lastName = this.userService.getUser().lastName;
    return fistName + ' ' + lastName;
  }
}
