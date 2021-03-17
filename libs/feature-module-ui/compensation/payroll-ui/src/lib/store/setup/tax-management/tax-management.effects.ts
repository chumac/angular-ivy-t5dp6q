import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { IApiResult } from '@nutela/models/core-data';
import { map, switchMap, catchError } from 'rxjs/operators';
import { TaxManagementActionTypes, HideEditorTaxManagementProfile, LoadListTaxManagementData, LoadListTaxManagementProfileDataSuccess, LoadListTaxManagementProfileData, LoadListTaxManagementDataSuccess, LoadingTaxManagement, NotLoadingTaxManagement, NotProcessingTaxManagement, SaveTaxManagementProfile, LoadPercentageGrossData, LoadPercentageGrossDataSuccess, SavePecentGrossData, HidePercentGrossEditor, LoadTaxStandardData, LoadTaxStandardDataSuccess, SaveTaxStandardData, HideTaxStandardEditor, UpdateTaxStandardData, DeleteTaxStandard, LoadRangePercentData, LoadRangePercentDataSuccess, DeleteRangePercent, SaveRangePercentdData, HideRangePercentEditor, UpdateRangePercentData, LoadRangeValueData, LoadRangeValueDataSuccess, DeleteRangeValue, SaveRangeValueData, HideRangeValueEditor, UpdateRangeValueData, LoadTaxFixedDectionListData, LoadTaxFixedDectionListDataSuccess, UpdateTaxFixDeductionData, LoadTaxFixedDectionData, LoadTaxFixedDectionDataSuccess, HideTaxProfile } from './tax-management.actions';
import { ShowToast } from '@nutela/store/shared';
import { ProvisioningUtilService } from 'libs/feature-module-ui/platform/provisioning-ui/src/lib/services';
import { ITaxManagement } from '@nutela/models/compensation/payroll';
import * as constants from '../../../constants';
import { ToastTypes } from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';
import { ITaxPercentageGross } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-pecentage-gross.interface';
import { ITaxStandard } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-standard.interface';
import { IRangePercent } from 'libs/models/compensation/payroll/src/lib/interfaces/range-percent.interface';
import { ITaxFixedDeduction } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-fixedDeduction.interface';
import { ITaxFixedDeductionupdate } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-fixedDeduction-update.interface';
import { ITaxManagementProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-management-profile.interface';

@Injectable()

export class TaxManagementEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<ITaxManagement>, private pUtilService: ProvisioningUtilService) { }


  @Effect()
  loadListTaxManagementData$: Observable<Action> = this.actions$
    .ofType<LoadListTaxManagementData>(TaxManagementActionTypes.LOAD_TAX_MANAGEMENT_LIST_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.TAX_MANAGEMENT_URLs.getTaxManagementData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingTaxManagement());
                return new LoadListTaxManagementDataSuccess(<ITaxManagement[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingTaxManagement());
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
  loadListTaxManagementProfileData$: Observable<Action> = this.actions$
    .ofType<LoadListTaxManagementProfileData>(TaxManagementActionTypes.LOAD_TAX_MANAGEMENT_PROFILE_LIST_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.TAX_MANAGEMENT_URLs.getTaxManagementProfileData}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingTaxManagement());
                return new LoadListTaxManagementProfileDataSuccess(<ITaxManagementProfile[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingTaxManagement());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveTaxManagementProfile>(TaxManagementActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.TAX_MANAGEMENT_URLs.updateTaxManagementProfileData}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingTaxManagement(),
                  // new HideEditorTaxManagementProfile(),
                  new HideTaxProfile(),
                ]);
              } else {
                return from([
                  new NotProcessingTaxManagement(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingTaxManagement(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  loadPercentageGrossData$: Observable<Action> = this.actions$
    .ofType<LoadPercentageGrossData>(TaxManagementActionTypes.LOAD_PERCENTAGE_GROSS_LIST_DATA)
    .pipe(
      // map(action => action.payrollProfileID),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.TAX_MANAGEMENT_URLs.getTaxPercentageGrossData}/${payload.payrollProfileID}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingTaxManagement());
                return new LoadPercentageGrossDataSuccess(<ITaxPercentageGross[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingTaxManagement());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  savePecentGrossData$: Observable<Action> = this.actions$
    .ofType<SavePecentGrossData>(TaxManagementActionTypes.SAVE_PERCENT_GROSS_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.TAX_MANAGEMENT_URLs.updatePercentGrossData}/${payload.paygroup_id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingTaxManagement(),
                  new HidePercentGrossEditor(),
                  new LoadPercentageGrossData(payload.payrollProfileID)
                ]);
              } else {
                return from([
                  new NotProcessingTaxManagement(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingTaxManagement(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  loadTaxStandardData$: Observable<Action> = this.actions$
    .ofType<LoadTaxStandardData>(TaxManagementActionTypes.LOAD_TAX_STANDARD_LIST_DATA)
    .pipe(
      switchMap(payload => {
        return this.apiService
          .read(`${constants.TAX_MANAGEMENT_URLs.getTaxStandard}/${payload.payrollProfileID}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingTaxManagement());
                return new LoadTaxStandardDataSuccess(<ITaxStandard[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingTaxManagement());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  saveTaxStandardData$: Observable<Action> = this.actions$
    .ofType<SaveTaxStandardData>(TaxManagementActionTypes.SAVE_TAX_STANDARD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.TAX_MANAGEMENT_URLs.saveTaxStandard}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingTaxManagement(),
                  new HideTaxStandardEditor(),
                  new LoadTaxStandardData(payload.payrollProfileID)
                ]);
              } else {
                return from([
                  new NotProcessingTaxManagement(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingTaxManagement(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateTaxStandardData$: Observable<Action> = this.actions$
    .ofType<UpdateTaxStandardData>(TaxManagementActionTypes.UPDATE_TAX_STANDARD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.TAX_MANAGEMENT_URLs.updateTaxStandard}/${payload.taxdetail_id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was update successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingTaxManagement(),
                  new HideTaxStandardEditor(),
                  new LoadTaxStandardData(payload.payrollProfileID)
                ]);
              } else {
                return from([
                  new NotProcessingTaxManagement(),
                  new ShowToast({ title: 'Data Could Not Be Updated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be updated.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingTaxManagement(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteTaxStandard$: Observable<Action> = this.actions$
    .ofType<DeleteTaxStandard>(TaxManagementActionTypes.DELETE_TAX_STANDARD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.TAX_MANAGEMENT_URLs.deleteTaxStandard}/${payload.taxdetail_id}`)
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
  loadRangePercentData$: Observable<Action> = this.actions$
    .ofType<LoadRangePercentData>(TaxManagementActionTypes.LOAD_RANGE_PERCENT_LIST_DATA)
    .pipe(
      switchMap(payload => {
        return this.apiService
          .read(`${constants.TAX_MANAGEMENT_URLs.getRangePercent}/${payload.payrollProfileID}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingTaxManagement());
                return new LoadRangePercentDataSuccess(<IRangePercent[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingTaxManagement());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  deleteRangePercent$: Observable<Action> = this.actions$
    .ofType<DeleteRangePercent>(TaxManagementActionTypes.DELETE_RANGE_PERCENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.TAX_MANAGEMENT_URLs.deleteRangePercent}/${payload.taxchart_id}`)
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
  saveRangePercentdData$: Observable<Action> = this.actions$
    .ofType<SaveRangePercentdData>(TaxManagementActionTypes.SAVE_RANGE_PERCENT_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.TAX_MANAGEMENT_URLs.saveRangePercent}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingTaxManagement(),
                  new HideRangePercentEditor(),
                  new LoadRangePercentData(payload.data.payroll_profile_id)
                ]);
              } else {
                return from([
                  new NotProcessingTaxManagement(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingTaxManagement(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateRangePercentData$: Observable<Action> = this.actions$
    .ofType<UpdateRangePercentData>(TaxManagementActionTypes.UPDATE_TAX_RANGE_PERCENT_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.TAX_MANAGEMENT_URLs.updateRangePercent}/${payload.data.taxchart_id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was update successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingTaxManagement(),
                  new HideRangePercentEditor(),
                  new LoadRangePercentData(payload.data.payroll_profile_id)
                ]);
              } else {
                return from([
                  new NotProcessingTaxManagement(),
                  new ShowToast({ title: 'Data Could Not Be Updated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be updated.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingTaxManagement(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  //Range Value
  @Effect()
  loadRangeValueData$: Observable<Action> = this.actions$
    .ofType<LoadRangeValueData>(TaxManagementActionTypes.LOAD_RANGE_VALUE_LIST_DATA)
    .pipe(
      switchMap(payload => {
        return this.apiService
          .read(`${constants.TAX_MANAGEMENT_URLs.getRangeValue}/${payload.payrollProfileID}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingTaxManagement());
                return new LoadRangeValueDataSuccess(<IRangePercent[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingTaxManagement());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  deleteRangeValue$: Observable<Action> = this.actions$
    .ofType<DeleteRangeValue>(TaxManagementActionTypes.DELETE_RANGE_VALUE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.TAX_MANAGEMENT_URLs.deleteRangeValue}/${payload.taxchart_id}`)
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
  saveRangeValueData$: Observable<Action> = this.actions$
    .ofType<SaveRangeValueData>(TaxManagementActionTypes.SAVE_RANGE_VALUE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.TAX_MANAGEMENT_URLs.saveRangeValue}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingTaxManagement(),
                  new HideRangeValueEditor(),
                  new LoadRangeValueData(payload.data.payroll_profile_id)
                ]);
              } else {
                return from([
                  new NotProcessingTaxManagement(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingTaxManagement(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateRangeValueData$: Observable<Action> = this.actions$
    .ofType<UpdateRangeValueData>(TaxManagementActionTypes.UPDATE_TAX_RANGE_VALUE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.TAX_MANAGEMENT_URLs.updateRangeValue}/${payload.data.taxchart_id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was update successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingTaxManagement(),
                  new HideRangeValueEditor(),
                  new LoadRangeValueData(payload.data.payroll_profile_id)
                ]);
              } else {
                return from([
                  new NotProcessingTaxManagement(),
                  new ShowToast({ title: 'Data Could Not Be Updated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be updated.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingTaxManagement(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

    @Effect()
    loadTaxFixedDectionListData$: Observable<Action> = this.actions$
    .ofType<LoadTaxFixedDectionListData>(TaxManagementActionTypes.LOAD_TAX_FIXED_DEDUCTION_LIST_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.TAX_MANAGEMENT_URLs.getTaxFixedDeductionListData}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingTaxManagement());
                return new LoadTaxFixedDectionListDataSuccess(<ITaxFixedDeduction[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingTaxManagement());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

    @Effect()
    updateTaxFixDeductionData$: Observable<Action> = this.actions$
    .ofType<UpdateTaxFixDeductionData>(TaxManagementActionTypes.UPDATE_TAX_FIXED_DEDUCTION_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.TAX_MANAGEMENT_URLs.updateTaxFixDeduction}/${payload.data.payroll_profile_id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was update successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingTaxManagement()
                  // new HideFixedDeduction()
                ]);
              } else {
                return from([
                  new NotProcessingTaxManagement(),
                  new ShowToast({ title: 'Data Could Not Be Updated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be updated.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingTaxManagement(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

    @Effect()
    loadTaxFixedDectionData$: Observable<Action> = this.actions$
    .ofType<LoadTaxFixedDectionData>(TaxManagementActionTypes.LOAD_TAX_FIXED_DEDUCTION_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.TAX_MANAGEMENT_URLs.getTaxFixedDeductionData}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingTaxManagement());
                return new LoadTaxFixedDectionDataSuccess(<ITaxFixedDeductionupdate[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingTaxManagement());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

}

