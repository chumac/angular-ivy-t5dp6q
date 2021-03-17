import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { ApiService, toastOptionsError, UtilService } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import {
  LoadDataCustomUserGroupSetup,
  SaveCustomUserGroupSetup,
  NotProcessingCustomUserGroupSetup,
  HideEditorCustomUserGroupSetup,
  DeleteDataCustomUserGroupSetup,
  AddCustomUserGroupSetup,
  CustomUserGroupSetupActionTypes,
  LoadDataCustomUserGroupSetupSuccess,
  NotLoadingCustomUserGroupSetup,
} from './/custom-user-group.actions';
import { ICustomUserGroupSetup } from '@nutela/models/workforce/employee-profiles';
import * as constants from '../../../constants';
import { ToastTypes } from '@nutela/shared/app-global';
import { IEmployeesProfileState } from '../../root';

@Injectable()
export class CustomUserGroupSetupEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IEmployeesProfileState>
  ) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataCustomUserGroupSetup>(CustomUserGroupSetupActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.CUSTOM_USER_GROUP_SETUPS_URLs.loadData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingCustomUserGroupSetup())
                return new LoadDataCustomUserGroupSetupSuccess(<ICustomUserGroupSetup[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message: (data.error.status == 401) ? data.error.ErrorMessage : 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingCustomUserGroupSetup(),
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  addData$: Observable<Action> = this.actions$
    .ofType<AddCustomUserGroupSetup>(CustomUserGroupSetupActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.CUSTOM_USER_GROUP_SETUPS_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingCustomUserGroupSetup(),
                  new HideEditorCustomUserGroupSetup(),
                  new LoadDataCustomUserGroupSetup(),
                ]);
              } else {
                return from([
                  new NotProcessingCustomUserGroupSetup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingCustomUserGroupSetup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error.error.ErrorMessage, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveCustomUserGroupSetup>(CustomUserGroupSetupActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.CUSTOM_USER_GROUP_SETUPS_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingCustomUserGroupSetup(),
                  new HideEditorCustomUserGroupSetup(),
                  new LoadDataCustomUserGroupSetup(),
                ]);
              } else {
                return from([
                  new NotProcessingCustomUserGroupSetup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingCustomUserGroupSetup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataCustomUserGroupSetup>(CustomUserGroupSetupActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.CUSTOM_USER_GROUP_SETUPS_URLs.delete}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataCustomUserGroupSetup(),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
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

  mockData = [
    {
      id: 1,
      employee_id: 1,
      transaction_type: '2',
      appraisal_score: 58,
      appraisal_period: '2019 Financial Year',
      effective_date: new Date(),
      defer_time: 2,
      proposed_confirm_date: new Date(),
      EmployeeInfo: {
        employee_number: "X365-V2_01",
        employee_surname: "Obasi",
        employee_midname: "David",
        employee_firstname: "Duke"
      },
      transaction_date: new Date(),
      AppraisalPeriodInfo: null,
    },
    {
      id: 2,
      employee_id: 2,
      transaction_type: '2',
      appraisal_score: 58,
      appraisal_period: '2019 Monetary Policy Year',
      effective_date: new Date(),
      defer_time: 21,
      proposed_confirm_date: new Date(),
      EmployeeInfo: {
        employee_number: "X365-V2_01",
        employee_surname: "Ohu",
        employee_midname: "Samuel",
        employee_firstname: "Oluwasegun"
      },
      transaction_date: new Date(),
      AppraisalPeriodInfo: null,
    },
    {
      id: 1,
      employee_id: 1,
      transaction_type: '2',
      appraisal_score: 58,
      appraisal_period: 'Health & Insurance Year',
      effective_date: new Date(),
      defer_time: 2,
      proposed_confirm_date: new Date(),
      EmployeeInfo: {
        employee_number: "X365-V2_02",
        employee_surname: "Ossai",
        employee_midname: "Isiewu",
        employee_firstname: "Chukwudi"
      },
      transaction_date: new Date(),
      AppraisalPeriodInfo: null,
    },
    {
      id: 1,
      employee_id: 1,
      transaction_type: '2',
      appraisal_score: 90,
      appraisal_period: 'Flexing and holidays',
      effective_date: new Date(),
      defer_time: 2,
      proposed_confirm_date: new Date(),
      EmployeeInfo: {
        employee_number: "X365-V2_03",
        employee_surname: "Obasi",
        employee_midname: "David",
        employee_firstname: "Duke"
      },
      transaction_date: new Date(),
      AppraisalPeriodInfo: null,
    },
  ];

}
