import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { CartItemDTO } from '@its-market/cart-item';
import { DeliveryService } from './../../services/delivery/delivery.service';
import { CustomerService } from './../../services/customer/customer.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-total-price',
  templateUrl: './total-price.component.html',
  styleUrls: ['./total-price.component.css'],
})
export class TotalPriceComponent implements OnInit {
  @Input() title: string;
  @Input() role: string;
  @Input() isDisabled = false;
  @Output() buttonClick = new EventEmitter();
  showPromoCode = false;
  promoCode = '';
  promoAmount = 0;
  sum = 0;
  total = 0;
  products: CartItemDTO[];
  delivery = 0;
  showDelivery = false;
  promoCodeForm: FormGroup;
  promoCodeErr = false;

  constructor(private customerService: CustomerService, private deliveryService: DeliveryService) {}

  ngOnInit() {
    this.promoCodeForm = new FormGroup({
      promoCode: new FormControl('', Validators.required),
    });
    combineLatest([
      this.customerService.getTotal(),
      this.customerService.getTotalWithPromoCode(),
      this.customerService.getPromoCode(),
      this.customerService.getProducts(),
      this.deliveryService.getDelivery(),
    ]).subscribe(([sum, total, promoCode, products, delivery]) => {
      this.sum = sum;
      this.total = total;
      this.products = products;
      // применить промокод
      if (!promoCode) {
        this.promoCode = '';
        this.promoAmount = 0;
      } else {
        this.promoCode = promoCode.code;
        this.promoAmount = (sum - total) / 100;
      }
      // посчитать доставку
      if (delivery) {
        this.delivery =
          (this.total >= delivery.limit && delivery.type === 'postal' ? 0 : delivery.price) / 100;
        this.showDelivery = true;
      } else {
        this.showDelivery = false;
        this.delivery = 0;
      }
      // перевод из копеек в рубли
      this.sum /= 100;
      this.total = this.total / 100 + this.delivery;
    });
  }

  applyPromoCode() {
    this.promoCode = this.promoCodeForm.value.promoCode;
    this.customerService
      .applyPromoCode(this.promoCode)
      .pipe(
        catchError(() => {
          this.promoCodeForm.setErrors({ promoCodeInvalid: true });
          return of('');
        }),
      )
      .subscribe();
  }

  detachPromoCode() {
    this.customerService.detachPromoCode().subscribe();
  }

  click() {
    this.buttonClick.emit();
  }
}
