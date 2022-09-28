import {Component, OnInit} from '@angular/core';
import {Transaction} from "../../models/transaction";
import {ApiService} from "../../services/api.service";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../services/global-variable.service";

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.scss']
})
export class FinancialComponent implements OnInit {
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
    public globalVariableService: GlobalVariableService,
  ) {
    this.getTransaction();
  }

  ngOnInit(): void {
  }

  getTransaction() {
    this.loading = true;
    this.transactions = [];
    this.apiService.getAllTransActions(this.direction, this.page, this.pageSize, this.sortBy, this.type).subscribe((value: any) => {
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
        break;
      }
    }
    this.getTransaction();
  }
}
