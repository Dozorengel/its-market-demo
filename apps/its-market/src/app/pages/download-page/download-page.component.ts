import { Component, OnInit } from '@angular/core';
import { DownloadProductDTO } from '@its-market/product';
import { ShopService } from '../../services/shop/shop.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.css'],
})
export class DownloadPageComponent implements OnInit {
  url: string;
  uuid_customer: string;
  uuid_cart_item: string;
  product: DownloadProductDTO;

  constructor(private shopService: ShopService, private route: ActivatedRoute) {
    this.url = environment.api;
  }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.uuid_customer = data.uuid_customer;
      this.uuid_cart_item = data.uuid_cart_item;
      this.shopService
        .getDownloadFormats(this.uuid_customer, this.uuid_cart_item)
        .subscribe((product) => {
          this.product = product;
        });
    });
  }
}
