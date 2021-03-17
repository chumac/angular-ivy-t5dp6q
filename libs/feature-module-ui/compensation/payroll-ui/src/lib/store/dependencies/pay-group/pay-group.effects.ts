import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  PayGroupActionTypes,
  LoadPayGroupData,
  LoadPayGroupSuccess,
  NotProcessingPayGroup,
  HideEditorPayGroup,
  SavePayGroup,
  UpdatePayGroup,
  ArchivePayGroup,
  NotLoadingPayGroup,
  LoadConfirmationStatusData,
  LoadConfirmationStatusDataSuccess,
  UpdateRatePayGroup,
  LoadRoleData,
  LoadRoleDataSuccess,
  LoadPayrollProfileSelectOptionPaygroup,
  LoadPayrollProfileSelectOptionPaygroupSuccess,
  LoadGradeSelectOptionPaygroup,
  LoadGradeSelectOptionPaygroupSuccess,
  LoadCurrencyData,
  LoadCurrencyDataSuccess,
  LoadPayGroupAwaitingApprovalData,
  LoadPayGroupAwaitingApprovalDataSuccess,
  HasPaygroupAdminRole
} from './pay-group.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { IRootState } from '../../root/root.state';
import { IPayGroup } from '@nutela/models/compensation/payroll';
import { IRolesTransform } from 'libs/feature-module-ui/platform/provisioning-ui/src/lib/models/interfaces';
import { ProvisioningUtilService } from 'libs/feature-module-ui/platform/provisioning-ui/src/lib/services';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class PayGroupEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>, private pUtilService: ProvisioningUtilService) { }

  @Effect()
  loadPaygroupData$: Observable<Action> = this.actions$
    .ofType<LoadPayGroupData>(PayGroupActionTypes.LOAD_PAY_GROUP_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYGROUP_URLs.getAll}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingPayGroup());
                // this.store.dispatch(new LoadFilteredPayGroup({ statusId: null }))
                return new LoadPayGroupSuccess(<IPayGroup[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingPayGroup());
                this.store.dispatch(new HasPaygroupAdminRole(!(data.ErrorMessage.includes('py_paygroup_admin'))))
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
  loadPayGroupAwaitingData$: Observable<Action> = this.actions$
    .ofType<LoadPayGroupAwaitingApprovalData>(PayGroupActionTypes.LOAD_PAY_GROUP_AWAITING_APPROVAL_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYGROUP_URLs.awaitingData}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingPayGroup());
                return new LoadPayGroupAwaitingApprovalDataSuccess(<IPayGroup[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingPayGroup());
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
  loadConfirmationStatusData$: Observable<Action> = this.actions$
    .ofType<LoadConfirmationStatusData>(PayGroupActionTypes.LOAD_CONFIRMATION_STATUS_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYGROUP_URLs.confirmationStatus}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                let confirmationTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                this.store.dispatch(new NotLoadingPayGroup());
                return new LoadConfirmationStatusDataSuccess(<any[]>(
                  confirmationTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingPayGroup());
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data could not be loaded.`, type: ToastTypes.ERROR
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
  loadCurrencyData$: Observable<Action> = this.actions$
    .ofType<LoadCurrencyData>(PayGroupActionTypes.LOAD_CURRENCY_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.DEFAULT_CURRENCY_URLs.getAll}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                let currencyTransformed = this.utilService.transformToSelectDataList(data.Results, 'currency_id', 'currency_name');
                this.store.dispatch(new NotLoadingPayGroup());
                return new LoadCurrencyDataSuccess(<any[]>(
                  currencyTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingPayGroup());
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data could not be loaded.`, type: ToastTypes.ERROR
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
  loadProfileSelectOptionData$: Observable<Action> = this.actions$
    .ofType<LoadPayrollProfileSelectOptionPaygroup>(PayGroupActionTypes.LOAD_PAYROLL_SELECT_OPTION_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYROLL_PROFILE_URLs.profileTypes}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                let payrollTransformed = this.utilService.transformToSelectDataList(data.Results, 'payroll_profile_id', 'description');
                this.store.dispatch(new NotLoadingPayGroup());
                return new LoadPayrollProfileSelectOptionPaygroupSuccess(<ISelectOption[]>(
                  payrollTransformed
                ));
              } else {
                this.store.dispatch(new NotLoadingPayGroup());
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data could not be loaded.`, type: ToastTypes.ERROR
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
  loadGradeSelectOptionData$: Observable<Action> = this.actions$
    .ofType<LoadGradeSelectOptionPaygroup>(PayGroupActionTypes.LOAD_GRADE_SELECT_OPTION_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYGROUP_URLs.grade}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                let gradeTransformed = this.utilService.transformToSelectDataList(data.Results, 'grade_id', 'description');
                return new LoadGradeSelectOptionPaygroupSuccess(<ISelectOption[]>(
                  gradeTransformed
                ));
              } else {
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data could not be loaded.`, type: ToastTypes.ERROR
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
  loadRoleData$: Observable<Action> = this.actions$
    .ofType<LoadRoleData>(PayGroupActionTypes.LOAD_ROLE_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYGROUP_URLs.roles}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const rolesData = this.pUtilService.transformToRolesDataList(data.Results, 'rolename', 'sys_rolename');
                return new LoadRoleDataSuccess(<IRolesTransform[]>(
                  rolesData
                ));
              } else {
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR
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
  saveData$: Observable<Action> = this.actions$
    .ofType<SavePayGroup>(PayGroupActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.PAYGROUP_URLs.create, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingPayGroup(),
                  new LoadPayGroupData(),
                  new HideEditorPayGroup(),
                ]);
              } else {
                return from([
                  new NotProcessingPayGroup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPayGroup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.errorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateData$: Observable<Action> = this.actions$
    .ofType<UpdatePayGroup>(PayGroupActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.PAYGROUP_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingPayGroup(),
                  new LoadPayGroupData(),
                  new HideEditorPayGroup(),
                ]);
              } else {
                return from([
                  new NotProcessingPayGroup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPayGroup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.errorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateRateData$: Observable<Action> = this.actions$
    .ofType<UpdateRatePayGroup>(PayGroupActionTypes.UPDATE_RATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.PAYGROUP_URLs.updateRate}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingPayGroup(),
                  new HideEditorPayGroup(),
                ]);
              } else {
                return from([
                  new NotProcessingPayGroup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be updated.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPayGroup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.errorMassage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<ArchivePayGroup>(PayGroupActionTypes.ARCHIVE_PAY_GROUP_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.PAYGROUP_URLs.archive}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was archived successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadPayGroupData()
                ]);
              } else {
                this.store.dispatch(new NotLoadingPayGroup())
                return from([
                  new ShowToast({ title: 'Data Could Not Be Archived', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not archived.`, type: ToastTypes.ERROR }),
                ]);
              }
            }),
            catchError((error: any) =>
            from([
                new NotLoadingPayGroup(),
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR }),
              ])
            )
          );
      })
    );

}

