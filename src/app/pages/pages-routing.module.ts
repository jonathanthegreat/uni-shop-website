import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "../core/layout/layout.component";
import {FinancialComponent} from "./financial/financial.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'users'
      },
      /*{
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
      },*/
      {
        path: 'doctors',
        loadChildren: () => import('./doctors/doctors.module').then(m => m.DoctorsModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
      },
      {
        path: 'comments',
        loadChildren: () => import('./comments/comments.module').then(m => m.CommentsModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'insurance',
        loadChildren: () => import('./insurance/insurance.module').then(m => m.InsuranceModule),
      },
      {
        path: 'medical-fields',
        loadChildren: () => import('./medical-fields/medical-fields.module').then(m => m.MedicalFieldsModule),
      },
      {
        path: 'dynamic-configs',
        loadChildren: () => import('./dynamic-configs/dynamic-configs.module').then(m => m.DynamicConfigsModule),
      },
      {
        path: 'coupon',
        loadChildren: () => import('./coupon/coupon.module').then(m => m.CouponModule),
      },
      {
        path: 'financial',
        component: FinancialComponent,
        pathMatch: 'full'
      },
      {
        path: 'doc-reserve',
        loadChildren: () => import('./doc-reserve/doc-reserve.module').then(m => m.DocReserveModule),
      },
      {
        path: 'qa',
        loadChildren: () => import('./qa/qa.module').then(m => m.QaModule),
      },
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
      },
      {
        path: 'category',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
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
export class PagesRoutingModule {
}
