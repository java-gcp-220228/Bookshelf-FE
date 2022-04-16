import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL = environment.BACKEND_URL;

@Injectable({
  providedIn: 'root',
})
export class RentDetailService {
  constructor(private http: HttpClient) {}

  getAllRentDetailsByRentId(rentId: number): Observable<any> {
    return this.http.get<any>(URL + '/rent-details/' + rentId);
  }

  returnBookByRentDetailId(rentDetailId: number) {
    return this.http.post(
      URL + '/rent-details/' + rentDetailId,
      {},
      {
        responseType: 'text',
      }
    );
  }
}
