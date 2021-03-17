import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  PayrollIntegrationActionTypes,
  LoadPayrollIntegrationData,
  LoadPayrollIntegrationDataSuccess,
  NotProcessingPayrollIntegration,
  HideEditorPayrollIntegration,
  SavePayrollIntegrationData,
  UpdatePayrollIntegrationData,
  NotLoadingPayrollIntegration,
  LoadMonthListPayrollIntegration,
  LoadMonthListPayrollIntegrationSuccess,
  LoadYearListPayrollIntegration,
  LoadYearListPayrollIntegrationSuccess,
  LoadFormatListPayrollIntegration,
  LoadFormatListPayrollIntegrationSuccess,
  LoadSourceListPayrollIntegration,
  LoadSourceListPayrollIntegrationSuccess,
  LoadPayrollProfileListPayrollIntegration,
  LoadPayrollProfileListPayrollIntegrationSuccess
} from './payroll-integration.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ProvisioningUtilService } from 'libs/feature-module-ui/platform/provisioning-ui/src/lib/services';
import { ToastTypes } from '@nutela/shared/app-global';
import { IRootState } from '../../root/root.state';
import { IPayrollProfile } from '@nutela/models/compensation/payment';

@Injectable()
export class PayrollIntegrationEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>, private pUtilService: ProvisioningUtilService) { }

  @Effect()
  loadPayrollIntegrationData$: Observable<Action> = this.actions$
    .ofType<LoadPayrollIntegrationData>(PayrollIntegrationActionTypes.LOAD_PAYROLL_INTEGRATION_DATA)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.INTEGRATION_URLs.getAll}/${payload.payrollProfileId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingPayrollIntegration());
                return new LoadPayrollIntegrationDataSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingPayrollIntegration());
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data Could Not Be Loaded.`, type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingPayrollIntegration(),
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  loadPayrollProfileListPayrollIntegration$: Observable<Action> = this.actions$
    .ofType<LoadPayrollProfileListPayrollIntegration>(PayrollIntegrationActionTypes.LOAD_PAYROLL_PROFILE_LIST)
      .pipe(
      switchMap(() => {
        const url = `${constants.INTEGRATION_URLs.payrollProfileList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'payroll_profile_id', 'description');
                return new LoadPayrollProfileListPayrollIntegrationSuccess(<any[]>(
                  transformed
                ));
              } else {
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data Could Not Be Loaded.`, type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  loadMonthList$: Observable<Action> = this.actions$
    .ofType<LoadMonthListPayrollIntegration>(PayrollIntegrationActionTypes.LOAD_MONTH_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.INTEGRATION_URLs.monthList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                console.log('month list', data.Results)
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description')
                return new LoadMonthListPayrollIntegrationSuccess(<ISelectOption[]>(
                  transformed
                ));
              } else {
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data Could Not Be Loaded.`, type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  loadyEARList$: Observable<Action> = this.actions$
    .ofType<LoadYearListPayrollIntegration>(PayrollIntegrationActionTypes.LOAD_YEAR_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.INTEGRATION_URLs.yearList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                console.log('year list', data.Results)
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description')
                return new LoadYearListPayrollIntegrationSuccess(<ISelectOption[]>(
                  transformed
                ));
              } else {
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data Could Not Be Loaded.`, type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  loadSourceList$: Observable<Action> = this.actions$
    .ofType<LoadSourceListPayrollIntegration>(PayrollIntegrationActionTypes.LOAD_SOURCE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.INTEGRATION_URLs.sourceList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                return new LoadSourceListPayrollIntegrationSuccess(<ISelectOption[]>(
                  transformed
                ));
              } else {
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data Could Not Be Loaded.`, type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  loadFormatList$: Observable<Action> = this.actions$
    .ofType<LoadFormatListPayrollIntegration>(PayrollIntegrationActionTypes.LOAD_FORMAT_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.INTEGRATION_URLs.formatList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                return new LoadFormatListPayrollIntegrationSuccess(<ISelectOption[]>(
                  transformed
                ));
              } else {
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data Could Not Be Loaded.`, type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  savePayrollIntegration$: Observable<Action> = this.actions$
    .ofType<SavePayrollIntegrationData>(PayrollIntegrationActionTypes.SAVE_PAYROLL_INTEGRATION_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.INTEGRATION_URLs.create}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingPayrollIntegration(),
                  new HideEditorPayrollIntegration(),
                  new LoadPayrollIntegrationData({payrollProfileId: payload.data.payroll_profile_id})
                ]);
              } else {
                return from([
                  new NotProcessingPayrollIntegration(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPayrollIntegration(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
  );

  @Effect()
  updatePayrollIntegration$: Observable<Action> = this.actions$
    .ofType<UpdatePayrollIntegrationData>(PayrollIntegrationActionTypes.UPDATE_PAYROLL_INTEGRATION_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.INTEGRATION_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingPayrollIntegration(),
                  new HideEditorPayrollIntegration(),
                  new LoadPayrollIntegrationData({ payrollProfileId: payload.data.payroll_profile_id })
                ]);
              } else {
                return from([
                  new NotProcessingPayrollIntegration(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPayrollIntegration(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
  );
}

