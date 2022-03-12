import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartProductDTO } from '@its-market/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() product: CartProductDTO;
  @Input() factor = 1;
  @Output() removeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeCountEvent: EventEmitter<number> = new EventEmitter<number>();
  price: number;
  totalPrice: number;

  ngOnInit(): void {
    this.price = (this.product.preOrderPrice || this.product.price) / 100;
    this.refreshPrice();
  }

  refreshPrice(): void {
    this.totalPrice = this.price * this.factor;
  }

  dec(): void {
    if (this.factor > 1) {
      this.factor = this.factor - 1;
      this.changeCountEvent.emit(this.factor);
    }
    this.refreshPrice();
  }

  inc(): void {
    this.factor = this.factor + 1;
    this.changeCountEvent.emit(this.factor);
    this.refreshPrice();
  }

  removeItem(): void {
    this.removeEvent.emit();
  }
}
