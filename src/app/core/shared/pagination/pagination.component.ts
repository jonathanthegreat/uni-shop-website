import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() siblings = 1;
  @Input() current = 1;
  @Input() total = 1;
  @Input() color = '';

  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  pages: number[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.total = Math.ceil(this.total);
    this.calc();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.total = Math.ceil(this.total);
    this.calc();
  }

  setPage(value: number): void {
    if (value < 1 || value > this.total || value === this.current) {
      return;
    }
    this.current = value;
    this.pageChange.emit(this.current);
    this.calc();
  }

  trackByFn(index: number): number {
    return index;
  }

  private calc(): void {
    const min = Math.max(1, this.current - this.siblings - Math.max(0, this.siblings - this.total + this.current));
    const max = Math.min(this.total, min + this.siblings * 2);
    this.pages = [];
    for (let i = min; i <= max; i++) {
      this.pages.push(i);
    }
  }

}
