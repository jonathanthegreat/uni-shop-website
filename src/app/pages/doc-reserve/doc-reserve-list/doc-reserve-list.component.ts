import {Component, OnInit} from '@angular/core';
import {debounceTime} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../services/global-variable.service";
import {Subject} from "rxjs";
import {DocReserve} from "../../../models/docReserve";

@Component({
  selector: 'app-doc-reserve-list',
  templateUrl: './doc-reserve-list.component.html',
  styleUrls: ['./doc-reserve-list.component.scss']
})
export class DocReserveListComponent implements OnInit {
  page = 0;
  pageSize = 10;
  direction = 'DESC';
  sortBy = 'created';
  status = 'ALL';
  total: any;
  docReserveList: DocReserve[] = [];
  searchForm: FormGroup | any;
  searchDocReserveTextChanged = new Subject<string>();
  searchDocReserveText: any = '';
  loading = false;
  firstLoad = false;
  selectedIndex = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    public globalVariableService: GlobalVariableService,
  ) {
    this.activatedRoute.queryParamMap.subscribe((value: any) => {
      let page = value.params.page - 1;
      let status = value.params.status;
      let searchText = value.params.searchText;
      let statusIndex = value.params.statusIndex;
      this.sortRefresh();
      if (statusIndex) {
        this.selectedIndex = statusIndex;
      }
      if (!page && page != 0 && !status && !searchText) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {page: 1},
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      } else if ((page || page == 0) && !status && !searchText) {
        this.page = Number(page);
        this.getDoctorReserve();
      } else if ((page || page == 0) && status && !searchText) {
        this.page = Number(page);
        this.status = status;
        this.getDoctorReserve();
      } else if ((page || page == 0) && !status && searchText) {
        this.page = Number(page);
        this.searchDocReserveText = searchText;
        this.searchDoctorReserve();
      } else if ((page || page == 0) && status && searchText) {
        this.page = Number(page);
        this.status = status;
        this.searchDocReserveText = searchText;
        this.searchDoctorReserve();
      }
    })
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.searchDocReserveTextChanged.pipe(debounceTime(400)).subscribe(val => {
      if (this.searchDocReserveText == '') {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {searchText: ''},
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      }
      if (this.searchDocReserveText?.length > 3 && this.firstLoad) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {searchText: this.searchDocReserveText},
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      }
    });
    this.sortRefresh();
  }

  sort(sortCriteria: any, direction: any) {
    this.direction = direction;
    this.sortBy = sortCriteria;
    if (this.searchDocReserveText.length > 0) {
      this.searchDoctorReserve();
    } else {
      this.getDoctorReserve();
    }
  }

  sortRefresh() {
    if (this.direction == 'DESC' || this.direction == 'ASC') {
      this.direction = '';
    }
  }

  searchDoctorReserve(): any {
    this.loading = true;
    this.docReserveList = [];
    this.apiService.searchDoctorReserves(this.direction, this.page, this.pageSize, this.sortBy, this.status, this.searchDocReserveText).subscribe((value: any) => {
      this.docReserveList = value.content;
      this.total = value.totalPages;
    }, (error: any) => {
      this.toastrService.warning('خطایی رخ داد')
    }).add(() => {
      setTimeout(() => this.loading = false, 500);
    })
  }

  getDoctorReserve() {
    this.firstLoad = true;
    this.loading = true;
    this.docReserveList = [];
    this.apiService.getDoctorReserves(this.direction, this.page, this.pageSize, this.sortBy, this.status).subscribe((value: any) => {
      this.docReserveList = value.content;
      this.total = value.totalPages;
    }, (error: any) => {
      this.toastrService.error('لیست نوبت دهی قابل دریافت نیست');
    }).add(() => {
      setTimeout(() => this.loading = false, 500);
    });
  }

  changePage(pageNumber: any) {
    this.loading = true;
    window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
    setTimeout(() => {
      this.page = pageNumber - 1;
    }, 500);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {page: pageNumber},
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  filter(index: any, from: any) {
    switch (index) {
      case 0: {
        this.status = 'ALL';
        break;
      }
      case 1: {
        this.status = 'PROCESSING';
        break;
      }
      case 2: {
        this.status = 'VERIFIED';
        break;
      }
      case 3: {
        this.status = 'DONE';
        break;
      }
      case 4: {
        this.status = 'CANCELED';
        break;
      }
      default: {
        //this.status = '';
        break;
      }
    }
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {status: this.status, page: 1, statusIndex: index},
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }
}
