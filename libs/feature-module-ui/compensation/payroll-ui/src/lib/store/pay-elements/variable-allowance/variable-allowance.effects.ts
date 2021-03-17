import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  VariableAllowanceActionTypes,
  LoadVariableAllowanceData,
  LoadVariableAllowanceSuccess,
  LoadRatesVariableAllowance,
  LoadRatesVariableAllowanceSuccess,
  NotProcessingVariableAllowance,
  HideEditorVariableAllowance,
  HideRateEditorVariableAllowance,
  SaveRateVariableAllowance,
  UpdateRateVariableAllowance,
  DeleteRateVariableAllowance,
  SaveVariableAllowance,
  UpdateVariableAllowance,
  DeleteVariableAllowance,
  NotLoadingVariableAllowance,
  LoadTransactionUnitListVariableAllowance,
  LoadTransactionUnitListVariableAllowanceSuccess,
  LoadPayrollProfileListVariableAllowance,
  LoadPayrollProfileListVariableAllowanceSuccess,
  LoadGroupListVariableAllowance,
  LoadGroupListVariableAllowanceSuccess,
  LoadPaygroupListVariableAllowance,
  LoadPaygroupListVariableAllowanceSuccess,
  LoadPayFormulaListVariableAllowance,
  LoadPayFormulaListVariableAllowanceSuccess,
  LoadCurrencyListVariableAllowance,
  LoadCurrencyListVariableAllowanceSuccess,
} from './variable-allowance.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption} from '@nutela/models/core-data';
import { IRootState } from '../../root/root.state';
import { IVariableAllowance, IVariableAllowanceRate } from '@nutela/models/compensation/payroll';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class VariableAllowanceEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>) {}

  @Effect()
  loadVariableAllowanceData$: Observable<Action> = this.actions$
    .ofType<LoadVariableAllowanceData>(VariableAllowanceActionTypes.LOAD_VARIABLE_ALLOWANCE_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_ALLOWANCE_URLs.getAll}`;
       console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingVariableAllowance());
                return new LoadVariableAllowanceSuccess(<IVariableAllowance[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableAllowance());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadRatesVariableAllowanceData$: Observable<Action> = this.actions$
    .ofType<LoadRatesVariableAllowance>(VariableAllowanceActionTypes.LOAD_RATES_VARIABLE_ALLOWANCE_DATA)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.VARIABLE_ALLOWANCE_URLs.getRates}/${payload.allowanceId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingVariableAllowance());
                return new LoadRatesVariableAllowanceSuccess(<IVariableAllowanceRate[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableAllowance());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

    @Effect()
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveVariableAllowance>(VariableAllowanceActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(constants.VARIABLE_ALLOWANCE_URLs.create, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingVariableAllowance(),
                    new LoadVariableAllowanceData(),
                    new HideEditorVariableAllowance(),
                  ]);
                } else {
                  return from([
                    new NotProcessingVariableAllowance(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingVariableAllowance(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdateVariableAllowance>(VariableAllowanceActionTypes.UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log(JSON.stringify(payload.data))
          return this.apiService
            .update(`${constants.VARIABLE_ALLOWANCE_URLs.update}/${payload.recordId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingVariableAllowance(),
                    new HideEditorVariableAllowance(),
                    new LoadVariableAllowanceData(),
                  ]);
                } else {
                  return from([
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR}),
                    new NotProcessingVariableAllowance(),
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingVariableAllowance(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteVariableAllowance>(VariableAllowanceActionTypes.DELETE_VARIABLE_ALLOWANCE_DATA)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .update(`${constants.VARIABLE_ALLOWANCE_URLs.delete}/${payload.recordId}`, null)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),
                      new LoadVariableAllowanceData(),

                    ]);
                  } else {
                    return from([
                      new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR}),
                    ]);
                  }
                }),
                catchError((error: any) =>
                  from([
                    new ShowToast({title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR})
                  ])
                )
              );
          })
        );


    @Effect()
    saveRateData$: Observable<Action> = this.actions$
      .ofType<SaveRateVariableAllowance>(VariableAllowanceActionTypes.SAVE_RATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(constants.VARIABLE_ALLOWANCE_URLs.createRate, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  if(payload.varAllowId) {
                    this.store.dispatch(new LoadRatesVariableAllowance({ allowanceId: payload.varAllowId }))
                  } else {
                    this.store.dispatch(new LoadVariableAllowanceData());
                  }
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingVariableAllowance(),
                    new HideRateEditorVariableAllowance(),
                  ]);
                } else {
                  return from([
                    new NotProcessingVariableAllowance(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingVariableAllowance(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
    updateRateData$: Observable<Action> = this.actions$
      .ofType<UpdateRateVariableAllowance>(VariableAllowanceActionTypes.UPDATE_RATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(`${constants.VARIABLE_ALLOWANCE_URLs.updateRate}/${payload.recordId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingVariableAllowance(),
                    new HideRateEditorVariableAllowance(),
                    new LoadRatesVariableAllowance({ allowanceId: payload.varAllowId }),
                  ]);
                } else {
                  return from([
                    new NotProcessingVariableAllowance(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingVariableAllowance(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
      deleteRateData$: Observable<Action> = this.actions$
        .ofType<DeleteRateVariableAllowance>(VariableAllowanceActionTypes.DELETE_RATE_VARIABLE_ALLOWANCE_DATA)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .update(`${constants.VARIABLE_ALLOWANCE_URLs.deleteRate}/${payload.recordId}`, null)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),
                      new LoadRatesVariableAllowance({allowanceId: payload.allowanceId})
                    ]);
                  } else {
                    return from([
                      new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR}),
                    ]);
                  }
                }),
                catchError((error: any) =>
                  from([
                    new ShowToast({title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR})
                  ])
                )
              );
          })
        );


  @Effect()
  profileListVarAllowance$: Observable<Action> = this.actions$
    .ofType<LoadPayrollProfileListVariableAllowance>(VariableAllowanceActionTypes.LOAD_PAYROLL_PROFILE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_ALLOWANCE_URLs.payrollProfileList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const list = this.utilService.transformToSelectDataList(data.Results, 'payroll_profile_id', 'description');
                return new LoadPayrollProfileListVariableAllowanceSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingVariableAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  paygroupVarAllowance$: Observable<Action> = this.actions$
    .ofType<LoadPaygroupListVariableAllowance>(VariableAllowanceActionTypes.LOAD_PAYGROUP_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_ALLOWANCE_URLs.paygroupList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const list = this.utilService.transformToSelectDataList(data.Results, 'paygroup_id', 'description');
                return new LoadPaygroupListVariableAllowanceSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingVariableAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  payFormulaVarAllowance$: Observable<Action> = this.actions$
    .ofType<LoadPayFormulaListVariableAllowance>(VariableAllowanceActionTypes.LOAD_PAY_FORMULA_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_ALLOWANCE_URLs.payFormulaList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const list = this.utilService.transformToSelectDataList(data.Results, 'formula_id', 'description');
                return new LoadPayFormulaListVariableAllowanceSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingVariableAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  currencyVarAllowance$: Observable<Action> = this.actions$
    .ofType<LoadCurrencyListVariableAllowance>(VariableAllowanceActionTypes.LOAD_CURRENCY_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_ALLOWANCE_URLs.currencyList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const list = this.utilService.transformToSelectDataList(data.Results, 'currency_id', 'currency_name');
                return new LoadCurrencyListVariableAllowanceSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingVariableAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );


  @Effect()
  loadTransactionUnitsVarAllowance$: Observable<Action> = this.actions$
    .ofType<LoadTransactionUnitListVariableAllowance>(VariableAllowanceActionTypes.LOAD_TRANSACTION_UNIT_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_ALLOWANCE_URLs.transactionUnitList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const list = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                return new LoadTransactionUnitListVariableAllowanceSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingVariableAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );


  @Effect()
  loadGroupNamesVariableAllowance$: Observable<Action> = this.actions$
    .ofType<LoadGroupListVariableAllowance>(VariableAllowanceActionTypes.LOAD_GROUP_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_ALLOWANCE_URLs.groupList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const list = this.utilService.transformToSelectDataList(data.Results, 'group_id', 'description');
                return new LoadGroupListVariableAllowanceSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingVariableAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

}

