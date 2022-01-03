import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../common/customer';
import { map } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class UserService {

  baseUrl: string = "http://localhost:8080/api/customers";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<GetResponseCustomers>(this.baseUrl).pipe(
      map(response => response._embedded.customers)
    );
  }

  getById(id: number) {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  create(params: any) {
    return this.http.post(this.baseUrl, params);
  }

  update(id: number, params: any) {
    return this.http.put(`${this.baseUrl}/${id}`, params);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}

interface GetResponseCustomers {
  _embedded: {
    customers: Customer[];
  },
}

