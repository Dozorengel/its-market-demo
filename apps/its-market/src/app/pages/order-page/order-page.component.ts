import { RequestOrderDTO } from '@its-market/order';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidatorErrorDTO } from '@its-market/validator-errors';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent {
  form: FormGroup;
  errors: ValidatorErrorDTO;

  constructor(private customerService: CustomerService) {}

  createOrder($orderData: Partial<RequestOrderDTO>) {
    this.customerService.createOrder($orderData).subscribe(
      (res) => {
        window.location.href = res.confirmation_url;
      },
      ({ error }) => {
        this.errors = error;
      },
    );
  }
}
