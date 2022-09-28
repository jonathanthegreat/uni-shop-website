import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {QaRoutingModule} from './qa-routing.module';
import {QaComponent} from './qa.component';
import {QaListComponent} from './qa-list/qa-list.component';
import {QaDetailComponent} from './qa-detail/qa-detail.component';
import {SharedModule} from "../../core/shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    QaComponent,
    QaListComponent,
    QaDetailComponent
  ],
  imports: [
    CommonModule,
    QaRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    FormsModule
  ]
})
export class QaModule {
}
