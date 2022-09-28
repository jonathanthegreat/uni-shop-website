import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GlobalVariableService} from "../../services/global-variable.service";

@Component({
  selector: 'app-medical-fields',
  templateUrl: './medical-fields.component.html',
  styleUrls: ['./medical-fields.component.scss']
})
export class MedicalFieldsComponent implements OnInit {
  direction = 'DESC';
  sortBy = 'created';
  dialogRef!: MatDialogRef<any>;
  fields: any = [];
  arr: any = [];
  loading: boolean = false;
  loadingAdd: boolean = false;
  addForm: FormGroup | any;
  editForm: FormGroup | any;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    public globalVariableService: GlobalVariableService,
    private toastrService: ToastrService,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.getFields();
  }

  initForm() {
    this.addForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  openDialog(dialog: any, id: any, name: any) {
    this.addForm.reset();
    this.editForm = new FormGroup({
      name: new FormControl(name, Validators.required),
    });
    this.dialogRef = this.dialog.open(dialog, {
      width: '500px',
      panelClass: ['custom-dialog', 'modal-sm'],
      autoFocus: false,
      data: {
        fieldsId: id,
        fieldsName: name
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  getFields() {
    this.loading = true;
    this.apiService.getAllMedical_Fields(this.direction, this.sortBy).subscribe((value: any) => {
      this.fields = value.content;
    }, error => {
      this.toastrService.warning('دریافت اطلاعات پزشک با مشکل مواجه شد');
    }).add(() => {
      this.loading = false;
    })
  }

  createField() {
    this.loadingAdd = true;
    const body = {
      name: this.addForm.value.name
    }
    this.apiService.postMedical_Fields(body).subscribe(value => {
      this.toastrService.success('تخصص جدید ذخیره شد');
      this.loadingAdd = false;
      this.dialogRef.close();
      this.getFields();
    }, error => {
      this.toastrService.warning('ثبت تخصص جدید با خطا مواجه شد');
    }).add(() => {
      this.loadingAdd = false;
      this.dialogRef.close();
    });
  }

  removeField(id: any) {
    this.loadingAdd = true;
    this.apiService.deleteMedical_Fields(id).subscribe(value => {
      this.toastrService.success('تخصص مورد نظر با موفقیت حذف شد');
      this.loadingAdd = false;
      this.dialogRef.close();
      this.getFields();
    }, error => {
      this.toastrService.warning('حذف تخصص با خطا مواجه شد');
    }).add(() => {
      this.loadingAdd = false;
      this.dialogRef.close();
    })
  }

  editField(id: any) {
    const body = {
      name: this.editForm.value.name
    }
    this.loadingAdd = true;
    this.apiService.putMedical_Fields(id, body).subscribe(value => {
      this.toastrService.success('تغییرات ثبت شد');
      this.loadingAdd = false;
      this.dialogRef.close();
      this.getFields();
    }, error => {
      this.toastrService.warning('ثبت تغییرات با خطا مواجه شد');
    }).add(() => {
      this.loadingAdd = false;
      this.dialogRef.close();
    })
  }
}
