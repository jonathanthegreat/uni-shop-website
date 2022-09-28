import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocReserveComponent} from "./doc-reserve.component";
import {DocReserveListComponent} from "./doc-reserve-list/doc-reserve-list.component";
import {DocReserveDetailComponent} from "./doc-reserve-detail/doc-reserve-detail.component";

const routes: Routes = [
  {
    path: '',
    component: DocReserveComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: DocReserveListComponent,
      },
      {
        path: 'detail/:id',
        component: DocReserveDetailComponent,
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
export class DocReserveRoutingModule {
}
