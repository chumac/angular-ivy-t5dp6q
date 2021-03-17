import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  LeaveLimitsActionTypes,
  LoadLeaveLimitsData,
  LoadLeaveLimitsDataSuccess,
  SaveLeaveLimits,
  NotProcessingLeaveLimits,
  HideEditorLeaveLimits,
  UpdateLeaveLimits,
  DeleteLeaveLimits,
  LoadLeaveSuccess,
  LoadLeave,
  LoadGrade,
  LoadGradeSuccess,
  NotLoadingLeaveLimits,

} from './leave-limit.actions';
import { ILeaveLimits } from '@nutela/models/workforce/leave';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult } from '@nutela/models/core-data';
import { IAbsenceState } from '../../root';
import { ISelectOption } from 'dist/libs/models/core-data';

@Injectable()
export class LeaveLimitsEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IAbsenceState>) { }


  @Effect()
  loadLeaveLimits$: Observable<Action> = this.actions$
    .ofType<LoadLeaveLimitsData>(LeaveLimitsActionTypes.LOAD_LIMITS_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LEAVE_LIMIT_URLs.limitData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingLeaveLimits());
                return new LoadLeaveLimitsDataSuccess(<ILeaveLimits[]>(
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
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveLeaveLimits>(LeaveLimitsActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.LEAVE_LIMIT_URLs.add}`
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLeaveLimits(),
                  new LoadLeaveLimitsData(),
                  new HideEditorLeaveLimits()
                ]);
              } else {
                return from([
                  new NotProcessingLeaveLimits(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLeaveLimits(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveUpdateData$: Observable<Action> = this.actions$
    .ofType<UpdateLeaveLimits>(LeaveLimitsActionTypes.UPDATED)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.LEAVE_LIMIT_URLs.update}/${payload.recordId}`
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);

              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLeaveLimits(),
                  new LoadLeaveLimitsData(),
                  new HideEditorLeaveLimits()
                ]);
              } else {
                return from([
                  new NotProcessingLeaveLimits(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLeaveLimits(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteLeaveLimits>(LeaveLimitsActionTypes.DELETE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.LEAVE_LIMIT_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new LoadLeaveLimitsData(),
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  loadLeave$: Observable<Action> = this.actions$
    .ofType<LoadLeave>(LeaveLimitsActionTypes.LOAD_LEAVE_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LEAVE_LIMIT_URLs.leave)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadLeaveSuccess(<ISelectOption[]>(
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
  loadGrade$: Observable<Action> = this.actions$
    .ofType<LoadGrade>(LeaveLimitsActionTypes.LOAD_GRADE_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LEAVE_LIMIT_URLs.grade)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadGradeSuccess(<ISelectOption[]>(
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
}

