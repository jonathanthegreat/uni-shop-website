import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {debounceTime} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {UserList} from "../../../models/userList";
import {GlobalVariableService} from "../../../services/global-variable.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  page = 0;
  pageSize = 10;
  direction = '';
  sortBy = 'id';
  status = 'ALL';
  users: UserList = {};
  total: any;
  searchForm: FormGroup | any;
  searchUserTextChanged = new Subject<string>();
  searchUserText: any = '';
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
        this.getUsers();
      } else if ((page || page == 0) && status && !searchText) {
        this.page = Number(page);
        this.status = status;
        this.getUsers();
      } else if ((page || page == 0) && !status && searchText) {
        this.page = Number(page);
        this.searchUserText = searchText;
        this.searchUsers();
      } else if ((page || page == 0) && status && searchText) {
        this.page = Number(page);
        this.status = status;
        this.searchUserText = searchText;
        this.searchUsers();
      }
    })
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.searchUserTextChanged.pipe(debounceTime(400)).subscribe(val => {
      if (this.searchUserText == '') {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {searchText: ''},
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      }
      if (this.searchUserText?.length > 3 && this.firstLoad) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {searchText: this.searchUserText},
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
    if (this.searchUserText.length > 0) {
      this.searchUsers();
    } else {
      this.getUsers();
    }
  }

  sortRefresh() {
    if (this.direction == 'DESC' || this.direction == 'ASC') {
      this.direction = '';
    }
  }

  searchUsers() {
    this.loading = true;
    this.users = {};
    this.apiService.searchDoctor(this.direction, this.page, this.pageSize, this.sortBy, this.status, this.searchUserText).subscribe((value: any) => {
      this.users = value;
      this.total = value.totalPages;
    }, (error: any) => {
      this.toastrService.warning('خطایی رخ داد')
    }).add(() => {
      setTimeout(() => this.loading = false, 500);
    })
  }

  getUsers() {
    this.loading = true;
    this.firstLoad = true;
    this.apiService.getUsers(this.direction, this.page, this.pageSize, this.sortBy, this.status).subscribe((value: any) => {
      this.users = value;
      this.total = value.totalPages;
    }, error => {
      this.toastrService.warning('دریافت اطلاعات کاربران با خطا مواجه شد');
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
