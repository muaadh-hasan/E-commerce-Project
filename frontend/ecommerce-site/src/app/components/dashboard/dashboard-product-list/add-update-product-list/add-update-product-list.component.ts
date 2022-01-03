import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first } from 'rxjs';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { MyValidators } from 'src/app/validators/my-validators';
import { pathToFileURL } from 'url';

@Component({
  selector: 'app-add-update-product-list',
  templateUrl: './add-update-product-list.component.html',
  styleUrls: ['./add-update-product-list.component.css']
})
export class AddUpdateProductListComponent implements OnInit {

  productFormGroup: FormGroup;

  product = new Product() ;
  id: number;
  editMode = false;

  productCategories!: ProductCategory[];

  category : ProductCategory;


  //////////////////////////////////////////////////////////////////
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    ) { }
  //////////////////////////////////////////////////////////////////
  ngOnInit() {

    // console.log("Edit Mode before = " + this.editMode);
    this.productFormGroup = this.formBuilder.group({
      name: ['',
        [Validators.required,
        Validators.minLength(2),
        MyValidators.notOnlyWhitespace]],
      description: ['',
        [Validators.required,
        Validators.minLength(2),
        MyValidators.notOnlyWhitespace]],
      unitPrice: ['',
        [Validators.required,
        Validators.minLength(2),
        MyValidators.notOnlyWhitespace]],
      unitsInStock: ['',
        [Validators.required,
        Validators.minLength(2),
        MyValidators.notOnlyWhitespace]],
      imageUrl: ['',
        [Validators.required,
        Validators.minLength(2),
        MyValidators.notOnlyWhitespace]],
        categoryId: ['',
        [Validators.required,
        Validators.minLength(2),
        MyValidators.notOnlyWhitespace]]
    });


    this.listProductCategories();

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
    });
    // console.log("Edit Mode After = " + this.editMode);

    this.PatchFormForEditMode();
    // console.log("name of product  : " + this.product.name);
  }
  /////////////////////////////////////////////////////////////////
  get name() { return this.productFormGroup.get('name'); }
  get description() { return this.productFormGroup.get('description'); }
  get unitPrice() { return this.productFormGroup.get('unitPrice'); }
  get unitsInStock() { return this.productFormGroup.get('unitsInStock'); }
  get imageUrl() { return this.productFormGroup.get('imageUrl'); }
  get categoryId() { return this.productFormGroup.get('categoryId'); }


  ///////////////////////////////////////////////////////////////////
  handleProductDetails() {
    if (this.editMode) {
      const theProductId: number = Number(this.route.snapshot.paramMap.get('id'));
      this.productService.getProduct(theProductId).subscribe(
        data => {
          this.product = data;
          console.log("name of product inside : " + this.product.name);
        }
      );
    }
  }
  ///////////////////////////////////////////////////////////
  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        // console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }
  //////////////////////////////////////////////////////////
  setProductAndPatchToForm(product: Product){
    this.product = product;
    // console.log("setProductAndPatchToForm :" + this.product.name);

    this.productService.getCategoryProductByProduct(this.id).subscribe(
      response => {
        this.productFormGroup = this.formBuilder.group({
          name: product.name ,
          description: product.description,
          unitPrice: product.unitPrice,
          unitsInStock: product.unitsInStock,
          imageUrl: '',
          categoryId: response.id
        });

      }
    );

    console.log('this.productFormGroup.value : '+ JSON.stringify(this.productFormGroup.value));
  }
  //////////////////////////////////////////////////////////
  PatchFormForEditMode() {

    if (this.editMode) {
      this.productService.getProduct(this.id).subscribe(
        data => {
          this.setProductAndPatchToForm(data);
        }
      );
    }

  }
  //////////////////////////////////////////////////////////
  onSubmit() {

    if(this.productFormGroup.invalid){
      return
    }

    if(this.editMode){
      this.updateProduct();
    }
    else{
      this.addProduct();
    }
  }
  ///////////////////////////////////////////////////////
  addProduct() {
    this.productService.create(this.productFormGroup.value).pipe(first()).subscribe({
      next: res => {
        alert("success, Product Added!");
          this.router.navigateByUrl('/dashboard-product-list');
        },
        error: err => {
          alert(`There is an Error : + ${err.message}`);
        }
    });
  }
  //////////////////////////////////////////////////////
  updateProduct() {
    this.productService.update( this.id ,this.productFormGroup.value).pipe(first()).subscribe({
      next: res => {
        alert("success, Product Updated!");
          this.router.navigateByUrl('/dashboard-product-list');
        },
        error: err => {
          alert(`There is an Error : + ${err.message}`);
        }
    });
  }
/////////////////////////////////////////////////////////
// C:\Users\Moaaz\Documents\GitHub\E-commerce-Project\frontend\ecommerce-site\src\assets\images\products
imageUploaded(event:Event){
  console.log('Imaaggggeee : '+this.productFormGroup.controls['imageUrl'].value);
  console.log('Imaaggggeee event : '+ event);
}

}
