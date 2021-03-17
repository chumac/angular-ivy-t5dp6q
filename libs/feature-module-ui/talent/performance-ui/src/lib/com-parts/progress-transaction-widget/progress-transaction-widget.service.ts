import { Injectable } from '@angular/core';
import { ApiService } from '@nutela/core-services';
import * as constants from '../../constants';


@Injectable()
export class ProgressTransactionWidgetService {


  constructor(private apiService: ApiService) {}

  getTransaction(id) {
    return this.apiService.read(`${constants.PROGRESS_REPORT_DATA_URLs.getProgressTransactionInfo}/${id}`);
  }

  deleteTransaction(id) {
    return this.apiService.delete(`${constants.PROGRESS_REPORT_DATA_URLs.removeProgressTransaction}/${id}`);
  }
  
}
