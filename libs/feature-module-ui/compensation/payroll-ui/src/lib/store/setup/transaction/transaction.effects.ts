import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  TransactionActionTypes,
  HideEditorExclusionTransaction,
  LoadExclusionTransactionData,
  LoadExclusionTransactionDataSuccess,
  NotLoadingExclusionTransaction,
  NotProcessingExclusionTransaction,
  LoadExclusionScopeDataSuccess,
  LoadExclusionScopeData,
  LoadExclusionActiveEmployeeData,
  LoadExclusionActiveEmployeeDataSuccess,
  LoadExclusionReasonData,
  LoadExclusionReasonDataSuccess,
  LoadConfigureTransactionData,
  LoadConfigureTransactionDataSuccess,
  LoadingConfigureTransaction,
  NotLoadingConfigureTransaction,
  LoadExclusionTypeData,
  LoadExclusionTypeDataSuccess,
  LoadingExclusionTypeData,
  NotLoadingExclusionTypeData,
  LoadExclusionItemTypeData,
  LoadExclusionItemTypeDataSuccess,
  SaveConfigureData,
  NotProcessingConfigureCreate,
  HideEditorConfigureTransactionCreate,
  LoadEditConfigureData,
  NotLoadingEditConfigureData,
  LoadEditConfigureDataSuccess,
  SaveExclusionCloseData,
  NotProcessingExclusionCloseCreate,
  HideCloseEditorExclusion,
  DeleteTransactionConfigure,
  SaveTransactionData,
  LoadGetExclusionTransactionData,
  LoadGetExclusionTransactionDataSuccess,
  UpdateTransactionData,
  UpdateConfigureData,
  LoadCanRunData,
  LoadCanRunDataSuccess,

} from './transaction.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ProvisioningUtilService } from 'libs/feature-module-ui/platform/provisioning-ui/src/lib/services';
import { ToastTypes } from '@nutela/shared/app-global';
import { IRootState } from '../../root/root.state';
import { IPayrollProfile } from '@nutela/models/compensation/payment';
import { IExclusionActiveEmployee, IExclusionReason, IExclusionTransaction, IExclusionType } from '@nutela/models/compensation/payroll';
import { IConfigureTransaction } from 'libs/models/compensation/payroll/src/lib/interfaces/configure-transaction.interface';
import { IConfigureTransactionCreate } from 'libs/models/compensation/payroll/src/lib/interfaces/configure-transaction-create.interface';

@Injectable()
export class TransactionEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>, private pUtilService: ProvisioningUtilService) { }

  @Effect()
  loadExclusionTransactionData$: Observable<Action> = this.actions$
    .ofType<LoadExclusionTransactionData>(TransactionActionTypes.LOAD_EXCLUSION_TRANSACTION_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EXCLUSION_TRANSACTION_URLs.exclusionTransaction}/${payload.rec_type}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingExclusionTransaction());
                return new LoadExclusionTransactionDataSuccess(<IExclusionTransaction[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingExclusionTransaction());
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
  loadExclusionScopeData$: Observable<Action> = this.actions$
    .ofType<LoadExclusionScopeData>(TransactionActionTypes.LOAD_EXCLUSION_SCOPE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EXCLUSION_TRANSACTION_URLs.exclusionTransactionScopeData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingExclusionTransaction());
                return new LoadExclusionScopeDataSuccess(<IExclusionType[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingExclusionTransaction());
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
  loadExclusionActiveEmployeeData$: Observable<Action> = this.actions$
    .ofType<LoadExclusionActiveEmployeeData>(TransactionActionTypes.LOAD_EXCLUSION_ACTIVE_EMPLOYEE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EXCLUSION_TRANSACTION_URLs.exclusionTransactionActiveEmployeeData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingExclusionTransaction());
                return new LoadExclusionActiveEmployeeDataSuccess(<IExclusionActiveEmployee[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingExclusionTransaction());
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
  loadExclusionReasonData$: Observable<Action> = this.actions$
    .ofType<LoadExclusionReasonData>(TransactionActionTypes.LOAD_EXCLUSION_REASON_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EXCLUSION_TRANSACTION_URLs.exclusionTransactionReasonData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingExclusionTransaction());
                return new LoadExclusionReasonDataSuccess(<IExclusionReason[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingExclusionTransaction());
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
    .ofType<LoadCanRunData>(TransactionActionTypes.LOAD_CAN_RUN_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        const url = `${constants.EXECUTION_URLs.canRun}/${payload.payrollDate}?payrollProfileID=${payload.payrollProfileId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingExclusionTransaction());
                return new LoadCanRunDataSuccess(<any[]>(
                  data.Success
                ));
              } else {
                this.store.dispatch(new NotLoadingExclusionTransaction());
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
  loadConfigureTransactionData$: Observable<Action> = this.actions$
    .ofType<LoadConfigureTransactionData>(TransactionActionTypes.LOAD_CONFIGURE_TRANSACTION_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EXCLUSION_TRANSACTION_URLs.configureTransactionData}/${payload.exclusion_id}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingConfigureTransaction());
                return new LoadConfigureTransactionDataSuccess(<IConfigureTransaction[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingConfigureTransaction());
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
  loadExclusionTypeData$: Observable<Action> = this.actions$
    .ofType<LoadExclusionTypeData>(TransactionActionTypes.LOAD_EXCLUSION_TYPE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EXCLUSION_TRANSACTION_URLs.exclusionTransactionTypeData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingConfigureTransaction());
                return new LoadExclusionTypeDataSuccess(<IExclusionType[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingExclusionTypeData());
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
  loadExclusionItemTypeData$: Observable<Action> = this.actions$
    .ofType<LoadExclusionItemTypeData>(TransactionActionTypes.LOAD_EXCLUSION_ITEM_TYPE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EXCLUSION_TRANSACTION_URLs.exclusionTransactionItemTypeData}/${payload.item_type}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                // this.store.dispatch(new LoadingExclusionTypeData());
                this.store.dispatch(new NotLoadingExclusionTypeData());
                return new LoadExclusionItemTypeDataSuccess(<IExclusionType[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingExclusionTypeData());
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
  saveConfigureData$: Observable<Action> = this.actions$
    .ofType<SaveConfigureData>(TransactionActionTypes.SAVE_CONFIGURE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.EXCLUSION_TRANSACTION_URLs.configureCreate}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingExclusionTransaction(),
                  new HideEditorConfigureTransactionCreate(),
                  new LoadConfigureTransactionData(payload.data.exclusion_id)
                ]);
              } else {
                return from([
                  new NotProcessingExclusionTransaction(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingExclusionTransaction(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  loadEditConfigureData$: Observable<Action> = this.actions$
    .ofType<LoadEditConfigureData>(TransactionActionTypes.LOAD_EDIT_CONFIGURE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EXCLUSION_TRANSACTION_URLs.getConfigureData}/${payload.exclusion_det_id}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingExclusionTypeData());
               // this.store.dispatch(new NotLoadingEditConfigureData());
                return new LoadEditConfigureDataSuccess(<IConfigureTransaction>(
                  data.Results[0]
                ));
              } else {
                this.store.dispatch(new NotLoadingExclusionTypeData());
                //this.store.dispatch(new NotLoadingEditConfigureData());
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
  saveExclusionCloseData$: Observable<Action> = this.actions$
    .ofType<SaveExclusionCloseData>(TransactionActionTypes.SAVE_EXCLUSION_CLOSE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.EXCLUSION_TRANSACTION_URLs.saveClose}/${payload.exclusion_id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingExclusionTransaction(),
                  new HideCloseEditorExclusion(),
                  // new HideEditorPayrollRun(),
                  new LoadExclusionTransactionData(0)
                ]);
              } else {
                return from([
                  new NotProcessingExclusionTransaction(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingExclusionCloseCreate(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteTransactionConfigure$: Observable<Action> = this.actions$
    .ofType<DeleteTransactionConfigure>(TransactionActionTypes.DELETE_TRANSACTION_CONFIGURE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log(`${constants.EXCLUSION_TRANSACTION_URLs.deleteTransactionConfigure}/${payload.exclusion_det_id}`);
        return this.apiService
          .delete(`${constants.EXCLUSION_TRANSACTION_URLs.deleteTransactionConfigure}/${payload.exclusion_det_id}`)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
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
  saveTransactionData$: Observable<Action> = this.actions$
    .ofType<SaveTransactionData>(TransactionActionTypes.SAVE_EXCLUSION_TRANSACTION_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.EXCLUSION_TRANSACTION_URLs.saveexclusionTransactionData}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingExclusionTransaction(),
                  new HideEditorExclusionTransaction(),
                  new LoadExclusionTransactionData(0)
                ]);
              } else {
                return from([
                  new NotProcessingExclusionTransaction(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingExclusionTransaction(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  loadGetExclusionTransactionData$: Observable<Action> = this.actions$
    .ofType<LoadGetExclusionTransactionData>(TransactionActionTypes.LOAD_GET_EXCLUSION_TRANSACTION_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.EXCLUSION_TRANSACTION_URLs.getexclusionTransactionData}/${payload.id}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingExclusionTransaction());
                return new LoadGetExclusionTransactionDataSuccess((
                  data.Results[0]
                ));
              } else {
                this.store.dispatch(new NotLoadingExclusionTransaction());
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
  updateTransactionData$: Observable<Action> = this.actions$
    .ofType<UpdateTransactionData>(TransactionActionTypes.UPDATE_EXCLUSION_TRANSACTION_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.EXCLUSION_TRANSACTION_URLs.updateexclusionTransactionData}/${payload.id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingExclusionTransaction(),
                  new HideEditorExclusionTransaction(),
                  new LoadExclusionTransactionData(0)
                ]);
              } else {
                return from([
                  new NotProcessingExclusionTransaction(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingExclusionTransaction(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateConfigureData$: Observable<Action> = this.actions$
    .ofType<UpdateConfigureData>(TransactionActionTypes.UPDATE_CONFIGURE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.EXCLUSION_TRANSACTION_URLs.updateConfigureData}/${payload.exclusion_det_id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingExclusionTransaction(),
                  new LoadConfigureTransactionData(payload.data.exclusion_id),
                  new HideEditorConfigureTransactionCreate()
                ]);
              } else {
                return from([
                  new NotProcessingExclusionTransaction(),
                  new ShowToast({ title: 'Data Could Not Be Updated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be updated.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingConfigureCreate(),
                new ShowToast({ title: 'Data Could Not Be Updated', message: `Something went wrong. Form data could not be updated. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

}

