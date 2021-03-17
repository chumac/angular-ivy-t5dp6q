import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  ProfileActionTypes,
  LoadProfileData,
  LoadProfileSuccess,
  NotProcessingProfile,
  HideEditorProfile,
  SaveProfile,
  UpdateProfile,
  DeleteProfile,
  NotLoadingFormData,
  LoadDaysSelectOptionData,
  LoadDaysSelectOptionDataSuccess,
  LoadTaxOptionSelectOptionData,
  LoadTaxOptionSelectOptionDataSuccess,
  LoadTaxModeSelectOptionData,
  LoadTaxModeSelectOptionDataSuccess,
  LoadTaxRuleSelectOptionData,
  LoadTaxRuleSelectOptionDataSuccess,
  LoadPaymentCurrencySelectOptionData,
  LoadPaymentCurrencySelectOptionDataSuccess,
  LoadPayPeriodSelectOptionData,
  LoadPayPeriodSelectOptionDataSuccess,
  LoadEnterpriseStructureSelectOptionData,
  LoadEnterpriseStructureSelectOptionDataSuccess,
  LoadStructureDetailSelectOptionDataSuccess,
  LoadStructureDetailSelectOptionData,
  LoadCostCenterSelectOptionData,
  LoadCostCenterSelectOptionDataSuccess,
  LoadFixedDeductionSelectOptionData,
  LoadFixedDeductionSelectOptionDataSuccess,
  LoadCoinageRoundingSelectOptionData,
  LoadCoinageRoundingSelectOptionDataSuccess,
  LoadUpfrontTreatmentSelectOptionData,
  LoadUpfrontTreatmentSelectOptionDataSuccess,
  LoadPeriodicProrationSelectOptionData,
  LoadPeriodicProrationSelectOptionDataSuccess,
  NotLoadingProfile,
  LoadAllowNegativePaySelectOptionData,
  LoadAllowNegativePaySelectOptionDataSuccess,
  LoadRunCycleSelectOptionData,
  LoadRunCycleSelectOptionDataSuccess,
  LoadSecurityRolesSelectOptionDataSuccess,
  LoadSecurityRolesSelectOptionData,
  LoadUpdateSecurityGroupEligibility,
  LoadUpdateSecurityGroupEligibilitySuccess,
  LoadPayrollProfileSelectOption,
  LoadPayrollProfileSelectOptionSuccess,
  HasProfileAdminRole

} from './profile.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { IRootState } from '../../root/root.state';
import { IProfile } from '@nutela/models/compensation/payroll';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>) { }

  @Effect()
  loadProfileData$: Observable<Action> = this.actions$
    .ofType<LoadProfileData>(ProfileActionTypes.LOAD_PROFILE_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYROLL_PROFILE_URLs.data}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingProfile());
                return new LoadProfileSuccess(<IProfile[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingProfile());
                this.store.dispatch(new HasProfileAdminRole(!(data.ErrorMessage.includes('py_profiles_admin'))))
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadProfileSelectOptionData$: Observable<Action> = this.actions$
      .ofType<LoadPayrollProfileSelectOption>(ProfileActionTypes.LOAD_PAYROLL_SELECT_OPTION_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.FORMULA_URLs.payrollProfile}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const payrollTransformed = this.utilService.transformToSelectDataList(data.Results, 'payroll_profile_id', 'description');
                if (payload.useNoneOption) {
                  payrollTransformed.unshift({ label: 'Unrestricted', value: 0 });
                  return new LoadPayrollProfileSelectOptionSuccess(<ISelectOption[]>(
                  payrollTransformed
                ));
                } else {
                  return new LoadPayrollProfileSelectOptionSuccess(<ISelectOption[]>(
                    payrollTransformed
                  ));
                }

              } else {
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form Data Could Not Be Loaded.`, type: ToastTypes.ERROR
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
  loadDaysData$: Observable<Action> = this.actions$
    .ofType<LoadDaysSelectOptionData>(ProfileActionTypes.LOAD_DAYS_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYROLL_PROFILE_URLs.days}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFormData());
                return new LoadDaysSelectOptionDataSuccess(<ISelectOption[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadTaxOptionsData$: Observable<Action> = this.actions$
    .ofType<LoadTaxOptionSelectOptionData>(ProfileActionTypes.LOAD_TAX_OPTIONS_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYROLL_PROFILE_URLs.taxOptions}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                let transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                this.store.dispatch(new NotLoadingFormData());
                return new LoadTaxOptionSelectOptionDataSuccess(<ISelectOption[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadAllowNegativePayData$: Observable<Action> = this.actions$
    .ofType<LoadAllowNegativePaySelectOptionData>(ProfileActionTypes.LOAD_ALLOW_NEGATIVE_PAY_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYROLL_PROFILE_URLs.allowNegativePay}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                let transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                this.store.dispatch(new NotLoadingFormData());
                return new LoadAllowNegativePaySelectOptionDataSuccess(<ISelectOption[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadRunCycleData$: Observable<Action> = this.actions$
    .ofType<LoadRunCycleSelectOptionData>(ProfileActionTypes.LOAD_RUN_CYCLE_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYROLL_PROFILE_URLs.runCycle}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                let transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                this.store.dispatch(new NotLoadingFormData());
                return new LoadRunCycleSelectOptionDataSuccess(<ISelectOption[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadTaxModeData$: Observable<Action> = this.actions$
    .ofType<LoadTaxModeSelectOptionData>(ProfileActionTypes.LOAD_TAX_MODE_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYROLL_PROFILE_URLs.taxMode}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                let transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                this.store.dispatch(new NotLoadingFormData());
                return new LoadTaxModeSelectOptionDataSuccess(<ISelectOption[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadTaxRuleData$: Observable<Action> = this.actions$
    .ofType<LoadTaxRuleSelectOptionData>(ProfileActionTypes.LOAD_TAX_RULE_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYROLL_PROFILE_URLs.taxRule}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                let transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                this.store.dispatch(new NotLoadingFormData());
                return new LoadTaxRuleSelectOptionDataSuccess(<ISelectOption[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadCurrencyPaymentData$: Observable<Action> = this.actions$
    .ofType<LoadPaymentCurrencySelectOptionData>(ProfileActionTypes.LOAD_CURRENCY_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYROLL_PROFILE_URLs.getCurrencies}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                let pCurrencyTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                this.store.dispatch(new NotLoadingFormData());
                return new LoadPaymentCurrencySelectOptionDataSuccess(<ISelectOption[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadPayPeriodData$: Observable<Action> = this.actions$
    .ofType<LoadPayPeriodSelectOptionData>(ProfileActionTypes.LOAD_PAY_PERIOD_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYROLL_PROFILE_URLs.payPeriod}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                let transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                this.store.dispatch(new NotLoadingFormData());
                return new LoadPayPeriodSelectOptionDataSuccess(<ISelectOption[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadEnterpriseStructureData$: Observable<Action> = this.actions$
    .ofType<LoadEnterpriseStructureSelectOptionData>(ProfileActionTypes.LOAD_ENTERPRISE_STRUCTURE_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYROLL_PROFILE_URLs.enterpriseStructure}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                let entStrucTypeTransformed = this.utilService.transformToSelectDataList(data.Results, 'analysis_id', 'description');
                this.store.dispatch(new NotLoadingFormData());
                return new LoadEnterpriseStructureSelectOptionDataSuccess(<ISelectOption[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadStructureDetailData$: Observable<Action> = this.actions$
    .ofType<LoadStructureDetailSelectOptionData>(ProfileActionTypes.LOAD_STRUCTURE_DETAIL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        const url = `${constants.PAYROLL_PROFILE_URLs.structureDetails}/${payload.structureId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFormData());
                return new LoadStructureDetailSelectOptionDataSuccess(<ISelectOption[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingFormData(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadCostCenterData$: Observable<Action> = this.actions$
    .ofType<LoadCostCenterSelectOptionData>(ProfileActionTypes.LOAD_COST_CENTER_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        const url = `${constants.PAYROLL_PROFILE_URLs.costCenter}/${payload.structureId}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFormData());
                return new LoadCostCenterSelectOptionDataSuccess(<ISelectOption[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadSecurityRolesData$: Observable<Action> = this.actions$
    .ofType<LoadSecurityRolesSelectOptionData>(ProfileActionTypes.LOAD_SECURITY_ROLES_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PAYROLL_PROFILE_URLs.securityRoles)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFormData());
                return new LoadSecurityRolesSelectOptionDataSuccess(<any[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  securityGroupEditable$: Observable<Action> = this.actions$
    .ofType<LoadUpdateSecurityGroupEligibility>(ProfileActionTypes.LOAD_SECURITY_GROUP_EDITABLE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PAYROLL_PROFILE_URLs.canEditSecurityGroup)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFormData());
                return new LoadUpdateSecurityGroupEligibilitySuccess(<any>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadFixedDeductionData$: Observable<Action> = this.actions$
    .ofType<LoadFixedDeductionSelectOptionData>(ProfileActionTypes.LOAD_FIXED_DEDUCTION_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYROLL_PROFILE_URLs.fixedDeduction}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                let fdTransformed = this.utilService.transformToSelectDataList(data.Results, 'deduction_id', 'description');
                this.store.dispatch(new NotLoadingFormData());
                return new LoadFixedDeductionSelectOptionDataSuccess(<ISelectOption[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadCoinageRoundingData$: Observable<Action> = this.actions$
    .ofType<LoadCoinageRoundingSelectOptionData>(ProfileActionTypes.LOAD_COINAGE_ROUNDING_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYROLL_PROFILE_URLs.coinageRounding}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFormData());
                return new LoadCoinageRoundingSelectOptionDataSuccess(<ISelectOption[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadUpfrontTreatmentData$: Observable<Action> = this.actions$
    .ofType<LoadUpfrontTreatmentSelectOptionData>(ProfileActionTypes.LOAD_UPFRONT_TREATMENT_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYROLL_PROFILE_URLs.upfrontTreatment}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFormData());
                return new LoadUpfrontTreatmentSelectOptionDataSuccess(<ISelectOption[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  loadPeriodicProrationData$: Observable<Action> = this.actions$
    .ofType<LoadPeriodicProrationSelectOptionData>(ProfileActionTypes.LOAD_PERIODIC_PRORATION_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYROLL_PROFILE_URLs.periodicProration}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingFormData());
                return new LoadPeriodicProrationSelectOptionDataSuccess(<ISelectOption[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveProfile>(ProfileActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.PAYROLL_PROFILE_URLs.create, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingProfile(),
                  new HideEditorProfile(),
                  new LoadProfileData()
                ]);
              } else {
                return from([
                  new NotProcessingProfile(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingProfile(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateData$: Observable<Action> = this.actions$
    .ofType<UpdateProfile>(ProfileActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.PAYROLL_PROFILE_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingProfile(),
                  new HideEditorProfile(),
                  new LoadProfileData()
                ]);
              } else {
                return from([
                  new NotProcessingProfile(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingProfile(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteProfile>(ProfileActionTypes.DELETE_PROFILE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.PAYROLL_PROFILE_URLs.delete}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was archived successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadProfileData()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Archived', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not archived.`, type: ToastTypes.ERROR }),
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

}

