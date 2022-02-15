import { BookApiService } from 'src/app/services/book-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDetail } from 'src/app/models/book';
import { tap, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  bookDetails: BookDetail;

  constructor(
    private router: ActivatedRoute,
    private bookService: BookApiService
  ) {}

  ngOnInit(): void {
    this.bookService
      .getBookDetails(this.router.snapshot.params.id)
      .pipe(
        map((data) => {
          return ({
            title: data.title,
            publishers: data.publishers.join(','),
            physical_format: data.physical_format,
            number_of_pages: data.number_of_pages,
            publish_date: data.publish_date,
            isbn_10: data.isbn_10.join(','),
            isbn_13: data.isbn_13.join(','),
          });
        })
      )
      .subscribe((details) => {
        this.bookDetails = details;
      });
  }
}
