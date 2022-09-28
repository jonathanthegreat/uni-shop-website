import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DoctorsDetailRoutingModule} from './doctors-detail-routing.module';
import {DoctorInfoComponent} from './doctor-info/doctor-info.component';
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DoctorFinancilComponent} from './doctor-financil/doctor-financil.component';
import {DoctorConsultingComponent} from './doctor-consulting/doctor-consulting.component';
import {DoctorQuestionAnswerComponent} from './doctor-question-answer/doctor-question-answer.component';
import {DirectivesModule} from "../../../core/shared/directives/directives.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DoctorWeekBookComponent} from './doctor-week-book/doctor-week-book.component';
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../../../core/shared/shared.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatExpansionModule} from "@angular/material/expansion";

@NgModule({
  declarations: [
    DoctorInfoComponent,
    DoctorFinancilComponent,
    DoctorConsultingComponent,
    DoctorQuestionAnswerComponent,
    DoctorWeekBookComponent,
  ],
  imports: [
    CommonModule,
    DoctorsDetailRoutingModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    MatDatepickerModule,
    MatIconModule,
    SharedModule,
    MatTabsModule,
    MatExpansionModule,
  ],
})
export class DoctorsDetailModule {
}
