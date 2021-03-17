import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  TimeAttendanceActionTypes,
  LoadDataTimeAttendance,
  LoadDataTimeAttendanceSuccess,
  SaveTimeAttendance,
  NotProcessingTimeAttendance,
  HideEditorTimeAttendance,
  DeleteDataTimeAttendance,
  AddTimeAttendance,
  LoadTimeAttendanceStatusList,
  LoadTimeAttendanceStatusListSuccess, 
  NotLoadingTimeAttendance
} from './time-attendance.actions';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { ISelectOption } from 'dist/libs/models/core-data';
import { ITimeAttendance, ITimeAttendanceStatus } from '@nutela/models/workforce/leave';

@Injectable()
export class TimeAttendanceEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataTimeAttendance>(TimeAttendanceActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.TIME_ATTENDANCE_URLs.timeAttendanceData}?employeeId=${payload.employeeId}&month=${payload.month}&year=${payload.year}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new LoadDataTimeAttendanceSuccess(<ITimeAttendance[]>(data.Results)),
                  new NotLoadingTimeAttendance(),
                ])
              } else {
                of(
                  new NotLoadingTimeAttendance(),
                  new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage:  'Something went wrong. Form data could not be loaded.', options: toastOptionsError()})
                );
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingTimeAttendance(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

    @Effect()
    loadStatusList$: Observable<Action> = this.actions$
      .ofType<LoadTimeAttendanceStatusList>(TimeAttendanceActionTypes.LOAD_STATUS_LIST)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(`${constants.TIME_ATTENDANCE_URLs.timeAttendanceStatusList}`)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  return new LoadTimeAttendanceStatusListSuccess(<ITimeAttendanceStatus[]>(
                    data.Results
                  ));
                } else {
                  return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
                )
              )
            );
        })
      );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveTimeAttendance>(TimeAttendanceActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.TIME_ATTENDANCE_URLs.update}/${payload.recordId}/${payload.employeeId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingTimeAttendance(),
                  new HideEditorTimeAttendance(),
                  new LoadDataTimeAttendance({employeeId: payload.employeeId, year: payload.year, month: payload.month})
                ]);
              } else {
                return from([
                  new NotProcessingTimeAttendance(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingTimeAttendance(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataTimeAttendance>(TimeAttendanceActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.TIME_ATTENDANCE_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataTimeAttendance({employeeId: payload.employeeId, year: payload.year, month: payload.month})
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
