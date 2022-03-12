import { Component, OnInit } from '@angular/core';
import { DetailProductDTO } from '@its-market/product';
import { ShopService } from '../../../../services/shop/shop.service';

@Component({
  selector: 'app-promo-box',
  templateUrl: './promo-box.component.html',
  styleUrls: ['./promo-box.component.css'],
})
export class PromoBoxComponent implements OnInit {
  products: DetailProductDTO[] = [] as DetailProductDTO[];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.shopService.getPromos().subscribe((products) => {
      this.products = products.slice(0, 2);
    });
  }
}
