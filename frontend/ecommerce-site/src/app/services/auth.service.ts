import { BehaviorSubject, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Customer } from '../common/customer';
import { HttpClient } from '@angular/common/http';
import { SignInData } from '../common/signInData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private customerUrl = 'http://localhost:8080/api/customers';
  private loginUrl = 'http://localhost:8080/api/auth/login';
  private registerUrl = 'http://localhost:8080/api/auth/register';


  authenticationState = new BehaviorSubject<boolean>(false);
  currentCustomer = new BehaviorSubject<Customer>(null);

  constructor(private httpClient: HttpClient) {}


  getUser() {
    return this.currentCustomer;
  }

  getUsers():Observable<Customer[]>{
    return this.httpClient.get<GetResponseCustomers>(this.customerUrl).pipe(
      map(response => response._embedded.customers)
    );
  }

  signIn(data:SignInData):Observable<any>{
    return this.httpClient.post<Customer>(this.loginUrl , data);
  }


  signOut() {
    this.authenticationState.next(false);
    this.currentCustomer.next(null);
  }

  register(customer : Customer){
    return this.httpClient.post<Customer>(this.registerUrl , customer);
  }



}


interface GetResponseCustomers {
  _embedded: {
    customers: Customer[];
  },
}
