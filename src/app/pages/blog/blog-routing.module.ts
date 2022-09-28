import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogComponent} from "./blog.component";
import {BlogDetailComponent} from "./blog-detail/blog-detail.component";
import {BlogListComponent} from "./blog-list/blog-list.component";
import {BlogAddComponent} from "./blog-add/blog-add.component";

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: BlogListComponent,
      },
      {
        path: 'add',
        component: BlogAddComponent,
      },
      {
        path: 'detail/:id',
        component: BlogDetailComponent,
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
export class BlogRoutingModule {
}
