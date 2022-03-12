import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer/customer.service';
import { OrderStatus } from '@its-market/order';

@Component({
  templateUrl: './order-status-page.component.html',
  styleUrls: ['./order-status-page.component.css'],
})
export class OrderStatusPageComponent implements OnInit {
  @Input() orderUID: string;
  status: string;
  orderStatus = OrderStatus;

  constructor(private route: ActivatedRoute, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.orderUID = data.order_uid;
      this.customerService.getOrderStatus(this.orderUID).subscribe((status) => {
        this.status = status.status;
      });
    });
  }
}
