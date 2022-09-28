import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[clickOut]',
})
export class OutSideClickDirective {

  @Output() clickOut = new EventEmitter<void>();

  constructor(
    private elementRef: ElementRef
  ) {
  }

  @HostListener('document:click', ['$event.target'])

  public onClick(target: any) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOut.emit();
    }
  }

}
