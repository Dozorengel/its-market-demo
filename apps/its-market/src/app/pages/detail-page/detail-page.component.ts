import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailProductDTO } from '@its-market/product';
import { ShopService } from '../../services/shop/shop.service';

@Component({
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  product: DetailProductDTO;

  constructor(private shopService: ShopService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.shopService.getProductBySlug(data.slug).subscribe((product: DetailProductDTO) => {
        this.product = product;
      });
    });
  }
}
