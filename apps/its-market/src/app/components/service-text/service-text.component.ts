import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-text',
  templateUrl: './service-text.component.html',
  styleUrls: ['./service-text.component.css'],
})
export class ServiceTextComponent {
  @Input() title: string;
}
