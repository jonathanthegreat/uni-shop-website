import {Component, OnInit} from '@angular/core';
import {GlobalVariableService} from "../../../../services/global-variable.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../../services/api.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-medical-info',
  templateUrl: './user-medical-info.component.html',
  styleUrls: ['./user-medical-info.component.scss']
})
export class UserMedicalInfoComponent implements OnInit {
  id: any = '';
  loading: boolean = false;
  questions: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private toastrService: ToastrService,
    public globalVariableService: GlobalVariableService,
    public dialog: MatDialog,
  ) {
    if (window.location.href.split('/')[6]) {
      this.id = window.location.href.split('/')[6];
      if (this.id) {
        this.getQuestions();
      } else {
        this.toastrService.warning('کاربری با این آیدی یافت نشد');
        this.router.navigate(['/users/list']);
      }
    }
  }

  ngOnInit(): void {
  }

  getQuestions() {
    this.loading = true;
    this.api.getQuestionById(this.id).subscribe(value => {
      this.questions = value;
    }, error => {
      this.toastrService.warning('مشکلی بوجود آمده است ، لطفا دوباره تلاش کنید');
    }).add(() => {
      this.loading = false;
    })
  }
}
