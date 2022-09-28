import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./profile.component";
import {ProfileInfoComponent} from "./profile-info/profile-info.component";
import {ProfileAdminsComponent} from "./profile-admins/profile-admins.component";
import {ProfileAdminsDetailComponent} from "./profile-admins-detail/profile-admins-detail.component";
import {ProfileChangePasswordComponent} from "./profile-change-password/profile-change-password.component";
import {ProfileAdminsAddComponent} from "./profile-admins-add/profile-admins-add.component";

const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  children: [
    {
      path: '',
      redirectTo: 'info',
      pathMatch: 'full'
    },
    {
      path: 'info',
      component: ProfileInfoComponent,
    },
    {
      path: 'admins',
      component: ProfileAdminsComponent,
    },
    {
      path: 'admins/detail/:id',
      component: ProfileAdminsDetailComponent,
    },
    {
      path: 'admins/add',
      component: ProfileAdminsAddComponent,
    },
    {
      path: 'change-password',
      component: ProfileChangePasswordComponent,
    },
    {
      path: '**',
      redirectTo: 'error/404',
      pathMatch: 'full',
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
