import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';

import { IApiResult } from '@nutela/models/core-data';
import { ApiService } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { LoadDataLeaveEdit, LeaveEditActionTypes, LoadDataLeaveEditSuccess, SaveLeaveEdit, NotProcessingLeaveEdit, HideEditorLeaveEdit } from './leave-edit.actions';
import { HideRequestEditor } from '../approval';

@Injectable()
export class LeaveEditEffects {
  constructor(private actions$: Actions, private apiService: ApiService) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataLeaveEdit>(LeaveEditActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.LEAVE_URLs.getLeaveForWorkflowApproval}/${payload}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadDataLeaveEditSuccess(data.Results[0]);
              } else {
                return new ShowToast({ title: 'Leave Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Leave Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveLeaveEdit>(LeaveEditActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.LEAVE_URLs.saveLeaveEditForWorkflowApproval}?msgID=${payload.recordId}`, payload.body)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingLeaveEdit(),
                  new HideRequestEditor()
                ]);
              } else {
                return from([
                  new NotProcessingLeaveEdit(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLeaveEdit(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

}
