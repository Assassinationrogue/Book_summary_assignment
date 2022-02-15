import { BookApiService } from 'src/app/services/book-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  bookId: string = '';
  constructor(private router: ActivatedRoute, private bookService: BookApiService) { }

  ngOnInit(): void {
    this.bookService.getBookDetails(this.router.snapshot.params.id).subscribe(details=>{
      console.log(details)
    })

  }

}
