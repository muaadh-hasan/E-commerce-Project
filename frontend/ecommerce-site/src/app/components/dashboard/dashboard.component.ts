import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/common/customer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isAdmin = false;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authService.userIsAdmin.subscribe(d=>this.isAdmin = d);
  }
}
