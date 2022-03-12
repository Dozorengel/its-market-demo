import { Component, Input } from '@angular/core';
import { DetailProductDTO } from '@its-market/product';

@Component({
  selector: 'app-promo-card',
  templateUrl: './promo-card.component.html',
  styleUrls: ['./promo-card.component.css'],
})
export class PromoCardComponent {
  @Input() product: DetailProductDTO;
}
