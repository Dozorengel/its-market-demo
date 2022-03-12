import { Component, Input, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { DetailProductDTO } from '@its-market/product';
import { CustomerService } from '../../../../services/customer/customer.service';
import { Breadcrumb } from './../../../../models/breadcrumb/breadcrumb';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-face',
  templateUrl: './detail-face.component.html',
  styleUrls: ['./detail-face.component.css'],
})
export class DetailFaceComponent implements OnInit, OnDestroy {
  @Input() product: DetailProductDTO;
  isInCart = false;
  preview: HTMLDivElement;
  breadcrumbs: Breadcrumb[];
  previewLink: SafeUrl;

  constructor(
    private customerService: CustomerService,
    private r: Renderer2,
    private el: ElementRef,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.customerService.isProductInCart(this.product.id).subscribe((res) => {
      this.isInCart = res;
    });
    this.preview = this.el.nativeElement.querySelector('.detail-face__preview');
    this.r.appendChild(document.body, this.preview);
    this.breadcrumbs = [
      { slug: `/catalog/${this.product.category.slug}`, title: this.product.category.title },
    ];
    if (this.product.previewLink)
      this.previewLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.product.previewLink);
  }

  ngOnDestroy() {
    this.hidePreview();
  }

  addToCart() {
    this.customerService.addProduct(this.product).subscribe();
  }

  showPreview() {
    this.r.removeClass(this.preview, 'hidden');
    this.r.removeClass(this.preview, 'invisible');
    this.r.removeClass(this.preview, 'opacity-0');
  }

  hidePreview() {
    this.r.addClass(this.preview, 'invisible');
    this.r.addClass(this.preview, 'opacity-0');
  }
}
