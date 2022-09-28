import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../services/global-variable.service";

@Component({
  selector: 'app-profile-admins-add',
  templateUrl: './profile-admins-add.component.html',
  styleUrls: ['./profile-admins-add.component.scss']
})
export class ProfileAdminsAddComponent implements OnInit {
  addForm!: FormGroup;
  loading = false;
  emailExist = false;
  usernameExist = false;
  phoneNumberExist = false;

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
  }

  initForm() {
    this.addForm = new FormGroup({
      accessLevel: new FormControl('', [Validators.required]),
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])
    });
  }

  goBack() {
    this.router.navigate(['/profile/admins']);
  }

  createAdmin() {
    if (this.usernameExist || this.emailExist || this.phoneNumberExist) {
      return;
    }
    this.loading = true;
    const body = {
      accessLevel: this.addForm.value.accessLevel,
      fname: this.addForm.value.fname,
      lname: this.addForm.value.lname,
      email: this.addForm.value.email,
      password: this.addForm.value.password,
      username: this.addForm.value.username,
      phoneNumber: this.addForm.value.phoneNumber,
    }
    this.apiService.addAdmin(body).subscribe(value => {
      this.loading = false;
      this.toastrService.success("ادمین مورد نظر ایجاد شد", " ", {
        titleClass: "center",
        messageClass: "center"
      });
      this.goBack()
    }, error => {
      this.loading = false;
      this.toastrService.warning('ساخت ادمین با خطا مواجه شد');
    })
  }

  checkField() {
    let email = this.addForm.controls.email.value;
    let username = this.addForm.controls.username.value;
    let phoneNumber = this.addForm.controls.phoneNumber.value;
    if (email.length > 10) {
      this.apiService.adminCheckField('email', email).subscribe((value: any) => {
        this.emailExist = value.exist;
      })
    }
    if (username.length > 2) {
      this.apiService.adminCheckField('username', username).subscribe((value: any) => {
        this.usernameExist = value.exist;
      })
    }
    if (phoneNumber.length > 10) {
      this.apiService.adminCheckField('phoneNumber', phoneNumber).subscribe((value: any) => {
        this.phoneNumberExist = value.exist;
      })
    }
  }
}
