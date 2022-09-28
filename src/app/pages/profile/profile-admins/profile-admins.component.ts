import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Admin} from "../../../models/admin";
import {GlobalVariableService} from "../../../services/global-variable.service";
import {AuthService} from "../../../modules/auth/auth.service";

@Component({
  selector: 'app-profile-admins',
  templateUrl: './profile-admins.component.html',
  styleUrls: ['./profile-admins.component.scss']
})
export class ProfileAdminsComponent implements OnInit {
  page = 0;
  pageSize = 100;
  sortBy = 'created';
  currentPage: any = 1;
  total: any;
  admins: Admin[] = [];
  currentAdmin: Admin;
  loading = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    public globalVariableService: GlobalVariableService,
  ) {
    this.currentAdmin = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins() {
    this.loading = true;
    this.apiService.getAdmins(this.page, this.pageSize, this.sortBy).subscribe((value: any) => {
      this.admins = value.content;
      this.total = value.totalPages;
    }, error => {
      this.toastrService.warning('دریافت لیست ادمین با خطا مواجه شد')
    }).add(() => {
      this.loading = false;
    });
  }
}
