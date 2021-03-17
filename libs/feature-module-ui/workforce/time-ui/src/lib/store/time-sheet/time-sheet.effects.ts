import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';

import { ApiService } from '@nutela/core-services';
import * as constants from '@nutela/shared/app-global';

import { IApiResult } from 'dist/libs/models/core-data';

import { ShowToast } from '@nutela/store/shared';
import { LoadApprovedDataTimeSheet, TimeSheetActionTypes, LoadApprovedDataTimeSheetSuccess, CreateTimeSheet, LoadAwaitingApprovalDataTimeSheet, LoadAwaitingApprovalDataTimeSheetSuccess, ShowEditorTimeSheet, LoadDayStreamDataTimeSheet, LoadDayStreamDataTimeSheetSuccess, NotLoadingDayStream, LoadWorkStreamDataTimeSheet, LoadWorkStreamDataTimeSheetSuccess, NotLoadingWorkStream, DeleteTimeSheet, ArchiveTimeSheet, DeleteWorkStreamTimeSheet, ResetTimeSheet, SubmitTimeSheet, RecallTimeSheet, SubmitRecallTimeSheet, SubmitWorkStream, LoadTimeSheetProjectsById, LoadTimeSheetProjectsByIdSuccess } from './time-sheet.actions';
import { ITimeSheetData, IDayStreamData, IWorkStreamData, ITimeSheetProject } from '@nutela/models/workforce/time-sheet';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class TimeSheetEffects {
  constructor(private actions$: Actions, private apiService: ApiService) { }

  @Effect()
  loadDayStream$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDayStreamDataTimeSheet>(TimeSheetActionTypes.LOAD_DAY_STREAM_DATA),
    map(action => action.payload),
    mergeMap((payload) => {
      return this.apiService.read(`${constants.TIME_SHEET_URLs.dayStreamData}/${payload}`).pipe(
        mergeMap((data: IApiResult) => {
          if (data.Success && data.Results) {
            const result: any = (<IDayStreamData[]>data.Results);

            // console.log('Daystream', result);

            return from([
              new LoadDayStreamDataTimeSheetSuccess(result),
              new NotLoadingDayStream()
            ]);
          } else {
            return from([]);
          }
        }),
        catchError((error: any) =>
          from([
            new NotLoadingDayStream(),
            new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
          ])
        )
      )
    }
    )
  );

  @Effect()
  loadWorkStream$: Observable<Action> = this.actions$.pipe(
    ofType<LoadWorkStreamDataTimeSheet>(TimeSheetActionTypes.LOAD_WORK_STREAM_DATA),
    map(action => action.payload),
    mergeMap((payload) => {
      return this.apiService.read(`${constants.TIME_SHEET_URLs.workStreamData}/${payload}`).pipe(
        mergeMap((data: IApiResult) => {
          if (data.Success && data.Results) {
            const result: any = (<IWorkStreamData[]>data.Results);

            // console.log('Workstream', result);

            return from([
              new LoadWorkStreamDataTimeSheetSuccess({ dayId: payload, workStreamData: result }),
              new NotLoadingWorkStream(payload)
            ]);
          } else {
            return from([]);
          }
        }),
        catchError((error: any) =>
          from([
            new NotLoadingDayStream(),
            new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
          ])
        )
      )
    }
    )
  );

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataTimeSheet>(TimeSheetActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.TIME_SHEET_URLs.approvedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataTimeSheetSuccess(<ITimeSheetData[]>(data.Results));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataTimeSheet>(TimeSheetActionTypes.LOAD_AWAITING_APPROVAL_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.TIME_SHEET_URLs.awaitingApprovalData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                // console.log('data.Results', data.Results);

                return new LoadAwaitingApprovalDataTimeSheetSuccess(<ITimeSheetData[]>(data.Results));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );


    @Effect()
    loadProjectsById$: Observable<Action> = this.actions$.pipe(
      ofType<LoadTimeSheetProjectsById>(TimeSheetActionTypes.LOAD_PROJECTS_BY_ID),
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService.read(`${constants.TIME_SHEET_URLs.loadProjectsById}/${payload.recordId}`).pipe(
          mergeMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              const result: any = (<ITimeSheetProject[]>data.Results);  
              return from([
                new LoadTimeSheetProjectsByIdSuccess(result),
              ]);
            } else {
              return from([]);
            }
          }),
          catchError((error: any) =>
            from([
              new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
            ])
          )
        )
      }
      )
    );


  @Effect()
  createTimeSheet$: Observable<Action> = this.actions$
    .ofType<CreateTimeSheet>(TimeSheetActionTypes.CREATE_TIME_SHEET)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.TIME_SHEET_URLs.save, payload)
          .pipe(
            switchMap((data: IApiResult) => {

              // console.log(payload, data);

              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Time Sheet has been created.`, type: ToastTypes.SUCCESS }),
                  new ShowEditorTimeSheet(),
                  new LoadAwaitingApprovalDataTimeSheet()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Time Sheet Could Not Be Created', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Time Sheet could not be created.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Time Sheet Could Not Be Created', message: `Something went wrong. Time Sheet could not be created.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  resetTimeSheet$: Observable<Action> = this.actions$
    .ofType<ResetTimeSheet>(TimeSheetActionTypes.RESET_TIME_SHEET)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.TIME_SHEET_URLs.reset}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was reset successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadAwaitingApprovalDataTimeSheet()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Time Sheet Could Not Be Reset', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Time Sheet could not be reset.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Time Sheet Could Not Be Reset', message: `Something went wrong. Time Sheet could not be reset.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  archiveTimeSheet$: Observable<Action> = this.actions$
    .ofType<ArchiveTimeSheet>(TimeSheetActionTypes.ARCHIVE_TIME_SHEET)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.TIME_SHEET_URLs.archive}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was archived successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadAwaitingApprovalDataTimeSheet()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Time Sheet Could Not Be Archived', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Time Sheet could not be archived.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Time Sheet Could Not Be Archived', message: `Something went wrong. Time Sheet could not be archived.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteTimeSheet$: Observable<Action> = this.actions$
    .ofType<DeleteTimeSheet>(TimeSheetActionTypes.DELETE_TIME_SHEET)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.TIME_SHEET_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadAwaitingApprovalDataTimeSheet()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Time Sheet Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Time Sheet could not be deleted.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Time Sheet Could Not Be Deleted', message: `Something went wrong. Time Sheet could not be deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteWorkStream$: Observable<Action> = this.actions$
    .ofType<DeleteWorkStreamTimeSheet>(TimeSheetActionTypes.DELETE_WORK_STREAM)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.WORK_ACTIVITY_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadWorkStreamDataTimeSheet(payload.dayId)
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Work Stream Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Work Stream could not be deleted.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Work Stream Could Not Be Deleted', message: `Something went wrong. Work Stream could not be deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  submitTimeSheet$: Observable<Action> = this.actions$
    .ofType<SubmitTimeSheet>(TimeSheetActionTypes.SUBMIT_TIME_SHEET)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.TIME_SHEET_URLs.submit}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was submitted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadAwaitingApprovalDataTimeSheet()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Time Sheet Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Time Sheet could not be submitted.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Time Sheet Could Not Be Submitted', message: `Something went wrong. Time Sheet could not be submitted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

    @Effect()
    submitDayWorkStream$: Observable<Action> = this.actions$
      .ofType<SubmitWorkStream>(TimeSheetActionTypes.SUBMIT_WORK_STREAM)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .update(`${constants.WORK_ACTIVITY_URLs.submit}/${payload.recordId}`, null)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({ title: null, message: `Record was submitted successfully.`, type: ToastTypes.SUCCESS }),
                    new LoadDayStreamDataTimeSheet(payload.timeSheetId)
                  ]);
                } else {
                  return from([
                    new ShowToast({ title: 'Workstream Sheet Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Workstream could not be submitted.`, type: ToastTypes.ERROR })
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new ShowToast({ title: 'Workstream Could Not Be Submitted', message: `Something went wrong. Workstream could not be submitted.`, type: ToastTypes.ERROR })
                ])
              )
            );
        })
      );

  @Effect()
  recallTimeSheet$: Observable<Action> = this.actions$
    .ofType<RecallTimeSheet>(TimeSheetActionTypes.RECALL_TIME_SHEET)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.TIME_SHEET_URLs.recall}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was recalled successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadApprovedDataTimeSheet(),
                  new LoadAwaitingApprovalDataTimeSheet()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Time Sheet Could Not Be Recalled', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Time Sheet could not be recalled.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Time Sheet Could Not Be Recalled', message: `Something went wrong. Time Sheet could not be recalled.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

    @Effect()
    submitRecallTimeSheet$: Observable<Action> = this.actions$
      .ofType<SubmitRecallTimeSheet>(TimeSheetActionTypes.SUBMIT_RECALL_TIME_SHEET)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(`${constants.TIME_SHEET_URLs.submit_recall}/${payload.recordId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({ title: null, message: `Record was Re-Submitted successfully.`, type: ToastTypes.SUCCESS }),
                    new LoadAwaitingApprovalDataTimeSheet()
                  ]);
                } else {
                  return from([
                    new ShowToast({ title: 'Time Sheet Could Not Be Re-Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Time Sheet could not be re-submitted.`, type: ToastTypes.ERROR })
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new ShowToast({ title: 'Time Sheet Could Not Be Re-Submitted', message: `Something went wrong. Time Sheet could not be re-submitted.`, type: ToastTypes.ERROR })
                ])
              )
            );
        })
      );

}
