import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'jalali-moment';
import 'moment/locale/fa';

@Pipe({
  name: 'jalali'
})
export class JalaliPipe implements PipeTransform {
  format = 'YYYY-MM-DD';

  transform(value: any, format?: any): any {

    if (format !== undefined) {
      this.format = format;
    }

    try {
      const MomentDate = moment(value);
      return MomentDate.locale('fa').format(this.format);
    } catch (e) {
      return '';
    }
  }
}

