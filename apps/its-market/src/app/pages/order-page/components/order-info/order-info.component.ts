import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DeliveryService } from '../../../../services/delivery/delivery.service';
import { CustomerService } from '../../../../services/customer/customer.service';
import { DeliveryDTO } from '@its-market/delivery';
import { ValidatorErrorDTO } from '@its-market/validator-errors';
import { combineLatest } from 'rxjs';
import { DadataConfig, DadataSuggestion, DadataType } from '@kolkov/ngx-dadata';
import { DadataAddress } from '@kolkov/ngx-dadata/lib/models/data';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css'],
})
export class OrderInfoComponent implements OnInit {
  @Input() errors: ValidatorErrorDTO;
  @Output() formChange = new EventEmitter<FormGroup>();
  config: DadataConfig = {
    apiKey: '',
    type: DadataType.address,
    locations: [],
  };
  isDigital = true;
  total = 0;
  count = 0;
  form: FormGroup;
  deliveries: DeliveryDTO[] = [];
  filteredDeliveries: DeliveryDTO[] = [];
  areaCode: string;
  addressNotSelected = true;
  prevPhoneValue = '';

  countries = [
    { name: 'Россия', code: '+7' },
    { name: 'Беларусь', code: '+375' },
    { name: 'Казахстан', code: '+7' },
    { name: 'Украина', code: '+380' },
  ];

  constructor(
    private fb: FormBuilder,
    private deliveryService: DeliveryService,
    private customerService: CustomerService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      phoneCountry: [this.countries[0].code, Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      allowPersonalData: [false, [Validators.required, Validators.requiredTrue]],
      country: [this.countries[0].name],
      city: [''],
      postalCode: ['', [Validators.pattern('^[a-zA-Z|\\d]\\d*$')]],
      address: [''],
      delivery_id: [0],
    });

    this.form.controls.city?.setValidators((): ValidationErrors | null => {
      if (
        !this.isDigital &&
        this.form.value['country'] === this.countries[0].name &&
        this.addressNotSelected
      )
        return { addressNotSelected: true };
      return null;
    });

    this.form.controls.city?.valueChanges.subscribe(() => {
      this.addressNotSelected = true;
    });

    combineLatest([
      this.deliveryService.getDeliveries(),
      this.customerService.getTotal(),
    ]).subscribe(([deliveries, total]) => {
      this.deliveries = deliveries;
      this.total = total;
    });

    this.customerService.getCount().subscribe((count: number) => {
      this.count = count;
      if (!count) {
        this.deliveryService.setDelivery(undefined);
      }
    });

    this.customerService.getIsDigital().subscribe((isDigital: boolean) => {
      this.isDigital = isDigital;
      if (this.isDigital) {
        this.form.patchValue({ delivery_id: 0 });
        this.form.controls.delivery_id.clearValidators();
        this.form.controls.delivery_id.updateValueAndValidity();
      } else {
        this.form.controls.delivery_id.setValidators([Validators.min(1)]);
        this.form.controls.delivery_id.updateValueAndValidity();
      }
    });
    this.form.get('delivery_id')?.valueChanges.subscribe((value) => {
      this.deliveryService.setDelivery(this.deliveries.find((elem) => elem.id === value));
    });
    this.form.get('country')?.valueChanges.subscribe(() => {
      if (this.form.value['country'] === this.countries[0].name) this.filterDeliveries();
      this.form.patchValue({ delivery_id: 0 });
    });
    this.form.controls.phone?.valueChanges.subscribe(() => {
      this.form.patchValue(
        { phone: this.processPhone(this.form.controls.phone.value) },
        { emitEvent: false, onlySelf: true },
      );
    });
    this.form.valueChanges.subscribe(() => {
      this.formChange.emit(this.form);
    });

    this.areaCode = this.countries[0].code;
    this.formChange.emit(this.form);
  }

  filterDeliveries(data?: DadataAddress) {
    this.form.patchValue({ delivery_id: 0 });
    this.filteredDeliveries = [];
    if (data) {
      this.filteredDeliveries = this.deliveries.filter((elem) =>
        elem.region.match(`^${data.city}$`),
      );
      if (this.filteredDeliveries.length === 0)
        this.filteredDeliveries = this.deliveries.filter((elem) =>
          elem.region.match(`^${data.region}$`),
        );
      if (this.filteredDeliveries.length === 0)
        this.filteredDeliveries = this.deliveries.filter((elem) =>
          elem.region.match(`^${data.country}$`),
        );
    }
    if (this.filteredDeliveries.length === 0)
      this.filteredDeliveries = this.deliveries.filter((elem) =>
        elem.region.toLowerCase().match('не россия'),
      );
  }

  processPhone(initValue: string) {
    let value = initValue.replace(/\D/g, '');
    switch (true) {
      case !this.prevPhoneValue && value.length > 10:
        value = value.substring(1);
        break;
      case value.length === 0:
        value = '';
        break;
      default:
        value = value.substring(0, 10);
    }
    this.prevPhoneValue = value;
    return value;
  }

  onAddressSelected(data: DadataSuggestion) {
    this.addressNotSelected = false;
    this.form.controls.city?.updateValueAndValidity();
    this.filterDeliveries(data.data as DadataAddress);
  }

  markAsTouched() {
    this.form.controls.city?.markAsTouched();
  }
}
