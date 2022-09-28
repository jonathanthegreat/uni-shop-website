import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {ToastrService} from "ngx-toastr";
import {DocReserve} from "../../../models/docReserve";
import {GlobalVariableService} from "../../../services/global-variable.service";

@Component({
  selector: 'app-doc-reserve-detail',
  templateUrl: './doc-reserve-detail.component.html',
  styleUrls: ['./doc-reserve-detail.component.scss']
})
export class DocReserveDetailComponent implements OnInit {
  id: any;
  loading = false;
  loadingStatus: boolean = false;
  doctorReserve: DocReserve = {};
  docFullName: any;
  userFullName: any;

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
          if (this.id)
            this.getDoctorReserveById();
        }
      });
    });
  }

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.loadingStatus = true;
    const status = event?.value
    this.apiService.updateDoctorReserveStatus(this.id, status).subscribe(value => {
      this.toastrService.success("وضعیت نوبت تغییر داده شد", " ", {
        titleClass: "center",
        messageClass: "center"
      });
    }, error => {
      this.toastrService.warning('تغییر وضعیت نوبت با خطا مواجه شد')
    }).add(() => {
      this.loadingStatus = false;
    })
  }

  getDoctorReserveById() {
    this.loading = true;
    this.apiService.getDoctorReserveById(this.id).subscribe(value => {
      this.doctorReserve = value;
      // @ts-ignore
      this.docFullName = this.doctorReserve.doctor?.firstName + ' ' + this.doctorReserve.doctor?.lastName;
      // @ts-ignore
      this.userFullName = this.doctorReserve.user?.firstName + ' ' + this.doctorReserve.user?.lastName;
    }, error => {
      this.toastrService.warning('دریافت اطلاعات نوبت با خطا مواجه شد');
    }).add(() => {
      setTimeout(() => this.loading = false, 500);
    });
  }

  goToUser() {
    this.router.navigate(['/users/detail/' + this.doctorReserve.user?.id]);
  }

  goToDoctor() {
    this.router.navigate(['/doctors/detail/' + this.doctorReserve.doctor?.id]);
  }
}
