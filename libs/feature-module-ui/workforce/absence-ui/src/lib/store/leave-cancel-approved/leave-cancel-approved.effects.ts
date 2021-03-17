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
import { LeaveCancelApprovedActionTypes, NotProcessingLeaveCancelApproved, SaveLeaveCancelApproved, HideEditorLeaveCancelApproved } from './leave-cancel-approved.actions';

@Injectable()
export class LeaveCancelApprovedEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

    @Effect()
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveLeaveCancelApproved>(LeaveCancelApprovedActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(constants.LEAVE_URLs.saveCancelApproved + '?leaveTransID=' + payload.leaveTransId, payload.leaveCancelApprovedData)
            .pipe(
              switchMap((data: IApiResult) => {

                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingLeaveCancelApproved(),
                    new HideEditorLeaveCancelApproved()
                  ]);
                } else {
                  return from([
                    new NotProcessingLeaveCancelApproved(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingLeaveCancelApproved(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );


}
