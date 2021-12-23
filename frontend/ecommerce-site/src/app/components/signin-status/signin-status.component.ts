import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/common/customer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin-status',
  templateUrl: './signin-status.component.html',
  styleUrls: ['./signin-status.component.css']
})
export class SigninStatusComponent implements OnInit {

  customer : Customer;

  customers :Customer[];

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    // Subscribe to authentication state changes
    this.authService.authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        // this.getUserDetails();
      }
    );
    
  }

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

  logout() {
    // Terminates the session with Okta and removes current tokens.
    this.authService.signOut();
  }


}
