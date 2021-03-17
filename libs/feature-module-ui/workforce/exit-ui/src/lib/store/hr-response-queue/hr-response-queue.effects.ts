import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../constants';
import {
  ApiService,
  UtilService
} from '@nutela/core-services';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import {
  HrResponseQueueActionTypes,
  LoadDataHrResponseQueue,
  LoadDataHrResponseQueueSuccess,
  LoadDataInterviewUrl,
  LoadDataInterviewUrlSuccess,
  NotLoadingQueueData,
} from './hr-response-queue.actions';
import { ToastTypes } from '@nutela/shared/app-global';
import { IExitState } from '../root';
import { ISelectOption } from 'dist/libs/models/core-data';
import { IQueueItem } from '../../interfaces';

@Injectable()
export class HrResponseQueueEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<IExitState>,
    private utilService: UtilService
  ) { }

  @Effect()
  loadMyQueue$: Observable<Action> = this.actions$
    .ofType<LoadDataHrResponseQueue>(
      HrResponseQueueActionTypes.LOAD_DATA_HR_RESPONSE_QUEUE
    )
      .pipe(
        // map(action => action.payload),
      switchMap(() => {
        return this.apiService
          .read(constants.QUEUE_DATA_URLs.getAdminQueue)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingQueueData());
                return new LoadDataHrResponseQueueSuccess(<IQueueItem[]>data.Results);
              } else {
                this.store.dispatch(new NotLoadingQueueData());
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.',
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingQueueData(),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    error.status == 401
                      ? error.error.ErrorMessage
                      : 'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  loadInterviewUrl$: Observable<Action> = this.actions$
    .ofType<LoadDataInterviewUrl>(
      HrResponseQueueActionTypes.LOAD_DATA_INTERVIEW_URL
    )
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${constants.QUEUE_DATA_URLs.getInterviewUrl}/${payload.resignationId}`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingQueueData());
                return new LoadDataInterviewUrlSuccess(<string>(
                  data.Results[0]
                ));
              } else {
                this.store.dispatch(new NotLoadingQueueData());
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.',
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingQueueData(),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    error.status == 401
                      ? error.error.ErrorMessage
                      : 'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );
}
