import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../services/global-variable.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {CommentModel} from "../../models/comment";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  page = 0;
  pageSize = 10;
  direction = '';
  sortBy = 'id';
  status = 'ALL';
  comments: CommentModel[] = [];
  total: any;
  searchForm: FormGroup | any;
  searchCommentTextChanged = new Subject<string>();
  searchCommentText: any = '';
  loading = false;
  firstLoad = false;
  selectedIndex = 0;
  dialogRef!: MatDialogRef<any>;
  updateLoading = false;
  a: any = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private toastrService: ToastrService,
    public globalVariableService: GlobalVariableService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.activatedRoute.queryParamMap.subscribe((value: any) => {
      let page = value.params.page - 1;
      let status = value.params.status;
      let searchText = value.params.searchText;
      let statusIndex = value.params.statusIndex;

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
        this.getComments();
      } else if ((page || page == 0) && status && !searchText) {
        this.page = Number(page);
        this.status = status;
        this.getComments();
      } else if ((page || page == 0) && !status && searchText) {
        this.page = Number(page);
        this.searchCommentText = searchText;
        this.searchComments();
      } else if ((page || page == 0) && status && searchText) {
        this.page = Number(page);
        this.status = status;
        this.searchCommentText = searchText;
        this.searchComments();
      }
    })
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.searchCommentTextChanged.pipe(debounceTime(400)).subscribe(val => {
      if (this.searchCommentText == '') {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {searchText: ''},
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      }
      if (this.searchCommentText?.length > 3) {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {searchText: this.searchCommentText},
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      }
    });
    this.sortRefresh()
  }

  openDialog(dialog: any, comment: any, id: any, status: any) {
    this.dialogRef = this.dialog.open(dialog, {
      data: {
        'comment': comment,
        'status': status,
        'id': id
      },
      width: '760px',
      autoFocus: false,
      panelClass: ['custom-dialog', 'modal-sm'],
    });
  }

  getComments() {
    this.loading = true
    this.apiService.getComments(this.direction, this.page, this.pageSize, this.sortBy, this.status).subscribe((value: any) => {
      this.comments = value.content;
      this.total = value.totalPages;
    }, (error: any) => {
      this.toastrService.warning('مشکلی بوجود آمده است ، لطفا دوباره تلاش کنید')
    }).add(() => {
      this.loading = false
    })
  }

  sort(sortCriteria: any, direction: any) {
    this.direction = direction;
    this.sortBy = sortCriteria;
    if (this.searchCommentText.length > 0) {
      this.searchComments();
    } else {
      this.getComments();
    }
  }

  sortRefresh() {
    if (this.direction == 'DESC' || this.direction == 'ASC') {
      this.direction = '';
      this.sortBy = 'id';
    }
  }

  searchComments(): any {
    this.loading = true;
    this.comments = [];
    this.apiService.searchAllComments(this.direction, this.page, this.pageSize, this.sortBy, this.status, this.searchCommentText).subscribe((value: any) => {
      this.comments = value.content;
      this.total = value.totalPages;
    }, (error: any) => {
      this.toastrService.warning('خطایی رخ داد')
    }).add(() => {
      setTimeout(() => this.loading = false, 500);
    })
  }

  filter(index: any) {
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
    this.sortRefresh();
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {status: this.status, page: 1, statusIndex: index},
      queryParamsHandling: 'merge',
      replaceUrl: true
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

  updateComment(id: any, status: any) {
    this.updateLoading = true;
    this.apiService.putComments(id, status.value, null).subscribe((value: any) => {
      if (status.value == 'VERIFIED') {
        this.toastrService.success('کامنت مورد نظر تایید شد');
      } else if (status.value == 'REJECTED') {
        this.toastrService.success('کامنت مورد نظر رد شد');
      } else if (status.value == 'NEW') {
        this.toastrService.success('کامنت مورد نظر به حالت در حال بررسی تغییر کرد');
      }
      this.dialogRef.close();
      this.getComments();
    }, (error: any) => {
      this.toastrService.warning('تغییر وضعیت با خطا مواجه شد');
    }).add(() => {
      this.updateLoading = false;
      this.dialogRef.close();
    })
  }
}
