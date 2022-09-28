import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QaListComponent} from "./qa-list/qa-list.component";
import {QaDetailComponent} from "./qa-detail/qa-detail.component";
import {QaComponent} from "./qa.component";

const routes: Routes = [
  {
    path: '',
    component: QaComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: QaListComponent,
      },
      {
        path: 'detail/:id',
        component: QaDetailComponent,
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
export class QaRoutingModule {
}
