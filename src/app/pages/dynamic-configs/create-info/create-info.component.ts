import {Component, OnInit} from '@angular/core';
// @ts-ignore
import * as ClassicEditor from '../../../../assets/ckeditor/ckeditor.js';
import {ApiService} from "../../../services/api.service";
import {SendInfo} from "../../../models/info";
import {FormControl, FormGroup} from "@angular/forms";
import {UploadAdapter} from "../../../utility/UploadAdapter";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-info',
  templateUrl: './create-info.component.html',
  styleUrls: ['./create-info.component.scss']
})
export class CreateInfoComponent implements OnInit {
  public Editor = ClassicEditor;
  config = {
    toolbar: {
      items: [
        'heading',
        '|',
        'fontSize',
        'fontColor',
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

  infoModel: SendInfo = {};
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
    this.formContent = new FormGroup({
      content: new FormControl('', []),
      name: new FormControl('', []),
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

  create() {
    this.sending = true;
    this.infoModel.content = this.formContent.controls.content.value;
    this.infoModel.name = this.formContent.controls.name.value;
    this.apiService.postInfo(this.infoModel).subscribe((value: any) => {
        this.toastrService.success('با موفقیت ثبت شد');
        this.router.navigate(['/dynamic-configs']);
        setTimeout(() => {
          window.location.reload();
        }, 300);
      },
      (error: any) => {
        this.toastrService.warning('خطایی رخ داد');
      },
    )
      .add(() => {
        this.sending = false;
      });
  }
}
