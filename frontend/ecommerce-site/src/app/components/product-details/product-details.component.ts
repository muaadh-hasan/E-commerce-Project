import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  authState : boolean = false;

  //////////////////////////////////////////////////////////
  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private authService : AuthService,
              private router : Router) { }
//////////////////////////////////////////////////////////
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
    this.authService.authenticationState.subscribe(data => this.authState = data);
  }
//////////////////////////////////////////////////////////
  handleProductDetails() {
    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }
//////////////////////////////////////////////////////////
  addToCart() {
    // console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    // const theCartItem = new CartItem(this.product);
    // this.cartService.addToCart(theCartItem);

    if(this.authState){
      const theCartItem = new CartItem(this.product);
      this.cartService.addToCart(theCartItem);
    }
    else {
      alert("You have to login first!");
      this.router.navigateByUrl("/signin");
    }
  }
//////////////////////////////////////////////////////////
}
