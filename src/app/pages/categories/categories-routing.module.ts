import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoriesComponent} from "./categories.component";
import {CategoryListComponent} from "./category-list/category-list.component";
import {CategoryAddComponent} from "./category-add/category-add.component";
import {CategoryDetailComponent} from "./category-detail/category-detail.component";

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: CategoryListComponent,
      },
      {
        path: 'add',
        component: CategoryAddComponent,
      },
      {
        path: 'detail/:id',
        component: CategoryDetailComponent,
      },
      {
        path: '**',
        redirectTo: 'error/404',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {
}
