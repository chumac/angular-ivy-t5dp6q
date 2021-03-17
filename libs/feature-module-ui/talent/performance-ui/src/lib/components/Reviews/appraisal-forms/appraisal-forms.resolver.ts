import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { IPerformanceState } from '../../../store/root';

import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/internal/operators/filter';
import { take } from 'rxjs/internal/operators/take';
import { IComprehensiveReviewWorkflowProcessData } from '@nutela/models/talent/performance';
import { LoadReviewWorkflowProcessAppraisalForms, getComprehensiveDataReviewWorkflowProcess } from '../../../store/reviews/appraisal-forms';
import { WorkflowProcessStatus, Roles } from '../../../enumerations';

@Injectable()
export class AppraisalFormsResolver implements Resolve<IComprehensiveReviewWorkflowProcessData> {

  constructor(private store: Store<IPerformanceState>) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IComprehensiveReviewWorkflowProcessData> {
    const id = Number(route.paramMap.get('id'));

    if (!isNaN(id)) {
      this.store.dispatch(new LoadReviewWorkflowProcessAppraisalForms(id));
    } else {
      console.log('Appraisal Forms: Route param is not a number.');     // Stop navigation
    }

    return this.store.pipe(select(getComprehensiveDataReviewWorkflowProcess),
      //tap(data => console.log('Appraisal Resolver: +==> ', data)),
      filter(data => !!data),
      filter(data => !!data.reviewWorkflowProcess),
      filter(data => ((data.reviewWorkflowProcess.reviewer_id === data.employeeData.employee_id) || (data.reviewWorkflowProcess.role === Roles.MODERATION || data.reviewWorkflowProcess.role === Roles.HR)) && (data.reviewWorkflowProcess.status === WorkflowProcessStatus.NOT_STARTED || data.reviewWorkflowProcess.status === WorkflowProcessStatus.STARTED || data.reviewWorkflowProcess.status === WorkflowProcessStatus.SAVED)),
      take(1)
    );
  }
}

