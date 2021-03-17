import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import { HideEditorRelief,LoadingRelief, ShowEditorRelief, NotProcessingRelief, LoadReliefData, ReliefActionTypes, LoadReliefDataSuccess, NotLoadingRelief, LoadReliefProfileData, LoadReliefProfileDataSuccess, SaveReliedProfileData, HideAddEditorRelief, LoadStatutoeyReliefData, LoadStatutoeyReliefDataSuccess, LoadReliefTypeData, LoadReliefTypeDataSuccess, LoadReliefCurrencyData, LoadReliefCurrencyDataSuccess, LoadGetReliefProfileData, LoadGetReliefProfileDataSuccess, LoadUseRuleData, LoadUseRuleDataSuccess, SaveReliefGlobalData, HideConfigEditorRelief, LoadReliefGradeData, LoadReliefGradeDataSuccess, SaveReliefGradesData, HideGradeEditorRelief, GetReliefGradeData, GetReliefGradeDataSuccess, UpdateReliedProfileData, DeleteRelief, LoadReliefPayGroupData, LoadReliefPayGroupDataSuccess, GetPayGroupData, GetPayGroupDataSuccess, SaveReliefPayGroupData, HidePayGroupEditorRelief, SaveReliefEmployeeData, HideEmployeeEditorRelief, LoadEmployeeData, LoadEmployeeDataSuccess, GetEmployeeData, GetEmployeeDataSuccess, LoadFixedDeductionData, LoadFixedDeductionDataSuccess, UpdateFixedDeductionData, HideFixedDeductionRelief, SavePayGroupData, SaveEmployeeData, SaveGradesData, LoadReliefGradeListData, LoadReliefGradeListDataSuccess, LoadReliefPayGroupListData, LoadReliefPayGroupListDataSuccess, LoadReliefEmployeeListData, LoadReliefEmployeeListDataSuccess, DeleteEmployeeRelief, DeletePaygroupRelief, DeleteGradeRelief} from './reliefs.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ProvisioningUtilService } from 'libs/feature-module-ui/platform/provisioning-ui/src/lib/services';
import { ToastTypes } from '@nutela/shared/app-global';
import { IRootState } from '../../../root/root.state';
import {  IEmployee, IGradeRelief, IReliefsList, IStaturoryRelief, ITaxRuleRelief, IUseRuleRelief } from '@nutela/models/compensation/payroll';
import { IReliefProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-profile.interface';
import { IReliefCurrency } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-currency.interface';
import { IFixedDeductionRelief } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-fixedDeduction.interface';
import { IReliefGrade } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-grade.interface';
import { IReliefPayGroup } from 'libs/models/compensation/payroll/src/lib/interfaces/relief.paygroupList.interface';
import { IReliefEmployeeData } from 'libs/models/compensation/payroll/src/lib/interfaces/relief-employeeData.interface';

@Injectable()
export class ReliefEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>, private pUtilService: ProvisioningUtilService) { }

  @Effect()
  loadReliefData$: Observable<Action> = this.actions$
    .ofType<LoadReliefData>(ReliefActionTypes.LOAD_RELIEF_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.RELIEFS_URLs.relief}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingRelief());
                return new LoadReliefDataSuccess(<IReliefsList[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingRelief());
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

  // Get Employee wise Payroll Profile
  @Effect()
  loadReliefProfileData$: Observable<Action> = this.actions$
    .ofType<LoadReliefProfileData>(ReliefActionTypes.LOAD_RELIEF_PROFILE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.RELIEFS_URLs.reliefProfile}/${payload.payload.payroll_profileID}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingRelief());
                return new LoadReliefProfileDataSuccess(<IReliefProfile[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingRelief());
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

  // Get Statutoey Relief data
  @Effect()
  loadStatutoeyReliefData$: Observable<Action> = this.actions$
    .ofType<LoadStatutoeyReliefData>(ReliefActionTypes.LOAD_STATUTORY_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.RELIEFS_URLs.getStatutoryData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingRelief());
                return new LoadStatutoeyReliefDataSuccess(<IStaturoryRelief[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingRelief());
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

  // Get Rel Relief data
  // @Effect()
  // loadReliefTypeData$: Observable<Action> = this.actions$
  //   .ofType<LoadReliefTypeData>(ReliefActionTypes.LOAD_RELIEF_TYPE_DATA)
  //   .pipe(
  //     switchMap((payload) => {
  //       const url = `${constants.RELIEFS_URLs.getReliefTypeData}`;
  //       return this.apiService
  //         .read(url)
  //         .pipe(
  //           map((data: any) => {
  //             if (data.Success) {
  //               this.store.dispatch(new NotLoadingRelief());
  //               return new LoadReliefTypeDataSuccess(<ITaxRuleRelief[]>(
  //                 data.Results
  //               ));
  //             } else {
  //               this.store.dispatch(new NotLoadingRelief());
  //               return new ShowToast({
  //                 title: 'Data Item Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data Could Not Be Loaded.`, type: ToastTypes.ERROR
  //               });
  //             }
  //           }),
  //           catchError((error: any) =>
  //             of(
  //               new ShowToast({
  //                 title: 'Data Item Could Not Be Loaded',
  //                 message:
  //                   'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR
  //               })
  //             )
  //           )
  //         );
  //     })
  //   );

    // Get Relief currency data
  // @Effect()
  // loadReliefCurrencyData$: Observable<Action> = this.actions$
  //   .ofType<LoadReliefCurrencyData>(ReliefActionTypes.LOAD_RELIEF_CURRENCY_DATA)
  //   .pipe(
  //     switchMap((payload) => {
  //       const url = `${constants.RELIEFS_URLs.getReliefCurrencyData}`;
  //       return this.apiService
  //         .read(url)
  //         .pipe(
  //           map((data: any) => {
  //             if (data.Success) {
  //               this.store.dispatch(new NotLoadingRelief());
  //               return new LoadReliefCurrencyDataSuccess(<IReliefCurrency[]>(
  //                 data.Results
  //               ));
  //             } else {
  //               this.store.dispatch(new NotLoadingRelief());
  //               return new ShowToast({
  //                 title: 'Data Item Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data Could Not Be Loaded.`, type: ToastTypes.ERROR
  //               });
  //             }
  //           }),
  //           catchError((error: any) =>
  //             of(
  //               new ShowToast({
  //                 title: 'Data Item Could Not Be Loaded',
  //                 message:
  //                   'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR
  //               })
  //             )
  //           )
  //         );
  //     })
  //   );

    // Save Payroll Profile
  //   @Effect()
  //   saveReliedProfileData$: Observable<Action> = this.actions$
  //   .ofType<SaveReliedProfileData>(ReliefActionTypes.SAVE_RELIEF_PROFILE_DATA)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(payload => {
  //       return this.apiService
  //         .create(`${constants.RELIEFS_URLs.saveReliefProfile}`, payload.data)
  //         .pipe(
  //           switchMap((data: IApiResult) => {
  //             if (data.Success) {
                
  //               return from([
  //                 new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
  //                 new NotProcessingRelief(),
  //                 new HideAddEditorRelief(),
  //                 new LoadReliefProfileData({ payroll_profileID: payload.data.payroll_profile_id } )
  //               ]);
  //             } else {
  //               return from([
  //                 new NotProcessingRelief(),
  //                 new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
  //               ]);
  //             }
  //           }),
  //           catchError((error: any) =>
  //             from([
  //               new NotProcessingRelief(),
  //               new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
  //             ])
  //           )
  //         );
  //     })
  // );

  // @Effect()
  // loadGetReliefProfileData$: Observable<Action> = this.actions$
  //   .ofType<LoadGetReliefProfileData>(ReliefActionTypes.LOAD_GET_RELIEF_PROFILE_DATA)
  //   .pipe(
  //     switchMap((payload) => {
  //       const url = `${constants.EXCLUSION_TRANSACTION_URLs.getexclusionTransactionData}/${payload.id}`;
  //       return this.apiService
  //         .read(url)
  //         .pipe(
  //           map((data: any) => {
  //             if (data.Success) {
  //               this.store.dispatch(new NotLoadingRelief());
  //               return new LoadGetReliefProfileDataSuccess((
  //                 data.Results[0]
  //               ));
  //             } else {
  //               this.store.dispatch(new NotLoadingRelief());
  //               return new ShowToast({
  //                 title: 'Data Item Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data Could Not Be Loaded.`, type: ToastTypes.ERROR
  //               });
  //             }
  //           }),
  //           catchError((error: any) =>
  //             of(
  //               new ShowToast({
  //                 title: 'Data Item Could Not Be Loaded',
  //                 message:
  //                   'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR
  //               })
  //             )
  //           )
  //         );
  //     })
  //   );

    @Effect()
  loadUseRuleData$: Observable<Action> = this.actions$
    .ofType<LoadUseRuleData>(ReliefActionTypes.LOAD_USE_RULE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.RELIEFS_URLs.getUseRuleData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingRelief());
                return new LoadUseRuleDataSuccess(<IUseRuleRelief[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingRelief());
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
    saveReliefGlobalData$: Observable<Action> = this.actions$
    .ofType<SaveReliefGlobalData>(ReliefActionTypes.SAVE_RELIEF_GLOBAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.RELIEFS_URLs.updateReliefGlobalData}/${payload.data.relief_id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was update successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingRelief(),
                  new HideGradeEditorRelief(),
                  new LoadGetReliefProfileData(payload.data.relief_id)
                ]);
              } else {
                return from([
                  new NotProcessingRelief(),
                  new ShowToast({ title: 'Data Could Not Be Updated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be updated.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRelief(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
  );

  @Effect()
  loadReliefGradeData$: Observable<Action> = this.actions$
    .ofType<LoadReliefGradeData>(ReliefActionTypes.LOAD_RELIEF_GRADE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.RELIEFS_URLs.reliefGradeData}/${payload.relief_id}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              
              if (data.Success) {
                this.store.dispatch(new NotLoadingRelief());
                return new LoadReliefGradeDataSuccess(<IGradeRelief[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingRelief());
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
    saveReliefGradesData$: Observable<Action> = this.actions$
    .ofType<SaveReliefGradesData>(ReliefActionTypes.SAVE_GRADES_GLOBAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.RELIEFS_URLs.updateReliefGradesData}/${payload.id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingRelief(),
                  new HideGradeEditorRelief(),
                  new LoadReliefGradeData(payload.data.relief_id)
                ]);
              } else {
                return from([
                  new NotProcessingRelief(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRelief(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
  );

  @Effect()
  getReliefGradeData$: Observable<Action> = this.actions$
    .ofType<GetReliefGradeData>(ReliefActionTypes.GET_RELIEF_GRADE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.RELIEFS_URLs.getReliefGradesData}/${payload.reliefdet_id}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingRelief());
                return new GetReliefGradeDataSuccess(<IGradeRelief>(
                  data.Results[0]
                ));
              } else {
                this.store.dispatch(new NotLoadingRelief());
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

    // Get Rel Relief data
  @Effect()
  loadReliefTypeData$: Observable<Action> = this.actions$
    .ofType<LoadReliefTypeData>(ReliefActionTypes.LOAD_RELIEF_TYPE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.RELIEFS_URLs.getReliefTypeData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingRelief());
                return new LoadReliefTypeDataSuccess(<ITaxRuleRelief[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingRelief());
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

  // Get Relief currency data
  @Effect()
  loadReliefCurrencyData$: Observable<Action> = this.actions$
    .ofType<LoadReliefCurrencyData>(ReliefActionTypes.LOAD_RELIEF_CURRENCY_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.RELIEFS_URLs.getReliefCurrencyData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingRelief());
                return new LoadReliefCurrencyDataSuccess(<IReliefCurrency[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingRelief());
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

  // Save Payroll Profile
  @Effect()
  saveReliedProfileData$: Observable<Action> = this.actions$
    .ofType<SaveReliedProfileData>(ReliefActionTypes.SAVE_RELIEF_PROFILE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.RELIEFS_URLs.saveReliefProfile}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {

                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingRelief(),
                  new HideAddEditorRelief(),
                  new LoadReliefProfileData({ payroll_profileID: payload.data.payroll_profile_id })
                ]);
              } else {
                return from([
                  new NotProcessingRelief(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRelief(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  loadGetReliefProfileData$: Observable<Action> = this.actions$
    .ofType<LoadGetReliefProfileData>(ReliefActionTypes.LOAD_GET_RELIEF_PROFILE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.RELIEFS_URLs.getReliefProfileData}/${payload.id}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingRelief());
                return new LoadGetReliefProfileDataSuccess(<any>(
                  data.Results[0]
                ));
              } else {
                this.store.dispatch(new NotLoadingRelief());
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
  deleteRelief$: Observable<Action> = this.actions$
    .ofType<DeleteRelief>(ReliefActionTypes.DELETE_RELIEF_PROFILE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.RELIEFS_URLs.deleteRelief}/${payload.relief_id}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new NotLoadingRelief(),
                  new LoadReliefProfileData({ payroll_profileID: payload.payroll_profile_id })
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR }),
                  new NotLoadingRelief()
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotLoadingRelief(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateReliedProfileData$: Observable<Action> = this.actions$
    .ofType<UpdateReliedProfileData>(ReliefActionTypes.UPDATE_RELIEF_PROFILE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.RELIEFS_URLs.updateReliefProfile}/${payload.id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingRelief(),
                  new HideAddEditorRelief(),
                  new LoadReliefProfileData({ payroll_profileID: payload.data.payroll_profile_id })
                ]);
              } else {
                return from([
                  new NotProcessingRelief(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRelief(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

    @Effect()
    LoadReliefPayGroupData$: Observable<Action> = this.actions$
      .ofType<LoadReliefPayGroupData>(ReliefActionTypes.LOAD_PAY_GROUP_DATA)
      .pipe(
        switchMap((payload) => {
          const url = `${constants.RELIEFS_URLs.payGroupGradeData}/${payload.relief_id}`;
          return this.apiService
            .read(url)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  this.store.dispatch(new NotLoadingRelief());
                  return new LoadReliefPayGroupDataSuccess(<IGradeRelief[]>(
                    data.Results
                  ));
                } else {
                  this.store.dispatch(new NotLoadingRelief());
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
  getPayGroupData$: Observable<Action> = this.actions$
    .ofType<GetPayGroupData>(ReliefActionTypes.GET_PAYGROUP_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.RELIEFS_URLs.getPayGroupData}/${payload.reliefdet_id}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingRelief());
                return new GetPayGroupDataSuccess(<IGradeRelief>(
                  data.Results[0]
                ));
              } else {
                this.store.dispatch(new NotLoadingRelief());
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
    saveReliefPayGroupData$: Observable<Action> = this.actions$
    .ofType<SaveReliefPayGroupData>(ReliefActionTypes.SAVE_PAY_GROUP_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.RELIEFS_URLs.updateReliefPayGroupData}/${payload.id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingRelief(),
                  new HidePayGroupEditorRelief(),
                  new LoadReliefPayGroupData(payload.data.relief_id)
                ]);
              } else {
                return from([
                  new NotProcessingRelief(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRelief(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
  );

  @Effect()
  loadEmployeeData$: Observable<Action> = this.actions$
      .ofType<LoadEmployeeData>(ReliefActionTypes.LOAD_EMPLOYEE_DATA)
      .pipe(
        switchMap((payload) => {
          const url = `${constants.RELIEFS_URLs.employeeData}/${payload.relief_id}`;
          return this.apiService
            .read(url)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  this.store.dispatch(new NotLoadingRelief());
                  return new LoadEmployeeDataSuccess(<IEmployee[]>(
                    data.Results
                  ));
                } else {
                  this.store.dispatch(new NotLoadingRelief());
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
  saveReliefEmployeeData$: Observable<Action> = this.actions$
    .ofType<SaveReliefEmployeeData>(ReliefActionTypes.SAVE_EMPLOYEE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.RELIEFS_URLs.updateReliefEmployeeData}/${payload.id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingRelief(),
                  new HideEmployeeEditorRelief(),
                  new LoadEmployeeData(payload.data.relief_id)
                ]);
              } else {
                return from([
                  new NotProcessingRelief(),
                  new ShowToast({ title: 'Data Could Not Be Updated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be updated.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRelief(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
  );

  @Effect()
  getEmployeeData$: Observable<Action> = this.actions$
    .ofType<GetEmployeeData>(ReliefActionTypes.GET_EMPLOYEE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.RELIEFS_URLs.getEmployeeData}/${payload.reliefdet_id}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingRelief());
                return new GetEmployeeDataSuccess(<IEmployee>(
                  data.Results[0]
                ));
              } else {
                this.store.dispatch(new NotLoadingRelief());
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
    loadFixedDeductionData$: Observable<Action> = this.actions$
    .ofType<LoadFixedDeductionData>(ReliefActionTypes.LOAD_FIXED_DEDUCTION_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.RELIEFS_URLs.getFixedDeductionData}/${payload.payroll_profile_id}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingRelief());
                return new LoadFixedDeductionDataSuccess(<IFixedDeductionRelief[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingRelief());
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
    updateFixedDeductionData$: Observable<Action> = this.actions$
    .ofType<UpdateFixedDeductionData>(ReliefActionTypes.UPDATE_FIXED_DEDUCTION_RELIEF_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.RELIEFS_URLs.updateFixedDeductionData}/${payload.data.relief_id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was update successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingRelief(),
                  new HideFixedDeductionRelief()
                  // new LoadGetReliefProfileData(payload.payroll_profileID)
                ]);
              } else {
                return from([
                  new NotProcessingRelief(),
                  new ShowToast({ title: 'Data Could Not Be Updated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be updated.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRelief(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
  );

  @Effect()
  savePayGroupData$: Observable<Action> = this.actions$
    .ofType<SavePayGroupData>(ReliefActionTypes.SAVE_RELIEF_PAYROLL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.RELIEFS_URLs.saveReliefPayroll}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {

                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingRelief(),
                  new HidePayGroupEditorRelief(),
                  new LoadReliefPayGroupData(payload.data.relief_id)
                ]);
              } else {
                return from([
                  new NotProcessingRelief(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRelief(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

    @Effect()
    saveEmployeeData$: Observable<Action> = this.actions$
    .ofType<SaveEmployeeData>(ReliefActionTypes.SAVE_RELIEF_EMPLOYEE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.RELIEFS_URLs.saveReliefEmployeeData}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {

                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingRelief(),
                  new HideEmployeeEditorRelief(),
                  new LoadEmployeeData(payload.data.relief_id)
                ]);
              } else {
                return from([
                  new NotProcessingRelief(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRelief(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

    @Effect()
    saveGradesData$: Observable<Action> = this.actions$
    .ofType<SaveGradesData>(ReliefActionTypes.SAVE_GRADES_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.RELIEFS_URLs.saveReliefGradeData}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {

                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingRelief(),
                  new HideGradeEditorRelief(),
                  new LoadReliefGradeData(payload.data.relief_id)
                ]);
              } else {
                return from([
                  new NotProcessingRelief(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRelief(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

    @Effect()
    loadReliefGradeListData$: Observable<Action> = this.actions$
    .ofType<LoadReliefGradeListData>(ReliefActionTypes.LOAD_RELIEF_GRADE_LIST_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.RELIEFS_URLs.getReliefGradeListData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingRelief());
                return new LoadReliefGradeListDataSuccess(<IReliefGrade[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingRelief());
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
    loadReliefPayGroupListData$: Observable<Action> = this.actions$
    .ofType<LoadReliefPayGroupListData>(ReliefActionTypes.LOAD_RELIEF_PAYGROUP_LIST_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.RELIEFS_URLs.getReliefPayGroupListData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingRelief());
                return new LoadReliefPayGroupListDataSuccess(<IReliefPayGroup[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingRelief());
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
    loadReliefEmployeeListData$: Observable<Action> = this.actions$
    .ofType<LoadReliefEmployeeListData>(ReliefActionTypes.LOAD_RELIEF_EMPLOYEE_LIST_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.RELIEFS_URLs.getReliefEmployeeListData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingRelief());
                return new LoadReliefEmployeeListDataSuccess(<IReliefEmployeeData[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingRelief());
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
    deleteEmployeeRelief$: Observable<Action> = this.actions$
    .ofType<DeleteEmployeeRelief>(ReliefActionTypes.DELETE_EMPLOYEE_RELIEF_CONFIGURE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log(`${constants.RELIEFS_URLs.deleteReliefEmployee}/${payload.reliefdet_id}`);
        return this.apiService
        .update(`${constants.RELIEFS_URLs.deleteReliefEmployee}/${payload.reliefdet_id}`, null)
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
    deletePaygroupRelief$: Observable<Action> = this.actions$
    .ofType<DeletePaygroupRelief>(ReliefActionTypes.DELETE_PAYGROUP_RELIEF_CONFIGURE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
        .update(`${constants.RELIEFS_URLs.deleteReliefPayGroup}/${payload.reliefdet_id}`, null)
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
    deleteGradeRelief$: Observable<Action> = this.actions$
    .ofType<DeleteGradeRelief>(ReliefActionTypes.DELETE_GRADE_RELIEF_CONFIGURE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
        .update(`${constants.RELIEFS_URLs.deleteReliefGrade}/${payload.reliefdet_id}`, null)
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
    
}

