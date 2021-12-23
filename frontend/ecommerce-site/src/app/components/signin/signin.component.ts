import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/common/customer';
import { AuthService } from 'src/app/services/auth.service';
import { MyValidators } from 'src/app/validators/my-validators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  checkoutFormGroup: FormGroup;


  customers: Customer[] = [];

  //////////////////////////////////////////////////////////////////
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) { }
  //////////////////////////////////////////////////////////////////
  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          MyValidators.notOnlyWhitespace]),

        lastName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          MyValidators.notOnlyWhitespace]),

        email: new FormControl('',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      })
    });


    this.getUsers();

    for (let i = 0; i < this.customers.length; i++) {
      console.log(this.customers[i].firstName);
    }

  }
  ///////////////////////////////////////////////////////////////////
  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }
  //////////////////////////////////////////////////////////////////

  getUsers() {
    // if (this.isAuthenticated) {
    //   this.customer = this.authService.;
    // }
    this.authService.getUsers().subscribe(
      data => {
        this.customers = data;
      }
    );
  }
  //////////////////////////////////////////////////////////////////
  onSubmit() { }
  //////////////////////////////////////////////////////////////////



}


