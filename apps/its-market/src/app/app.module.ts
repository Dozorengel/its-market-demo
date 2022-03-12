import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import '@angular/common/locales/global/ru';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/layout/header/header.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { SliderComponent } from './pages/home-page/components/slider/slider.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ProductBoxComponent } from './pages/home-page/components/product-box/product-box.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { PromoBoxComponent } from './pages/home-page/components/promo-box/promo-box.component';
import { PromoCardComponent } from './pages/home-page/components/promo-card/promo-card.component';
import { TagsListComponent } from './pages/home-page/components/tags-list/tags-list.component';
import { deliveryInfoComponent } from './pages/home-page/components/delivery-info/delivery-info.component';
import { PostBoxComponent } from './pages/home-page/components/post-box/post-box.component';
import { PostCardComponent } from './pages/home-page/components/post-card/post-card.component';
import { AverageColorDirective } from './directives/average-color/average-color.directive';
import { TimerDirective } from './directives/timer/timer.directive';
import { FormatTimePipe } from './pipes/format-time/format-time.pipe';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { AboutPageComponent } from './pages/service-pages/about-page/about-page.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartListComponent } from './pages/cart-page/components/cart-list/cart-list.component';
import { CartItemComponent } from './pages/cart-page/components/cart-item/cart-item.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { OrderInfoComponent } from './pages/order-page/components/order-info/order-info.component';
import { PhoneMaskDirective } from './directives/phone-mask/phone-mask.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TotalPriceComponent } from './components/total-price/total-price.component';
import { OrderTotalComponent } from './pages/order-page/components/order-total/order-total.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CartModalComponent } from './pages/cart-page/components/cart-modal/cart-modal.component';
import { CartModalItemComponent } from './pages/cart-page/components/cart-modal-item/cart-modal-item.component';
import { ServiceTextComponent } from './components/service-text/service-text.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { DetailFaceComponent } from './pages/detail-page/components/detail-face/detail-face.component';
import { DetailContentComponent } from './pages/detail-page/components/detail-content/detail-content.component';
import { CartArrowComponent } from './pages/cart-page/components/cart-arrow/cart-arrow.component';
import { CurrencyModule } from '@its-market/currency';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ShareModule } from 'ngx-sharebuttons';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { DeliveryPageComponent } from './pages/service-pages/delivery-page/delivery-page.component';
import { PaymentPageComponent } from './pages/service-pages/payment-page/payment-page.component';
import { PrivacyPageComponent } from './pages/service-pages/privacy-page/privacy-page.component';
import { ConfidentialityPageComponent } from './pages/service-pages/confidentiality-page/confidentiality-page.component';
import { DownloadPageComponent } from './pages/download-page/download-page.component';
import { UiModule } from '@its-market/ui';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { NgxDadataModule } from '@kolkov/ngx-dadata';
import { OrderStatusPageComponent } from './pages/order-status-page/order-status-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    SliderComponent,
    FooterComponent,
    ProductBoxComponent,
    ProductCardComponent,
    PromoBoxComponent,
    PromoCardComponent,
    TagsListComponent,
    deliveryInfoComponent,
    PostBoxComponent,
    PostCardComponent,
    AverageColorDirective,
    TimerDirective,
    FormatTimePipe,
    HomePageComponent,
    CatalogPageComponent,
    AboutPageComponent,
    PageHeaderComponent,
    CartPageComponent,
    CartListComponent,
    CartItemComponent,
    CartModalComponent,
    CartModalItemComponent,
    OrderPageComponent,
    OrderInfoComponent,
    PhoneMaskDirective,
    TotalPriceComponent,
    OrderTotalComponent,
    CartModalComponent,
    CartModalItemComponent,
    ServiceTextComponent,
    DetailPageComponent,
    DetailFaceComponent,
    DetailContentComponent,
    CartArrowComponent,
    NotFoundPageComponent,
    DeliveryPageComponent,
    PaymentPageComponent,
    ConfidentialityPageComponent,
    PrivacyPageComponent,
    DownloadPageComponent,
    BreadcrumbsComponent,
    OrderStatusPageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CurrencyModule,
    ShareButtonModule.withConfig({}),
    ShareModule,
    MatButtonModule,
    UiModule,
    NgxDadataModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'ru',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
