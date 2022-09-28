import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalVariableService} from "../../../services/global-variable.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {Subject} from "rxjs";
import {QA} from "../../../models/q&a";

@Component({
  selector: 'app-qa-list',
  templateUrl: './qa-list.component.html',
  styleUrls: ['./qa-list.component.scss']
})
export class QaListComponent implements OnInit {
  page = 0;
  pageSize = 10;
  direction = '';
  sortBy = 'id';
  status = 'ALL';
  qaList: QA[] = [];
  total: any;
  searchForm: FormGroup | any;
  searchQATextChanged = new Subject<string>();
  searchQAText: any = '';
  loading = false;
  firstLoad = false;
  selectedIndex = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public globalVariableService: GlobalVariableService,
    private toastrService: ToastrService,
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
        this.getQAs();
      } else if ((page || page == 0) && status && !searchText) {
        this.page = Number(page);
        this.status = status;
        this.getQAs();
      } else if ((page || page == 0) && !status && searchText) {
        this.page = Number(page);
        this.searchQAText = searchText;
        this.searchQAs();
      } else if ((page || page == 0) && status && searchText) {
        this.page = Number(page);
        this.status = status;
        this.searchQAText = searchText;
        this.searchQAs();
      }
    })
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.searchQATextChanged.pipe(debounceTime(400)).subscribe(val => {
      if (this.searchQAText == '') {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {searchText: ''},
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      }
      if (this.searchQAText?.length > 3 && this.firstLoad) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {searchText: this.searchQAText},
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
    if (this.searchQAText.length > 0) {
      this.searchQAs();
    } else {
      this.getQAs();
    }
  }

  sortRefresh() {
    if (this.direction == 'DESC' || this.direction == 'ASC') {
      this.direction = '';
    }
  }

  searchQAs() {
    this.loading = true;
    this.qaList = [];
    this.apiService.searchQA(this.direction, this.page, this.pageSize, this.sortBy, this.status, this.searchQAText).subscribe((value: any) => {
      this.qaList = value.content;
      this.total = value.totalPages;
    }, (error: any) => {
      this.toastrService.warning('خطایی رخ داد')
    }).add(() => {
      setTimeout(() => this.loading = false, 500);
    })
  }

  getQAs() {
    this.loading = true;
    this.firstLoad = true;
    this.apiService.getQA(this.direction, this.page, this.pageSize, this.sortBy, this.status).subscribe((value: any) => {
      this.qaList = value.content;
      this.total = value.totalPages;
    }, error => {
      this.toastrService.warning('دریافت لیست پرسش و پاسخ با خطا مواجه شد');
    }).add(() => {
      setTimeout(() => this.loading = false, 500);
    })
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
        this.status = 'VERIFIED';
        break;
      }
      case 2: {
        this.status = 'NEW';
        break;
      }
      case 3: {
        this.status = 'REJECTED';
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
