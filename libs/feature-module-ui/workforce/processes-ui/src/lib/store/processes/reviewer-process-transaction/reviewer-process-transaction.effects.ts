import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  ReviewerProcessTransactionActionTypes,
  LoadDataReviewerProcessTransaction,
  LoadDataReviewerProcessTransactionSuccess,
  NotProcessingReviewerProcessTransaction
} from './reviewer-process-transaction.actions';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { ISelectOption } from 'dist/libs/models/core-data';
import { IProcessTransactionMaster, IProcessFormArea } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class ReviewerProcessTransactionEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataReviewerProcessTransaction>(ReviewerProcessTransactionActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.REVIEWER_PROCESS_TRANSACTION_URLs.getReviewerProcessTransactionData}`)
          .pipe(
            mergeMap((data: IApiResult) => [
              new NotProcessingReviewerProcessTransaction(),
              data.Success? 
                new LoadDataReviewerProcessTransactionSuccess(<IProcessTransactionMaster[]>(data.Results)): 
                new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage:'Something went wrong. Form data could not be loaded.', options: toastOptionsError()})
            ]),
            catchError((error: any) =>
              of(
                new NotProcessingReviewerProcessTransaction(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

}
