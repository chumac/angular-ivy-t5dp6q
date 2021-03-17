import {Pipe, PipeTransform} from '@angular/core';
import { GENERAL } from '../constants/general.constant';

@Pipe ({
   name : 'hrMinDisplay'
})
export class HrMinDisplayPipe implements PipeTransform {
   transform(value :  number) : string {
     if (isNaN(value)) {
      return GENERAL.defaultDisplayText;
     } else { 
        let hour = Math.floor((value/60));
        let minute = (value%60);
        let result = `${hour}hr(s) ${minute}Min(s)`;
        return result;
    }
   }
}
