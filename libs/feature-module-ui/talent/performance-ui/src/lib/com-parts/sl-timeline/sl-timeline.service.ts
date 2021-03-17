import { Injectable } from '@angular/core';
import { ApiService } from '@nutela/core-services';
import * as constants from '../../constants';


@Injectable({
  providedIn: 'root'
})
export class SlTimelineService {


  constructor(private apiService: ApiService) {}

  getTransaction(id) {
    return this.apiService.read(`${constants.PROGRESS_REPORT_DATA_URLs.getProgressTransactionInfo}/${id}`);
  }

  deleteTransaction(id) {
    return this.apiService.delete(`${constants.PROGRESS_REPORT_DATA_URLs.removeProgressTransaction}/${id}`);
  }

  addComment(body) {
    return this.apiService.create(`${constants.PROGRESS_REPORT_DATA_URLs.createTransComment}`, body);
  }

  updateComment(body) {
    return this.apiService.update(`${constants.PROGRESS_REPORT_DATA_URLs.updateTransComment}`, body);
  }

  deleteComment(id) {
    return this.apiService.delete(`${constants.PROGRESS_REPORT_DATA_URLs.deleteTransComment}/${id}`);
  }

  getEmployeePhoto(id) {
    return this.apiService.read(`${constants.PROGRESS_REPORT_DATA_URLs.getEmployeePhoto}/${id}`);
  }

}
