import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyRubPipe } from './currencyRub.pipe';

@NgModule({
  declarations: [CurrencyRubPipe],
  imports: [CommonModule],
  exports: [CurrencyRubPipe],
})
export class CurrencyModule {}
