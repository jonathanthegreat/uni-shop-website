import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DoctorsComponent} from "./doctors.component";
import {DoctorsListComponent} from "./doctors-list/doctors-list.component";
import {DoctorsAddComponent} from "./doctors-add/doctors-add.component";

const routes: Routes = [
  {
    path: '',
    component: DoctorsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: DoctorsListComponent,
      },
      {
        path: 'add',
        component: DoctorsAddComponent,
      },
      {
        path: 'detail/:id',
        loadChildren: () =>
          import('./doctors-detail/doctors-detail.module').then((m) => m.DoctorsDetailModule),
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
export class DoctorsRoutingModule {
}
