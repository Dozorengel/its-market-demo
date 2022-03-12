import { Component, Input, OnInit } from '@angular/core';
import { DetailProductDTO } from '@its-market/product';

@Component({
  selector: 'app-detail-content',
  templateUrl: './detail-content.component.html',
  styleUrls: ['./detail-content.component.css'],
})
export class DetailContentComponent implements OnInit {
  @Input() product: DetailProductDTO;
  properties: { name: string; value: string }[];

  anchors = [
    {
      slug: 'annotation',
      name: 'Аннотация',
    },
    {
      slug: 'author',
      name: 'Об\u00A0авторе',
    },
    {
      slug: 'delivery',
      name: 'Доставка',
    },
    {
      slug: 'payment',
      name: 'Оплата',
    },
  ];

  ngOnInit() {
    this.properties = JSON.parse(this.product.properties);
  }
}
