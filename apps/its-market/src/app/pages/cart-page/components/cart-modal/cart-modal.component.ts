import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../../services/customer/customer.service';
import { combineLatest } from 'rxjs';
import { CartItemDTO } from '@its-market/cart-item';
import { CartProductDTO } from '@its-market/product';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css'],
})
export class CartModalComponent implements OnInit {
  products: CartItemDTO[] = [] as CartItemDTO[];
  total = 0;
  count = 0;

  constructor(private customerService: CustomerService, public router: Router) {}

  ngOnInit(): void {
    combineLatest([
      this.customerService.getProducts(),
      this.customerService.getTotalWithPromocode(),
      this.customerService.getCount(),
    ]).subscribe(([products, total, count]) => {
      this.products = products;
      this.total = total;
      this.count = count;
      this.total = this.total / 100;
    });
  }

  changeCountProduct(product: CartProductDTO, count: number) {
    this.customerService.changeCountProduct(product.id, count).subscribe();
  }
}
