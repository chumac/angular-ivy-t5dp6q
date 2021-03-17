import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { RemoveAwaitingApprovalDataLeaveDaily, LeaveCancelAwaitingApprovalActionTypes } from './leave-cancel-awaiting-approval.actions';
import { LoadAwaitingApprovalDataLeaveApply } from '../leave-apply/leave-apply.actions';

@Injectable()
export class LeaveCancelAwaitingApprovalEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  deleteAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<RemoveAwaitingApprovalDataLeaveDaily>(LeaveCancelAwaitingApprovalActionTypes.REMOVE_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
        .update(`${constants.LEAVE_URLs.saveCancelAwaitingApproval}?leaveTransID=${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadAwaitingApprovalDataLeaveApply()
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
