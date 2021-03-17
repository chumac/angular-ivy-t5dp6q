import {Pipe, PipeTransform} from '@angular/core';
import { GENERAL } from '../constants/general.constant';

@Pipe ({
   name : 'stringWrap'
})
export class StringWrapPipe implements PipeTransform {
   transform(value : string) : string {
     if (value === undefined || value === null || value === '') {
      return GENERAL.defaultDisplayText;
     } else {
        let result = '';
        while (value.length > 0) {
          result += value.substring(0, 36) + '<br>';
          value = value.substring(36);
        }
        return result;
    //   return value.replace(/.{20}/g, "$1\n").toString();
     }
   }
}
