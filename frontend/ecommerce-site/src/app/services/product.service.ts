import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';


  constructor(private httpClient: HttpClient) { }
/////////////////////////////////////////////////////////////////
  getProductList(theCategoryId: number): Observable<Product[]> {
    // need to build URL based on category id
    const searchUrl = this.baseUrl + '/search/findByCategoryId?id=' + theCategoryId;
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
/////////////////////////////////////////////////////////////////
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
/////////////////////////////////////////////////////////////////
  searchProducts(theKeyword: string): Observable<Product[]> {
    // need to build URL based on the keyword
    const searchUrl = this.baseUrl + '/search/findByNameContaining?name=' + theKeyword ;
    return this.getProducts(searchUrl);
  }
/////////////////////////////////////////////////////////////////
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }
/////////////////////////////////////////////////////////////////
 getAllProducts(): Observable<Product[]> {
  return this.httpClient.get<GetResponseProducts>(this.baseUrl + "?size=500").pipe(map(response => response._embedded.products));
}
/////////////////////////////////////////////////////////////////
  getProduct(theProductId: number): Observable<Product> {
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
/////////////////////////////////////////////////////////////////
  getProductListPaginate(thePage: number,
                          thePageSize: number,
                          theCategoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
/////////////////////////////////////////////////////////////////
  getCategoryProductByProduct(productId : number): Observable<ProductCategory>{
    return this.httpClient.get<ProductCategory>(`http://localhost:8080/api/products/${productId}/category`);
  }
/////////////////////////////////////////////////////////////////
  remove(id: number) {
    return this.httpClient.delete(this.baseUrl+"/"+id);
  }
////////////////////////////////////////////////////////////////
  update(id: number, value: any) {
    return this.httpClient.put(this.baseUrl + '/' + id , value);
  }
////////////////////////////////////////////////////////////////
  create(value: any) {
    return this.httpClient.post(this.baseUrl,value);
  }


}
/////////////////////////////////////////////////////////////////
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
/////////////////////////////////////////////////////////////////
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
/////////////////////////////////////////////////////////////////
