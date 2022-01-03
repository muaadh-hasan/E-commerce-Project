import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  authState : boolean = false;

//////////////////////////////////////////////////////////
  constructor(private productService: ProductService,
              private cartService : CartService,
              private route: ActivatedRoute ,
              private authService : AuthService,
              private router : Router) { }
//////////////////////////////////////////////////////////
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

    this.authService.authenticationState.subscribe(data => this.authState = data);

  }
//////////////////////////////////////////////////////////
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }
//////////////////////////////////////////////////////////
  handleSearchProducts() {

    const theKeyword : string = String(this.route.snapshot.paramMap.get('keyword'));

    // now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }
//////////////////////////////////////////////////////////
  handleListProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    // now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
//////////////////////////////////////////////////////////
  updatePageSize(event:number) {
    // console.log(event);
    this.thePageSize = event;
    this.thePageNumber = 1;
    this.listProducts();
  }
//////////////////////////////////////////////////////////
  addToCart(theProduct: Product) {
    // console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    if(this.authState){
      const theCartItem = new CartItem(theProduct);
      this.cartService.addToCart(theCartItem);
    }
    else {
      alert("You have to login first!");
      this.router.navigateByUrl("/signin");
    }


  }
//////////////////////////////////////////////////////////

}
