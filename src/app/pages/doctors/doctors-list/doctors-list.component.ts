import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {DoctorList} from "../../../models/doctorList";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../services/global-variable.service";

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})

export class DoctorsListComponent implements OnInit {
  page = 0;
  pageSize = 10;
  direction = '';
  sortBy = 'id';
  status = '';
  doctors: DoctorList = {};
  total: any;
  searchForm: FormGroup | any;
  searchMentorTextChanged = new Subject<string>();
  searchMentorText: any = '';
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
        this.getDoctors();
      } else if ((page || page == 0) && status && !searchText) {
        this.page = Number(page);
        this.status = status;
        this.getDoctors();
      } else if ((page || page == 0) && !status && searchText) {
        this.page = Number(page);
        this.searchMentorText = searchText;
        this.searchDocs();
      } else if ((page || page == 0) && status && searchText) {
        this.page = Number(page);
        this.status = status;
        this.searchMentorText = searchText;
        this.searchDocs();
      }
    })
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.searchMentorTextChanged.pipe(debounceTime(400)).subscribe(val => {
      if (this.searchMentorText == '') {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {searchText: ''},
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      }
      if (this.searchMentorText?.length > 3 && this.firstLoad) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {searchText: this.searchMentorText},
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
    if (this.searchMentorText.length > 0) {
      this.searchDocs();
    } else {
      this.getDoctors();
    }
  }

  sortRefresh() {
    if (this.direction == 'DESC' || this.direction == 'ASC') {
      this.direction = '';
    }
  }

  searchDocs(): any {
    this.loading = true;
    this.doctors = {};
    this.apiService.searchDoctor(this.direction, this.page, this.pageSize, this.sortBy, this.status, this.searchMentorText).subscribe((value: any) => {
      this.doctors = value;
      this.total = value.totalPages;
    }, (error: any) => {
      this.toastrService.warning('خطایی رخ داد')
    }).add(() => {
      setTimeout(() => this.loading = false, 500);
    })
  }

  getDoctors() {
    this.firstLoad = true;
    this.loading = true;
    this.doctors = {};
    this.apiService.getDoctors(this.direction, this.page, this.pageSize, this.sortBy, this.status).subscribe((value: any) => {
      this.doctors = value;
      this.total = value.totalPages;
    }, (error: any) => {
      this.toastrService.error('لیست پزشکان قابل دریافت نیست');
    }).add(() => {
      setTimeout(() => this.loading = false, 500);
    });
    /*this.direction = 'ASC';
    this.sortBy = 'id';*/
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
        this.status = '';
        break;
      }
      case 1: {
        this.status = 'VERIFIED';
        break;
      }
      case 2: {
        this.status = 'NEW';
        break;
      }
      case 3: {
        this.status = 'BANNED';
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
