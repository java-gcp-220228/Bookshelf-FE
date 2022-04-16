import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

const URL = environment.BACKEND_URL;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),

  // return the response as a HTTPResponse instead of the body only by default
  observe: 'response' as 'response',
};

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private http: HttpClient,
    private userService: UserService) { }

  postRents(books : any) { //create a rent
    let obj = {managerId: 1, renterId: this.userService.getUser().id, bookIds: books};
    console.log(obj);
    return this.http.post<any>(URL + '/rents', obj, httpOptions);
    
  }

  getAllRents(): Observable<any> { //get all rents (for admin)
    return this.http.get<any>(URL + '/rents');
  }

  getALLRentsByID(): Observable<any>{ //get all rents (for renter)
    return this.http.get<any>(URL + '/rents/' + this.userService.getUser().id); //replace 1 with users id number
  }
}
