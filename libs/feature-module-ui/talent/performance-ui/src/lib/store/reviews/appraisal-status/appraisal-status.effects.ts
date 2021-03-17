import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { ApiService, toastOptionsError } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import { APPRAISAL_STATUS_DATA_URLs } from '../../../constants';

import { IAppraisalStatus } from '@nutela/models/talent/performance';
import {
  LoadDataAppraisalStatus,
  AppraisalStatusActionTypes,
  LoadDataAppraisalStatusSuccess
} from './appraisal-status.actions';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class AppraisalStatusEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDataAppraisalStatus>(AppraisalStatusActionTypes.LOAD_APPRAISAL_STATUS),
    map(action => action.payload),
    mergeMap(payload => {
      return this.apiService
        .read(`${APPRAISAL_STATUS_DATA_URLs.getData}/${payload}`)
        .pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IAppraisalStatus[]>data.Results;

              return from([new LoadDataAppraisalStatusSuccess(result)]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
              })
            ])
          )
        );
    })
  );
}
