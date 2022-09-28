import {Injectable} from "@angular/core";
import * as moment from 'jalali-moment';
import * as momentMain from 'moment';
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})

export class GlobalVariableService {
  EMAIL_REGEX = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
  PHONE_REGEX = '(\\+98|0)?9\\d{9}';
  PHONE_INPUT_REGEX = '^[0]{1}[0-9]{0,10}$';
  OTP_INPUT_REGEX = '^[0-9]{0,4}$';
  NUMBER_REGEX = '^[0-9]+$';
  AMOUNT_REGEX = '^[1-9]{1}[0-9]{0,14}$';
  PERCENTAGE_REGEX = '^[1-9][0-9]?$|^100$';
  TIME_REGEX = '^([0-1]?[0-9]|2[0-3])(?::([0]{0,2}))?$';
  PASSWORD_REGEX = '^.{4,25}$';
  USER_NAME_REGEX = '^[a-z0-9_-]+$';
  ENGLISH_REGEX = '^[a-zA-Z\\s]+$';
  PERSIAN_REGEX = '^[ا-یءئأإ\\s]+$';
  // @ts-ignore
  BASE_URL = this.configService.config.API_URL;
  VERSION = this.configService.config.VERSION;

  // Configs------------------------------------------------------------------------------------------------------------------
  dynaform: string = this.BASE_URL + '/panel/configs/dynaform';

  // Doctors -----------------------------------------------------------------------
  doctors: string = this.BASE_URL + '/panel/doctors';

  // Doctor Reserve -----------------------------------------------------------------------
  docReserve: string = this.BASE_URL + '/panel/docreserve';
  oneDocReserve: string = this.docReserve + '/doctor/reserve';
  oneUserReserve: string = this.docReserve + '/user/reserve';

  // Admins -----------------------------------------------------------------------
  admins: string = this.BASE_URL + `/panel/admins`;
  updateAdmins: string = this.BASE_URL + `/panel/admins/update`;
  adminsLogin: string = this.BASE_URL + `/panel/admins/login`;
  adminsUpdateImage: string = this.BASE_URL + `/panel/admins/updateImage`;
  adminsUpdatePassword: string = this.BASE_URL + `/panel/admins/updatePassword`;
  adminsCheckField: string = this.BASE_URL + `/panel/admins/checkField`; // type = phoneNumber||email||username

  // Users -----------------------------------------------------------------------
  users: string = this.BASE_URL + '/panel/users';
  usersToken: string = this.BASE_URL + '/panel/users/token';

  // Comments -----------------------------------------------------------------------
  comments: string = this.BASE_URL + '/panel/comments';

  // Medical-fields -----------------------------------------------------------------------
  medical: string = this.BASE_URL + '/panel/medical_field';

  // Insurance -----------------------------------------------------------------------
  insurance: string = this.BASE_URL + '/panel/insur';

  // FAQ -----------------------------------------------------------------------
  faq: string = this.BASE_URL + '/panel/faqs';

  // Coupon -----------------------------------------------------------------------
  coupon: string = this.BASE_URL + '/panel/coupon';

  // Q&A -----------------------------------------------------------------------
  questionAndAnswer: string = this.BASE_URL + '/panel/qa';
  oneDocQA: string = this.questionAndAnswer + '/answer/doctor';
  oneUserQA: string = this.questionAndAnswer + '/user';

  // Blog -----------------------------------------------------------------------
  blog: string = this.BASE_URL + '/panel/post';

  // Blog Category -----------------------------------------------------------------------
  blogCategory: string = this.BASE_URL + '/panel/post/category';

  constructor(
    private configService: ConfigService
  ) {
  }

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  // @ts-ignore
  convertDate(value: any, toLang: 'fa' | 'en', format: 'YYYY-MM-DD' | 'jYYYY-jMM-jDD' | 'YYYY/MM/DD' | 'jYYYY/jMM/jDD' | 'HH:mm' | 'jYYYY' = 'YYYY-MM-DD') {
    if (toLang == 'fa') {
      // return moment(value, 'YYYY-MM-DD').format('jYYYY-jMM-jDD');
      return moment(value, momentMain(value).creationData().format).format(format);
    } else if (toLang == 'en') {
      // return moment(value, 'jYYYY-jMM-jDD').format('YYYY-MM-DD');
      // @ts-ignore
      const currentFormat = (momentMain(value).creationData().format).toString().replace('YYYY', 'jYYYY').replace('MM', 'jMM').replace('DD', 'jDD');
      return moment(value, currentFormat).format(format);
    }
  }

  convertDateToDateWithTime(input: any) {
    return new Date(input).toLocaleTimeString('fa', {
      hour: '2-digit',
      minute: '2-digit'
    }) + ' - ' + new Date(input).toLocaleDateString('fa');
  }
}
