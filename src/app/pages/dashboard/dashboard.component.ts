import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../modules/auth/auth.service";
import {Admin} from "../../models/admin";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  admin: Admin;

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.admin = this.authService.currentUserValue;
  }
}
