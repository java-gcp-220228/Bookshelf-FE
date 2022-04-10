import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL = environment.BACKEND_URL;

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any> {
    return this.http.get<any>(URL + '/books');
  }

  deleteBook(id: number) {
    return this.http.delete<any>(URL + '/books/' + id);
  }

  rentBook(id: number) {
    return this.http.get<any>(URL + '/books');
    // return this.http.put<any>(URL + '/rent/' + id); //todo needs to follow the proper backend naming
  }
}
