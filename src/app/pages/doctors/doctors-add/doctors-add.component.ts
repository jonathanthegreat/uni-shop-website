import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS} from "../../../core/pipes/material.persian-date.adapter";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../services/global-variable.service";

@Component({
  selector: 'app-doctors-add',
  templateUrl: './doctors-add.component.html',
  styleUrls: ['./doctors-add.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fa-IR'},
    {provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS},
  ],
})
export class DoctorsAddComponent implements OnInit {
  addForm!: FormGroup;
  maxDate = new Date();
  loading: boolean = false;
  direction = 'DESC';
  sortBy = 'created';
  fields: any[] = [];
  insures: any[] = [];
  toppings = new FormControl();
  toppings2 = new FormControl();
  imagUrl: any;
  file: File;
  docId: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    public globalVariableService: GlobalVariableService,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.getFields();
    this.getInsur();
  }

  initForm() {
    this.addForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      officeNumber: new FormControl('', [Validators.required]),
      sheba: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      mobile: new FormControl('', [Validators.required]),
      field: new FormControl('', [Validators.required]),
      insure: new FormControl('', [Validators.required]),
      offlinePrice: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      onlinePrice: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    });
  }

  createDoc() {
    this.loading = true;
    const body = {
      bdate: this.addForm.value.birthday,
      bio: null,
      description: null,
      email: this.addForm.value.email,
      firstName: this.addForm.value.firstname,
      lastName: this.addForm.value.lastname,
      mobile: this.addForm.value.mobile,
      officeNumber: this.addForm.value.officeNumber,
      shebaNumber: this.addForm.value.sheba,
      address: this.addForm.value.address,
      offLinePrice: Number(this.addForm.value.offlinePrice.split(',').join('')),
      onlinePrice: Number(this.addForm.value.onlinePrice.split(',').join('')),
      medicalFieldIds: this.addForm.value.field,
      insurIds: this.addForm.value.insure,
    }
    this.apiService.addDoc(body).subscribe((value: any) => {
      this.docId = value.id;
      setTimeout(() => {
        this.apiService.patchDoctorProfileImage(this.docId, this.file).subscribe(value1 => {
          this.toastrService.success("پزشک مورد نظر ایجاد شد", " ", {
            titleClass: "center",
            messageClass: "center"
          });
        }, error => {
          this.toastrService.warning('مشکلی بوجود آمده است ، لطفا دوباره تلاش کنید')
        }).add(() => {
          this.loading = false;
        });
      }, 500);
      this.router.navigate(['/doctors'])
    }, error => {
      if (error.status == 412) {
        this.toastrService.warning('شماره موبایل یا ایمیل قبلا در سیستم ثبت شده است')
      } else {
        this.toastrService.warning('مشکلی بوجود آمده است ، لطفا دوباره تلاش کنید')
      }
    }).add(() => {
      this.loading = false;
    });
  }

  getFields() {
    this.apiService.getAllMedical_Fields(this.direction, this.sortBy).subscribe((value: any) => {
      this.fields = value.content;
    }, error => {
      this.toastrService.warning('دریافت لیست تخصص ها با مشکل روبرو شده')
    });
  }

  getInsur() {
    this.apiService.getInsuranceList('ASC', 0, 10, 'id').subscribe((value: any) => {
      this.insures = value.content;
    }, error => {
      this.toastrService.warning('دریافت لیست بیمه ها با مشکل روبرو شده')
    });
  }

  updateImage(E: any) {
    if (!E.target.files[0]) {
      return;
    }
    this.file = E.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    // tslint:disable-next-line:no-shadowed-variable
    reader.onload = (event: any) => {
      this.imagUrl = event.target.result;
    };
  }
}
