import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserInfoComponent} from "./user-info/user-info.component";
import {UsersDetailComponent} from "./users-detail.component";
import {UserMedicalInfoComponent} from "./user-medical-info/user-medical-info.component";
import {UserFinancialInfoComponent} from "./user-financial-info/user-financial-info.component";
import {UserConsultingComponent} from "./user-consulting/user-consulting.component";
import {UserQuestionAnswerComponent} from "./user-question-answer/user-question-answer.component";
import {UserCommentComponent} from "./user-comment/user-comment.component";

const routes: Routes = [
  {
    path: '',
    component: UsersDetailComponent,
    children: [
      {
        path: '',
        component: UserInfoComponent
      },
      {
        path: 'medical-info',
        component: UserMedicalInfoComponent
      },
      {
        path: 'financial-info',
        component: UserFinancialInfoComponent
      },
      {
        path: 'consulting',
        component: UserConsultingComponent
      },
      {
        path: 'question',
        component: UserQuestionAnswerComponent
      },
      {
        path: 'comment',
        component: UserCommentComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersDetailRoutingModule {
}
