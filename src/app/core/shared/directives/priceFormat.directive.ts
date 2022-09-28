import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {FormControlName} from '@angular/forms';

@Directive({
  selector: '[priceFormat]'
})
export class PriceFormatDirective implements OnInit {

  @Input() OnlyNumber = true;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private formControl: FormControlName
  ) {
    this.renderer.addClass(this.el.nativeElement, 'dir-ltr');
  }

  ngOnInit(): void {
    if (this.formControl != null && this.formControl.control.value) {
      this.formControl.control.setValue(this.numberWithCommas(this.formControl.control.value));
    }
  }


  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    const e = event as KeyboardEvent;
    if (this.OnlyNumber) {
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        // (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    }
  }


  /**format price*/
  @HostListener('keyup', ['$event']) onKeyUp(event: any) {
    if (event.target.value == '') {
      return;
    }
    event.target.value = this.numberWithCommas(event.target.value.replace(/,/g, ''));
  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /*  ngAfterViewInit(): void {

        if (this.formControl != null) {
            if (this.formControl.control.value)
                this.formControl.control.setValue(this.numberWithCommas(this.formControl.control.value))

            this.formControl.control.valueChanges.pipe(pairwise()).subscribe(([prev, value]: [any, any]) => {
                if (value == null || prev == null)
                    return;
                let newVal = value.toString().replaceAll(',', '');
                let oldVal = prev.toString().replaceAll(',', '');
                if (value != '' && isNumeric(newVal) && newVal != oldVal)
                    this.formControl.control.setValue(this.numberWithCommas(newVal))
            });
        }
    }*/
}
