import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';

@Pipe({
  name: 'currencyRub',
})
export class CurrencyRubPipe implements PipeTransform {
  transform(
    value: number,
    currencyCode: string = 'RUB',
    digitsInfo: string = '1.0-0',
    locale: string = 'ru',
  ): string | null {
    return formatCurrency(
      value,
      locale,
      getCurrencySymbol(currencyCode, 'narrow'),
      currencyCode,
      digitsInfo,
    );
  }
}
