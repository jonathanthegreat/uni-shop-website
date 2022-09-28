import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[regex]'
})
export class RegexDirective {

  @Input('regex') regex: any = '[0-9]';

  // listen for key downs
  @HostListener('keydown', ['$event'])
  @HostListener('paste', ['$event'])
  onKeyDown(event: any) {

    const regexp = new RegExp(this.regex);
    // if user has copied a text using context menu
    if (event.clipboardData && event.clipboardData.getData('text').length === 11) {
      if (regexp.test(event.clipboardData.getData('text'))) {
        return event;
      }
      event.preventDefault();

    }

    // if user has copied a text using ctrl + v
    if (event.ctrlKey && event.key === 'v') {
      if (!regexp.test(event.target.value + event.key)) {
        return event;
      }
      event.preventDefault();
    }

    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Backspace', 'Tab', 'Alt',
      'Shift', 'Control', 'Enter', 'Delete', 'Meta'].includes(event.code)) {
      return;
    }

    if (!regexp.test(event.target.value + event.key)) {
      event.preventDefault();
    }


  }

}
