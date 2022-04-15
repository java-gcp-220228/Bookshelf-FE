import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL = environment.BACKEND_URL;

@Injectable({
  providedIn: 'root',
})
export class RentService {
  constructor(private http: HttpClient) {}

  getAllRents(): Observable<any> {
    return this.http.get<any>(URL + '/rents');
  }
}
