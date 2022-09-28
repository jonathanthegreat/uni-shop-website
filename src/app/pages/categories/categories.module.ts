import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryAddComponent} from './category-add/category-add.component';
import {CategoryDetailComponent} from './category-detail/category-detail.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryAddComponent,
    CategoryDetailComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule {
}
