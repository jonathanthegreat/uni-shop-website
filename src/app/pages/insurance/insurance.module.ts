import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InsuranceRoutingModule} from './insurance-routing.module';
import {InsuranceListComponent} from './insurance-list/insurance-list.component';
import {SharedModule} from "../../core/shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    InsuranceListComponent,
  ],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class InsuranceModule {
}
