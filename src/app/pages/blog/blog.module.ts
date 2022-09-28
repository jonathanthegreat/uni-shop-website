import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogRoutingModule} from './blog-routing.module';
import {BlogListComponent} from './blog-list/blog-list.component';
import {BlogDetailComponent} from './blog-detail/blog-detail.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../core/shared/shared.module";
import {BlogAddComponent} from './blog-add/blog-add.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    BlogListComponent,
    BlogDetailComponent,
    BlogAddComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CKEditorModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
  ]
})
export class BlogModule {
}
