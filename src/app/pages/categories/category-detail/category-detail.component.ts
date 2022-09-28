import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  form!: FormGroup;
  id: any = '';
  movie!: any;
  FormParent: FormGroup;
  loading: boolean = false;
  loadingFirst: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService
  ) {
    this.route.url.subscribe((url) => {
      this.route.queryParams.subscribe((params) => {
        this.id = this.route.snapshot.paramMap.get('id');
      });
    });
  }

  get children() {
    return this.form.controls['children'] as FormArray;
  }

  ngOnInit() {
    this.form = this.fb.group({
      children: this.fb.array([]),
    });
    this.FormParent = new FormGroup({
      parent: new FormControl('', [Validators.required]),
    })
    this.loadingFirst = true
    this.api.getBlogCategoriesById(this.id).subscribe((movieData: any) => {
      this.movie = movieData;
      this.loadingFirst = false
      this.movie.children.map((title: any) => {
        const childrenForm = this.fb.group({
          title: title.title,
          id: title.id,
        });
        this.children.push(childrenForm);
      });
    }).add(() => {
      this.FormParent.controls.parent.setValue(this.movie.title)
    });
  }

  addtitle() {
    const childrenForm = this.fb.group({
      title: '',
      id: null,
    });
    this.children.push(childrenForm);
  }

  removetitle(i: number) {
    this.children.removeAt(i);
    //this.titles.splice(i, 0);
  }

  onSubmit() {
    this.loading = true;
    const body = {
      children: this.children.value,
      id: this.id,
      title: this.FormParent.controls.parent.value
    }
    this.api.putCategory(body).subscribe(value => {
      this.router.navigate(['/category'])
      this.toast.success('دسته بندی با موفقیت ویراسش شد!')

    }, error => {
      this.toast.warning('دسته بندی با خطا مواجه  شد!')
    }).add(() => {
      this.loading = false;
    })
  }
}
