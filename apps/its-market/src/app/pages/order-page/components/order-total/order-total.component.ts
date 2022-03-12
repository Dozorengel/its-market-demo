import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CustomerService } from '../../../../services/customer/customer.service';
import { FormGroup } from '@angular/forms';
import { RequestOrderDTO } from '@its-market/order';
import { CartItemDTO } from '@its-market/cart-item';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.css'],
})
export class OrderTotalComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() formSubmit: EventEmitter<Partial<RequestOrderDTO>> = new EventEmitter<
    Partial<RequestOrderDTO>
  >();
  count = 0;
  isDigital = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getProducts().subscribe((products: CartItemDTO[]) => {
      this.count = 0;
      for (const product of products) {
        this.count += product.count;
      }
    });

    this.customerService.getIsDigital().subscribe((res: boolean) => {
      this.isDigital = res;
    });
  }

  validate() {
    if (this.form && !this.form.invalid) return;
    if (this.isDigital) {
      if (!this.checkContactDataValid()) return 'контактную информацию';
    } else {
      if (!this.checkPhoneValid()) return 'ваш телефон';
      else if (!this.checkDeliveryValid()) return 'данные для доставки';
      else if (!this.checkDeliveryTypeValid()) return 'способ доставки';
    }
    if (!this.checkAllowPersonalData()) return 'разрешение на обработку персональных данных';
    return;
  }

  checkPhoneValid() {
    return this.form?.controls.phoneCountry.valid && this.form?.controls.phone.valid;
  }

  checkContactDataValid() {
    return (
      this.checkPhoneValid() && this.form?.controls.name.valid && this.form?.controls.email.valid
    );
  }

  checkAllowPersonalData() {
    return this.form?.controls.allowPersonalData.valid;
  }

  checkDeliveryValid() {
    return (
      this.form.controls.country.valid &&
      this.form.controls.city.valid &&
      this.form.controls.postalCode.valid &&
      this.form.controls.address.valid &&
      this.form.controls.name.valid &&
      this.form.controls.email.valid
    );
  }

  checkDeliveryTypeValid() {
    return this.form.controls.delivery_id.valid;
  }

  submit() {
    const orderData = {
      orderInfo: {
        phone: this.form.value.phoneCountry + this.form.value.phone,
        country: this.form.value.country,
        city: this.form.value.city,
        postalCode: this.form.value.postalCode,
        address: this.form.value.address,
        name: this.form.value.name,
        email: this.form.value.email,
      },
      currency: 'RUB',
      delivery: { id: this.form.value.delivery_id },
    };
    this.formSubmit.emit(orderData);
  }
}
