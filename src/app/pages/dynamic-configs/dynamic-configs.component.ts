import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Info} from "../../models/info";

@Component({
  selector: 'app-dynamic-configs',
  templateUrl: './dynamic-configs.component.html',
  styleUrls: ['./dynamic-configs.component.scss']
})
export class DynamicConfigsComponent implements OnInit {
  loading = false;
  dynamicPages: Info[] = [];

  constructor(
    private apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.getAllInfo();
  }

  getAllInfo() {
    this.loading = true;
    this.apiService.getAllInfo().subscribe((value: any) => {
      this.dynamicPages = value;
    }).add(() => {
      this.loading = false;
    })
  }
}
