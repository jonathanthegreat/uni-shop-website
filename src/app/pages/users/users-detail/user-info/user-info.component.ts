import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../../services/api.service";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../../services/global-variable.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user: User = {}
  loading: boolean = false;
  id: any;
  updateLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private toastrService: ToastrService,
    private router: Router,
    public globalVariableService: GlobalVariableService,
    public dialog: MatDialog,
  ) {
    this.activatedRoute.url.subscribe((url) => {
      this.activatedRoute.queryParams.subscribe((params) => {
        if (this.activatedRoute.snapshot.paramMap.get('id')) {
          this.id = this.activatedRoute.snapshot.paramMap.get('id');
          this.getUser();
        } else {
          this.toastrService.warning('کاربری با این آیدی یافت نشد');
          this.router.navigate(['/users/list']);
        }
      });
    });
  }

  ngOnInit(): void {
  }

  getUser() {
    this.loading = true;
    this.api.getUsersById(this.id).subscribe(value => {
      this.user = value;
    }, error => {
      this.toastrService.warning('مشکلی بوجود آمده است ، لطفا دوباره تلاش کنید');
    }).add(() => {
      this.loading = false;
    })
  }

  updateStatus(status: any) {
    this.updateLoading = true;
    this.api.updateUserStatus(this.id, status?.value).subscribe((value: any) => {
      this.toastrService.success('کاربر با موفقیت آپدیت شد');
      this.getUser();
    }, error => {
      this.toastrService.warning('مشکلی بوجود آمده است ، لطفا دوباره تلاش کنید')
    }).add(() => {
      this.updateLoading = false;
    });
  }
}
