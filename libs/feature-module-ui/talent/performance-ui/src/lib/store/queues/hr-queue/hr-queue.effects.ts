import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';

import { ApiService, toastOptionsError } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import { HR_QUEUE_DATA_URLs } from '../../../constants';

import { IReviewWorkflowProcess } from '@nutela/models/talent/performance';
import {
  LoadDataHRQueue,
  HRQueueActionTypes,
  LoadDataHRQueueSuccess
} from './hr-queue.actions';

@Injectable()
export class HRQueueEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDataHRQueue>(HRQueueActionTypes.LOAD_HR_QUEUE),
    map(action => action.payload),
    mergeMap(payload => {
      return this.apiService
        .read(`${HR_QUEUE_DATA_URLs.getData}/${payload}`)
        .pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result = <IReviewWorkflowProcess[]>data.Results;

              return from([new LoadDataHRQueueSuccess(result)]);
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
                options: toastOptionsError()
              })
            ])
          )
        );
    })
  );
}
