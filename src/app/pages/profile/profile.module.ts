import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {ProfileInfoComponent} from './profile-info/profile-info.component';
import {ProfileAdminsComponent} from './profile-admins/profile-admins.component';
import {ProfileChangePasswordComponent} from './profile-change-password/profile-change-password.component';
import {ProfileAdminsDetailComponent} from './profile-admins-detail/profile-admins-detail.component';
import {MatTabsModule} from "@angular/material/tabs";
import {SharedModule} from "../../core/shared/shared.module";
import {ProfileAdminsAddComponent} from './profile-admins-add/profile-admins-add.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DirectivesModule} from "../../core/shared/directives/directives.module";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileInfoComponent,
    ProfileAdminsComponent,
    ProfileChangePasswordComponent,
    ProfileAdminsDetailComponent,
    ProfileAdminsAddComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatTabsModule,
    SharedModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    DirectivesModule,
    MatSelectModule
  ]
})
export class ProfileModule {
}
