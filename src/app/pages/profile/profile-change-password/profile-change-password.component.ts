import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../modules/auth/auth.service";
import {GlobalVariableService} from "../../../services/global-variable.service";

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.scss']
})
export class ProfileChangePasswordComponent implements OnInit {
  addForm!: FormGroup;
  loading = false
  passwordMisMatch = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private toastrService: ToastrService,
    public globalVariableService: GlobalVariableService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      newPasswordRepeat: new FormControl('', [Validators.required]),
    });
  }

  checkField() {
    let newPass = this.addForm.controls.newPassword.value;
    let newPassRepeat = this.addForm.controls.newPasswordRepeat.value;
    if (newPassRepeat.length > 5) {
      if (newPass != newPassRepeat) {
        return this.passwordMisMatch = true;
      } else {
        this.passwordMisMatch = false;
      }
    }
  }

  changePassword() {
    if (this.addForm.value.newPassword != this.addForm.value.newPasswordRepeat) {
      this.toastrService.warning('رمز عبور مطابقت ندارد');
      return;
    }

    if (this.addForm.value.oldPassword == this.addForm.value.newPassword) {
      this.toastrService.warning('رمزعبور ها یکسان می باشند');
      return;
    }
    this.loading = true;
    const body = {
      oldPassword: this.addForm.value.oldPassword,
      newPassword: this.addForm.value.newPassword,
    }
    setTimeout(() => {
      this.apiService.changeAdminPassword(this.authService.currentUserValue.id, body).subscribe((value: any) => {
        this.toastrService.success('رمز عبور تفییر داده شد');
      }, error => {
        if (error.status == 400) {
          this.toastrService.warning('رمز عبور قبلی اشتباه است');
        } else {
          this.toastrService.warning('خطایی رخ داد');
        }
      }).add(() => {
        this.loading = false;
      });
    }, 500)
  }
}
