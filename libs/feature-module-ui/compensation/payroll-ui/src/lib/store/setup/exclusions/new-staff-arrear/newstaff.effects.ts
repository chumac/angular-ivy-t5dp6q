import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../../constants';
import { ApiService, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {  StaffActionTypes,HideEditorStaff,NotLoadingStaff,LoadListEmployeeData,LoadListEmployeeDataSuccess,LoadEmployeeGroupSelectOptionData,LoadEmployeeGroupSelectOptionDataSuccess, LoadEmployeePayrollProfileData, LoadEmployeePayrollProfileDataSuccess, SavePayrollProfileData, ShowEditorStaff, NotProcessingStaff, LoadCanProfileData, LoadCanProfileDataSuccess, LoadCanRemoveData} from './newstaff.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ProvisioningUtilService } from 'libs/feature-module-ui/platform/provisioning-ui/src/lib/services';
import { ToastTypes } from '@nutela/shared/app-global';
import { IRootState } from '../../../root/root.state';
import { IGetPayrollProfile, IstaffEmployeeList, IstaffEmployeePayrollProfile } from '@nutela/models/compensation/payroll';

@Injectable()
export class StaffEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>, private pUtilService: ProvisioningUtilService) { }

  // @Effect()
  // loadPayrollProfileData$: Observable<Action> = this.actions$
  //   .ofType<LoadStaffEmployeeData>(StaffActionTypes.LOAD_STAFF_EMPLOYEE_DATA)
  //   .pipe(
  //     switchMap(() => {
  //       const url = `${constants.NEWSTAFF_URLs.getAllEmployee}`;
  //       return this.apiService
  //         .read(url)
  //         .pipe(
  //           map((data: any) => {
  //             if (data.Success) {
  //               this.store.dispatch(new NotLoadingPayrollRun());
  //               return new LoadNewStaffEmployeeSuccess(<INewstaffEmployee[]>(
  //                 data.Results
  //               ));
  //             } else {
  //               this.store.dispatch(new NotLoadingPayrollRun());
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

  // @Effect()
  // loadPossibleReturnsData$: Observable<Action> = this.actions$
  //   .ofType<LoadPossibleReturnsData>(StaffActionTypes.LOAD_POSSIBLE_RETURNS_DATA)
  //     .pipe(
  //       map(action => action.payload),
  //     switchMap((payload) => {
  //       const url = `${constants.EXECUTION_URLs.possibleReturns}/${payload.payrollProfileID}/${payload.payrollDate}`;
  //       return this.apiService
  //         .read(url)
  //         .pipe(
  //           map((data: any) => {
  //             if (data.Success) {
  //               const transformed = this.utilService.transformToSelectDataList(data.Results, 'backup_session_description', 'backup_session_description')
  //               this.store.dispatch(new NotLoadingPayrollRun());
  //               return new LoadPossibleReturnsDataSuccess(<any[]>(
  //                 transformed
  //               ));
  //             } else {
  //               this.store.dispatch(new NotLoadingPayrollRun());
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

  //New Staff Employee List 
  @Effect()
  loadListEmployeeData$: Observable<Action> = this.actions$
    .ofType<LoadListEmployeeData>(StaffActionTypes.LOAD_EMPLOYEE_LIST_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.NEWSTAFF_URLs.getAllEmployee}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingStaff());
                return new LoadListEmployeeDataSuccess(<IstaffEmployeeList[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingStaff());
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


  // @Effect()
  // loadEmployeeGroupSelectOptionData$: Observable<Action> = this.actions$
  //   .ofType<LoadEmployeeGroupSelectOptionData>(StaffActionTypes.LOAD_EMPLOYEE_GROUP_SELECT_OPTION_DATA)
  //   .pipe(
  //     switchMap(() => {
  //       const url = `${constants.NEWSTAFF_URLs.getAllEmployee}`;
  //       return this.apiService
  //         .read(url)
  //         .pipe(
  //           map((data: any) => {
  //             if (data.Success) {
  //               const transformed = this.utilService.transformToSelectDataList(data.Results, 'employee_id', 'employee_firstname')
  //               this.store.dispatch(new NotLoadingStaff());
  //               return new LoadEmployeeGroupSelectOptionDataSuccess({
  //                 data: <INewstaffEmployee[]>data.Results,
  //                 staffTypesSelect: transformed
  //               });
  //               // return new LoadEmployeeGroupSelectOptionDataSuccess(<INewstaffEmployee[]>(
  //               //   transformed
  //               // ));
  //             } else {
  //               this.store.dispatch(new NotLoadingStaff());
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

  // @Effect()
  // loadPayGradeData$: Observable<Action> = this.actions$
  //   .ofType<LoadPayGradeSelectOptionData>(StaffActionTypes.LOAD_PAY_GRADE_SELECT_OPTION_DATA)
  //   .pipe(
  //     switchMap(() => {
  //       const url = `${constants.EXECUTION_URLs.grade}`;
  //       return this.apiService
  //         .read(url)
  //         .pipe(
  //           map((data: any) => {
  //             if (data.Success) {
  //               this.store.dispatch(new NotLoadingPayrollRun());
  //               return new LoadPayGradeSelectOptionDataSuccess(<any[]>(
  //                 data.Results
  //               ));
  //             } else {
  //               this.store.dispatch(new NotLoadingPayrollRun());
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
// Added by  Akash Desai // dropdown
  @Effect()
  loadEmployeeGroupSelectOptionData$: Observable<Action> = this.actions$
    .ofType<LoadEmployeeGroupSelectOptionData>(StaffActionTypes.LOAD_EMPLOYEE_GROUP_SELECT_OPTION_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.NEWSTAFF_URLs.staffEmployee}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'employee_id', 'employee_firstname')
                this.store.dispatch(new NotLoadingStaff());
                return new LoadEmployeeGroupSelectOptionDataSuccess(<ISelectOption[]>(
                  transformed
                ));
              } else {
                this.store.dispatch(new NotLoadingStaff());
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

  // @Effect()
  // loadcanRunData$: Observable<Action> = this.actions$
  //     .ofType<LoadCanRunData>(StaffActionTypes.LOAD_CAN_RUN_DATA)
  //     .pipe(
  //       map(action => action.payload),
  //     switchMap((payload) => {
  //       const url = `${constants.EXECUTION_URLs.canRun}/${payload.payrollDate}?payrollProfileID=${payload.payrollProfileId}`;
  //       return this.apiService
  //         .read(url)
  //         .pipe(
  //           map((data: any) => {
  //             if (data.Success) {
  //               this.store.dispatch(new NotLoadingPayrollRun());
  //               return new LoadCanRunDataSuccess(<any[]>(
  //                 data.Success
  //               ));
  //             } else {
  //               this.store.dispatch(new NotLoadingPayrollRun());
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

  // Get Employee wise Payroll Profile
  @Effect()
  loadEmployeePayrollProfileData$: Observable<Action> = this.actions$
    .ofType<LoadEmployeePayrollProfileData>(StaffActionTypes.LOAD_EMPLOYEE_PAYROLL_PROFILE_DATA)
    .pipe(
      switchMap((payload) => {
        const url = `${constants.NEWSTAFF_URLs.getEmployeePayrollProfile}/${payload.payload.employee_id}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingStaff());
                return new LoadEmployeePayrollProfileDataSuccess(<IstaffEmployeePayrollProfile[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingStaff());
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
  savePayrollProfileData$: Observable<Action> = this.actions$
    .ofType<SavePayrollProfileData>(StaffActionTypes.SAVE_PAYROLL_PROFILE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.NEWSTAFF_URLs.savePayrollProfile}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingStaff(),
                  new HideEditorStaff(),
                  new LoadListEmployeeData()
                ]);
              } else {
                return from([
                  new NotProcessingStaff(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingStaff(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
  );
// Load Employee Profile Data
  @Effect()
  loadCanProfileData$: Observable<Action> = this.actions$
      .ofType<LoadCanProfileData>(StaffActionTypes.LOAD_CAN_PROFILE_DATA)
      .pipe(
        map(action => action.payload),
      switchMap((payload) => {
        const url = `${constants.NEWSTAFF_URLs.loadPayrollProfile}/${payload.employeeID}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotProcessingStaff());
                return new LoadCanProfileDataSuccess(<IGetPayrollProfile[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotProcessingStaff());
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

  // Remove Employee
  @Effect()
    loadCanRemoveData$: Observable<Action> = this.actions$
        .ofType<LoadCanRemoveData>(StaffActionTypes.LOAD_CAN_REMOVE_DATA)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .update(`${constants.NEWSTAFF_URLs.removePayrollProfile}/${payload.employee_id}`, null)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                    new NotLoadingStaff(),
                    new LoadListEmployeeData()
                  ]);
                } else {
                  return from([
                    new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR }),
                    new NotLoadingStaff()
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotLoadingStaff(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
                ])
              )
            );
        })
    );


  // @Effect()
  // savePayrollRun$: Observable<Action> = this.actions$
  //   .ofType<SavePayrollRunData>(StaffActionTypes.SAVE_PAYROLL_RUN_DATA)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(payload => {
  //       return this.apiService
  //         .create(`${constants.EXECUTION_URLs.run}`, payload.data)
  //         .pipe(
  //           switchMap((data: IApiResult) => {
  //             if (data.Success) {
  //               return from([
  //                 new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
  //                 new NotProcessingPayrollRun(),
  //                 new HideEditorStaff(),
  //                 new LoadStaffEmployeeData()
  //               ]);
  //             } else {
  //               return from([
  //                 new NotProcessingPayrollRun(),
  //                 new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
  //               ]);
  //             }
  //           }),
  //           catchError((error: any) =>
  //             from([
  //               new NotProcessingPayrollRun(),
  //               new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
  //             ])
  //           )
  //         );
  //     })
  // );


  // @Effect()
  // recoverLastRun$: Observable<Action> = this.actions$
  //     .ofType<RecoverPayrollRun>(StaffActionTypes.RECOVER_PAYROLL_RUN_DATA)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(payload => {
  //       return this.apiService
  //         .create(`${constants.EXECUTION_URLs.recover}/${payload.payrollProfileID}`, payload.data)
  //         .pipe(
  //           switchMap((data: IApiResult) => {
  //             if (data.Success) {
  //               return from([
  //                 new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
  //                 new NotProcessingPayrollRun(),
  //                 new HideRecoverEditorPayrollRun(),
  //                 new LoadStaffEmployeeData()
  //               ]);
  //             } else {
  //               return from([
  //                 new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR }),
  //                 new NotProcessingPayrollRun()
  //               ]);
  //             }
  //           }),
  //           catchError((error: any) =>
  //             from([
  //               new NotProcessingPayrollRun(),
  //               new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
  //             ])
  //           )
  //         );
  //     })
  //   );

}

