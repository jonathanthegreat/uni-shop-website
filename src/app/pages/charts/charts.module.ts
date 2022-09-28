import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LineChartComponent} from './line-chart/line-chart.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {InlineSVGModule} from "ng-inline-svg-2";
import {WaveChartComponent} from './wave-chart/wave-chart.component';


@NgModule({
  declarations: [
    LineChartComponent,
    WaveChartComponent
  ],
  exports: [
    LineChartComponent,
    WaveChartComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    NgApexchartsModule,
    NgbDropdownModule,
  ]
})
export class ChartsModule {
}
