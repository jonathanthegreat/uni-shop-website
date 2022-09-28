import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SanitizerPipe} from "./sanitizer.pipe";
import {JalaliPipe} from "./DateJalali";


@NgModule({
  declarations: [
    SanitizerPipe,
    JalaliPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    JalaliPipe,
    SanitizerPipe,
  ]
})

export class PipesModule {
}
