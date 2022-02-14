import { Component, ElementRef, OnInit } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { BookApiService } from 'src/app/services/book-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading: Boolean = false;
  apiResponse: any = [];

  constructor(
    public searchInput: ElementRef,
    private bookService: BookApiService
  ) {
    this.searchInput = searchInput;
  }

  ngOnInit(): void {
    const keyupEvent$ = fromEvent(this.searchInput?.nativeElement, 'keyup');
    const pasteEvent$ = fromEvent(this.searchInput?.nativeElement, 'input');
    const allEvents$ = merge(keyupEvent$, pasteEvent$);

    allEvents$
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.isLoading = true;
        this.bookService.searchGetCall(text).subscribe(
          (res) => {
            this.isLoading = false;
            this.apiResponse = res;
            console.log(res);
          },
          (err) => {
            this.isLoading = false;
          }
        );
      });
  }
}
