import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { Product } from 'src/app/common/product';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders : Order[];
  customer = new Customer();
  authState = false;

  constructor(private orderService : OrderService,
              private authService : AuthService,
              private productService : ProductService) { }

  ngOnInit() {
    this.authService.authenticationState.subscribe(data=> this.authState = data);
    if(this.authState){
      this.authService.currentCustomer.subscribe(data => this.customer = data);
      this.getOrders();
    }
  }

  getOrders(){
    this.orderService.getOrdersByUser(this.customer.id).subscribe(data => this.orders = data);
  }

  getProductName(id:number){
    let product : Product;

    this.productService.getProduct(id).pipe(first()).subscribe(
      data => product = data
    )
    return product.name;
  }

  deleteOrder(id:number){
    this.orderService.delete(id).subscribe({
      next: res => {
        alert("Order deleted successfuly!");
        this.getOrders();
      },
      error: err => alert(`There was an error: ${err.message}`)
    });
  }

}
