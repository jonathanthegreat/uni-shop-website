import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../services/global-variable.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CouponList} from "../../../models/couponList";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS} from "../../../core/pipes/material.persian-date.adapter";

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fa-IR'},
    {provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS},
  ],
})
export class CouponListComponent implements OnInit {
  minDate = new Date();
  page = 0;
  pageSize = 100;
  direction = 'DESC';
  sortBy = 'created';
  couponList: CouponList = {};
  total: any;
  loading: boolean = false;
  dialogRef!: MatDialogRef<any>;
  loadingAdd: boolean = false;
  addForm: FormGroup | any;
  editForm: FormGroup | any;
  couponType: any;
  //maxDate = new Date();
  disabled = true;

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService,
    public globalVariableService: GlobalVariableService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getCouponList();
  }

  initForm() {
    this.addForm = new FormGroup({
      title: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      expireDate: new FormControl('', Validators.required),
      count: new FormControl('', Validators.required),
    });
  }

  openDialog(dialog: any, id: any, title: any, type: any, value: any, expireDate: any, count: any) {
    this.addForm.reset();
    if (dialog == 'addModal') {
      this.disabled = true;
    }
    this.editForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      type: new FormControl(type, Validators.required),
      value: new FormControl(value, Validators.required),
      expireDate: new FormControl(expireDate, Validators.required),
      count: new FormControl(count, Validators.required),
    });
    this.dialogRef = this.dialog.open(dialog, {
      width: '600px',
      panelClass: ['custom-dialog', 'modal-sm'],
      autoFocus: false,
      data: {
        couponId: id,
        couponName: title,
        couponType: type
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  sort(sortCriteria: any, direction: any) {
    this.direction = direction;
    this.sortBy = sortCriteria;
    this.getCouponList();
  }

  sortRefresh() {
    if (this.direction == 'DESC' || this.direction == 'ASC') {
      this.direction = '';
    }
  }

  onTypeChange(event: any) {
    this.couponType = event.value;
    this.disabled = false;
    this.addForm.controls.value.setValue('');
    this.editForm.controls.value.setValue('');
  }

  getCouponList() {
    this.loading = true;
    this.apiService.getCoupons(this.direction, this.page, this.pageSize, this.sortBy).subscribe(value => {
      this.couponList = value;
    }, error => {
      this.toastrService.warning('دریافت لیست کد تخفیف با خطا مواجه شد');
    }).add(() => {
      this.loading = false;
    });
  }

  editField(id: any) {
    this.loadingAdd = true;
    let body = {
      title: this.editForm.value.title,
      type: this.editForm.value.type,
      value: this.editForm.value.value,
      expireDate: this.editForm.value.expireDate,
      count: this.editForm.value.count,
    }

    this.apiService.updateCoupon(id, body).subscribe(response => {
      this.toastrService.success('کد تخفیف مورد نظر با موفقیت تغییر یافت');
      this.loadingAdd = false;
      this.dialogRef.close();
      this.getCouponList();
    }, error => {
      this.toastrService.warning('تغییر اطلاعات کد تخفیف با خطا مواجه شد');
    }).add(() => {
      this.loadingAdd = false;
      this.dialogRef.close();
    });
  }

  removeField(id: any) {
    this.loadingAdd = true;
    this.apiService.deleteCoupon(id).subscribe(value => {
      this.toastrService.success('کد تخفیف مورد نظر با موفقیت حذف شد');
      this.loadingAdd = false;
      this.dialogRef.close();
      this.getCouponList();
    }, error => {
      this.toastrService.warning('حذف کد تخفیف با خطا مواجه شد');
    }).add(() => {
      this.loadingAdd = false;
      this.dialogRef.close();
    })
  }

  createField() {
    this.loadingAdd = true;
    let body = {
      title: this.addForm.value.title,
      type: this.addForm.value.type,
      value: this.addForm.value.value,
      expireDate: this.addForm.value.expireDate,
      count: this.addForm.value.count,
    }

    this.apiService.createCoupon(body).subscribe(value => {
      this.toastrService.success('کد تخفیف مورد نظر با موفقیت اضافه شد');
      this.loadingAdd = false;
      this.dialogRef.close();
      this.getCouponList();
    }, error => {
      this.toastrService.warning('افزودن کد تخفیف با خطا مواجه شد');
    }).add(() => {
      this.loadingAdd = false;
      this.dialogRef.close();
    })
  }
}
