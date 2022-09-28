import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DoctorsDetailComponent} from "./doctors-detail.component";
import {DoctorInfoComponent} from "./doctor-info/doctor-info.component";
import {DoctorFinancilComponent} from "./doctor-financil/doctor-financil.component";
import {DoctorConsultingComponent} from "./doctor-consulting/doctor-consulting.component";
import {DoctorQuestionAnswerComponent} from "./doctor-question-answer/doctor-question-answer.component";
import {DoctorWeekBookComponent} from "./doctor-week-book/doctor-week-book.component";

const routes: Routes = [
  {
    path: '', component: DoctorsDetailComponent,
    children: [
      {
        path: '',
        component: DoctorInfoComponent
      },
      {
        path: 'financial',
        component: DoctorFinancilComponent
      },
      {
        path: 'weekBook',
        component: DoctorWeekBookComponent
      },
      {
        path: 'consulting',
        component: DoctorConsultingComponent
      },
      {
        path: 'question',
        component: DoctorQuestionAnswerComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsDetailRoutingModule {
}
