import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  VariableDeductionActionTypes,
  LoadVariableDeductionData,
  LoadVariableDeductionSuccess,
  NotProcessingVariableDeduction,
  HideEditorVariableDeduction,
  SaveVariableDeduction,
  UpdateVariableDeduction,
  DeleteVariableDeduction,
  NotLoadingVariableDeduction,
  LoadTransactionUnitListVariableDeduction,
  LoadTransactionUnitListVariableDeductionSuccess,
  LoadPayrollProfileListVariableDeduction,
  LoadPayrollProfileListVariableDeductionSuccess,
  LoadGroupListVariableDeduction,
  LoadGroupListVariableDeductionSuccess,
  HideRateEditorVariableDeduction,
  SaveRateVariableDeduction,
  UpdateRateVariableDeduction,
  DeleteRateVariableDeduction,
  LoadRatesVariableDeduction,
  LoadRatesVariableDeductionSuccess,
  LoadPaygroupListVariableDeduction,
  LoadPaygroupListVariableDeductionSuccess,
  LoadFormulaListVariableDeduction,
  LoadFormulaListVariableDeductionSuccess,
  LoadCurrencyListVariableDeduction,
  LoadCurrencyListVariableDeductionSuccess,
} from './variable-deduction.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption} from '@nutela/models/core-data';
import { IRootState } from '../../root/root.state';
import { IVariableDeduction, IVariableDeductionRate } from '@nutela/models/compensation/payroll';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class VariableDeductionEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>) {}

  @Effect()
  loadVariableDeductionData$: Observable<Action> = this.actions$
    .ofType<LoadVariableDeductionData>(VariableDeductionActionTypes.LOAD_VARIABLE_DEDUCTION_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_DEDUCTION_URLs.data}`;
       console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success) {
                this.store.dispatch(new NotLoadingVariableDeduction());
                return new LoadVariableDeductionSuccess(<IVariableDeduction[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableDeduction());
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
  loadRatesVariableDeductionData$: Observable<Action> = this.actions$
    .ofType<LoadRatesVariableDeduction>(VariableDeductionActionTypes.LOAD_RATES_VARIABLE_DEDUCTION_DATA)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.VARIABLE_DEDUCTION_URLs.paygroupRates}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingVariableDeduction());
                return new LoadRatesVariableDeductionSuccess(<IVariableDeductionRate[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableDeduction());
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
      .ofType<SaveVariableDeduction>(VariableDeductionActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(constants.VARIABLE_DEDUCTION_URLs.create, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingVariableDeduction(),
                    new HideEditorVariableDeduction(),
                  ]);
                } else {
                  return from([
                    new NotProcessingVariableDeduction(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingVariableDeduction(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdateVariableDeduction>(VariableDeductionActionTypes.UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          console.log('data update',payload.data);
          return this.apiService
            .update(`${constants.VARIABLE_DEDUCTION_URLs.update}/${payload.recordId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingVariableDeduction(),
                    new HideEditorVariableDeduction(),
                  ]);
                } else {
                  return from([
                    new NotProcessingVariableDeduction(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingVariableDeduction(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteVariableDeduction>(VariableDeductionActionTypes.DELETE_VARIABLE_DEDUCTION_DATA)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .update(`${constants.VARIABLE_DEDUCTION_URLs.archive}/${payload.recordId}`, null)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),

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
      .ofType<SaveRateVariableDeduction>(VariableDeductionActionTypes.SAVE_RATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(constants.VARIABLE_DEDUCTION_URLs.saveRate, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  if (payload.varDeductId) {
                    this.store.dispatch(new LoadRatesVariableDeduction({ recordId: payload.varDeductId }))
                  } else {
                    this.store.dispatch(new LoadVariableDeductionData())
                  }
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingVariableDeduction(),
                    new HideRateEditorVariableDeduction(),
                  ]);
                } else {
                  return from([
                    new NotProcessingVariableDeduction(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingVariableDeduction(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
    updateRateData$: Observable<Action> = this.actions$
      .ofType<UpdateRateVariableDeduction>(VariableDeductionActionTypes.UPDATE_RATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(`${constants.VARIABLE_DEDUCTION_URLs.updateRate}/${payload.recordId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingVariableDeduction(),
                    new LoadRatesVariableDeduction({recordId: payload.varDeductId}),
                    new HideRateEditorVariableDeduction(),
                  ]);
                } else {
                  return from([
                    new NotProcessingVariableDeduction(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingVariableDeduction(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
      deleteRateData$: Observable<Action> = this.actions$
        .ofType<DeleteRateVariableDeduction>(VariableDeductionActionTypes.DELETE_RATE_VARIABLE_DEDUCTION)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .update(`${constants.VARIABLE_DEDUCTION_URLs.deletePaygroupRate}/${payload.recordId}`, null)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                      new LoadRatesVariableDeduction({ recordId: payload.deductionId }),
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
  profileListVarDeduction$: Observable<Action> = this.actions$
    .ofType<LoadPayrollProfileListVariableDeduction>(VariableDeductionActionTypes.LOAD_PAYROLL_PROFILE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_DEDUCTION_URLs.payrollProfileList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const list = this.utilService.transformToSelectDataList(data.Results, 'payroll_profile_id', 'description');
                return new LoadPayrollProfileListVariableDeductionSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingVariableDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );


  @Effect()
  paygroupListVarDeduction$: Observable<Action> = this.actions$
    .ofType<LoadPaygroupListVariableDeduction>(VariableDeductionActionTypes.LOAD_PAYROLL_PROFILE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_DEDUCTION_URLs.paygroupList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const list = this.utilService.transformToSelectDataList(data.Results, 'paygroup_id', 'description');
                return new LoadPaygroupListVariableDeductionSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingVariableDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );


  @Effect()
  currencyListVarDeduction$: Observable<Action> = this.actions$
    .ofType<LoadCurrencyListVariableDeduction>(VariableDeductionActionTypes.LOAD_CURRENCY_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_DEDUCTION_URLs.currencyList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const list = this.utilService.transformToSelectDataList(data.Results, 'currency_id', 'currency_name');
                return new LoadCurrencyListVariableDeductionSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingVariableDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );


  @Effect()
  formulaListVarDeduction$: Observable<Action> = this.actions$
    .ofType<LoadFormulaListVariableDeduction>(VariableDeductionActionTypes.LOAD_FORMULA_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_DEDUCTION_URLs.formulaList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const list = this.utilService.transformToSelectDataList(data.Results, 'formula_id', 'description');
                return new LoadFormulaListVariableDeductionSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingVariableDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );


  @Effect()
  loadTransactionUnitsVarDeduction$: Observable<Action> = this.actions$
    .ofType<LoadTransactionUnitListVariableDeduction>(VariableDeductionActionTypes.LOAD_TRANSACTION_UNIT_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_DEDUCTION_URLs.transactionUnitList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const list = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                return new LoadTransactionUnitListVariableDeductionSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingVariableDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );


  @Effect()
  loadGroupNamesVariableDeduction$: Observable<Action> = this.actions$
    .ofType<LoadGroupListVariableDeduction>(VariableDeductionActionTypes.LOAD_GROUP_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_DEDUCTION_URLs.groupList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const list = this.utilService.transformToSelectDataList(data.Results, 'group_id', 'description');
                return new LoadGroupListVariableDeductionSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingVariableDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );
}

