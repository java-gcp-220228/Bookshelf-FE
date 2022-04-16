import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL = environment.BACKEND_URL;
const CORS = 'https://cors-anywhere.herokuapp.com/';
//const CORS = 'https://app.cors.bridged.cc/';
const OL_URL = CORS + 'https://openlibrary.org/api/books?bibkeys=ISBN:';
const FORMAT = '&format=json&jscmd=data';
const GENRE_URL = CORS + 'https://openlibrary.org/books/'; //OL1017798M.json'
const DESC_URL = CORS + 'https://openlibrary.org/works/'; //OL53919W.json'

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

  getDescription(bookWork: string): Observable<any> {
    return this.http.get<any>(DESC_URL + bookWork + '.json');
  }

  getGenre(bookOL: string): Observable<any> {
    return this.http.get<any>(GENRE_URL + bookOL + '.json');
  }

  searchBooks(isbn: string): Observable<any> {
    return this.http.get<any>(OL_URL + isbn + FORMAT);
  }

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

  rentBook(id: number) {
    return this.http.get<any>(URL + '/books');
    // return this.http.put<any>(URL + '/rent/' + id); //todo needs to follow the proper backend naming
  }
  rentedBooks(UserId: number) {
    return this.http.get<any>(URL + 'rented/' + UserId); // todo need proper backend naming
  }
}
