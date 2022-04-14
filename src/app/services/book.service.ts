import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any> {
    return this.http.get<any>(URL + '/books');
  }

  createBook(data: any) {
    return this.http.post<any>(URL + '/books', data, httpOptions);
  }

  updateBook(bookId: number, data: any) {
    return this.http.put<any>(URL + '/books/' + bookId, data);
  }

  deleteBook(bookId: number) {
    return this.http.delete(URL + '/books/' + bookId, {
      responseType: 'text',
    });
  }
}
