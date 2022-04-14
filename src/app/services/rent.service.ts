import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private http: HttpClient,
    private userService: UserService) { }

  postRents(obj : any) { //create a rent
    console.log("posted rents");
    return this.http.post<any>(URL + '/rents', obj);
    
  }

  getAllRents(): Observable<any> { //get all rents (for admin)
    return this.http.get<any>(URL + '/rents');
  }

  getALLRentsByID(): Observable<any>{ //get all rents (for renter)
    return this.http.get<any>(URL + '/rents' + this.userService.getUser().id); //replace 1 with users id number
  }
}
