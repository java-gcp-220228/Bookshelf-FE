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

  deleteBook(bookId: number) {
    return this.http.delete<any>(URL + '/books/' + bookId);
  }

  createBook(data: any) {
    console.log(JSON.parse(JSON.stringify(data)));
    return this.http.post<any>(
      URL + '/books',
      //JSON.parse(JSON.stringify(data)),
      data,
      httpOptions
    );
  }

  updateBook(bookId: number, data: any) {
    return this.http.put<any>(URL + '/books/' + bookId, data);
  }
}
