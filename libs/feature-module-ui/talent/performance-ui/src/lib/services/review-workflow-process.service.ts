import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from '@nutela/core-services';
import { IApiResult } from '@nutela/models/core-data';
import { IReviewWorkflowProcess } from '@nutela/models/talent/performance';
import { REVIEW_WORKFLOW_PROCESS_DATA_URLs } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ReviewWorkflowProcessService {
  reviewWorkflowProcesses: IReviewWorkflowProcess[];
  firstReviewWorkflowProcess: IReviewWorkflowProcess = null;
  reviewWorkflowProcess: IReviewWorkflowProcess = null;

  constructor(private apiService: ApiService) {}

  getAll(planId: number): Observable<IApiResult> {
    return this.apiService.read(
      `${REVIEW_WORKFLOW_PROCESS_DATA_URLs.getData}/${planId}`
    );
  }

  getItem(id: number): Observable<IApiResult> {
    return this.apiService.read(
      `${REVIEW_WORKFLOW_PROCESS_DATA_URLs.getDataByWorkflowProcessId}/${id}`
    );
  }

  startReview(id: number): Observable<IApiResult> {
    return this.apiService.update(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.startReview}/${id}`, {});
  }

  startReviewModeration(id: number): Observable<IApiResult> {
    return this.apiService.update(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.startReviewModeration}/${id}`, {});
  }

  startReviewHR(id: number): Observable<IApiResult> {
    // console.log('REVIEW_WORKFLOW_PROCESS_DATA_URLs', `${REVIEW_WORKFLOW_PROCESS_DATA_URLs.startReviewHR}/${id}`);

    return this.apiService.update(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.startReviewHR}/${id}`, {});
  }

  completeReview(workflowProcessId: number, body: any): Observable<IApiResult> {
  	return this.apiService.update(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.completeReview}/${workflowProcessId}`, body);
  }

  addComment(workflowProcessId: number, body: any): Observable<IApiResult> {
  	return this.apiService.create(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.addComment}/${workflowProcessId}`, body);
  }

  completeModeration(workflowProcessId: number, body: any): Observable<IApiResult> {
  	return this.apiService.update(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.completeModeration}/${workflowProcessId}`, body);
  }

  completeAppraisal(workflowProcessId: number, body: any): Observable<IApiResult> {
  	return this.apiService.update(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.completeAppraisal}/${workflowProcessId}`, body);
  }

  editAppraisal(workflowProcessId: number): Observable<IApiResult> {
    return this.apiService.update(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.editAppraisal}/${workflowProcessId}`, {});
  }

  cancelEdit(workflowProcessId: number): Observable<IApiResult> {
    return this.apiService.update(`${REVIEW_WORKFLOW_PROCESS_DATA_URLs.cancelEdit}/${workflowProcessId}`, {});
  }
}
