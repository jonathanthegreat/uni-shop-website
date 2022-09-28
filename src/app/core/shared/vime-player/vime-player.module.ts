import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VimePlayerComponent} from './vime-player.component';
import {VimeModule} from "@vime/angular";


@NgModule({
  declarations: [
    VimePlayerComponent
  ],
  imports: [
    CommonModule,
    VimeModule
  ],
  exports: [
    VimePlayerComponent
  ]
})
export class VimePlayerModule {
}
