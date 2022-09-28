import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

/**
 * @author Alireza Saeedi
 * @version 1.0
 * @since 2021-09-16 20:00
 */
/**
 *  <app-rating-bar [(rateModel)]="score" [max]="5"></app-rating-bar>
 */
@Component({
  selector: 'app-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.scss']
})
export class RatingBarComponent implements OnInit {

  /*number of stars*/
  @Input() max = 5;
  /*for show default star*/
  /*  @Input() rate: number = 0;*/
  /*set true if just show star with out editable*/
  @Input() readonlyRate = false;
  /*like [(ngModel)]*/
  @Input() rateModel!: number;
  @Input() id!: number;
  @Output() rateModelChange = new EventEmitter<number>();
  uniqId = new Date().getTime();

  constructor() {
  }

  ngOnInit(): void {
  }

  changeValue(value: any) {
    this.rateModelChange.emit(value);
  }
}
