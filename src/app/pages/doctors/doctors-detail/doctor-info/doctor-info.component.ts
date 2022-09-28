import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../../services/api.service";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../../services/global-variable.service";
import {MatDialog} from "@angular/material/dialog";
import {Doctor} from "../../../../models/doctor";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS} from "../../../../core/pipes/material.persian-date.adapter";

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fa-IR'},
    {provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS},
  ],
})
export class DoctorInfoComponent implements OnInit {
  direction = 'DESC';
  sortBy = 'created';
  doctor: Doctor = {}
  fields: any[] = [];
  insures: any[] = [];
  loading: boolean = false;
  loadingStatus: boolean = false;
  id: any;
  editDocForm!: FormGroup;
  toppings = new FormControl();
  toppings2 = new FormControl();
  docFields: any = [];
  docInsure: any = [];
  text: any = '';
  maxDate = new Date();
  allow1: boolean = false;
  allow2: boolean = false;
  allow3: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private toastrService: ToastrService,
    public globalVariableService: GlobalVariableService,
    public dialog: MatDialog,
  ) {
    this.activatedRoute.url.subscribe((url) => {
      this.activatedRoute.queryParams.subscribe((params) => {
        if (this.activatedRoute.snapshot.paramMap.get('id')) {
          this.id = this.activatedRoute.snapshot.paramMap.get('id');
          if (this.id) {
            this.getDoctor();
          } else {
            this.toastrService.warning('پزشکی با این آیدی یافت نشد');
            this.router.navigate(['/doctors/list']);
          }
        }
      });
    });
  }

  ngOnInit(): void {
    this.getFields();
    this.getInsur();
  }

  getDoctor() {
    this.loading = true;
    this.api.getDoctorById(this.id).subscribe(value => {
      this.doctor = value;
      this.doctor?.medicalFields?.forEach((value: any) => {
        this.docFields.push(value.id)
      })
      this.doctor?.insurList?.forEach((value: any) => {
        this.docInsure.push(value.id)
      })

      if (this.docInsure?.length == 0) {
        this.text = 'وارد نشده'
      }

      if (this.docFields?.length == 0) {
        this.text = 'وارد نشده'
      }
    }, error => {
      this.toastrService.warning('مشکلی بوجود آمده است ، لطفا دوباره تلاش کنید')
    }).add(() => {
      this.loading = false;
      this.editDocForm = new FormGroup({
        docFirstName: new FormControl(this.doctor?.firstName, [Validators.required, Validators.maxLength(250)]),
        docLastName: new FormControl(this.doctor?.lastName, [Validators.required, Validators.maxLength(250)]),
        status: new FormControl(this.doctor?.status, [Validators.required]),
        date: new FormControl(this.doctor?.bdate, [Validators.required]),
        email: new FormControl(this.doctor?.email, [Validators.required, Validators.email, Validators.maxLength(255)]),
        officeNumber: new FormControl(this.doctor?.officeNumber, [Validators.required]),
        sheba: new FormControl(this.doctor?.shebaNumber, [Validators.required]),
        mobile: new FormControl(this.doctor?.mobile, [Validators.required]),
        address: new FormControl(this.doctor?.address, [Validators.required]),
        offlinePrice: new FormControl(this.doctor?.offlinePrice, [Validators.required]),
        onlinePrice: new FormControl(this.doctor?.onlinePrice, [Validators.required]),
        fields: new FormControl(this.docFields, [Validators.required]),
      });
    });
  }

  onChange(E: any) {
    this.loadingStatus = true;
    const status = E?.value
    this.api.putStatusDoc(this.doctor?.id, status, null).subscribe(value => {
      this.toastrService.success("پزشک مورد نظر به روز رسانی  شد", " ", {
        titleClass: "center",
        messageClass: "center"
      });
    }, error => {
      this.toastrService.warning('مشکلی بوجود آمده است ، لطفا دوباره تلاش کنید')
    }).add(() => {
      this.loadingStatus = false;
    });
  }

  getFields() {
    this.api.getAllMedical_Fields(this.direction, this.sortBy).subscribe((value: any) => {
      this.fields = value.content;
    }, error => {
      this.toastrService.warning('دریافت لیست تخصص ها با مشکل روبرو شده')
    });
  }

  getInsur() {
    this.api.getInsuranceList('ASC', 0, 10, 'id').subscribe((value: any) => {
      this.insures = value.content;
    }, error => {
      this.toastrService.warning('دریافت لیست بیمه ها با مشکل روبرو شده')
    });
  }

  edit() {
    this.loading = true;
    const body = {
      bdate: this.editDocForm.value.date,
      bio: this.doctor?.bio,
      description: this.doctor?.description,
      email: this.editDocForm.value.email,
      firstName: this.editDocForm.value.docFirstName,
      lastName: this.editDocForm.value.docLastName,
      officeNumber: this.editDocForm.value.officeNumber,
      shebaNumber: this.editDocForm.value.sheba,
      address: this.editDocForm.value.address,
      mobile: this.editDocForm.value.mobile,
      offlinePrice: Number(this.editDocForm.value.offlinePrice.split(',').join('')),
      onlinePrice: Number(this.editDocForm.value.onlinePrice.split(',').join('')),
    }
    this.api.putUpdateDoc(this.doctor.id, body).subscribe(value => {
      this.allow1 = true;
    }, error => {
      this.toastrService.warning('بروز رسانی پزشک با مشکل روبرو شده')
    }).add(() => {
      this.loading = false;
    });
    this.api.putFieldsDoc(this.doctor.id, this.toppings.value).subscribe(value => {
      this.allow2 = true;
    }, error => {
      this.toastrService.warning('بروز رسانی تخصص با مشکل روبرو شده')
    }).add(() => {
      this.loading = false;
    });
    this.api.putInsureDoc(this.doctor.id, this.toppings2.value).subscribe(value => {
      this.allow3 = true;
    }, error => {
      this.toastrService.warning('بروز رسانی تخصص با مشکل روبرو شده')
    }).add(() => {
      this.loading = false;
    });
  }
}
