import { BehaviorSubject, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Customer } from '../common/customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private customerUrl = 'http://localhost:8080/api/customers';
  
  
  authenticationState = new BehaviorSubject<boolean>(false);
  currentCustomer: Customer;

  constructor(private httpClient: HttpClient) {}


  getUser() {
    return this.currentCustomer; 
  }

  getUsers():Observable<Customer[]>{
    return this.httpClient.get<GetResponseCustomers>(this.customerUrl).pipe(
      map(response => response._embedded.customer)
    );
  }


  signOut() {
    throw new Error('Method not implemented.');
  }

}

interface GetResponseCustomers {
  _embedded: {
    customer: Customer[];
  },
}