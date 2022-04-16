import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
export class RentDetailsService {

  constructor(private http: HttpClient) { }

  getAllRentDetailByRentId(num : number): Observable<any>{
    
    return this.http.get<any>(URL + '/rent-details/' + num);
  }
}


