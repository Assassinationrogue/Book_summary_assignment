import { BookApiService } from 'src/app/services/book-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDetail } from 'src/app/models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  bookDetail: BookDetail;

  constructor(
    private router: ActivatedRoute,
    private bookService: BookApiService
  ) {}

  ngOnInit(): void {
    this.bookService
      .getBookDetails(this.router.snapshot.params.id)
     
      .subscribe((details) => {
        this.bookDetail = details;
      });
  }
}
