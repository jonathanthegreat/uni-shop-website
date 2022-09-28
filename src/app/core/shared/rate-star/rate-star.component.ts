import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rate-star',
  templateUrl: './rate-star.component.html',
  styleUrls: ['./rate-star.component.scss']
})
export class RateStarComponent implements OnInit {

  @Input() stars: number | any;
  @Input() readonly: boolean = true;
  @Output() selection: EventEmitter<number> = new EventEmitter<number>();
  checkedStars = [];
  emptyStars = [];

  constructor() {
  }

  ngOnInit(): void {

    if (this.readonly) {
      this.fetch(this.stars)
    } else {
      // @ts-ignore
      this.emptyStars = [`star`, `star`, `star`, `star`, `star`]
    }

  }

  fetch(feed: number) {

    this.checkedStars = []
    this.emptyStars = []

    if (feed <= 5) {

      for (let i = (6 - feed); i > 0; i--) {
        if (i > 1) {
          // @ts-ignore
          this.emptyStars.push(`star`);
        }
      }

      for (let i = feed; i > 0; i--) {
        if (i < 1) {
          // @ts-ignore
          this.checkedStars.push(`half`);
        } else {
          // @ts-ignore
          this.checkedStars.push(`star`);
        }
      }

    }
  }

  rate(index: number, type: number) {

    if (!this.readonly) {

      switch (type) {
        case 0:
          this.fetch(index + 1)
          break;
        case 1:
          this.fetch((index + 1) + this.checkedStars.length)

      }

      this.selection.emit(this.checkedStars.length)

    }


  }

}
