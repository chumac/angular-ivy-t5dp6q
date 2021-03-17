
import {Pipe, PipeTransform} from '@angular/core';

import * as moment from 'moment';

import { GENERAL } from '../constants/general.constant';

const APP_DATE_DISPLAY_FORMAT = `DD.MMM.YYYY`;
const APP_DATE_FORMAT = `YYYY/M/D`;
const APP_DATE_FORMAT_2 = `YYYY-M-D`;

@Pipe ({
   name: 'dateDisplay'
})
export class DateDisplayPipe implements PipeTransform {
   transform(value : string | Date) : string {
    if (value) {
      return moment(value).format(APP_DATE_DISPLAY_FORMAT);
    } else {
      return GENERAL.defaultDateDisplayText;
    }
   }
}

function isDateValid(value: string | Date): boolean {
  if (
    moment(value, APP_DATE_FORMAT, true).isValid() ||
    moment(value, APP_DATE_FORMAT_2, true).isValid()
  ) {
    return true;
  } else {
    return false;
  }
}
