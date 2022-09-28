import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RegexDirective} from "./regex.directive";
import {OutSideClickDirective} from "./outSideClick.directive";
import {PriceFormatDirective} from "./priceFormat.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RegexDirective,
    OutSideClickDirective,
    PriceFormatDirective
  ],
  exports: [
    RegexDirective,
    OutSideClickDirective,
    PriceFormatDirective
  ]
})

export class DirectivesModule {

}
