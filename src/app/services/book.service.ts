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

  deleteBook(bookId: number) {
    return this.http.delete<any>(URL + '/books/' + bookId);
  }

  createBook(data: any) {
    return this.http.post<any>(URL + '/books', data);
  }

  updateBook(bookId: number, data: any) {
    return this.http.put<any>(URL + '/books/' + bookId, data);
  }
}
