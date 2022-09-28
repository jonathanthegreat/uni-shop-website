import {Component, OnInit} from '@angular/core';
import {Admin} from "../../../models/admin";
import {AuthService} from "../../../modules/auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../services/global-variable.service";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  loading: boolean = false;
  adminForm!: FormGroup;
  adminCUV: Admin;
  adminAPI: Admin;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private apiService: ApiService,
    public globalVariableService: GlobalVariableService,
  ) {
    this.adminCUV = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.getAdminById();
    this.initForm();
  }

  initForm() {
    this.adminForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
  }

  getAdminById() {
    this.loading = true;
    this.apiService.getAdminById(this.adminCUV.id).subscribe((value: any) => {
      this.adminAPI = value;
      this.adminForm.controls.fname.setValue(this.adminAPI.fname);
      this.adminForm.controls.lname.setValue(this.adminAPI.lname);
      this.adminForm.controls.email.setValue(this.adminAPI.email);
      this.adminForm.controls.mobile.setValue(this.adminAPI.phoneNumber);
      this.adminForm.controls.username.setValue(this.adminAPI.username);
    }, error => {
      this.toastrService.warning('دریافت اطلاعات ادمین با خطا مواجه شد');
    }).add(() => {
      this.loading = false;
    });
  }

  updateAdmin() {
    this.loading = true;
    let body = {
      fname: this.adminForm.value.fname,
      lname: this.adminForm.value.lname,
      email: this.adminForm.value.email,
      mobile: this.adminForm.value.mobile,
      username: this.adminCUV.username,
    }
    this.apiService.updateAdmin(this.adminCUV.id, body).subscribe(value => {
      this.getAdminById();
      this.toastrService.success('تغییرات اعمال شد');
    }, error => {
      this.toastrService.warning('تغییرات اطلاعات با خطا مواجه شد!');
    }).add(() => {
      this.loading = false;
    })
  }
}
