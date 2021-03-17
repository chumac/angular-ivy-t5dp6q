import {Pipe, PipeTransform} from '@angular/core';
import { GENERAL } from '../constants/general.constant';

@Pipe ({
   name : 'workHourTypeLabel'
})
export class WorkHourLabelPipe implements PipeTransform {
   transform(value :  number) : string {
     if (isNaN(value)) {
      return GENERAL.defaultDisplayText;
     } else { 
        switch (value) {
            case WorkHourType.NONE:
              return '<mdb-badge info="true">None</mdb-badge>';
            case WorkHourType.LEAVE:
              return '<mdb-badge primary="true">Leave</mdb-badge>';
            case WorkHourType.OVERTIME:
              return '<mdb-badge warning="true">Overtime</mdb-badge>';
            case WorkHourType.STANDARD:
              return '<mdb-badge success="true">Standard</mdb-badge>';
          }
    }
   }
}

export enum WorkHourType {
    NONE, LEAVE, OVERTIME, STANDARD
  }
