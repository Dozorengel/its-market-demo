import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AboutPageComponent } from './pages/service-pages/about-page/about-page.component';
import { DeliveryPageComponent } from './pages/service-pages/delivery-page/delivery-page.component';
import { PaymentPageComponent } from './pages/service-pages/payment-page/payment-page.component';
import { PrivacyPageComponent } from './pages/service-pages/privacy-page/privacy-page.component';
import { ConfidentialityPageComponent } from './pages/service-pages/confidentiality-page/confidentiality-page.component';
import { DownloadPageComponent } from './pages/download-page/download-page.component';
import { OrderStatusPageComponent } from './pages/order-status-page/order-status-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'catalog/:category/:tag',
    component: CatalogPageComponent,
  },
  {
    path: 'catalog/:category',
    component: CatalogPageComponent,
  },
  {
    path: 'product/:slug',
    component: DetailPageComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'order',
    component: OrderPageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: 'delivery',
    component: DeliveryPageComponent,
  },
  {
    path: 'payment',
    component: PaymentPageComponent,
  },
  {
    path: 'privacy',
    component: PrivacyPageComponent,
  },
  {
    path: 'confidentiality',
    component: ConfidentialityPageComponent,
  },
  {
    path: 'order-status/:order_uid',
    component: OrderStatusPageComponent,
  },
  {
    path: 'download/:uuid_customer/:uuid_cart_item',
    component: DownloadPageComponent,
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
