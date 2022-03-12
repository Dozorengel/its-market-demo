import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartProductDTO, DetailProductDTO } from '@its-market/product';
import { ShopService } from '../../services/shop/shop.service';

@Component({
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css'],
})
export class CatalogPageComponent implements OnInit {
  products: CartProductDTO[] = [] as DetailProductDTO[];
  title = '';
  description = '';

  constructor(private shopService: ShopService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      if (data.category === 'tag') {
        this.shopService.getTag(data.tag).subscribe((tag) => {
          this.title = tag?.title;
          this.description = tag?.description;
          if (tag && tag.products) this.products = tag.products;
        });
      } else {
        this.shopService.getCategory(data.category).subscribe((category) => {
          this.title = category.title;
          if (category && category.products) this.products = category.products;
        });
      }
    });
  }
}
