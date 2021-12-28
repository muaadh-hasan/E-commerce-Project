import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { SignInData } from 'src/app/common/signInData';
import { AuthService } from 'src/app/services/auth.service';
import { MyValidators } from 'src/app/validators/my-validators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginFormGroup: FormGroup;

  customer : Customer;


  // customers: Customer[] = [];

  //////////////////////////////////////////////////////////////////
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService , private router: Router) { }
  //////////////////////////////////////////////////////////////////
  ngOnInit(): void {

    this.loginFormGroup = this.formBuilder.group({
      loginForm: this.formBuilder.group({
        password: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          MyValidators.notOnlyWhitespace]),

        email: new FormControl('',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      })
    });

    this.authService.currentCustomer.subscribe(data => this.customer = data);


  }
  ///////////////////////////////////////////////////////////////////
  get email() { return this.loginFormGroup.get('loginForm.email'); }
  get password() { return this.loginFormGroup.get('loginForm.password'); }
  //////////////////////////////////////////////////////////////////

  // getUsers() {
  //   this.authService.getUsers().subscribe(
  //     data => {
  //       this.customers = data;

  //       console.log("Retrieved customers: " + JSON.stringify(data));
  //     }
  //   );
  // }
  //////////////////////////////////////////////////////////////////
  onSubmit() {

    let signInData = new SignInData();

    signInData = this.loginFormGroup.controls['loginForm'].value;

    this.authService.signIn(signInData).subscribe({
      next : response => {

        console.log("response Login: " + JSON.stringify(response));
        if(response != null){
          this.authService.currentCustomer.next(response);
          this.authService.authenticationState.next(true);
          alert(`Successful login!, Welcome : ${this.customer.firstName}`);
          this.router.navigateByUrl("/products");
        }else{
          alert(`login is failed!, check email or password is wrong.`);
        }
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    })

   }
  //////////////////////////////////////////////////////////////////



}


