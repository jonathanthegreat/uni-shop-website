import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MedicalFieldsRoutingModule} from './medical-fields-routing.module';
import {MedicalFieldsComponent} from './medical-fields.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MedicalFieldsComponent
  ],
  imports: [
    CommonModule,
    MedicalFieldsRoutingModule,
    ReactiveFormsModule
  ]
})
export class MedicalFieldsModule {
}
