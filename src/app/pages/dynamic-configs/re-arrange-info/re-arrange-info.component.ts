import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {ApiService} from "../../../services/api.service";
import {Info} from "../../../models/info";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-re-arrange-info',
  templateUrl: './re-arrange-info.component.html',
  styleUrls: ['./re-arrange-info.component.scss']
})
export class ReArrangeInfoComponent implements OnInit {
  loading = false;
  dynamicPages: Info[] = [];
  reArranged = [];

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService,
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dynamicPages, event.previousIndex, event.currentIndex);
    for (let i = 0; i < this.dynamicPages.length; i++) {
      // @ts-ignore
      this.reArranged.push(this.dynamicPages[i]?.id);
    }
    this.apiService.reArrangeInfo(this.reArranged).subscribe(value => {
      this.toastrService.success('تغییرات ذخیره شد');
      setTimeout(() => {
        window.location.reload();
      }, 300)
    }, error => {
      this.toastrService.error('تغییرات ذخیره نشد!');
    }).add(() => {
      this.loading = false;
    });
  }
}
