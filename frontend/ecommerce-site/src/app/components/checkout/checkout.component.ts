import { CartService } from './../../services/cart.service';
import { MRFormService } from './../../services/Mrform.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { MyValidators } from 'src/app/validators/my-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  addressStates: State[] = [];


///////////////////////////////////////////////////////////////
  constructor(private formBuilder: FormBuilder , private mRFormService:MRFormService, private cartService: CartService) { }
///////////////////////////////////////////////////////////////
  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
                              [Validators.required,
                               Validators.minLength(2),
                               MyValidators.notOnlyWhitespace]),

        lastName:  new FormControl('',
                              [Validators.required,
                               Validators.minLength(2),
                               MyValidators.notOnlyWhitespace]),

        email: new FormControl('',
                              [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      address: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2),
                                     MyValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2),
                                    MyValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2),
                                      MyValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard:  new FormControl('', [Validators.required, Validators.minLength(2),
                                          MyValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    });


     // populate credit card months

     const startMonth: number = new Date().getMonth() + 1;
     console.log("startMonth: " + startMonth);

     this.mRFormService.getCreditCardMonths(startMonth).subscribe(
       data => {
         console.log("Retrieved credit card months: " + JSON.stringify(data));
         this.creditCardMonths = data;
       }
     );

     // populate credit card years

     this.mRFormService.getCreditCardYears().subscribe(
       data => {
         console.log("Retrieved credit card years: " + JSON.stringify(data));
         this.creditCardYears = data;
       }
     );

     this.mRFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );

  }
///////////////////////////////////////////////////////////////
  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }
///////////////////////////////////////////////////////////////
  get addressStreet() { return this.checkoutFormGroup.get('address.street'); }
  get addressCity() { return this.checkoutFormGroup.get('address.city'); }
  get addressState() { return this.checkoutFormGroup.get('address.state'); }
  get addressZipCode() { return this.checkoutFormGroup.get('address.zipCode'); }
  get addressCountry() { return this.checkoutFormGroup.get('address.country'); }
///////////////////////////////////////////////////////////////
  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }
 
///////////////////////////////////////////////////////////////
  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup!.value.expirationYear);



    // if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.mRFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }
///////////////////////////////////////////////////////////////
  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.mRFormService.getStates(countryCode).subscribe(
      data => {
        this.addressStates = data;
        // select first item by default
        formGroup!.get('state')!.setValue(data[0]);
      }
    );
  }
///////////////////////////////////////////////////////////////
  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log("The email address is " + this.checkoutFormGroup.get('customer')!.value.email);

    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress')!.value.country.name);
    console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress')!.value.state.name);

  }
///////////////////////////////////////////////////////////////

reviewCartDetails() {

  // subscribe to cartService.totalQuantity
  this.cartService.totalQuantity.subscribe(
    totalQuantity => this.totalQuantity = totalQuantity
  );

  // subscribe to cartService.totalPrice
  this.cartService.totalPrice.subscribe(
    totalPrice => this.totalPrice = totalPrice
  );

}
///////////////////////////////////////////////////////////////


}
