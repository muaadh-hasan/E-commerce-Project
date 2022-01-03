import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../common/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  private baseUrl = 'http://localhost:8080/api/orders';

  private customerUrl = 'http://localhost:8080/api/customers/';


  constructor(private httpClient: HttpClient) {}


  // http://localhost:8080/api/customers/6/orders
  getOrdersByUser(id:number):Observable<Order[]>{
    return this.httpClient.get<GetResponseOrders>(this.customerUrl + id +'/orders')
    .pipe(
      map(response => response._embedded.orders)
    );
  }

  delete(id: number) {
    return this.httpClient.delete(this.baseUrl+'/'+id);
  }


}


interface GetResponseOrders {
  _embedded: {
    orders: Order[];
  },
}
