import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../../services/global-variable.service";
import {CommentModel} from "../../../../models/comment";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.scss']
})
export class UserCommentComponent implements OnInit {
  page = 0;
  pageSize = 10;
  direction = 'DESC';
  sortBy = 'created';
  status = 'ALL';
  total: any;
  comments: CommentModel[] = [];
  loading = false;
  firstLoad = false;
  userId: any;
  dialogRef!: MatDialogRef<any>;
  updateLoading = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private toastrService: ToastrService,
    public globalVariableService: GlobalVariableService,
  ) {
    if (window.location.href.split('/')[6]) {
      this.userId = window.location.href.split('/')[6];
    }
  }

  ngOnInit(): void {
    this.getUserComments();
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

  getUserComments() {
    this.firstLoad = true;
    this.loading = true;
    this.comments = []
    this.apiService.getUserComments(this.userId, this.direction, this.page, this.pageSize, this.sortBy, this.status).subscribe((value: any) => {
      this.comments = value.content;
      this.total = value.totalPages;
    }, (error: any) => {
      this.toastrService.error('لیست نظرات قابل دریافت نیست');
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
    this.getUserComments();
  }

  filter(index: any) {
    switch (index) {
      case 0: {
        this.status = 'ALL';
        break;
      }
      case 1: {
        this.status = 'NEW';
        break;
      }
      case 2: {
        this.status = 'VERIFIED';
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
    this.page = 0;
    this.getUserComments();
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
      this.getUserComments();
    }, (error: any) => {
      this.toastrService.warning('تغییر وضعیت با خطا مواجه شد');
    }).add(() => {
      this.updateLoading = false;
      this.dialogRef.close();
    })
  }
}
