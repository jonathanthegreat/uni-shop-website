import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../services/global-variable.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Insurance} from "../../../models/insurance";

@Component({
  selector: 'app-insurance-list',
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.scss']
})
export class InsuranceListComponent implements OnInit {
  page = 0;
  pageSize = 10;
  direction = 'DESC';
  sortBy = 'created';
  insuranceList: Insurance[] = [];
  total: any;
  loading: boolean = false;
  dialogRef!: MatDialogRef<any>;
  fields: any = [];
  arr: any = [];
  loadingAdd: boolean = false;
  addForm: FormGroup | any;
  editForm: FormGroup | any;
  imageSrc: any;
  newLogo = false;
  sendingImage = false;
  logo: File;

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService,
    public globalVariableService: GlobalVariableService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getInsuranceList();
  }

  initForm() {
    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
      insuranceImg: new FormControl('', [Validators.required]),
    });
  }

  openDialog(dialog: any, id: any, name: any, logo: any) {
    this.newLogo = false;
    this.addForm.reset();
    this.editForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      insuranceImg: new FormControl('', [Validators.required]),
    });
    this.dialogRef = this.dialog.open(dialog, {
      width: '500px',
      panelClass: ['custom-dialog', 'modal-sm'],
      autoFocus: false,
      data: {
        fieldsId: id,
        fieldsName: name,
        fieldsLogo: logo
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
      this.newLogo = true;
    }
  }

  getInsuranceList() {
    this.loading = true;
    this.apiService.getInsuranceList(this.direction, this.page, this.pageSize, this.sortBy).subscribe((value: any) => {
      this.insuranceList = value.content;
    }, (error: any) => {
      this.toastrService.error('لیست بیمه قابل دریافت نیست');
    }).add(() => {
      setTimeout(() => this.loading = false, 500);
    });
  }

  editField(id: any) {
    let name = this.editForm.value.name;
    this.loadingAdd = true;
    this.apiService.updateInsurance(id, this.logo, name).subscribe(response => {
      this.toastrService.success('بیمه مورد نظر با موفقیت تغییر یافت');
      this.loadingAdd = false;
      this.dialogRef.close();
      this.getInsuranceList();
      this.sendingImage = false;
    }, error => {
      this.toastrService.warning('تغییر اطلاعات بیمه با خطا مواجه شد');
    }).add(() => {
      this.loadingAdd = false;
      this.dialogRef.close();
    });
  }

  removeField(id: any) {
    this.loadingAdd = true;
    this.apiService.deleteInsurance(id).subscribe(value => {
      this.toastrService.success('بیمه مورد نظر با موفقیت حذف شد');
      this.loadingAdd = false;
      this.dialogRef.close();
      this.getInsuranceList();
    }, error => {
      this.toastrService.warning('حذف بیمه با خطا مواجه شد');
    }).add(() => {
      this.loadingAdd = false;
      this.dialogRef.close();
    })
  }

  createField() {
    this.loadingAdd = true;
    let name = this.addForm.value.name;

    this.apiService.createInsurance(name, this.logo).subscribe(value => {
      this.toastrService.success('بیمه مورد نظر با موفقیت اضافه شد');
      this.loadingAdd = false;
      this.dialogRef.close();
      this.getInsuranceList();
    }, error => {
      this.toastrService.warning('افزودن بیمه با خطا مواجه شد');
    }).add(() => {
      this.loadingAdd = false;
      this.dialogRef.close();
    })
  }

  uploadLogo(event: any, formType: any) {
    this.sendingImage = true;
    if (!event.target.files[0]) {
      this.sendingImage = false;
      return;
    }
    const file: File = event.target.files[0];
    const accept = event.target.accept;
    if (formType == 'addForm') {
      if (!file.type || (!accept.includes(file.type.split('/')[0] + '/*') && !accept.includes(file.type))) {
        this.addForm.controls['insuranceImg'].setValue('');
        this.addForm.controls['insuranceImg'].setErrors({acceptType: true});
        this.toastrService.warning('فرمت فایل مورد قبول نیست');
        this.sendingImage = false;
        return;
      }
      if (file.size > 3000000) {
        this.addForm.controls['insuranceImg'].setValue('');
        this.addForm.controls['insuranceImg'].setErrors({limitSize: true});
        this.toastrService.warning('حجم فایل بیشتر از ۳ مگابایت است');
        this.sendingImage = false;
        return;
      }
    } else if (formType == 'editForm') {
      if (!file.type || (!accept.includes(file.type.split('/')[0] + '/*') && !accept.includes(file.type))) {
        this.editForm.controls['insuranceImg'].setValue('');
        this.editForm.controls['insuranceImg'].setErrors({acceptType: true});
        this.toastrService.warning('فرمت فایل مورد قبول نیست');
        this.sendingImage = false;
        return;
      }
      if (file.size > 3000000) {
        this.editForm.controls['insuranceImg'].setValue('');
        this.editForm.controls['insuranceImg'].setErrors({limitSize: true});
        this.toastrService.warning('حجم فایل بیشتر از ۳ مگابایت است');
        this.sendingImage = false;
        return;
      }
    }
    this.logo = file;
    this.sendingImage = false;
  }
}
