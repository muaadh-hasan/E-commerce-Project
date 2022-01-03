import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddUpdateProductListComponent } from './components/dashboard/dashboard-product-list/add-update-product-list/add-update-product-list.component';
import { DashboardProductListComponent } from './components/dashboard/dashboard-product-list/dashboard-product-list.component';
import { DashboardUsersComponent } from './components/dashboard/dashboard-users/dashboard-users.component';
import { AddEditUserComponent } from './components/dashboard/dashboard-users/add-edit-user/add-edit-user.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  {path: 'orders', component: OrdersComponent},
  {path: 'product-update/:id', component: AddUpdateProductListComponent},
  {path: 'product-update', component: AddUpdateProductListComponent},
  { path: 'addUser', component: AddEditUserComponent },
  { path: 'editUser/:id', component: AddEditUserComponent },
  {path: 'dashboard-users', component: DashboardUsersComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboard-product-List', component: DashboardProductListComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
