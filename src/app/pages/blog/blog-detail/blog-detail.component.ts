import {Component, OnInit} from '@angular/core';
// @ts-ignore
import * as ClassicEditor from '../../../../assets/ckeditor/ckeditor.js';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {PostCategoryList} from "../../../models/postCategoryList";
import {PostCategory} from "../../../models/postCategory";
import {Doctor} from "../../../models/doctor";
import {ENTER} from "@angular/cdk/keycodes";
import {Blog, PostBlog} from "../../../models/blog";
import {ApiService} from "../../../services/api.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../modules/auth/auth.service";
import {map, startWith} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {UploadAdapter} from "../../../utility/UploadAdapter";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
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
  docCtrl = new FormControl('');
  filteredDoctors: Observable<any[]>;
  blogCategories: PostCategoryList[] = [];
  blogCategoriesOne = '';
  subBlogCategories: PostCategoryList[] = [];
  subBlogCategoriesOne = '';
  categories: PostCategory[] = [];
  subCategories: PostCategory[] = [];
  tags: string[] = [];
  doctors: Doctor[] = [];
  admin: Doctor = {
    id: this.authService.currentUserValue.id,
    firstName: this.authService.currentUserValue.fname,
    lastName: this.authService.currentUserValue.lname,
  }
  categoryControl = new FormControl();
  subCategoryControl = new FormControl();
  videoForm: FormGroup | any;
  imageForm: FormGroup | any;
  coverImg: File;
  coverVideo: File;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER] as const;
  tagsChanged = false;
  sendingFile = false;
  docId = '';
  postBlog: PostBlog = {};
  blog: Blog = {};
  blogId: any;
  loading = true;
  sending = false;
  formContent: FormGroup;
  info: any;
  show = false;
  imageSrc: any;
  format: string;
  url: string | ArrayBuffer | null;

  constructor(
    private apiService: ApiService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    this.route.url.subscribe((url) => {
      this.route.queryParams.subscribe((params) => {
        if (this.route.snapshot.paramMap.get('id')) {
          this.blogId = this.route.snapshot.paramMap.get('id');
          if (this.blogId) {
            this.getBlog();
          }
        }
      });
    });
  }

  ngOnInit(): void {
    this.getBlogCategoryList();
    this.getDoctors();
    this.initForm();
    this.filteredDoctors = this.docCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  initForm() {
    this.imageForm = new FormGroup({
      blogImg: new FormControl('', [Validators.required]),
    });

    this.videoForm = new FormGroup({
      blogVideo: new FormControl('', [Validators.required]),
    });

    this.formContent = new FormGroup({
      content: new FormControl(this.blog.content, [Validators.required]),
      title: new FormControl(this.blog.title, [Validators.required]),
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.tagsChanged = true;
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.tagsChanged = true;
  }

  onReadyCkEditor(editor: any) {
    const that = this;
    editor.plugins.get('FileRepository').createUploadAdapter = function (
      loader: any,
    ) {
      return new UploadAdapter(loader, that.apiService);
    };
  }

  update() {
    let arr = [];
    arr.push(this.subCategoryControl.value, this.categoryControl.value);
    this.sending = true;
    this.postBlog.content = this.formContent.controls.content.value;
    this.postBlog.title = this.formContent.controls.title.value;
    if (this.docId == 'admin') {
      // @ts-ignore
      this.postBlog.docId = null;
    } else if (this.docCtrl.dirty) {
      this.postBlog.docId = this.docId;
    } else {
      // @ts-ignore
      this.postBlog.docId = this.blog.doctor.id;
    }
    this.postBlog.tags = this.tags;
    this.postBlog.categoryIds = arr;
    this.postBlog.adminId = this.admin.id;
    this.apiService.updateBlog(this.blogId, this.postBlog).subscribe((value: any) => {
        this.toastrService.success('محتوا با موفقیت آپدیت شد');
        this.router.navigate(['/blog']);
        //this.router.navigate(['/blog']);
        /*        setTimeout(() => {
                  window.location.reload();
                }, 300);*/
      },
      (error: any) => {
        this.toastrService.warning('خطایی رخ داد');
      },
    );
    if (this.coverImg) {
      this.uploadCoverImage(this.blogId);
    }
    if (this.coverVideo) {
      this.uploadCoverVideo(this.blogId);
    }
    this.sending = false;
  }

  uploadCoverImage(id: any) {
    this.apiService.updateBlogCover(id, this.coverImg).subscribe(value => {
      this.toastrService.success('آپلود عکس جدید انجام شد');
    }, error => {
      this.toastrService.warning('آپلود عکس با خطا مواجه شد');
    })
  }

  uploadCoverVideo(id: any) {
    this.apiService.updateBlogVideo(id, this.coverVideo).subscribe(value => {
      this.toastrService.success('آپلود ویدیو جدید انجام شد');
    }, error => {
      this.toastrService.warning('آپلود ویدیو با خطا مواجه شد');
    })
  }

  getBlogCategoryList() {
    this.loading = true;
    this.apiService.getBlogCategories('DESC', 0, '1000', 'created').subscribe((value: any) => {
      this.categories = value.content;
    }, error => {
      this.toastrService.warning('دریافت لیست موضوعات با خطا مواجه شد');
    }).add(() => {
      this.loading = false;
    })
  }

  getDoctors() {
    this.loading = true;
    this.apiService.getDoctors('DESC', 0, 1000, 'created', 'VERIFIED').subscribe((value: any) => {
      this.doctors = value.content;
      this.doctors = [this.admin].concat(this.doctors);
    }, (error: any) => {
      this.toastrService.error('لیست پزشکان قابل دریافت نیست');
    }).add(() => {
      setTimeout(() => this.loading = false, 500);
    });
  }

  getBlogCategory(id: any) {
    this.subBlogCategoriesOne = '';
    this.loading = true;
    this.apiService.getBlogCategoriesById(id.value).subscribe(value => {
      // @ts-ignore
      this.subCategories = value.children;
    }, error => {
      this.toastrService.warning('دریافت لیست موضوعات با خطا مواجه شد');
    }).add(() => {
      this.loading = false;
    })
  }

  getBlog() {
    this.loading = true;
    this.apiService.getBlogById(this.blogId).subscribe((value: any) => {
      this.blog = value;
      this.blog?.postCategories?.forEach((cat: any) => {
        if (cat.children.length > 0) {
          this.blogCategoriesOne = cat.id;
          this.subCategories = cat.children;
        } else {
          this.subBlogCategoriesOne = cat.id;
        }
      });
      this.tags = value.tags;
      if (!value.doctor) {
        this.docCtrl.setValue(this.admin.firstName + ' ' + this.admin.lastName);
      } else {
        this.docCtrl.setValue(value.doctor.firstName + ' ' + value.doctor.lastName);
      }
      this.initForm();
    }, (error: any) => {
      this.toastrService.error('بلاگ قابل دریافت نیست');
    }).add(() => {
      setTimeout(() => this.loading = false, 500);
    });
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }

  onSelectFile(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }

  acceptCoverImg(event: any) {
    this.sendingFile = true;
    if (!event.target.files[0]) {
      this.sendingFile = false;
      return;
    }
    const file: File = event.target.files[0];
    const accept = event.target.accept;
    if (!file.type || (!accept.includes(file.type.split('/')[0] + '/*') && !accept.includes(file.type))) {
      this.imageForm.controls['blogImg'].setValue('');
      this.imageForm.controls['blogImg'].setErrors({acceptType: true});
      this.toastrService.warning('فرمت فایل مورد قبول نیست');
      this.sendingFile = false;
      return;
    }
    if (file.size > 3000000) {
      this.imageForm.controls['blogImg'].setValue('');
      this.imageForm.controls['blogImg'].setErrors({limitSize: true});
      this.toastrService.warning('حجم فایل بیشتر از ۳ مگابایت است');
      this.sendingFile = false;
      return;
    }
    this.coverImg = file;
    this.sendingFile = false;
  }

  acceptCoverVideo(event: any) {
    this.sendingFile = true;
    if (!event.target.files[0]) {
      this.sendingFile = false;
      return;
    }
    const file: File = event.target.files[0];
    const accept = event.target.accept;
    if (!file.type || (!accept.includes(file.type.split('/')[0] + '/*') && !accept.includes(file.type))) {
      this.imageForm.controls['blogVideo'].setValue('');
      this.imageForm.controls['blogVideo'].setErrors({acceptType: true});
      this.toastrService.warning('فرمت فایل مورد قبول نیست');
      this.sendingFile = false;
      return;
    }
    if (file.size > 20000000) {
      this.imageForm.controls['blogVideo'].setValue('');
      this.imageForm.controls['blogVideo'].setErrors({limitSize: true});
      this.toastrService.warning('حجم فایل بیشتر از ۲۰ مگابایت است');
      this.sendingFile = false;
      return;
    }
    this.coverVideo = file;
    this.sendingFile = false;
  }

  setDocId(docId: any) {
    if (docId != this.admin.id) {
      this.docId = docId;
    } else {
      this.docId = 'admin';
    }
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.doctors.filter(option => option.firstName?.includes(filterValue) || option.lastName?.includes(filterValue));
  }
}
