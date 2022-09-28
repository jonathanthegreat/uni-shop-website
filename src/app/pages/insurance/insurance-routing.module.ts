import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InsuranceComponent} from "./insurance.component";
import {InsuranceListComponent} from "./insurance-list/insurance-list.component";

const routes: Routes = [
  {
    path: '',
    component: InsuranceComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: InsuranceListComponent,
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
export class InsuranceRoutingModule {
}
