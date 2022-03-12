import { Component, Input, OnInit } from '@angular/core';
import { CartProductDTO, DetailProductDTO } from '@its-market/product';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../../services/customer/customer.service';
import { ShopService } from '../../../../services/shop/shop.service';

@Component({
  selector: 'app-cart-arrow',
  templateUrl: './cart-arrow.component.html',
  styleUrls: ['./cart-arrow.component.css'],
})
export class CartArrowComponent implements OnInit {
  @Input() show = false;
  product: CartProductDTO;
  isInCart = false;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private customerService: CustomerService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((data) => {
      if (!data.slug) return;
      this.shopService.getProductBySlug(data.slug).subscribe((product: DetailProductDTO) => {
        this.product = product;
        this.customerService.isProductInCart(product.id).subscribe((res) => (this.isInCart = res));
      });
    });
  }

  addProduct() {
    this.customerService.addProduct(this.product).subscribe();
  }
}
