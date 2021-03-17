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
import { LeaveHourlyCancelApprovedActionTypes, NotProcessingLeaveHourlyCancelApproved, SaveLeaveHourlyCancelApproved, HideEditorLeaveHourlyCancelApproved } from './leave-hourly-cancel-approved.actions';
import { LoadApprovedDataLeaveHourly } from '../leave-hourly';

@Injectable()
export class LeaveHourlyCancelApprovedEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

    @Effect()
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveLeaveHourlyCancelApproved>(LeaveHourlyCancelApprovedActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .update(constants.LEAVE_URLs.saveCancelHourlyApproved + '/' + payload.leaveTransId, payload.leaveCancelApprovedData)
            .pipe(
              switchMap((data: IApiResult) => {
                
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your leave application was cancelled successfully.`, options: toastOptionsSuccess()}),
                    new LoadApprovedDataLeaveHourly(),
                    new NotProcessingLeaveHourlyCancelApproved(),
                    new HideEditorLeaveHourlyCancelApproved()
                  ]);
                } else {
                  return from([
                    new NotProcessingLeaveHourlyCancelApproved(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingLeaveHourlyCancelApproved(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );
  

}
