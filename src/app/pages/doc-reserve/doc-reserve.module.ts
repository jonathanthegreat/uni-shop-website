import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DocReserveRoutingModule} from './doc-reserve-routing.module';
import {DocReserveDetailComponent} from './doc-reserve-detail/doc-reserve-detail.component';
import {DocReserveListComponent} from './doc-reserve-list/doc-reserve-list.component';
import {DocReserveComponent} from './doc-reserve.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {SharedModule} from "../../core/shared/shared.module";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    DocReserveDetailComponent,
    DocReserveListComponent,
    DocReserveComponent
  ],
  imports: [
    CommonModule,
    DocReserveRoutingModule,
    ReactiveFormsModule,
    MatTabsModule,
    SharedModule,
    MatSelectModule,
    FormsModule
  ]
})
export class DocReserveModule {
}
