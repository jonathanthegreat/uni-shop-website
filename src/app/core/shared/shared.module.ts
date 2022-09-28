import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from './pagination/pagination.component';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRippleModule} from '@angular/material/core';
import {RatingBarComponent} from './rating-bar/rating-bar.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    PaginationComponent,
    RatingBarComponent
  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
    CommonModule,
    ReactiveFormsModule,
    MatRippleModule,
    FormsModule,
    MatTabsModule
  ],
  providers: [
    ToastrService,
  ],
  exports: [
    PaginationComponent,
    RatingBarComponent,
  ]
})
export class SharedModule {
}
