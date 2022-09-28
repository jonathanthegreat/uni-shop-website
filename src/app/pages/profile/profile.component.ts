import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../modules/auth/auth.service";
import {Admin} from "../../models/admin";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  admin: Admin;
  dialogRef!: MatDialogRef<any>;
  @ViewChild('exitModel', {static: true}) exitModel: any;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private toastrService: ToastrService,
    public dialog: MatDialog
  ) {
    this.admin = this.authService.currentUserValue;
  }

  ngOnInit(): void {
  }

  exit() {
    this.dialogRef.close();
    this.authService.logout();
    window.location.reload();
  }

  openDialog(dialog: any) {
    this.dialogRef = this.dialog.open(dialog, {
      panelClass: ['custom-dialog', 'modal-sm'],
      autoFocus: false
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateImage(E: any) {
    if (!E.target.files[0]) {
      return;
    }
    const file: File = E.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // tslint:disable-next-line:no-shadowed-variable
    reader.onload = (event: any) => {
      if (this.admin)
        this.admin.profileImageAddress = event.target.result;
    };
    this.apiService.updateAdminProfileImage(this.authService.currentUserValue.id, file).subscribe((value: any) => {
      this.authService.setAuthFromLocalStorage(value);
      this.authService.getAdmin();
      this.toastrService.success('تصویر پروفایل شما با موفقیت ذخیره شد!')
    }, error => {
      this.toastrService.warning('مشکلی بوجود آمده است ، لطفا دوباره تلاش کنید')
    }).add(() => {

    })
  }
}
