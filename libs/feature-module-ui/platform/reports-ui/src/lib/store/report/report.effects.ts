import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import {
  ApiService,
  UtilService,
  toastOptionsError
} from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { REPORT_DATA_URLs } from '../../constants';
import { ToastTypes } from '@nutela/shared/app-global';
import {
  LoadDataReport,
  ReportActionTypes,
  LoadDataReportSuccess,
  NotProcessingReport,
  GotoReportUrl,
  LoadDataSingleReport,
  LoadDataSingleReportSuccess,
  LoadReportUrlSuccess,
  LoadReportUrl
} from './report.actions';
import { IReport } from '@nutela/models/platform/report';
import { IAppState } from '@nutela/store/app-state';

@Injectable()
export class ReportEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IAppState>,
    public sanitizer: DomSanitizer
  ) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataReport>(ReportActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService.read(REPORT_DATA_URLs.getReportData).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              this.store.dispatch(new NotProcessingReport());
              return new LoadDataReportSuccess(<IReport[]>data.Results);
            } else {
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Form data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );

  @Effect()
  loadSingleData$: Observable<Action> = this.actions$
    .ofType<LoadDataSingleReport>(ReportActionTypes.LOAD_DATA_SINGLE)
    .pipe(
      switchMap(() => {
        return this.apiService.read(REPORT_DATA_URLs.getReportData).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              this.store.dispatch(new NotProcessingReport());
              return new LoadDataSingleReportSuccess(<IReport>data.Results);
            } else {
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Form data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );

  @Effect()
  goToReportUrl$: Observable<Action> = this.actions$.pipe(
    ofType<GotoReportUrl>(ReportActionTypes.NAVIGATE),
    map(action => action.payload),
    switchMap(payload => {
      return this.apiService
        .read(`${REPORT_DATA_URLs.getReportUrl}?reportKey=${payload}`)
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              console.log(data.Results);
              return from([
                new NotProcessingReport(),
                new ShowToast({
                  title: null,
                  message: 'Report was loaded',
                  type: ToastTypes.INFO
                }),
                new Download(data.Results[0])
              ]);
            } else {
              return from([
                new ShowToast({
                  title: null,
                  message: 'Report not available.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Report Could Not Be Loaded',
                message:
                  'Something went wrong. Report data could not be loaded.',
                type: ToastTypes.ERROR
              })
            )
          )
        );
    })
  );

  @Effect()
  loadReportUrl$: Observable<Action> = this.actions$.pipe(
    ofType<LoadReportUrl>(ReportActionTypes.LOAD_REPORT_URL),
    map(action => action.payload),
    switchMap(payload => {
      return this.apiService
        .read(`${REPORT_DATA_URLs.getReportUrl}?reportKey=${payload.reportKey}`)
        .pipe(
          switchMap((data: IApiResult) => {
            if (data.Success && data.Results) {
              console.log('from effect', data.Results[0])
              const urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.xceed365.com');
              return from([
                new NotProcessingReport(),
                new ShowToast({
                  title: null,
                  message: 'Report was loaded',
                  type: ToastTypes.INFO
                }),
                new LoadReportUrlSuccess(urlSafe)
              ]);
            } else {
              return from([
                new ShowToast({
                  title: null,
                  message: 'Report not available.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Report Could Not Be Loaded',
                message:
                  'Something went wrong. Report data could not be loaded.',
                type: ToastTypes.ERROR
              })
            )
          )
        );
    })
  );
}
