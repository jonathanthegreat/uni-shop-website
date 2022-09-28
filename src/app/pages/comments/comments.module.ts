import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommentsRoutingModule} from './comments-routing.module';
import {CommentsComponent} from './comments.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTabsModule} from "@angular/material/tabs";
import {SharedModule} from "../../core/shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    CommentsComponent
  ],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    MatDialogModule,
    MatTabsModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule
  ]
})
export class CommentsModule {
}
