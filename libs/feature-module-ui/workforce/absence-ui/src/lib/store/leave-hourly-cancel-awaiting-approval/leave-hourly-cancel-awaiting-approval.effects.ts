import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { RemoveHourlyAwaitingApprovalDataLeaveDaily, LeaveHourlyCancelAwaitingApprovalActionTypes } from './leave-hourly-cancel-awaiting-approval.actions';
import { LoadAwaitingApprovalDataLeaveHourly } from '../leave-hourly/leave-hourly.actions';

@Injectable()
export class LeaveHourlyCancelAwaitingApprovalEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  deleteAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<RemoveHourlyAwaitingApprovalDataLeaveDaily>(LeaveHourlyCancelAwaitingApprovalActionTypes.REMOVE_HOURLY_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
        .delete(`${constants.LEAVE_URLs.saveCancelHourlyAwaitingApproval}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadAwaitingApprovalDataLeaveHourly()
                ]);
              } else {
                return from([
                  new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
              ])
            )
          );
      })
    );
  

}
