import { Injectable } from '@angular/core';
import { ApiService } from '@nutela/core-services';
import * as constants from '../../constants';


@Injectable()
export class ProgressTransactionCommentWidgetService {


  constructor(private apiService: ApiService) {}

  getComments(id, employeeId) {
    return this.apiService.read(`${constants.PROGRESS_REPORT_DATA_URLs.getTransComment}/${id}`);
  }

  addComment(body, employeeId) {
    return this.apiService.create(`${constants.PROGRESS_REPORT_DATA_URLs.createTransComment}/${employeeId}`, body);
  }

  updateComment(body) {
    return this.apiService.update(`${constants.PROGRESS_REPORT_DATA_URLs.updateTransComment}`, body);
  }

  deleteComment(id, employeeId) {
    return this.apiService.delete(`${constants.PROGRESS_REPORT_DATA_URLs.deleteTransComment}/${id}/${employeeId}`);
  }
  
  downloadDoc(payload) {
    return this.apiService.read(`${constants.PROGRESS_REPORT_DATA_URLs.downloadTransCommentDoc}?docGuid=${payload.docGuId}.${payload.docExt}`);
  } 

  getEmployeePhoto(id) {
    return this.apiService.read(`${constants.PROGRESS_REPORT_DATA_URLs.getEmployeePhoto}/${id}`);
  }

}
