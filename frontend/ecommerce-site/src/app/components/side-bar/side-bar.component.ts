import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/common/customer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  // authState : boolean = false;
  // user = new Customer();

  constructor(private authService : AuthService) { }

  ngOnInit() {

    // this.authService.authenticationState.subscribe(d=>this.authState = d);

    // if(this.authState){
    //   this.authService.currentCustomer.subscribe(u=>this.user=u);
    // }

    // console.log("user name and role :"+ this.user.firstName + " " + this.user.role );


  }

}
