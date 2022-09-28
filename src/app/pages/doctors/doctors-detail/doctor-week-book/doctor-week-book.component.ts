import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {Timesheet} from "../../../../models/timesheet";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-week-book',
  templateUrl: './doctor-week-book.component.html',
  styleUrls: ['./doctor-week-book.component.scss']
})
export class DoctorWeekBookComponent implements OnInit {
  loading = false;
  id: any = '';
  weekONLINE: Timesheet = {};
  weekOFFLINE: Timesheet = {};

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    if (window.location.href.split('/')[6]) {
      this.id = window.location.href.split('/')[6];
      if (this.id) {
        this.getTimesOFFLINE();
        this.getTimesONLINE();
      } else {
        this.toastrService.warning('پزشکی با این آیدی یافت نشد');
        this.router.navigate(['/doctors/list']);
      }
    }
  }

  ngOnInit() {
  }

  getTimesONLINE() {
    this.loading = true;
    this.apiService.getDoctorTimesheet(this.id, 'ONLINE').subscribe((value: any) => {
      this.weekONLINE = value;
    }).add(() => {
      this.loading = false;
    })
  }

  getTimesOFFLINE() {
    this.loading = true;
    this.apiService.getDoctorTimesheet(this.id, 'OFFLINE').subscribe((value: any) => {
      this.weekOFFLINE = value;
    }).add(() => {
      this.loading = false;
    })
  }

  format(event: any) {
    return event.split(':', 2).toString().replace(/,/, ':');
  }
}
