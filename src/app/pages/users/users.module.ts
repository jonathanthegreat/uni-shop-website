import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {UsersListComponent} from './users-list/users-list.component';
import {UsersDetailComponent} from './users-detail/users-detail.component';
import {MatTabsModule} from "@angular/material/tabs";
import {SharedModule} from "../../core/shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UsersListComponent,
    UsersDetailComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTabsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UsersModule {
}
