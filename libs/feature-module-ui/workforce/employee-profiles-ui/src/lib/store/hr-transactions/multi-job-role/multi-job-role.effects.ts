import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { ApiService, UtilService, } from '@nutela/core-services';

import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import {
  LoadMultiJobRoleTransaction,
  LoadMultiJobRoleTransactionSuccess,
  MultiJobRoleTransactionActionTypes,
  SaveMultiJobRoleTransaction,
  NotProcessingMultiJobRoleTransaction,
  HideEditorMultiJobRoleTransaction,
  NotLoadingMultiJobRoleTransaction,
  UpdateMultiJobRoleTransaction,
  LoadEmployeeList,
  LoadEmployeeListSuccess,
  DeleteMultiJobRoleTransaction,
  LoadPositionList,
  LoadPositionListSuccess,
} from './multi-job-role.actions';
import { IMultiRoleJob } from '@nutela/models/workforce/employee-profiles';
import * as constants from '../../../constants';
import { ToastTypes } from '@nutela/shared/app-global';
import { IEmployeesProfileState } from '../../root';

@Injectable()
export class MultiJobRoleTransactionEffects {
  constructor(
    private actions$: Actions,
    private utilService: UtilService,
    private apiService: ApiService,
    private store: Store<IEmployeesProfileState>
  ) { }


  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadMultiJobRoleTransaction>(MultiJobRoleTransactionActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
       switchMap(payload => {
        return this.apiService
          .read(`${constants.MUlTIJOBROLE_URL.getAll}/${payload.employeeId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingMultiJobRoleTransaction());
                return new LoadMultiJobRoleTransactionSuccess(<IMultiRoleJob[]>(
                  data.Results
                ))
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
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
    .ofType<SaveMultiJobRoleTransaction>(MultiJobRoleTransactionActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.MUlTIJOBROLE_URL.create, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingMultiJobRoleTransaction(),
                  new HideEditorMultiJobRoleTransaction(),
                  new LoadMultiJobRoleTransaction({employeeId:payload.employeeId})
                ]);
              } else {
                return from([
                  new NotProcessingMultiJobRoleTransaction(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingMultiJobRoleTransaction(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateData$: Observable<Action> = this.actions$
    .ofType<UpdateMultiJobRoleTransaction>(MultiJobRoleTransactionActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.MUlTIJOBROLE_URL.update}/${payload.recordId}`
        console.log('url', url);
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingMultiJobRoleTransaction(),
                  new HideEditorMultiJobRoleTransaction(),
                  new LoadMultiJobRoleTransaction({employeeId:payload.employeeId})
                ]);
              } else {
                return from([
                  new NotProcessingMultiJobRoleTransaction(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingMultiJobRoleTransaction(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  delete$: Observable<Action> = this.actions$
    .ofType<DeleteMultiJobRoleTransaction>(MultiJobRoleTransactionActionTypes.DELETE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.MUlTIJOBROLE_URL.delete}`
        console.log('url', url);
        return this.apiService
          .update(url,payload.recordId)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingMultiJobRoleTransaction(),
                  new HideEditorMultiJobRoleTransaction(),
                  new LoadMultiJobRoleTransaction({employeeId:payload.employeeId})
                ]);
              } else {
                return from([
                  new NotProcessingMultiJobRoleTransaction(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingMultiJobRoleTransaction(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );


  @Effect()
  loadEmployee$: Observable<Action> = this.actions$
    .ofType<LoadEmployeeList>(MultiJobRoleTransactionActionTypes.LOAD_EMPLOYEE_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.MUlTIJOBROLE_URL.employeeList)
          .pipe(
            map((data: any) => {
              const system = this.utilService.transformToSelectDataList(data.Results, "employee_id", "emp_fullname");
              if (data.Success) {
                return new LoadEmployeeListSuccess(<ISelectOption[]>(
                  system
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR });
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
  loadPosition$: Observable<Action> = this.actions$
    .ofType<LoadPositionList>(MultiJobRoleTransactionActionTypes.LOAD_POSITION_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.MUlTIJOBROLE_URL.positionList)
          .pipe(
            map((data: any) => {
              const system = this.utilService.transformToSelectDataList(data.Results, "position_id", "description");
              if (data.Success) {
                return new LoadPositionListSuccess(<ISelectOption[]>(
                  system
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR });
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


}
