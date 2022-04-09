import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL = environment.BACKEND_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

  // return the response as a HTTPResponse instead of the body only by default
  observe: 'response' as 'response',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post<any>(URL + '/login', data, httpOptions);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(URL + '/register', data, httpOptions);
  }
}
