import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { CategoryDTO } from '@its-market/category';
import { ShopService } from '../../../services/shop/shop.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  @HostBinding('class.catalog-opened') catalogOpened = false;
  @HostBinding('class.is-sticky') isSticky = false;
  categories: CategoryDTO[];
  scrollObservable$: Observable<Event>;
  scrollSubscription$: Subscription;
  searchActive = false;
  showAnchors = false;

  anchors = [
    {
      slug: 'annotation',
      name: 'Аннотация',
    },
    {
      slug: 'author',
      name: 'Об\u00A0авторе',
    },
    {
      slug: 'delivery',
      name: 'Доставка',
    },
    {
      slug: 'payment',
      name: 'Оплата',
    },
  ];

  constructor(private shopService: ShopService, private router: Router) {}
  ngOnInit(): void {
    this.shopService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.scroll();
  }

  ngOnDestroy() {
    this.scrollSubscription$?.unsubscribe();
  }

  scroll() {
    this.scrollObservable$ = fromEvent(window, 'scroll');
    this.scrollSubscription$ = this.scrollObservable$.pipe(debounceTime(100)).subscribe(() => {
      const verticalOffset = window.pageYOffset;
      this.isSticky = verticalOffset > 96;
      if (this.router.url.startsWith('product', 1)) {
        this.showAnchors = verticalOffset > 900;
      }
    });
  }
}
