import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  ReportActionTypes,
  LoadStandardReport,
  LoadStandardReportSuccess,
  LoadReportPermission,
  LoadReportPermissionSuccess,
  SaveReport,
  NotProcessingReport,
  HideEditorReport,
  DeleteReport,
  LoadRole,
  LoadRoleSuccess,
  NotLoadingReport,

} from './report.actions';
import { IReport } from '@nutela/models/foundation';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { IHRFoundationState } from '../root';

@Injectable()
export class ReportEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IHRFoundationState>) {}

  @Effect()
  loadStandardData$: Observable<Action> = this.actions$
    .ofType<LoadStandardReport>(ReportActionTypes.LOAD_STANDARD_REPORT_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.REPORT_URLs.standardReport)
          .pipe(
            map((data: any) => {
              console.log('standard data', data);
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingReport());
                return new LoadStandardReportSuccess(<IReport[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingReport());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingReport(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

    @Effect()
    loadReportPermissionData$: Observable<Action> = this.actions$
      .ofType<LoadReportPermission>(ReportActionTypes.LOAD_REPORT_PERMISSION_DATA)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.REPORT_URLs.reportPermission)
            .pipe(
              map((data: any) => {
                console.log('permission data', data);
                if (data.Success && data.Results) {
                  this.store.dispatch(new NotLoadingReport());
                  return new LoadReportPermissionSuccess(<IReport[]>(
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
  saveSingleData$: Observable<Action> = this.actions$
    .ofType<SaveReport>(ReportActionTypes.SAVE_REPORT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.REPORT_URLs.addSingle}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);

              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingReport(),
                  new HideEditorReport()
                ]);
              } else {
                return from([
                  new NotProcessingReport(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReport(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

    @Effect()
    saveMultipleData$: Observable<Action> = this.actions$
      .ofType<SaveReport>(ReportActionTypes.SAVE_MULTIPLE_REPORT)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(`${constants.REPORT_URLs.addMultiple}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);

                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingReport(),
                    new HideEditorReport(),
                    new LoadStandardReport(),
                  ]);
                } else {
                  return from([
                    new NotProcessingReport(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingReport(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

    @Effect()
    deleteReport$: Observable<Action> = this.actions$
      .ofType<DeleteReport>(ReportActionTypes.DELETE_REPORT_DATA)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .delete(`${constants.REPORT_URLs.delete}/${payload.ReportId}`)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                    new LoadReportPermission(),
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
      @Effect()
      loadRoleData$: Observable<Action> = this.actions$
        .ofType<LoadRole>(ReportActionTypes.LOAD_ROLE_DATA)
        .pipe(
          switchMap(() => {
            return this.apiService
              .read(constants.WORKFLOW_DETAILS_URLs.roleData)
              .pipe(
                map((data: any) => {
                  const system=this.utilService.transformToSelectDataList(data.Results,"sys_rolename","rolename");
                  if (data.Success) {
                    return new LoadRoleSuccess(<ISelectOption[]>(
                      system
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

  }
