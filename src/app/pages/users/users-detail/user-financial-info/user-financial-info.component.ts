import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {ToastrService} from "ngx-toastr";
import {Transaction} from "../../../../models/transaction";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalVariableService} from "../../../../services/global-variable.service";

@Component({
  selector: 'app-user-financial-info',
  templateUrl: './user-financial-info.component.html',
  styleUrls: ['./user-financial-info.component.scss']
})
export class UserFinancialInfoComponent implements OnInit {
  page = 0;
  pageSize = 10;
  direction = 'DESC';
  sortBy = 'id';
  type = 'ALL';
  total: any;
  loading = false;
  transactions: Transaction[] = [];
  id: any = '';
  selectedIndex = 0;

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    public globalVariableService: GlobalVariableService,
    private router: Router,
  ) {
    if (window.location.href.split('/')[6]) {
      this.id = window.location.href.split('/')[6];
      if (this.id) {
        this.getTransaction();
      } else {
        this.toastrService.warning('کاربری با این آیدی یافت نشد');
        this.router.navigate(['/users/list']);
      }
    }
  }

  ngOnInit(): void {
  }

  getTransaction() {
    this.loading = true;
    this.apiService.getUserTransActions(this.direction, this.id, this.page, this.pageSize, this.sortBy, this.type).subscribe((value: any) => {
      this.transactions = value.content;
      this.total = value.totalPages;
    }, error => {
      this.toastrService.warning('مشکلی بوجود آمده است ، لطفا دوباره تلاش کنید');
    }).add(() => {
      this.loading = false;
    })
  }

  changePage(pageNumber: any) {
    this.loading = true;
    window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
    setTimeout(() => {
      this.page = pageNumber - 1;
    }, 500);
    this.getTransaction();
  }

  filter(index: any) {
    this.selectedIndex = index;
    switch (index) {
      case 0: {
        this.type = 'ALL';
        break;
      }
      case 1: {
        this.type = 'SUCCESS';
        break;
      }
      case 2: {
        this.type = 'FAILED';
        break;
      }
      default: {
        //this.status = '';
        break;
      }
    }
    this.getTransaction();
  }
}
