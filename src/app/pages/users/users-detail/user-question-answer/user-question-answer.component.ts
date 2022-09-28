import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../../services/global-variable.service";
import {QuestionAnswer} from "../../../../models/question&answer";

@Component({
  selector: 'app-user-question-answer',
  templateUrl: './user-question-answer.component.html',
  styleUrls: ['./user-question-answer.component.scss']
})
export class UserQuestionAnswerComponent implements OnInit {
  page = 0;
  pageSize = 10;
  direction = 'DESC';
  sortBy = 'created';
  status = 'ALL';
  total: any;
  userQAList: QuestionAnswer[] = [];
  loading = false;
  firstLoad = false;
  userId: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    public globalVariableService: GlobalVariableService,
  ) {
    if (window.location.href.split('/')[6]) {
      this.userId = window.location.href.split('/')[6];
    }
  }

  ngOnInit(): void {
    this.getDoctorReserve();
  }

  getDoctorReserve() {
    this.firstLoad = true;
    this.loading = true;
    this.userQAList = [];
    this.apiService.getOneUserQA(this.direction, this.userId, this.page, this.pageSize, this.sortBy, this.status).subscribe((value: any) => {
      this.userQAList = value.content;
      this.total = value.totalPages;
    }, (error: any) => {
      this.toastrService.error('لیست پرسش و پاسخ قابل دریافت نیست');
    }).add(() => {
      setTimeout(() => this.loading = false, 500);
    });
  }

  changePage(pageNumber: any) {
    this.loading = true;
    window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
    setTimeout(() => {
      this.page = pageNumber - 1;
    }, 500);
    this.getDoctorReserve();
  }

  filter(index: any, from: any) {
    switch (index) {
      case 0: {
        this.status = 'ALL';
        break;
      }
      case 1: {
        this.status = 'NEW';
        break;
      }
      case 2: {
        this.status = 'VERIFIED';
        break;
      }
      case 3: {
        this.status = 'REJECTED';
        break;
      }
      default: {
        //this.status = '';
        break;
      }
    }
    this.page = 0;
    this.getDoctorReserve();
  }
}
