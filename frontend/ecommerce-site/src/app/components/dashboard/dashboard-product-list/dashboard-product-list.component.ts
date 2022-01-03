import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard-product-list',
  templateUrl: './dashboard-product-list.component.html',
  styleUrls: ['./dashboard-product-list.component.css']
})
export class DashboardProductListComponent implements OnInit {

  products: Product[] = [];

  authState: boolean = false;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }
  //////////////////////////////////////////////////////////////
  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });

    this.authService.authenticationState.subscribe(data => this.authState = data);

  }
  /////////////////////////////////////////////////////////////
  listProducts() {

    this.productService.getAllProducts().subscribe(
      data => {
        this.products = data;
      }
    )
  }
  ////////////////////////////////////////////////////////////

  deleteProduct(id: number) {

    console.log("remove pro with id : " + id);
    this.productService.remove(id).pipe(first()).subscribe({
      next: response => {
        alert('Product Removed successfully!');
        this.listProducts();
      },
      error: err => alert('there is an error : ' + err.message)
    });
  }

}
