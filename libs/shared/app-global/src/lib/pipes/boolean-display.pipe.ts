
import {Pipe, PipeTransform} from '@angular/core';

import { GENERAL } from '../constants/general.constant';

@Pipe ({
   name : 'booleanDisplay'
})
export class BooleanDisplayPipe implements PipeTransform {
   transform(value : boolean) : string {
     if (value === null || value === undefined) {
      return GENERAL.defaultDisplayText;
     } else {
      if (value === true) {
        return 'YES';
      } else {
        return 'NO';
      }
     }
   }
}
