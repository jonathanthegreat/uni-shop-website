import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DoctorsRoutingModule} from './doctors-routing.module';
import {DoctorsListComponent} from './doctors-list/doctors-list.component';
import {DoctorsDetailComponent} from './doctors-detail/doctors-detail.component';
import {MatTabsModule} from "@angular/material/tabs";
import {SharedModule} from "../../core/shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {DoctorsAddComponent} from './doctors-add/doctors-add.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DirectivesModule} from "../../core/shared/directives/directives.module";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    DoctorsListComponent,
    DoctorsDetailComponent,
    DoctorsAddComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    MatTabsModule,
    SharedModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    DirectivesModule,
    MatSelectModule
  ]
})
export class DoctorsModule {
}
