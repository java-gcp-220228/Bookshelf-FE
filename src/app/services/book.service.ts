import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private bookEndpoint: string = 'http://localhost:3000/books/';

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any> {
    return this.http.get<any>(this.bookEndpoint);
  }

  deleteBook(id: number) {
    return this.http.delete<any>(this.bookEndpoint + id);
  }
}
