import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../../services/global-variable.service";
import {QaDocAnswerList} from "../../../../models/QaDocAnswerList";

@Component({
  selector: 'app-doctor-question-answer',
  templateUrl: './doctor-question-answer.component.html',
  styleUrls: ['./doctor-question-answer.component.scss']
})
export class DoctorQuestionAnswerComponent implements OnInit {
  page = 0;
  pageSize = 10;
  direction = 'DESC';
  sortBy = 'created';
  status = 'ALL';
  total: any;
  docQAList: QaDocAnswerList = {};
  loading = false;
  firstLoad = false;
  docId: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    public globalVariableService: GlobalVariableService,
  ) {
    if (window.location.href.split('/')[6]) {
      this.docId = window.location.href.split('/')[6];
      if (this.docId) {
        this.getDoctorReserve();
      } else {
        this.toastrService.warning('پزشکی با این آیدی یافت نشد');
        this.router.navigate(['/doctors/list']);
      }
    }
  }

  ngOnInit(): void {
  }

  getDoctorReserve() {
    this.firstLoad = true;
    this.loading = true;
    this.docQAList = {};
    this.apiService.getOneDoctorQA(this.direction, this.docId, this.page, this.pageSize, this.sortBy, this.status).subscribe((value: any) => {
      this.docQAList = value;
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

  filter(index: any) {
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
