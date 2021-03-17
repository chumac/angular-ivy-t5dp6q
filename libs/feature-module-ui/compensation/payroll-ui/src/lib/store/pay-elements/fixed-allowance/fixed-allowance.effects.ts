import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as constants from '../../../constants/api-urls';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  FixedAllowanceActionTypes,
  LoadDataFixedAllowance,
  LoadDataFixedAllowanceSuccess,
  NotProcessingFixedAllowance,
  HideEditorFixedAllowance,
  HideRateEditorFixedAllowance,
  SaveFixedAllowance,
  UpdateFixedAllowance,
  DeleteFixedAllowance,
  DeletePaygroupRateFixedAllowance,
  DeleteEmployeeRateFixedAllowance,
  NotLoadingFixedAllowance,
  LoadCurrencyListFixedAllowance,
  LoadCurrencyListFixedAllowanceSuccess,
  LoadPayFormulaListFixedAllowance,
  LoadPayFormulaListFixedAllowanceSuccess,
  LoadPayrollProfileListFixedAllowance,
  LoadPayrollProfileListFixedAllowanceSuccess,
  LoadPaymentItemTypesFixedAllowance,
  LoadPaymentItemTypesFixedAllowanceSuccess,
  LoadPaymentFrequencyListFixedAllowance,
  LoadPaymentFrequencyListFixedAllowanceSuccess,
  LoadMonthListFixedAllowance,
  LoadMonthListFixedAllowanceSuccess,
  LoadEligibilityListFixedAllowance,
  LoadEligibilityListFixedAllowanceSuccess,
  LoadPayrollTypeListFixedAllowance,
  LoadPayrollTypeListFixedAllowanceSuccess,
  LoadGroupListFixedAllowance,
  LoadGroupListFixedAllowanceSuccess,
  LoadAllowanceListFixedAllowance,
  LoadAllowanceListFixedAllowanceSuccess,
  LoadProrationDateTypeListFixedAllowance,
  LoadProrationDateTypeListFixedAllowanceSuccess,
  LoadFilteredFixedAllowance,
  LoadPaygroupRatesFixedAllowance,
  LoadPaygroupRatesFixedAllowanceSuccess,
  LoadEmployeeRatesFixedAllowance,
  LoadEmployeeRatesFixedAllowanceSuccess,
  LoadCriteriaConfigurationCheckFixedAllowance,
  LoadCriteriaConfigurationCheckFixedAllowanceSuccess,
  LoadDataCriteriaConfigurationFixedAllowance,
  LoadDataCriteriaConfigurationFixedAllowanceSuccess,
  HideConfigureEditorFixedAllowance,
  SaveCriteriaConfigurationFixedAllowance,
  UpdateCriteriaConfigurationFixedAllowance,
  SaveRateFixedAllowance,
  UpdateRateFixedAllowance,
  CheckEmployeeRateChartExistenceFixedAllowance,
  CheckEmployeeRateChartExistenceFixedAllowanceSuccess,
  ProcessingRateChartCheckFixedAllowance,
  CheckPaygroupRateChartExistenceFixedAllowance,
  CheckPaygroupRateChartExistenceFixedAllowanceSuccess,
  LoadPaygroupListFixedAllowance,
  LoadPaygroupListFixedAllowanceSuccess,
  DeleteGlobalRateFixedAllowance,
  LoadGlobalRatesFixedAllowance,
  LoadGlobalRatesFixedAllowanceSuccess,

} from './fixed-allowance.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { IRootState } from '../../root/root.state';
import { ToastTypes } from '@nutela/shared/app-global';
import { IFixedAllowancePaygroupRate, IFixedAllowanceEmployeeRate, IFixedAllowanceRate } from '@nutela/models/compensation/payroll';

@Injectable()
export class FixedAllowanceEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>) { }

  @Effect()
  loadDataFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadDataFixedAllowance>(FixedAllowanceActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.getAll}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new LoadDataFixedAllowanceSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadCriteriaConfigCheckFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadCriteriaConfigurationCheckFixedAllowance>(FixedAllowanceActionTypes.LOAD_CRITERIA_CONFIGURATION_CHECK_FIXED_ALLOWANCE)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.criteriaCheck}/${payload.recordId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new LoadCriteriaConfigurationCheckFixedAllowanceSuccess(<any>(
                  data.Results[0]
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadCriteriaConfigFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadDataCriteriaConfigurationFixedAllowance>(FixedAllowanceActionTypes.LOAD_DATA_CRITERIA_CONFIGURATION_FIXED_ALLOWANCE)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.criteriaConfigData}/${payload.recordId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new LoadDataCriteriaConfigurationFixedAllowanceSuccess(<any>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadPaygroupRatesFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadPaygroupRatesFixedAllowance>(FixedAllowanceActionTypes.LOAD_PAYGROUP_RATES_FIXED_ALLOWANCE)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.paygroupRates}/${payload.allowanceId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new LoadPaygroupRatesFixedAllowanceSuccess(<IFixedAllowancePaygroupRate[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadEmployeeRatesFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadEmployeeRatesFixedAllowance>(FixedAllowanceActionTypes.LOAD_EMPLOYEE_RATES_FIXED_ALLOWANCE)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.employeeRates}/${payload.allowanceId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new LoadEmployeeRatesFixedAllowanceSuccess(<IFixedAllowanceEmployeeRate[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadGlobalRatesFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadGlobalRatesFixedAllowance>(FixedAllowanceActionTypes.LOAD_GLOBAL_RATES_FIXED_ALLOWANCE)
      .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.globalRates}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new LoadGlobalRatesFixedAllowanceSuccess(<IFixedAllowanceRate[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  checkPaygroupRateChart$: Observable<Action> = this.actions$
      .ofType<CheckPaygroupRateChartExistenceFixedAllowance>(FixedAllowanceActionTypes.PAYGROUP_RATE_CHART_CHECK_FIXED_ALLOWANCE)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.paygroupRates}/${payload.paygroupId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new ProcessingRateChartCheckFixedAllowance(false));
                return new CheckPaygroupRateChartExistenceFixedAllowanceSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new ProcessingRateChartCheckFixedAllowance(false));
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new ProcessingRateChartCheckFixedAllowance(false));
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  checkEmployeeRateChart$: Observable<Action> = this.actions$
      .ofType<CheckEmployeeRateChartExistenceFixedAllowance>(FixedAllowanceActionTypes.EMPLOYEE_RATE_CHART_CHECK_FIXED_ALLOWANCE)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.employeeRates}//${payload.employeeId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new ProcessingRateChartCheckFixedAllowance(false));
                return new CheckEmployeeRateChartExistenceFixedAllowanceSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new ProcessingRateChartCheckFixedAllowance(false));
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new ProcessingRateChartCheckFixedAllowance(false));
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadCurrencyFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadCurrencyListFixedAllowance>(FixedAllowanceActionTypes.LOAD_CURRENCY_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.currencyList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const list = this.utilService.transformToSelectDataList(data.Results, 'currency_id', 'currency_name');
                return new LoadCurrencyListFixedAllowanceSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadPayFormulaFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadPayFormulaListFixedAllowance>(FixedAllowanceActionTypes.LOAD_PAY_FORMULA_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.payFormularList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                const list = this.utilService.transformToSelectDataList(data.Results, 'formula_id', 'description');
                return new LoadPayFormulaListFixedAllowanceSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadPayrollProfileFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadPayrollProfileListFixedAllowance>(FixedAllowanceActionTypes.LOAD_PAYROLL_PROFILE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.hrActiveProfile}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const payrollProfileTransformed = this.utilService.transformToSelectDataList(data.Results, 'payroll_profile_id', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new LoadPayrollProfileListFixedAllowanceSuccess(<ISelectOption[]>(
                  payrollProfileTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadPaymentItemTypesFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadPaymentItemTypesFixedAllowance>(FixedAllowanceActionTypes.LOAD_PAYMENT_ITEM_TYPES)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.payItemTypes}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const itemsTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new LoadPaymentItemTypesFixedAllowanceSuccess(<ISelectOption[]>(
                  itemsTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadFrequenciesFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadPaymentFrequencyListFixedAllowance>(FixedAllowanceActionTypes.LOAD_PAYMENT_FREQUENCY_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.payFrequencies}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new LoadPaymentFrequencyListFixedAllowanceSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadMonthsFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadMonthListFixedAllowance>(FixedAllowanceActionTypes.LOAD_MONTH_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.months}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const itemsTransformed = this.utilService.transformToSelectDataList(data.Results, 'code', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new LoadMonthListFixedAllowanceSuccess(<ISelectOption[]>(
                  itemsTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadEligibilityFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadEligibilityListFixedAllowance>(FixedAllowanceActionTypes.LOAD_ELIGIBILITY_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.eligibilities}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const itemsTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new LoadEligibilityListFixedAllowanceSuccess(<ISelectOption[]>(
                  itemsTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadPayrollTypesFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadPayrollTypeListFixedAllowance>(FixedAllowanceActionTypes.LOAD_PAYROLL_TYPE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.payrollTypes}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const itemsTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new LoadPayrollTypeListFixedAllowanceSuccess(<ISelectOption[]>(
                  itemsTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadGroupTypessFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadGroupListFixedAllowance>(FixedAllowanceActionTypes.LOAD_PAYROLL_TYPE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.groupTypes}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const itemsTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new LoadGroupListFixedAllowanceSuccess(<ISelectOption[]>(
                  itemsTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadAllowanceTypesFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadAllowanceListFixedAllowance>(FixedAllowanceActionTypes.LOAD_ALLOWANCE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.allowanceList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const itemsTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new LoadAllowanceListFixedAllowanceSuccess(<ISelectOption[]>(
                  itemsTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadProrationDateTypesFixedAllowance$: Observable<Action> = this.actions$
    .ofType<LoadProrationDateTypeListFixedAllowance>(FixedAllowanceActionTypes.LOAD_PRORATION_DATE_TYPE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.prorationDateTypes}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const itemsTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new LoadProrationDateTypeListFixedAllowanceSuccess(<ISelectOption[]>(
                  itemsTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  loadPaygroupList$: Observable<Action> = this.actions$
    .ofType<LoadPaygroupListFixedAllowance>(FixedAllowanceActionTypes.LOAD_PAYGROUP_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.FIXED_ALLOWANCE_URLs.paygroupList}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              const itemsTransformed = this.utilService.transformToSelectDataList(data.Results, 'paygroup_id', 'description');
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new LoadPaygroupListFixedAllowanceSuccess(<ISelectOption[]>(
                  itemsTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingFixedAllowance());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError(() => {
              this.store.dispatch(new NotLoadingFixedAllowance());
              return of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            })
          );
      })
    );

  @Effect()
  save$: Observable<Action> = this.actions$
    .ofType<SaveFixedAllowance>(FixedAllowanceActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.FIXED_ALLOWANCE_URLs.create, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataFixedAllowance(),
                  new NotProcessingFixedAllowance(),
                  new HideEditorFixedAllowance(),
                  new LoadFilteredFixedAllowance({ payrollProfileId: null })
                ]);
              } else {
                return from([
                  new NotProcessingFixedAllowance(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFixedAllowance(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType<UpdateFixedAllowance>(FixedAllowanceActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.FIXED_ALLOWANCE_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: ` Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataFixedAllowance(),
                  new NotProcessingFixedAllowance(),
                  new HideEditorFixedAllowance(),
                  new LoadFilteredFixedAllowance({ payrollProfileId: payload.data.payroll_profile })
                ]);
              } else {
                return from([
                  new NotProcessingFixedAllowance(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFixedAllowance(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  saveRate$: Observable<Action> = this.actions$
    .ofType<SaveRateFixedAllowance>(FixedAllowanceActionTypes.SET_RATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.FIXED_ALLOWANCE_URLs.createRate, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new NotProcessingFixedAllowance(),
                  new HideRateEditorFixedAllowance(),
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  payload.data.is_global ? new LoadDataFixedAllowance() : (payload.data.paygroup_id ? new LoadPaygroupRatesFixedAllowance({ allowanceId: payload.data.item_id }) : new LoadEmployeeRatesFixedAllowance({ allowanceId: payload.data.item_id }))
                ]);
              } else {
                return from([
                  new NotProcessingFixedAllowance(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFixedAllowance(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateRate$: Observable<Action> = this.actions$
    .ofType<UpdateRateFixedAllowance>(FixedAllowanceActionTypes.UPDATE_RATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.FIXED_ALLOWANCE_URLs.updateRate}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {

                return from([
                  new NotProcessingFixedAllowance(),
                  new HideRateEditorFixedAllowance(),
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  payload.data.is_global ? new LoadDataFixedAllowance() :
                  (payload.data.paygroup_id ? new LoadPaygroupRatesFixedAllowance({ allowanceId: payload.data.item_id }) : new LoadEmployeeRatesFixedAllowance({ allowanceId: payload.data.item_id })),
                ]);
              } else {
                return from([
                  new NotProcessingFixedAllowance(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFixedAllowance(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  saveCriteriaBaseConfiguration$: Observable<Action> = this.actions$
      .ofType<SaveCriteriaConfigurationFixedAllowance>(FixedAllowanceActionTypes.SAVE_CRITERIA_CONFIGURATION_FIXED_ALLOWANCE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.FIXED_ALLOWANCE_URLs.createConfigure, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataFixedAllowance(),
                  new NotProcessingFixedAllowance(),
                  new HideConfigureEditorFixedAllowance(),
                  new LoadFilteredFixedAllowance({ payrollProfileId: payload.data.payroll_profile })
                ]);
              } else {
                return from([
                  new NotProcessingFixedAllowance(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFixedAllowance(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateCriteriaBaseConfiguration$: Observable<Action> = this.actions$
      .ofType<UpdateCriteriaConfigurationFixedAllowance>(FixedAllowanceActionTypes.UPDATE_CRITERIA_CONFIGURATION_FIXED_ALLOWANCE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.FIXED_ALLOWANCE_URLs.updateConfigure}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: ` Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataFixedAllowance(),
                  new NotProcessingFixedAllowance(),
                  new HideConfigureEditorFixedAllowance(),
                  new LoadFilteredFixedAllowance({ payrollProfileId: payload.data.payroll_profile })
                ]);
              } else {
                return from([
                  new NotProcessingFixedAllowance(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFixedAllowance(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  delete$: Observable<Action> = this.actions$
    .ofType<DeleteFixedAllowance>(FixedAllowanceActionTypes.DELETE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.FIXED_ALLOWANCE_URLs.archive}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataFixedAllowance(),
                  new LoadFilteredFixedAllowance({ payrollProfileId: payload.payrollProfile })
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
      .ofType<DeletePaygroupRateFixedAllowance>(FixedAllowanceActionTypes.DELETE_PAYGROUP_RATE_FIXED_ALLOWANCE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.FIXED_ALLOWANCE_URLs.deletePaygroupRate}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadPaygroupRatesFixedAllowance({allowanceId: payload.allowanceId})
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
    .ofType<DeleteEmployeeRateFixedAllowance>(FixedAllowanceActionTypes.DELETE_EMPLOYEE_RATE_FIXED_ALLOWANCE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.FIXED_ALLOWANCE_URLs.deleteEmployeeRate}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                this.store.dispatch(new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }));
                this.store.dispatch(new LoadEmployeeRatesFixedAllowance({allowanceId: payload.allowanceId}));

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
    .ofType<DeleteGlobalRateFixedAllowance>(FixedAllowanceActionTypes.DELETE_GLOBAL_RATE_FIXED_ALLOWANCE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.FIXED_ALLOWANCE_URLs.deleteGlobalRate}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                this.store.dispatch(new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }));
                this.store.dispatch(new LoadGlobalRatesFixedAllowance());

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



