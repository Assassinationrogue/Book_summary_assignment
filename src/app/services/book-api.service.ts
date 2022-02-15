import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookApiService {
  constructor(private http: HttpClient) {}

  /**
   * Fetches book data
   * @param term string
   * @returns Observable
   */
  searchBookTitle(term: string): Observable<any> {
    if (term === '') {
      return of([]);
    }
    return this.http.get(
      `http://openlibrary.org/search.json?q=${term}&limit=10`
    );
  }

  /**
   * Fetches book details
   * @param id of book in string
   * @returns Observable
   */
  getBookDetails(id: string): Observable<any>{
    return this.http.get(
      `http://openlibrary.org/books/${id}.json`
    );
  }
}
