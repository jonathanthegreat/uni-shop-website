import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CouponRoutingModule} from './coupon-routing.module';
import {CouponComponent} from './coupon.component';
import {CouponListComponent} from './coupon-list/coupon-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DirectivesModule} from "../../core/shared/directives/directives.module";


@NgModule({
  declarations: [
    CouponComponent,
    CouponListComponent
  ],
  imports: [
    CommonModule,
    CouponRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    DirectivesModule
  ]
})
export class CouponModule {
}
