import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {LayoutComponent} from "../core/layout/layout.component";
import {FooterComponent} from '../core/layout/components/footer/footer.component';
import {HeaderComponent} from '../core/layout/components/header/header.component';
import {AsideComponent} from '../core/layout/components/aside/aside.component';
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {InlineSVGModule} from "ng-inline-svg-2";
import {DashboardComponent} from './dashboard/dashboard.component';
import {UsersComponent} from './users/users.component';
import {DoctorsComponent} from './doctors/doctors.component';
import {InsuranceComponent} from './insurance/insurance.component';
import {SharedModule} from "../core/shared/shared.module";
import {BlogComponent} from './blog/blog.component';
import {CategoriesComponent} from './categories/categories.component';
import {ChartsModule} from "./charts/charts.module";
import {FinancialComponent} from './financial/financial.component';
import {MatTabsModule} from "@angular/material/tabs";


@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    AsideComponent,
    DashboardComponent,
    UsersComponent,
    DoctorsComponent,
    InsuranceComponent,
    BlogComponent,
    CategoriesComponent,
    FinancialComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    InlineSVGModule,
    SharedModule,
    ChartsModule,
    MatTabsModule
  ]
})
export class LayoutModule {
}
