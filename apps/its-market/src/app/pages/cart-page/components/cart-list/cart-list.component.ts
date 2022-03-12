import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../../services/customer/customer.service';
import { CartProductDTO } from '@its-market/product';
import { CartItemDTO } from '@its-market/cart-item';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent implements OnInit {
  cartItems: CartItemDTO[];
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getProducts().subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }

  removeItems(): void {
    this.customerService.clearCart().subscribe();
  }

  removeItem(product: CartProductDTO) {
    this.customerService.removeProduct(product.id).subscribe();
  }

  changeCountProduct(product: CartProductDTO, count: number) {
    this.customerService.changeCountProduct(product.id, count).subscribe();
  }
}
