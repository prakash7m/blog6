import { Component, OnInit, HostListener, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from '../../shared/window.service';


@Component({
  selector: 'b-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('headercmp') headerCmp: ElementRef;
  biggerHeight: boolean;
  cssFixed: boolean;
  cssOffCanvas: boolean;
  lastScrollTop = 0;
  isScrolled: boolean;
  _burgerClosed = true;

  get burgerClosed() {
    return this._burgerClosed;
  }
  set burgerClosed(closed) {
    this._burgerClosed = closed;
    // this.document.body.style.overflowY = this.burgerClosed ? "auto" : "hidden";
  }
  constructor(@Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: Window) { }

  ngOnInit() {
  }

  @HostListener('window:scroll')
  onscroll() {
    const number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    const headerHeight = this.headerCmp.nativeElement.offsetHeight;
    let scrollDown = false;
    if (number > this.lastScrollTop) {
      // scrolling down
      scrollDown = true;
    } else {
      // scrolling up
      scrollDown = false;
    }
    this.cssOffCanvas = this.burgerClosed && number > headerHeight;
    this.biggerHeight = number < headerHeight;
    this.cssFixed = this.burgerClosed && !scrollDown;
    this.lastScrollTop = number;
    this.isScrolled = number > headerHeight;
  }
}
