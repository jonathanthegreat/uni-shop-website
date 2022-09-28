import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersDetailRoutingModule} from './users-detail-routing.module';
import {UserInfoComponent} from './user-info/user-info.component';
import {UserMedicalInfoComponent} from './user-medical-info/user-medical-info.component';
import {UserFinancialInfoComponent} from './user-financial-info/user-financial-info.component';
import { UserConsultingComponent } from './user-consulting/user-consulting.component';
import {SharedModule} from "../../../core/shared/shared.module";
import {MatTabsModule} from "@angular/material/tabs";
import { UserQuestionAnswerComponent } from './user-question-answer/user-question-answer.component';
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import { UserCommentComponent } from './user-comment/user-comment.component';


@NgModule({
  declarations: [
    UserInfoComponent,
    UserMedicalInfoComponent,
    UserFinancialInfoComponent,
    UserConsultingComponent,
    UserQuestionAnswerComponent,
    UserCommentComponent
  ],
    imports: [
        CommonModule,
        UsersDetailRoutingModule,
        SharedModule,
        MatTabsModule,
        MatSelectModule,
        FormsModule
    ]
})
export class UsersDetailModule {
}
