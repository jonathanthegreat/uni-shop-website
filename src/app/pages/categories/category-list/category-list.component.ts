import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../services/global-variable.service";
import {PostCategory} from "../../../models/postCategory";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: PostCategory[] = [];
  loading: boolean = false;
  dialogRef!: MatDialogRef<any>;
  loadingDelete: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    public globalVariableService: GlobalVariableService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.loading = true;
    this.apiService.getBlogCategories('ASC', 0, 100, 'id').subscribe((value: any) => {
      this.categories = value.content;
    }, error => {
      this.toastrService.warning('دریافت دسته بندی ها دچار مشکل شده است!')
    }).add(() => {
      this.loading = false;
    })
  }

  openDialog(dialog: any, id: any) {
    this.dialogRef = this.dialog.open(dialog, {
      data: {
        'id': id
      },
      width: '500px',
      autoFocus: false,
      panelClass: ['custom-dialog', 'modal-sm'],
    });
  }

  removeCategory(id: any) {
    this.loadingDelete = true;
    this.apiService.deleteBlogCategoriesById(id).subscribe(value => {
      this.toastrService.success('دسته بندی با موفقیت حذف شد');
      this.dialog.closeAll();
      this.getCategories();
    }, error => {
      this.toastrService.warning('حذف دسته بندی ها دچار مشکل شده است!')
    }).add(() => {
      this.loadingDelete = false
    })
  }
}
