import {Component, OnInit} from '@angular/core';
// @ts-ignore
import * as ClassicEditor from '../../../../assets/ckeditor/ckeditor.js';
import {ApiService} from "../../../services/api.service";
import {Info} from "../../../models/info";
import {FormControl, FormGroup} from "@angular/forms";
import {UploadAdapter} from "../../../utility/UploadAdapter";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  public Editor = ClassicEditor;
  config = {
    toolbar: {
      items: [
        'heading',
        '|',
        'fontSize',
        /*'fontColor',*/
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        'htmlEmbed',
        'underline',
        '|',
        'outdent',
        'indent',
        'alignment',
        '|',
        'imageUpload',
        'horizontalLine',
        'blockQuote',
        'insertTable',
        'undo',
        'redo',
      ],
    },
    language: 'fa',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:full',
        'imageStyle:side',
        'linkImage',
      ],
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties',
      ],
    },
  };

  infoModel: Info = {};
  sendInfoModel: Info = {};
  id = '';
  loading = true;
  sending = false;
  formContent: FormGroup;
  info: any;
  show = false;

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.url.subscribe((url: any) => {
      this.route.queryParams.subscribe((params: any) => {
        this.id = params.id || '';
        this.formContent = new FormGroup({
          content: new FormControl('', []),
        });
        this.getInfo();
      });
    });
  }

  onReadyCkEditor(editor: any) {
    const that = this;
    editor.plugins.get('FileRepository').createUploadAdapter = function (
      loader: any,
    ) {
      return new UploadAdapter(loader, that.apiService);
    };
  }

  preview(event: any) {
    if (this.show) {
      this.show = false;
      return;
    } else if (!this.show) {
      this.apiService.getInfo(this.id).subscribe((response: any) => {
          this.info = response;
          this.show = true;
        },
        (error) => {
          this.toastrService.warning('خطایی رخ داد', 'پیام سیستم');
        },
      );
      return;
    }
  }

  getInfo() {
    this.loading = true;
    if (!this.id) {
      return;
    }
    this.apiService.getInfo(this.id).subscribe((value: any) => {
        this.infoModel = value;
        this.formContent.controls.content.setValue(value.content);
      },
      (error: any) => {
        this.toastrService.warning('موردی یافت نشد', 'پیام سیستم');
      },
    )
      .add(() => {
        this.loading = false;
      });
  }

  updateInfo() {
    this.sending = true;
    this.infoModel.content = this.formContent.controls.content.value;
    this.apiService.updateInfo(this.id, this.infoModel).subscribe((value: any) => {
        this.toastrService.success('با موفقیت ویرایش شد', 'پیام سیستم');
      },
      (error: any) => {
        this.toastrService.warning('خطایی رخ داد', 'پیام سیستم');
      },
    )
      .add(() => {
        this.sending = false;
      });
  }

  deleteInfo() {
    this.sending = true;
    this.apiService.deleteInfo(this.id).subscribe((value: any) => {
      this.toastrService.success('با موفقیت حذف شد');
      this.router.navigate(['/dynamic-configs']);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }).add(() => {
      this.sending = false;
    })
  }
}
