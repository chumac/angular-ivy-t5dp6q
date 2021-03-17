import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError } from '@nutela/core-services';

import {
  WorkflowTransactionActionTypes,
  LoadApprovedDataWorkflowTransaction,
  LoadApprovedDataWorkflowTransactionSuccess
} from './workflow-transaction.actions';
import { IWorkflowTransaction } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

@Injectable()
export class WorkflowTransactionEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataWorkflowTransaction>(WorkflowTransactionActionTypes.HR_LOAD_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.WORKFLOW_TRANSACTIONS.approvedData}/${payload.employeeId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataWorkflowTransactionSuccess(<IWorkflowTransaction[]>(data.Results));
              } else {
                return new ShowToast({title: 'Workflow Transactions Could Not Be Loaded', message: 'Something went wrong. Data could not be loaded.', options: toastOptionsError()})
              }
            }),
            catchError((error: any) =>
            of(
              new ShowToast({title: 'Workflow Transactions Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()})
            ))
          );
      })
    );
}
