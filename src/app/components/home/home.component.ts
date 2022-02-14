import { Component, ElementRef, OnInit } from '@angular/core';
import { fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading: Boolean = false;
  apiResponse: any = [];

  constructor(public searchInput: ElementRef) { 
    this.searchInput = searchInput;
  }

  ngOnInit(): void {
    const keyupEvent$ = fromEvent(this.searchInput?.nativeElement, "keyup");
    const pasteEvent$ = fromEvent(this.searchInput?.nativeElement, "input");
    const allEvents$ = merge(keyupEvent$, pasteEvent$);
  }

  

}
