import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DynamicConfigsComponent} from "./dynamic-configs.component";
import {FaqComponent} from "./faq/faq.component";
import {InfoComponent} from "./info/info.component";
import {CreateInfoComponent} from "./create-info/create-info.component";
import {ReArrangeInfoComponent} from "./re-arrange-info/re-arrange-info.component";

const routes: Routes = [
  {
    path: '',
    component: DynamicConfigsComponent,
    children: [
      {
        path: '',
        redirectTo: 'faq',
        pathMatch: 'full'
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
      {
        path: 'create-info',
        component: CreateInfoComponent,
      },
      {
        path: 'reArrange-info',
        component: ReArrangeInfoComponent,
      },
      {
        path: 'info',
        component: InfoComponent,
      },
      {
        path: '**',
        redirectTo: 'error/404',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DynamicConfigsRoutingModule {
}

export const routedComponents = [
  DynamicConfigsComponent,
  InfoComponent
];
