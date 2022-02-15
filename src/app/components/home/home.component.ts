import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { BookApiService } from 'src/app/services/book-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isLoading: Boolean = false;
  apiResponse: any = [];
  isHoverable: boolean = false;

  constructor(
    public searchInput: ElementRef,
    private bookService: BookApiService
  ) {
    this.searchInput = searchInput;
  }

  ngOnInit(): void {
    document.querySelector('.layout')?.addEventListener('click', (event) => {
      event.stopPropagation();
      this.isHoverable = false;
    });

    this.getSearchValue();
  }

  /**
   * Gets the input value from search bar
   */
  getSearchValue(): void {
    const keyupEvent$ = fromEvent(this.searchInput?.nativeElement, 'keyup');
    const pasteEvent$ = fromEvent(this.searchInput?.nativeElement, 'input');
    const allEvents$ = merge(keyupEvent$, pasteEvent$);
    this.subscription.add(
      allEvents$
        .pipe(
          map((event: any) => {
            return event.target.value;
          }),
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe((text: string) => {
          document
            .querySelector('#search')
            ?.addEventListener('click', (event) => {
              event.stopPropagation();
              if (text !== '') {
                this.isHoverable = true;
              } else {
                this.isHoverable = false;
              }
            });
          this.isLoading = true;
          this.bookService.searchBookTitle(text).subscribe(
            (res) => {
              this.isLoading = false;
              this.apiResponse = res['docs'];
              this.isHoverable = this.apiResponse?.length;
            },
            (err) => {
              this.isLoading = false;
            }
          );
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
