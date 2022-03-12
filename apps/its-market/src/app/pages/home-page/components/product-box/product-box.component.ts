import {
  Component,
  OnInit,
  Input,
  ElementRef,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { TagDTO } from '@its-market/tag';
import { ShopService } from '../../../../services/shop/shop.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css'],
})
export class ProductBoxComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('container') containerView: ElementRef;
  @ViewChild('line') lineView: ElementRef;
  @ViewChild('card', { read: ElementRef }) cardView: ElementRef;
  @ViewChild('prevBtn') prevBtnView: ElementRef;
  @ViewChild('nextBtn') nextBtnView: ElementRef;
  @ViewChild('arrows') arrowsView: ElementRef;
  tagSubscription: Subscription;
  resizeSubscription: Subscription;
  prevBtnSubscription: Subscription;
  prevBtnObservable$: Observable<Event>;
  nextBtnSubscription: Subscription;
  nextBtnObservable$: Observable<Event>;
  lineSubscription: Subscription;
  lineObservable$: Observable<Event>;
  @Input() title?: string;
  @Input() desc?: string;
  @Input() btnText?: string;
  @Input() slug: string;
  @Input() dueDate: number;
  tag: TagDTO;
  seconds: number;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.tagSubscription = this.shopService.getTag(this.slug).subscribe((tag) => {
      if (tag) {
        this.tag = tag;
      }
    });
  }

  ngAfterViewInit(): void {
    this.tagSubscription.add(() => {
      setTimeout(() => {
        this.prevBtnView.nativeElement.style.setProperty('visibility', 'hidden', 'important');
        this.prevBtnView.nativeElement.style.setProperty('opacity', 0, 'important');
        this.scroll();
        this.resizeSubscription = fromEvent(window, 'resize')
          .pipe(debounceTime(1000))
          .subscribe(() => {
            this.scroll();
          });
      }, 1000);
    });
  }

  ngOnDestroy() {
    this.resizeSubscription?.unsubscribe();
    this.tagSubscription?.unsubscribe();
    this.prevBtnSubscription?.unsubscribe();
    this.nextBtnSubscription?.unsubscribe();
    this.lineSubscription?.unsubscribe();
  }

  scroll(): void {
    // When there are not enough cards in scroll line, hide arrows and darkening
    if (this.lineView.nativeElement.scrollWidth - this.lineView.nativeElement.clientWidth <= 16) {
      this.arrowsView.nativeElement.style.setProperty('visibility', 'hidden', 'important');
      this.arrowsView.nativeElement.style.setProperty('opacity', 0, 'important');
      this.lineView.nativeElement.style.setProperty('--product-box-line-opacity', 0);
    } else {
      this.arrowsView.nativeElement.style.setProperty('visibility', 'visible', 'important');
      this.arrowsView.nativeElement.style.setProperty('opacity', 100, 'important');
      this.lineView.nativeElement.style.setProperty('--product-box-line-opacity', 1);
    }
    // Scroll on buttons click
    this.prevBtnObservable$ = fromEvent(this.prevBtnView.nativeElement, 'click');
    this.prevBtnSubscription = this.prevBtnObservable$.subscribe(() => {
      this.lineView.nativeElement.scrollBy({
        top: 0,
        left: -this.cardView.nativeElement.clientWidth,
        behavior: 'smooth',
      });
    });
    this.nextBtnObservable$ = fromEvent(this.nextBtnView.nativeElement, 'click');
    this.nextBtnSubscription = this.nextBtnObservable$.subscribe(() => {
      this.lineView.nativeElement.scrollBy({
        top: 0,
        left: this.cardView.nativeElement.clientWidth,
        behavior: 'smooth',
      });
    });
    // Show/hide events
    this.onLineScroll();
    this.lineObservable$ = fromEvent(this.lineView.nativeElement, 'scroll');
    this.lineSubscription = this.lineObservable$.pipe(debounceTime(100)).subscribe(() => {
      this.onLineScroll();
    });
  }

  onLineScroll() {
    // Show/hide the darkening of the next card when all cards are out
    if (
      this.lineView.nativeElement.scrollLeft + this.lineView.nativeElement.clientWidth >=
      this.lineView.nativeElement.scrollWidth - 16
    ) {
      this.lineView.nativeElement.style.setProperty('--product-box-line-opacity', 0);
    } else {
      this.lineView.nativeElement.style.setProperty('--product-box-line-opacity', 1);
    }
    // Show/hide opposite arrows
    if (this.lineView.nativeElement.scrollLeft === 0) {
      // Hide prev, show next
      this.prevBtnView.nativeElement.style.setProperty('visibility', 'hidden', 'important');
      this.prevBtnView.nativeElement.style.setProperty('opacity', 0, 'important');
      this.nextBtnView.nativeElement.style.setProperty('visibility', 'visible', 'important');
      this.nextBtnView.nativeElement.style.setProperty('opacity', 100, 'important');
    } else if (
      this.lineView.nativeElement.scrollLeft + this.lineView.nativeElement.clientWidth >=
      this.lineView.nativeElement.scrollWidth - 16
    ) {
      // Hide next, show prev
      this.nextBtnView.nativeElement.style.setProperty('visibility', 'hidden', 'important');
      this.nextBtnView.nativeElement.style.setProperty('opacity', 0, 'important');
      this.prevBtnView.nativeElement.style.setProperty('visibility', 'visible', 'important');
      this.prevBtnView.nativeElement.style.setProperty('opacity', 100, 'important');
    } else {
      // Show all
      this.prevBtnView.nativeElement.style.setProperty('visibility', 'visible', 'important');
      this.prevBtnView.nativeElement.style.setProperty('opacity', 100, 'important');
      this.nextBtnView.nativeElement.style.setProperty('visibility', 'visible', 'important');
      this.nextBtnView.nativeElement.style.setProperty('opacity', 100, 'important');
    }
  }
}
