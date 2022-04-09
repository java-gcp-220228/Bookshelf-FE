import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  // this guard is used to make sure to redirect the user to the appropriate page
  // so that if a renter tries to access the manager page,
  // then the renter will be redirected to the forbidden page
  // we also need to include this guard into the app.module.ts
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const role = this.userService.getUser().userRole.id;
    const expectedRole = route.data['expectedRole'];

    if (this.userService.isLoggedIn()) {
      if (role !== expectedRole) {
        this.router.navigate(['/forbidden']);
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
