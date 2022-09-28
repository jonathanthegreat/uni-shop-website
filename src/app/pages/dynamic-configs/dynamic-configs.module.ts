import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DynamicConfigsRoutingModule, routedComponents} from './dynamic-configs-routing.module';
import {FaqComponent} from './faq/faq.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ReactiveFormsModule} from "@angular/forms";
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ReArrangeInfoComponent} from './re-arrange-info/re-arrange-info.component';
import {CreateInfoComponent} from './create-info/create-info.component';


@NgModule({
  declarations: [
    FaqComponent,
    ReArrangeInfoComponent,
    CreateInfoComponent,
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    DynamicConfigsRoutingModule,
    DragDropModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class DynamicConfigsModule {
}
