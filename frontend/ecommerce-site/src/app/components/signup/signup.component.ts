import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { AuthService } from 'src/app/services/auth.service';
import { MyValidators } from 'src/app/validators/my-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupFormGroup: FormGroup;

  //////////////////////////////////////////////////////////////////
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService , private router: Router) { }
  //////////////////////////////////////////////////////////////////
  ngOnInit(): void {

    this.signupFormGroup = this.formBuilder.group({
      registerForm: this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          MyValidators.notOnlyWhitespace]),

        lastName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          MyValidators.notOnlyWhitespace]),
        password: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          MyValidators.notOnlyWhitespace]),

        email: new FormControl('',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      })
    });


  }
  ///////////////////////////////////////////////////////////////////
  get firstName() { return this.signupFormGroup.get('registerForm.firstName'); }
  get lastName() { return this.signupFormGroup.get('registerForm.lastName'); }
  get email() { return this.signupFormGroup.get('registerForm.email'); }
  get password() { return this.signupFormGroup.get('registerForm.password'); }
  //////////////////////////////////////////////////////////////////

  onSubmit() {

    let customer = new Customer();

    customer = this.signupFormGroup.controls["registerForm"].value;
    customer.role = 'user';

    this.authService.register(customer).subscribe({
      next: res => {
        if (res) {
          alert(`Successful Register!, you can login now`);
          this.router.navigateByUrl("/signin");
        } else {
          alert(`Something Wrong!!, Try Again`);
        }
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    }


    )

  }
  //////////////////////////////////////////////////////////////////



}


