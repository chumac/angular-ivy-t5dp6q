import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { WORK_LIFE_DATA_URLs } from "@nutela/shared/app-global";
import { QUEUE_DATA_URLs, MY_EXIT_DATA_URLs } from 'libs/feature-module-ui/workforce/exit-ui/src/lib/constants';

import {
  NotificationActionTypes,
  LoadQueueNotification,
  LoadQueueNotificationSuccess,
  LoadExitInitiationProcessStatus,
  LoadExitInitiationProcessStatusSuccess,
  LoadExitResponseQueueNotification,
  LoadExitResponseQueueNotificationSuccess,
  LoadHRExitResponseQueueNotification,
  LoadHRExitResponseQueueNotificationSuccess
} from './notification.actions';
import { Action } from '@ngrx/store';
import { ApiService } from '@nutela/core-services';
import { IApiResult } from '@nutela/models/core-data';
import { IApprovalNotification } from '@nutela/models/common';

@Injectable()
export class NotificationEffects {
  constructor(private actions$: Actions, private apiService: ApiService) { }

  @Effect()
  loadQueueNotification$: Observable<any> = this.actions$
    .ofType<LoadQueueNotification>(NotificationActionTypes.LOAD_QUEUE)
    .pipe(
      switchMap(() => {
        return this.apiService.read(`${WORK_LIFE_DATA_URLs.workflowQueues}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadQueueNotificationSuccess({ approvalQueueData: <IApprovalNotification[]>data.Results });
              } else {
                return from([]);
              }
            }),
          );
      })
  );

  @Effect()
  loadNumberOfResponses$: Observable<any> = this.actions$
    .ofType<LoadExitResponseQueueNotification>(NotificationActionTypes.LOAD_NUMBER_OF_RESPONSES)
    .pipe(
      switchMap(() => {
        return this.apiService.read(QUEUE_DATA_URLs.getMyQueue)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadExitResponseQueueNotificationSuccess(<number>(data.Results.length));
              } else {
                return new LoadExitResponseQueueNotificationSuccess(<number>(0));
              }
            }),
          );
      })
    );

  @Effect()
  loadHRNumberOfResponses$: Observable<any> = this.actions$
    .ofType<LoadHRExitResponseQueueNotification>(NotificationActionTypes.LOAD_HR_NUMBER_OF_RESPONSES)
    .pipe(
      switchMap(() => {
        return this.apiService.read(QUEUE_DATA_URLs.getAdminQueue)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadHRExitResponseQueueNotificationSuccess(<number>(data.Results.length));
              } else {
                return new LoadHRExitResponseQueueNotificationSuccess(<number>(0));;
              }
            }),
          );
      })
    );

  @Effect()
  loadInitiationStatus$: Observable<any> = this.actions$
    .ofType<LoadExitInitiationProcessStatus>(NotificationActionTypes.LOAD_INITIATION_STATUS)
    .pipe(
      switchMap(() => {
        return this.apiService.read(`${MY_EXIT_DATA_URLs.getIntiationStatus}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadExitInitiationProcessStatusSuccess(<boolean>data.Results[0]);
              } else {
                return new LoadExitInitiationProcessStatusSuccess(<boolean>false);
              }
            }),
          );
      })
    );
}
