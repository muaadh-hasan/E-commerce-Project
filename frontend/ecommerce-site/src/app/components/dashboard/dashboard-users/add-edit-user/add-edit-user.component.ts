import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Customer } from 'src/app/common/customer';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  customer: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  user = new Customer();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    // private alertService: AlertService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;



    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    const formOptions: AbstractControlOptions = { validators: this.MustMatch('password', 'confirmPassword') };
    this.customer = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
      confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
    }, formOptions);

    if (!this.isAddMode) {
      this.userService.getById(this.id)
        .pipe(first())
        .subscribe(data => {
          this.user = data;
          console.log("user name is : " + this.user.firstName);
          this.customer.patchValue(this.user);
        });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.customer.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.customer.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    this.userService.create(this.customer.value)
      .pipe(first())
      .subscribe({
        next: response => {
          alert("success, User Added!");
          this.router.navigateByUrl('/dashboard-users');
        },
        error: err => {
          alert(`There is an Error : + ${err.message}`);
        }
      })
      .add(() => this.loading = false);
  }

  private updateUser() {
    this.userService.update(this.id, this.customer.value)
      .pipe(first())
      .subscribe({
        next: response => {
          alert("success, User updated!");
          this.router.navigateByUrl('/dashboard-users');
        },
        error: err => {
          alert(`There is an Error : + ${err.message}`);
        }


      })
      .add(() => this.loading = false);
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (group: AbstractControl) => {
      const formGroup = <FormGroup>group;
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return null;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    }
  }

}
