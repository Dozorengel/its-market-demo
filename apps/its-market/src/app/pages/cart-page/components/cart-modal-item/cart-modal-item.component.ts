import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartProductDTO } from '@its-market/product';

@Component({
  selector: 'app-cart-modal-item',
  templateUrl: './cart-modal-item.component.html',
  styleUrls: ['./cart-modal-item.component.css'],
})
export class CartModalItemComponent implements OnInit {
  @Input() product: CartProductDTO;
  @Input() factor = 1;
  @Output() changeCountEvent: EventEmitter<number> = new EventEmitter<number>();
  price: number;
  totalPrice: number;

  ngOnInit(): void {
    this.price = this.product.preOrderPrice || this.product.price;
    this.refreshPrice();
  }

  refreshPrice(): void {
    this.totalPrice = (this.price / 100) * this.factor;
  }

  dec(): void {
    this.factor = this.factor - 1;
    this.changeCountEvent.emit(this.factor);
    this.refreshPrice();
  }

  inc(): void {
    this.factor = this.factor + 1;
    this.changeCountEvent.emit(this.factor);
    this.refreshPrice();
  }
}
