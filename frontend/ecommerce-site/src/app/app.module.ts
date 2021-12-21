import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
    // NgbModal
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
