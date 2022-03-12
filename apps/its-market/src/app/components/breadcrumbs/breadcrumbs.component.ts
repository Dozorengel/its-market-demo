import { Component, Input } from '@angular/core';
import { Breadcrumb } from './../../models/breadcrumb/breadcrumb';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent {
  @Input() links?: Breadcrumb[];
}
