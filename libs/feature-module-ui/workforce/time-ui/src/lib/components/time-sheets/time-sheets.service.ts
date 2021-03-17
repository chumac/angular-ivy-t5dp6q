import { Injectable } from '@angular/core';

import { AWAITING_TIME_SHEET_TYPES_CONSTANTs } from '@nutela/shared/app-global';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {

  public filterList = AWAITING_TIME_SHEET_TYPES_CONSTANTs;

  constructor() { }

}
