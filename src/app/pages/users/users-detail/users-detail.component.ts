import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {User} from "../../../models/user";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../services/global-variable.service";

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {
  id: any;
  user: User = {}
  loading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private toastrService: ToastrService,
    public globalVariableService: GlobalVariableService,
  ) {
    this.activatedRoute.url.subscribe((url) => {
      this.activatedRoute.queryParams.subscribe((params) => {
        if (this.activatedRoute.snapshot.paramMap.get('id')) {
          this.id = this.activatedRoute.snapshot.paramMap.get('id');
          this.getUser();
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
      this.toastrService.warning('مشکلی بوجود آمده است ، لطفا دوباره تلاش کنید')
    }).add(() => {
      this.loading = false;
    })
  }
}
