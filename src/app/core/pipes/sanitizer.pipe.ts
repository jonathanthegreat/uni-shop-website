import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'safeHtml'})
export class SanitizerPipe implements PipeTransform {

  constructor(
    private sanitized: DomSanitizer
  ) {
  }

  transform(value: any, type?: any) {
    if (type === 'url') {
      return this.sanitized.bypassSecurityTrustResourceUrl(value);
    }
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
