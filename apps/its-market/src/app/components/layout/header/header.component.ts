import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  env = environment;
  dropdownOpened = false;
  currentCurrency = 'rub';

  currency = [
    {
      id: 'cy-rub',
      value: 'rub',
    },
    {
      id: 'cy-usd',
      value: 'usd',
    },
    {
      id: 'cy-eur',
      value: 'eur',
    },
    {
      id: 'cy-byn',
      value: 'byn',
    },
    {
      id: 'cy-kzt',
      value: 'kzt',
    },
    {
      id: 'cy-uah',
      value: 'uah',
    },
  ];

  setCurrency(currency: string): void {
    this.currentCurrency = currency;
    console.log('New currency is: ', this.currentCurrency);
  }

  isCurrency(currency: string): boolean {
    return this.currentCurrency === currency;
  }
}
