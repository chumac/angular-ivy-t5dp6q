import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  RunActionTypes,
  LoadPayrollProfileData,
  LoadPayrollProfileDataSuccess,
  NotProcessingPayrollRun,
  HideEditorPayrollRun,
  SavePayrollRunData,
  NotLoadingPayrollRun,
  LoadPayrollGroupSelectOptionData,
  LoadPayrollGroupSelectOptionDataSuccess,
  LoadEmployeeSelectOptionData,
  LoadEmployeeSelectOptionDataSuccess,
  LoadPaymentGroupSelectOptionData,
  LoadPaymentGroupSelectOptionDataSuccess,
  LoadPayGradeSelectOptionData,
  LoadPayGradeSelectOptionDataSuccess,
  LoadPossibleReturnsData,
  LoadPossibleReturnsDataSuccess,
  RecoverPayrollRun,
  HideRecoverEditorPayrollRun,
  LoadCanRunData,
  LoadCanRunDataSuccess,

} from './run.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ProvisioningUtilService } from 'libs/feature-module-ui/platform/provisioning-ui/src/lib/services';
import { ToastTypes } from '@nutela/shared/app-global';
import { IRootState } from '../../root/root.state';
import { IPayrollProfile } from '@nutela/models/compensation/payment';

@Injectable()
export class RunEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>, private pUtilService: ProvisioningUtilService) { }

  @Effect()
  loadPayrollProfileData$: Observable<Action> = this.actions$
    .ofType<LoadPayrollProfileData>(RunActionTypes.LOAD_PAYROLL_PROFILE_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.EXECUTION_URLs.payrollProfiles}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingPayrollRun());
                return new LoadPayrollProfileDataSuccess(<IPayrollProfile[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingPayrollRun());
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
  loadPossibleReturnsData$: Observable<Action> = this.actions$
    .ofType<LoadPossibleReturnsData>(RunActionTypes.LOAD_POSSIBLE_RETURNS_DATA)
      .pipe(
        map(action => action.payload),
      switchMap((payload) => {
        const url = `${constants.EXECUTION_URLs.possibleReturns}/${payload.payrollProfileID}/${payload.payrollDate}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'backup_session_description', 'backup_session_description')
                this.store.dispatch(new NotLoadingPayrollRun());
                return new LoadPossibleReturnsDataSuccess(<any[]>(
                  transformed
                ));
              } else {
                this.store.dispatch(new NotLoadingPayrollRun());
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
  loadPayrollGroupData$: Observable<Action> = this.actions$
    .ofType<LoadPayrollGroupSelectOptionData>(RunActionTypes.LOAD_PAYROLL_GROUP_SELECT_OPTION_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.EXECUTION_URLs.payrollGroup}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description')
                this.store.dispatch(new NotLoadingPayrollRun());
                return new LoadPayrollGroupSelectOptionDataSuccess(<ISelectOption[]>(
                  transformed
                ));
              } else {
                this.store.dispatch(new NotLoadingPayrollRun());
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
  loadPayGradeData$: Observable<Action> = this.actions$
    .ofType<LoadPayGradeSelectOptionData>(RunActionTypes.LOAD_PAY_GRADE_SELECT_OPTION_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.EXECUTION_URLs.grade}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingPayrollRun());
                return new LoadPayGradeSelectOptionDataSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingPayrollRun());
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
  loadEmployeeData$: Observable<Action> = this.actions$
    .ofType<LoadEmployeeSelectOptionData>(RunActionTypes.LOAD_EMPLOYEE_SELECT_OPTION_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.EXECUTION_URLs.employee}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingPayrollRun());
                return new LoadEmployeeSelectOptionDataSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingPayrollRun());
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
  loadcanRunData$: Observable<Action> = this.actions$
      .ofType<LoadCanRunData>(RunActionTypes.LOAD_CAN_RUN_DATA)
      .pipe(
        map(action => action.payload),
      switchMap((payload) => {
        const url = `${constants.EXECUTION_URLs.canRun}/${payload.payrollDate}?payrollProfileID=${payload.payrollProfileId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingPayrollRun());
                return new LoadCanRunDataSuccess(<any[]>(
                  data.Success
                ));
              } else {
                this.store.dispatch(new NotLoadingPayrollRun());
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
  loadPaymentGroupData$: Observable<Action> = this.actions$
    .ofType<LoadPaymentGroupSelectOptionData>(RunActionTypes.LOAD_PAYMENT_GROUP_SELECT_OPTION_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.EXECUTION_URLs.paygroup}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingPayrollRun());
                return new LoadPaymentGroupSelectOptionDataSuccess(<ISelectOption[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingPayrollRun());
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
  savePayrollRun$: Observable<Action> = this.actions$
    .ofType<SavePayrollRunData>(RunActionTypes.SAVE_PAYROLL_RUN_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.EXECUTION_URLs.run}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingPayrollRun(),
                  new HideEditorPayrollRun(),
                  new LoadPayrollProfileData()
                ]);
              } else {
                return from([
                  new NotProcessingPayrollRun(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPayrollRun(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
  );


  @Effect()
  recoverLastRun$: Observable<Action> = this.actions$
      .ofType<RecoverPayrollRun>(RunActionTypes.RECOVER_PAYROLL_RUN_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.EXECUTION_URLs.recover}/${payload.payrollProfileID}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingPayrollRun(),
                  new HideRecoverEditorPayrollRun(),
                  new LoadPayrollProfileData()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR }),
                  new NotProcessingPayrollRun()
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPayrollRun(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

}

