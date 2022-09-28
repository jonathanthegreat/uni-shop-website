import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../services/global-variable.service";
import {Admin} from "../../../models/admin";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile-admins-detail',
  templateUrl: './profile-admins-detail.component.html',
  styleUrls: ['./profile-admins-detail.component.scss']
})
export class ProfileAdminsDetailComponent implements OnInit {
  addForm!: FormGroup;
  loading: boolean = false;
  admin: Admin;
  id: any = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    public globalVariableService: GlobalVariableService,
  ) {
    this.activatedRoute.url.subscribe((url) => {
      this.activatedRoute.queryParams.subscribe((params) => {
        if (this.activatedRoute.snapshot.paramMap.get('id')) {
          this.id = this.activatedRoute.snapshot.paramMap.get('id');
          this.getAdminById();
        } else {
          this.toastrService.warning('ادمین با این مشخصات یافت نشد');
          this.router.navigate(['/profile/admins']);
        }
      })
    });
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.addForm = new FormGroup({
      accessLevel: new FormControl('', [Validators.required]),
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      username: new FormControl('', []),
    });
  }

  updateAdmin() {
    this.loading = true;
    const body = {
      accessLevel: this.addForm.value.accessLevel,
      fname: this.addForm.value.fname,
      lname: this.addForm.value.lname,
      email: this.addForm.value.email,
      username: this.admin.username,
      mobile: this.addForm.value.mobile,
    }
    this.apiService.updateAdmin(this.admin.id, body).subscribe(value => {
      this.loading = false;
      this.toastrService.success("به روزرسانی با موفقیت انجام شد", " ", {
        titleClass: "center",
        messageClass: "center"
      });
      this.goBack();
    }, error => {
      this.loading = false;
      this.toastrService.warning('مشکلی بوجود آمده است ، لطفا دوباره تلاش کنید');
    })
  }

  getAdminById() {
    this.loading = true;
    this.apiService.getAdminById(this.id).subscribe((value: any) => {
      this.admin = value;
      this.addForm.controls.accessLevel.setValue(this.admin.accessLevel);
      this.addForm.controls.fname.setValue(this.admin.fname);
      this.addForm.controls.lname.setValue(this.admin.lname);
      this.addForm.controls.email.setValue(this.admin.email);
      this.addForm.controls.mobile.setValue(this.admin.phoneNumber);
      this.addForm.controls.username.setValue(this.admin.username);
    }, error => {
      this.toastrService.warning('دریافت اطلاعات کاربر با خطا مواجه شد');
    }).add(() => {
      this.loading = false;
    });
  }

  goBack() {
    this.router.navigate(['/profile/admins']);
  }

  /*  checkField(type: any) {
      this.type = type;
      let value = '';
      if (type == 'email') {
        value = this.addForm.controls.email.value;
        if (value.length > 10) {
          this.apiService.adminCheckField(type, value).subscribe((value: any) => {
            this.emailExist = value.exist;
          })
        }
      }
      if (type == 'username') {
        value = this.addForm.controls.username.value;
        if (value.length > 2) {
          this.apiService.adminCheckField(type, value).subscribe((value: any) => {
            this.usernameExist = value.exist;
          })
        }
      }
      if (type == 'phoneNumber') {
        value = this.addForm.controls.phoneNumber.value;
        if (value.length > 10) {
          this.apiService.adminCheckField(type, value).subscribe((value: any) => {
            this.phoneNumberExist = value.exist;
          })
        }
      }
    }*/
}
