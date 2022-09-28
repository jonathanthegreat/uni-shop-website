import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CouponListComponent} from "./coupon-list/coupon-list.component";
import {UsersComponent} from "../users/users.component";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: CouponListComponent,
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
export class CouponRoutingModule {
}
