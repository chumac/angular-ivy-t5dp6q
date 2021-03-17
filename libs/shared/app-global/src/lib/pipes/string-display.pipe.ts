
import {Pipe, PipeTransform} from '@angular/core';

import { GENERAL } from '../constants/general.constant';

@Pipe ({
   name : 'stringDisplay'
})
export class StringDisplayPipe implements PipeTransform {
   transform(value : string) : string {
     if (value === undefined || value === null || value === '') {
      return GENERAL.defaultDisplayText;
     } else {
      return value;
     }
   }
}
