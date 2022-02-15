import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { BookApiService } from 'src/app/services/book-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('searchInput') search: ElementRef;
  isLoading: Boolean = false;
  apiResponse: any = [];
  isHoverable: boolean = false;

  constructor(
    public searchInput: ElementRef,
    private bookService: BookApiService
  ) {
    this.searchInput = searchInput;
    this.search = searchInput;
    
  }

  ngOnInit(): void {
    const keyupEvent$ = fromEvent(this.searchInput?.nativeElement, 'keyup');
    const pasteEvent$ = fromEvent(this.searchInput?.nativeElement, 'input');
    const allEvents$ = merge(keyupEvent$, pasteEvent$);
    document.querySelector(".layout")?.addEventListener('click',(event)=>{
      event.stopPropagation();
      this.isHoverable = false;
    })
   
    allEvents$
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        document.querySelector("#search")?.addEventListener('click',(event)=>{
          event.stopPropagation();
          if(text !== ''){
            this.isHoverable = true;
          }else{
            this.isHoverable = false;
          }

        })
        this.isLoading = true;
        this.bookService.searchBookTitle(text).subscribe(
          (res) => {
            /**
             * @description docs: []
             *   numFound: 143
             *   numFoundExact: true
             *   num_found: 143
             *   offset: null
             *   q: "let us c"
             */
            this.isLoading = false;
            this.apiResponse = res['docs'];
            this.isHoverable = this.apiResponse?.length;
          },
          (err) => {
            this.isLoading = false;
          }
        );
      });
  }

  setBookIdToLocal(id: string){ 
    localStorage.setItem("bookId", id.slice(7));
  }
}
