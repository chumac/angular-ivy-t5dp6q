import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants/api-urls';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  FixedDeductionActionTypes,
  LoadDataFixedDeduction,
  LoadDataFixedDeductionSuccess,
  NotProcessingFixedDeduction,
  HideEditorFixedDeduction,
  HideRateEditorFixedDeduction,
  SaveFixedDeduction,
  UpdateFixedDeduction,
  DeleteFixedDeduction,
  DeletePaygroupRateFixedDeduction,
  DeleteEmployeeRateFixedDeduction,
  DeleteGlobalRateFixedDeduction,
  NotLoadingFixedDeduction,
  LoadCurrencyListFixedDeduction,
  LoadCurrencyListFixedDeductionSuccess,
  LoadDeductFormulaListFixedDeduction,
  LoadDeductFormulaListFixedDeductionSuccess,
  LoadPayrollProfileListFixedDeduction,
  LoadPayrollProfileListFixedDeductionSuccess,
  LoadPaymentItemTypesFixedDeduction,
  LoadPaymentItemTypesFixedDeductionSuccess,
  LoadPaymentFrequencyListFixedDeduction,
  LoadPaymentFrequencyListFixedDeductionSuccess,
  LoadMonthListFixedDeduction,
  LoadMonthListFixedDeductionSuccess,
  LoadEligibilityListFixedDeduction,
  LoadEligibilityListFixedDeductionSuccess,
  LoadPayrollTypeListFixedDeduction,
  LoadPayrollTypeListFixedDeductionSuccess,
  LoadGroupListFixedDeduction,
  LoadGroupListFixedDeductionSuccess,
  LoadDeductionListFixedDeduction,
  LoadDeductionListFixedDeductionSuccess,
  LoadProrationDateTypeListFixedDeduction,
  LoadProrationDateTypeListFixedDeductionSuccess,
  LoadPaygroupRatesFixedDeduction,
  LoadPaygroupRatesFixedDeductionSuccess,
  LoadGlobalRatesFixedDeduction,
  LoadGlobalRatesFixedDeductionSuccess,
  LoadEmployeeRatesFixedDeduction,
  LoadEmployeeRatesFixedDeductionSuccess,
  LoadCriteriaConfigurationCheckFixedDeduction,
  LoadCriteriaConfigurationCheckFixedDeductionSuccess,
  LoadDataCriteriaConfigurationFixedDeduction,
  LoadDataCriteriaConfigurationFixedDeductionSuccess,
  HideConfigureEditorFixedDeduction,
  SaveCriteriaConfigurationFixedDeduction,
  UpdateCriteriaConfigurationFixedDeduction,
  SaveRateFixedDeduction,
  UpdateRateFixedDeduction,
  CheckEmployeeRateChartExistenceFixedDeduction,
  CheckEmployeeRateChartExistenceFixedDeductionSuccess,
  ProcessingRateChartCheckFixedDeduction,
  CheckPaygroupRateChartExistenceFixedDeduction,
  CheckPaygroupRateChartExistenceFixedDeductionSuccess,
  LoadPaygroupListFixedDeduction,
  LoadPaygroupListFixedDeductionSuccess,

} from './fixed-deduction.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption} from '@nutela/models/core-data';
import { IRootState } from '../../root/root.state';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class FixedDeductionEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>) {}

  @Effect()
  loadDataFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadDataFixedDeduction>(FixedDeductionActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_DEDUCTION_URLs.getAll}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new LoadDataFixedDeductionSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadCriteriaConfigCheckFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadCriteriaConfigurationCheckFixedDeduction>(FixedDeductionActionTypes.LOAD_CRITERIA_CONFIGURATION_CHECK_FIXED_DEDUCTION)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.FIXED_DEDUCTION_URLs.criteriaCheck}/${payload.recordId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new LoadCriteriaConfigurationCheckFixedDeductionSuccess(<any>(
                  data.Results[0]
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadCriteriaConfigFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadDataCriteriaConfigurationFixedDeduction>(FixedDeductionActionTypes.LOAD_DATA_CRITERIA_CONFIGURATION_FIXED_DEDUCTION)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.FIXED_DEDUCTION_URLs.criteriaConfigData}/${payload.recordId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new LoadDataCriteriaConfigurationFixedDeductionSuccess(<any>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadPaygroupRatesFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadPaygroupRatesFixedDeduction>(FixedDeductionActionTypes.LOAD_PAYGROUP_RATES_FIXED_DEDUCTION)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.FIXED_DEDUCTION_URLs.paygroupRates}/${payload.deductionId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new LoadPaygroupRatesFixedDeductionSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadGlobalRatesFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadGlobalRatesFixedDeduction>(FixedDeductionActionTypes.LOAD_GLOBAL_RATES_FIXED_DEDUCTION)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.FIXED_DEDUCTION_URLs.globalRates}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new LoadGlobalRatesFixedDeductionSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadEmployeeRatesFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadEmployeeRatesFixedDeduction>(FixedDeductionActionTypes.LOAD_EMPLOYEE_RATES_FIXED_DEDUCTION)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.FIXED_DEDUCTION_URLs.employeeRates}/${payload.deductionId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new LoadEmployeeRatesFixedDeductionSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  checkPaygroupRateChart$: Observable<Action> = this.actions$
    .ofType<CheckPaygroupRateChartExistenceFixedDeduction>(FixedDeductionActionTypes.PAYGROUP_RATE_CHART_CHECK_FIXED_DEDUCTION)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.FIXED_DEDUCTION_URLs.paygroupRates}/${payload.paygroupId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new ProcessingRateChartCheckFixedDeduction(false));
                return new CheckPaygroupRateChartExistenceFixedDeductionSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new ProcessingRateChartCheckFixedDeduction(false));
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new ProcessingRateChartCheckFixedDeduction(false));
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  checkEmployeeRateChart$: Observable<Action> = this.actions$
    .ofType<CheckEmployeeRateChartExistenceFixedDeduction>(FixedDeductionActionTypes.EMPLOYEE_RATE_CHART_CHECK_FIXED_DEDUCTION)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.FIXED_DEDUCTION_URLs.employeeRates}//${payload.employeeId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new ProcessingRateChartCheckFixedDeduction(false));
                return new CheckEmployeeRateChartExistenceFixedDeductionSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new ProcessingRateChartCheckFixedDeduction(false));
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new ProcessingRateChartCheckFixedDeduction(false));
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadCurrencyFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadCurrencyListFixedDeduction>(FixedDeductionActionTypes.LOAD_CURRENCY_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_DEDUCTION_URLs.currencyList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const list = this.utilService.transformToSelectDataList(data.Results, 'currency_id', 'currency_name');
                return new LoadCurrencyListFixedDeductionSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadPayFormulaFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadDeductFormulaListFixedDeduction>(FixedDeductionActionTypes.LOAD_DEDUCT_FORMULA_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_DEDUCTION_URLs.payFormularList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                const list = this.utilService.transformToSelectDataList(data.Results, 'formula_id', 'description');
                return new LoadDeductFormulaListFixedDeductionSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadPayrollProfileFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadPayrollProfileListFixedDeduction>(FixedDeductionActionTypes.LOAD_PAYROLL_PROFILE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_DEDUCTION_URLs.payrollProfileList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const payrollProfileTransformed = this.utilService.transformToSelectDataList(data.Results, 'payroll_profile_id', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new LoadPayrollProfileListFixedDeductionSuccess(<ISelectOption[]>(
                  payrollProfileTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadPaymentItemTypesFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadPaymentItemTypesFixedDeduction>(FixedDeductionActionTypes.LOAD_PAYMENT_ITEM_TYPES)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_DEDUCTION_URLs.payItemTypes}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const itemsTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new LoadPaymentItemTypesFixedDeductionSuccess(<ISelectOption[]>(
                  itemsTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadFrequenciesFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadPaymentFrequencyListFixedDeduction>(FixedDeductionActionTypes.LOAD_PAYMENT_FREQUENCY_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_DEDUCTION_URLs.payFrequencies}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new LoadPaymentFrequencyListFixedDeductionSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadMonthsFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadMonthListFixedDeduction>(FixedDeductionActionTypes.LOAD_MONTH_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_DEDUCTION_URLs.months}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const itemsTransformed = this.utilService.transformToSelectDataList(data.Results, 'code', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new LoadMonthListFixedDeductionSuccess(<ISelectOption[]>(
                  itemsTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadEligibilityFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadEligibilityListFixedDeduction>(FixedDeductionActionTypes.LOAD_ELIGIBILITY_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_DEDUCTION_URLs.eligibilities}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const itemsTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new LoadEligibilityListFixedDeductionSuccess(<ISelectOption[]>(
                  itemsTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadPayrollTypesFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadPayrollTypeListFixedDeduction>(FixedDeductionActionTypes.LOAD_PAYROLL_TYPE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_DEDUCTION_URLs.payrollTypes}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const itemsTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new LoadPayrollTypeListFixedDeductionSuccess(<ISelectOption[]>(
                  itemsTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadGroupTypessFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadGroupListFixedDeduction>(FixedDeductionActionTypes.LOAD_PAYROLL_TYPE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_DEDUCTION_URLs.groupTypes}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const itemsTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new LoadGroupListFixedDeductionSuccess(<ISelectOption[]>(
                  itemsTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadDeductionTypesFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadDeductionListFixedDeduction>(FixedDeductionActionTypes.LOAD_DEDUCTION_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_DEDUCTION_URLs.deductionList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const itemsTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new LoadDeductionListFixedDeductionSuccess(<ISelectOption[]>(
                  itemsTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadProrationDateTypesFixedDeduction$: Observable<Action> = this.actions$
    .ofType<LoadProrationDateTypeListFixedDeduction>(FixedDeductionActionTypes.LOAD_PRORATION_DATE_TYPE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_DEDUCTION_URLs.prorationDateTypes}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const itemsTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new LoadProrationDateTypeListFixedDeductionSuccess(<ISelectOption[]>(
                  itemsTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadPaygroupList$: Observable<Action> = this.actions$
    .ofType<LoadPaygroupListFixedDeduction>(FixedDeductionActionTypes.LOAD_PAYGROUP_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_DEDUCTION_URLs.paygroupList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const itemsTransformed = this.utilService.transformToSelectDataList(data.Results, 'paygroup_id', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new LoadPaygroupListFixedDeductionSuccess(<ISelectOption[]>(
                  itemsTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedDeduction());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedDeduction());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  save$: Observable<Action> = this.actions$
    .ofType<SaveFixedDeduction>(FixedDeductionActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.FIXED_DEDUCTION_URLs.create, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataFixedDeduction(),
                  new NotProcessingFixedDeduction(),
                  new HideEditorFixedDeduction()
                ]);
              } else {
                return from([
                  new NotProcessingFixedDeduction(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFixedDeduction(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType<UpdateFixedDeduction>(FixedDeductionActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.FIXED_DEDUCTION_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: ` Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataFixedDeduction(),
                  new NotProcessingFixedDeduction(),
                  new HideEditorFixedDeduction()
                ]);
              } else {
                return from([
                  new NotProcessingFixedDeduction(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFixedDeduction(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  saveRate$: Observable<Action> = this.actions$
    .ofType<SaveRateFixedDeduction>(FixedDeductionActionTypes.SET_RATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.FIXED_DEDUCTION_URLs.createRate, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingFixedDeduction(),
                  new HideRateEditorFixedDeduction(),
                  payload.data.is_global ? new LoadDataFixedDeduction() : (payload.data.paygroup_id ? new LoadPaygroupRatesFixedDeduction({ deductionId: payload.data.item_id }) : new LoadEmployeeRatesFixedDeduction({ deductionId: payload.data.item_id }))
                ]);
              } else {
                return from([
                  new NotProcessingFixedDeduction(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFixedDeduction(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateRate$: Observable<Action> = this.actions$
    .ofType<UpdateRateFixedDeduction>(FixedDeductionActionTypes.UPDATE_RATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.FIXED_DEDUCTION_URLs.updateRate}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: ` Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingFixedDeduction(),
                  new HideRateEditorFixedDeduction(),
                  payload.data.is_global ? new LoadDataFixedDeduction() : (payload.data.paygroup_id ? new LoadPaygroupRatesFixedDeduction({ deductionId: payload.data.item_id }) : new LoadEmployeeRatesFixedDeduction({ deductionId: payload.data.item_id }))
                ]);
              } else {
                return from([
                  new NotProcessingFixedDeduction(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFixedDeduction(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  saveCriteriaBaseConfiguration$: Observable<Action> = this.actions$
    .ofType<SaveCriteriaConfigurationFixedDeduction>(FixedDeductionActionTypes.SAVE_CRITERIA_CONFIGURATION_FIXED_DEDUCTION)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.FIXED_DEDUCTION_URLs.createConfigure, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataFixedDeduction(),
                  new NotProcessingFixedDeduction(),
                  new HideConfigureEditorFixedDeduction()
                ]);
              } else {
                return from([
                  new NotProcessingFixedDeduction(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFixedDeduction(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateCriteriaBaseConfiguration$: Observable<Action> = this.actions$
    .ofType<UpdateCriteriaConfigurationFixedDeduction>(FixedDeductionActionTypes.UPDATE_CRITERIA_CONFIGURATION_FIXED_DEDUCTION)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.FIXED_DEDUCTION_URLs.updateConfigure}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: ` Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataFixedDeduction(),
                  new NotProcessingFixedDeduction(),
                  new HideConfigureEditorFixedDeduction()
                ]);
              } else {
                return from([
                  new NotProcessingFixedDeduction(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFixedDeduction(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  delete$: Observable<Action> = this.actions$
    .ofType<DeleteFixedDeduction>(FixedDeductionActionTypes.DELETE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.FIXED_DEDUCTION_URLs.archive}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataFixedDeduction()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR }),
                ]);
              }
            }),
            catchError(() =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deletePaygroupRate$: Observable<Action> = this.actions$
    .ofType<DeletePaygroupRateFixedDeduction>(FixedDeductionActionTypes.DELETE_PAYGROUP_RATE_FIXED_DEDUCTION)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.FIXED_DEDUCTION_URLs.deletePaygroupRate}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadPaygroupRatesFixedDeduction({ deductionId: payload.deductionId })
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR }),
                ]);
              }
            }),
            catchError(() =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteEmployeeRate$: Observable<Action> = this.actions$
    .ofType<DeleteEmployeeRateFixedDeduction>(FixedDeductionActionTypes.DELETE_EMPLOYEE_RATE_FIXED_DEDUCTION)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.FIXED_DEDUCTION_URLs.deleteEmployeeRate}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                this.store.dispatch(new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }));
                this.store.dispatch(new LoadEmployeeRatesFixedDeduction({ deductionId: payload.deductionId }));
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR }),
                ]);
              }
            }),
            catchError(() =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteGlobalRate$: Observable<Action> = this.actions$
    .ofType<DeleteGlobalRateFixedDeduction>(FixedDeductionActionTypes.DELETE_GLOBAL_RATE_FIXED_DEDUCTION)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.FIXED_DEDUCTION_URLs.deleteRate}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                this.store.dispatch(new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }));
                this.store.dispatch(new LoadDataFixedDeduction());
                this.store.dispatch(new LoadGlobalRatesFixedDeduction());
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR }),
                ]);
              }
            }),
            catchError(() =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

}

