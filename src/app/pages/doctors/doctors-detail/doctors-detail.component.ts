import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Doctor} from "../../../models/doctor";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-doctors-detail',
  templateUrl: './doctors-detail.component.html',
  styleUrls: ['./doctors-detail.component.scss']
})
export class DoctorsDetailComponent implements OnInit {
  loading = false;
  doctor: Doctor = {};
  id: any;

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activatedRoute.url.subscribe((url) => {
      this.activatedRoute.queryParams.subscribe((params) => {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.id) {
          this.getDoctorById();
        } else {
          this.router.navigate(['/doctors/list']);
        }
      });
    });
  }

  ngOnInit(): void {
  }

  getDoctorById() {
    this.loading = true;
    this.apiService.getDoctorById(this.id).subscribe((value: any) => {
      this.doctor = value;
    }, (error: any) => {
      this.toastrService.warning('دریافت اطلاعات پزشک با مشکل مواجه شد');
    }).add(() => {
      this.loading = false;
    });
  }
}
