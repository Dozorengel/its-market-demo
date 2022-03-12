import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appPhoneMask]',
})
export class PhoneMaskDirective {
  prevValue = '';
  constructor(public ngControl: NgControl) {}

  @HostListener('ngModelChange', ['$event'])
  onModelChange(value: string) {
    this.onInputChange(value);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event: { target: HTMLInputElement }) {
    this.onInputChange(event.target.value);
  }

  onInputChange(initValue: string) {
    let value = initValue.replace(/\D/g, '');
    switch (true) {
      case !this.prevValue && value.length > 10:
        value = value.substring(1);
        value = value.replace(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, '$1 $2-$3-$4');
        break;
      case value.length === 0:
        value = '';
        break;
      case value.length <= 3:
        value = value.replace(/^(\d{0,3})/, '$1');
        break;
      case value.length <= 6:
        value = value.replace(/^(\d{0,3})(\d{0,3})/, '$1 $2');
        break;
      case value.length <= 8:
        value = value.replace(/^(\d{0,3})(\d{0,3})(\d{0,2})/, '$1 $2-$3');
        break;
      case value.length <= 10:
        value = value.replace(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, '$1 $2-$3-$4');
        break;
      default:
        value = value.substring(0, 10);
        value = value.replace(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, '$1 $2-$3-$4');
    }
    this.prevValue = value;
    this.ngControl.valueAccessor?.writeValue(value);
  }
}
