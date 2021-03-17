import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  LeaveProrateActionTypes,
  LoadLeaveProrateData,
  LoadLeaveProrateDataSuccess,
  SaveLeaveProrate,
  HideEditorLeaveProrate,
  NotProcessingLeaveProrate,
  UpdateLeaveProrate,
  DeleteLeaveProrate,
  LoadBuild,
  LoadReset,
  NotLoadingLeaveProrate,

} from './leave-proration.actions';
import { ILeaveProrate } from '@nutela/models/workforce/leave';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult } from '@nutela/models/core-data';
import { IAbsenceState } from '../../root';

@Injectable()
export class LeaveProrateEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IAbsenceState>) { }


  @Effect()
  loadLeaveProrate$: Observable<Action> = this.actions$
    .ofType<LoadLeaveProrateData>(LeaveProrateActionTypes.LOAD_PRORATE_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LEAVE_PRORATE_URLs.prorateData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingLeaveProrate());
                return new LoadLeaveProrateDataSuccess(<ILeaveProrate[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  buildData$: Observable<Action> = this.actions$
    .ofType<LoadBuild>(LeaveProrateActionTypes.LOAD_BUILD_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.LEAVE_PRORATE_URLs.build}`
        return this.apiService
          .create(url, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Leave Prorate Built Successfully.`, options: toastOptionsSuccess() }),
                  new NotLoadingLeaveProrate(),
                  new LoadLeaveProrateData(),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Built', message: data.ErrorMessage ? data.ErrorMessage : `Unsuccessful.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotLoadingLeaveProrate(),
                new ShowToast({ title: 'Data Could Not Be Built', message: `Unsuccessful.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveUpdateData$: Observable<Action> = this.actions$
    .ofType<UpdateLeaveProrate>(LeaveProrateActionTypes.UPDATED)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.LEAVE_PRORATE_URLs.update}/${payload.recordId}`
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);

              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLeaveProrate(),
                  new LoadLeaveProrateData(),
                  new HideEditorLeaveProrate()
                ]);
              } else {
                return from([
                  new NotProcessingLeaveProrate(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLeaveProrate(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  resetData$: Observable<Action> = this.actions$
    .ofType<LoadReset>(LeaveProrateActionTypes.LOAD_RESET_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.LEAVE_PRORATE_URLs.reset}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new LoadLeaveProrateData(),
                  new ShowToast({ title: null, message: `Leave Prorate reset Successfully.`, options: toastOptionsSuccess() }),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Loaded', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

}

