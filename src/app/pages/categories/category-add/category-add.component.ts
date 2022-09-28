import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  productForm: FormGroup;
  FormParent: FormGroup;
  child: any[] = [];
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private toast: ToastrService,
    private route: Router
  ) {
    this.FormParent = new FormGroup({
      parent: new FormControl('', [Validators.required]),
    })

    this.productForm = this.fb.group({
      quantities: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.addQuantity();
  }

  quantities(): FormArray {
    return this.productForm.get("quantities") as FormArray
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      qty: '',
    })
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }

  onSubmit() {
    if (this.child) {
      this.child = []
    }
    this.productForm.value.quantities.forEach((val: any) => {
      this.child.push(val.qty)
    })
    const body = {
      children: this.child,
      title: this.FormParent.value.parent
    }
    this.loading = true
    this.api.postCategory(body).subscribe(value => {
      this.route.navigate(['/category']);
      this.toast.success('دسته بندی با موفقیت ایجاذ شد!');
    }, error => {
      this.toast.warning('ایجاد دسته بندی دچار مشکل شده است');
    }).add(() => {
      this.loading = false;
    })
  }
}
