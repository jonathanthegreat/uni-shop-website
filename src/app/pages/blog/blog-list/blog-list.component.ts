import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../services/global-variable.service";
import {debounceTime} from "rxjs/operators";
import {Blog} from "../../../models/blog";

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  page = 0;
  pageSize = 10;
  direction = 'DESC';
  sortBy = 'created';
  blogs: Blog[] = [];
  total: any;
  searchForm: FormGroup | any;
  searchBlogTextChanged = new Subject<string>();
  searchBlogText: any = '';
  loading = false;
  firstLoad = false;

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
      this.sortRefresh();
      if (!page && page != 0 && !searchText) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {page: 1},
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      } else if ((page || page == 0) && !searchText) {
        this.page = Number(page);
        this.getBlogs();
      } else if ((page || page == 0) && searchText) {
        this.page = Number(page);
        this.searchBlogText = searchText;
        this.searchBlogs();
      }
    })
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.searchBlogTextChanged.pipe(debounceTime(400)).subscribe(val => {
      if (this.searchBlogText == '') {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {searchText: ''},
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      }
      if (this.searchBlogText?.length > 3 && this.firstLoad) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {searchText: this.searchBlogText},
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
    if (this.searchBlogText.length > 0) {
      this.searchBlogs();
    } else {
      this.getBlogs();
    }
  }

  sortRefresh() {
    if (this.direction == 'DESC' || this.direction == 'ASC') {
      this.direction = '';
    }
  }

  searchBlogs(): any {
    this.loading = true;
    this.blogs = [];
    this.apiService.searchBlogs(this.direction, this.page, this.pageSize, this.sortBy, this.searchBlogText).subscribe((value: any) => {
      this.blogs = value.content;
      this.total = value.totalPages;
    }, (error: any) => {
      this.toastrService.warning('خطایی رخ داد')
    }).add(() => {
      setTimeout(() => this.loading = false, 500);
    })
  }

  getBlogs() {
    this.firstLoad = true;
    this.loading = true;
    this.blogs = [];
    this.apiService.getBlogs(this.direction, this.page, this.pageSize, this.sortBy).subscribe((value: any) => {
      this.blogs = value.content;
      this.total = value.totalPages;
    }, (error: any) => {
      this.toastrService.error('لیست محتوا قابل دریافت نیست');
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
}
