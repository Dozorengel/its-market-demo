import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ShopService } from '../../../../services/shop/shop.service';
import { BannerDTO, BannerType } from '@its-market/banner';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit, OnDestroy {
  @ViewChild('container') containerView: ElementRef;
  @ViewChild('prevBtn') prevBtnView: ElementRef;
  @ViewChild('nextBtn') nextBtnView: ElementRef;
  bannerSubscription: Subscription;
  prevBtnSubscription: Subscription;
  prevBtnObservable$: Observable<Event>;
  nextBtnSubscription: Subscription;
  nextBtnObservable$: Observable<Event>;
  containerSubscription: Subscription;
  containerObservable$: Observable<Event>;
  banners: BannerDTO[] = [] as BannerDTO[];
  bannerTypes = BannerType;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.bannerSubscription = this.shopService.getBanners().subscribe((banners) => {
      this.banners = banners;
      setTimeout(() => this.scroll(), 1000);
    });
  }

  ngOnDestroy() {
    this.bannerSubscription?.unsubscribe();
    this.prevBtnSubscription?.unsubscribe();
    this.nextBtnSubscription?.unsubscribe();
    this.containerSubscription?.unsubscribe();
  }

  scroll(): void {
    // When there are not enough cards in scroll line, hide arrows and counter
    if (
      this.containerView.nativeElement &&
      this.containerView.nativeElement.scrollWidth === this.containerView.nativeElement.clientWidth
    ) {
      this.prevBtnView.nativeElement.style.setProperty('display', 'none', 'important');
      this.nextBtnView.nativeElement.style.setProperty('display', 'none', 'important');
    }
    // Scroll on buttons click
    this.prevBtnObservable$ = fromEvent(this.prevBtnView.nativeElement, 'click');
    this.prevBtnSubscription = this.prevBtnObservable$.subscribe(() => {
      this.containerView.nativeElement.scrollBy({
        top: 0,
        left: -this.containerView.nativeElement.clientWidth,
        behavior: 'smooth',
      });
    });
    this.nextBtnObservable$ = fromEvent(this.nextBtnView.nativeElement, 'click');
    this.nextBtnSubscription = this.nextBtnObservable$.subscribe(() => {
      this.containerView.nativeElement.scrollBy({
        top: 0,
        left: this.containerView.nativeElement.clientWidth,
        behavior: 'smooth',
      });
    });
    // Show/hide opposite arrows
    this.containerObservable$ = fromEvent(this.containerView.nativeElement, 'scroll');
    this.containerSubscription = this.containerObservable$.pipe(debounceTime(100)).subscribe(() => {
      if (this.containerView.nativeElement.scrollLeft === 0) {
        // Hide prev, show next
        this.prevBtnView.nativeElement.style.setProperty('visibility', 'hidden', 'important');
        this.prevBtnView.nativeElement.style.setProperty('opacity', 0, 'important');
        this.nextBtnView.nativeElement.style.setProperty('visibility', 'visible', 'important');
        this.nextBtnView.nativeElement.style.setProperty('opacity', 100, 'important');
      } else if (
        this.containerView.nativeElement.scrollLeft +
          this.containerView.nativeElement.clientWidth ===
        this.containerView.nativeElement.scrollWidth
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
    });
  }
}
