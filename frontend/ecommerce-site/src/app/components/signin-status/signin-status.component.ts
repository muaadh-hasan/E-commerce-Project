import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin-status',
  templateUrl: './signin-status.component.html',
  styleUrls: ['./signin-status.component.css']
})
export class SigninStatusComponent implements OnInit {


  isAuthenticated: boolean = false;

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {

    this.authService.authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
      }
    );

  }


  logout() {
    this.authService.signOut();
    this.router.navigateByUrl("/products");
  }


}
