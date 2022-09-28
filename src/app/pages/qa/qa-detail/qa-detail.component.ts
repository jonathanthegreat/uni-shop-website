import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {ToastrService} from "ngx-toastr";
import {GlobalVariableService} from "../../../services/global-variable.service";
import {QA} from "../../../models/q&a";
import {Answer} from "../../../models/answer";

@Component({
  selector: 'app-qa-detail',
  templateUrl: './qa-detail.component.html',
  styleUrls: ['./qa-detail.component.scss']
})
export class QaDetailComponent implements OnInit {
  id: any;
  loading: boolean = false;
  qa: QA = {};
  answers: Answer[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private toastrService: ToastrService,
    public globalVariableService: GlobalVariableService,
  ) {
    this.activatedRoute.url.subscribe((url) => {
      this.activatedRoute.queryParams.subscribe((params) => {
        if (this.activatedRoute.snapshot.paramMap.get('id')) {
          this.id = this.activatedRoute.snapshot.paramMap.get('id');
          if (this.id) {
            this.getQAById();
            this.getAnswers();
          } else {
            this.toastrService.warning('پرسشی با این آیدی یافت نشد');
            this.router.navigate(['/qa/list']);
          }
        }
      });
    });
  }

  ngOnInit(): void {
  }

  getQAById() {
    this.loading = true;
    this.apiService.getQAById(this.id).subscribe(value => {
      this.qa = value;
    }, error => {
      this.toastrService.warning('دریافت اطلاعات با خطا مواجه شد');
    }).add(() => {
      setTimeout(() => this.loading = false, 500);
    });
  }

  onChange(event: any) {
    this.loading = true;
    const status = event?.value
    this.apiService.updateQAStatus(this.id, status).subscribe(value => {
      this.toastrService.success("وضعیت پرسش تغییر داده شد", " ", {
        titleClass: "center",
        messageClass: "center"
      });
    }, error => {
      this.toastrService.warning('تغییر وضعیت پرسش با خطا مواجه شد');
    }).add(() => {
      this.loading = false;
    });
  }

  getAnswers() {
    this.loading = true;
    this.apiService.getQaAnswers(this.id).subscribe((value: any) => {
      this.answers = value;
    }).add(() => {
      this.loading = false;
    })
  }
}
