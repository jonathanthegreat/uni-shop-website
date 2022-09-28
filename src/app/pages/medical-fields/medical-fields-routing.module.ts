import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MedicalFieldsComponent} from "./medical-fields.component";

const routes: Routes = [
  {
    path: '',
    component: MedicalFieldsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalFieldsRoutingModule {
}
