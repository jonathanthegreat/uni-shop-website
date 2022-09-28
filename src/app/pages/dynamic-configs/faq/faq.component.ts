import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ApiService} from "../../../services/api.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Faq} from "../../../models/faq";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})

export class FaqComponent implements OnInit {
  loading: boolean = false;
  reArranged = [];
  mode: any = 'view';
  faqList: Faq[] = [];
  addForm: FormGroup | any;
  editForm: FormGroup | any;
  dialogRef!: MatDialogRef<any>;
  loadingAdd: boolean = false;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private apiService: ApiService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getFAQ();
    this.initForm();
  }

  initForm() {
    this.addForm = new FormGroup({
      question: new FormControl(null, Validators.required),
      answer: new FormControl(null, Validators.required),
    });
  }

  openDialog(dialog: any, id: any, question: any, answer: any) {
    this.editForm = new FormGroup({
      question: new FormControl(question, Validators.required),
      answer: new FormControl(answer, Validators.required),
    });
    this.dialogRef = this.dialog.open(dialog, {
      width: '600px',
      panelClass: ['custom-dialog', 'modal-sm'],
      autoFocus: false,
      data: {
        faqId: id,
        questionField: question,
        answerField: answer
      }
    });
  }

  close() {
    this.dialogRef.close();
    this.addForm.reset();
  }

  getFAQ() {
    this.loading = true;
    this.apiService.getFAQs().subscribe((response: any) => {
      this.faqList = response.content;
    }, error => {
      this.toastrService.warning('لیست سوالات متداول قابل دریافت نیست');
    }).add(() => {
      setTimeout(() => this.loading = false, 500);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.faqList, event.previousIndex, event.currentIndex);
    for (let i = 0; i < this.faqList.length; i++) {
      // @ts-ignore
      this.reArranged.push(this.faqList[i]?.id);
    }
    this.apiService.reArrangeFAQs(this.reArranged).subscribe(value => {
      this.toastrService.success('تغییرات ذخیره شده');
    }, error => {
      this.toastrService.error('تغییرات ذخیره نشد!');
    }).add(() => {
      this.loading = false;
    });
  }

  goBack() {
    this.router.navigate(['/dynamic-configs/faq']);
    this.mode = 'view';
    this.getFAQ();
  }

  goToArrange() {
    this.mode = 'arrange';
    window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
  }

  editField(id: any) {
    this.loadingAdd = true;
    let body = {
      question: this.editForm.value.question,
      answer: this.editForm.value.answer
    }
    this.apiService.updateFAQ(id, body).subscribe(response => {
      this.toastrService.success('سوال مورد نظر با موفقیت تغییر یافت');
      this.getFAQ();
    }, error => {
      this.toastrService.warning('آپدیت سوال خطا مواجه شد');
    }).add(() => {
      this.loadingAdd = false;
      this.dialogRef.close();
    })
  }

  removeField(id: any) {
    this.loadingAdd = true;
    this.apiService.deleteFAQ(id).subscribe(value => {
      this.toastrService.success('سوال مورد نظر با موفقیت حذف شد');
      this.getFAQ();
    }, error => {
      this.toastrService.warning('حذف سوال با خطا مواجه شد');
    }).add(() => {
      this.loadingAdd = false;
      this.dialogRef.close();
    })
  }

  createField() {
    this.loadingAdd = true;
    let body = {
      question: this.addForm.value.question,
      answer: this.addForm.value.answer
    }
    this.apiService.createFAQ(body).subscribe(value => {
      this.toastrService.success('بیمه مورد نظر با موفقیت اضافه شد');
      this.getFAQ();
    }, error => {
      this.toastrService.warning('افزودن بیمه با خطا مواجه شد');
    }).add(() => {
      this.loadingAdd = false;
      this.dialogRef.close();
    })
    this.addForm.reset();
  }
}
