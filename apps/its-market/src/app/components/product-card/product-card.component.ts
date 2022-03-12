import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from './../../services/customer/customer.service';
import { CartProductDTO } from '@its-market/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: CartProductDTO;
  isInCart = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.isProductInCart(this.product.id).subscribe((res) => {
      this.isInCart = res;
    });
  }

  addToCart(product: CartProductDTO) {
    this.customerService.addProduct(product).subscribe();
  }
}
