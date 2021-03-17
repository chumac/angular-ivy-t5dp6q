import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, map, mergeMap } from 'rxjs/operators';

import { ApiService } from '@nutela/core-services';
import * as constants from '../../constants';
import { GENERAL, PROFILE_AVATAR, ToastTypes } from '@nutela/shared/app-global';

import {
  EmployeesDataHomeActionTypes,
  LoadEmployeesDataChart,
  LoadEmployeesDataChartSuccess,
  LoadActiveEmployeesData,
  LoadActiveEmployeesDataSuccess,
  LoadInactiveEmployeesData,
  LoadInactiveEmployeesDataSuccess,
  LoadEmployeesDataItem,
  LoadEmployeesDataItemSuccess,
  LoadEmployeesProfilePictureSuccess,
  LoadEmployeesProfilePicture,
  NotLoadingEmployeeData,
  CancelReboardEmployee,
  CancelReboardAllEmployees,
  ReboardEmployee,
  ReboardAllEmployees,
  SubmitDataReboardEmployee,
  StartMyReboard,
  NotProcessingReboardStart,
  RetrieveMyReboard,
  NotProcessingReboardRetrieve,
  NotProcessingMyReboardCancel,
  LoadActiveReboardEmployeesData,
  LoadActiveReboardEmployeesDataSuccess,
  CancelMyReboard,
  LoadMyReboardDetails,
  LoadMyReboardDetailsSuccess,
  LoadHrReboardEmployeeDetails,
  LoadHrReboardEmployeeDetailsSuccess,
  RetrieveReboardEmployee
} from './employees-data-home.actions';
import { IDashboardChart, IEmployeeSummary, IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from 'dist/libs/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { IAppState } from '@nutela/store/app-state';
import { ComprehensiveDataLoad } from 'libs/store/modules/workforce/employee-profiles/src/lib/domains';

@Injectable()
export class EmployeesDataHomeEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<IAppState>) { }

  @Effect()
  loadChartData$: Observable<Action> = this.actions$
    .ofType<LoadEmployeesDataChart>(EmployeesDataHomeActionTypes.LOAD_CHART)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.EMPLOYEES_DATA_HOME.chartData}/${payload.sourceId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadEmployeesDataChartSuccess(<IDashboardChart>(data.Results[0]));
              } else {
                return new ShowToast({ title: 'Chart Data Could Not Be Loaded', message: 'Something went wrong. Chart data could not be loaded.', type: ToastTypes.ERROR })
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Chart Data Could Not Be Loaded', message: 'Something went wrong. Chart data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              ))
          );
      })
    );

  @Effect()
  loadMyReboarDetails$: Observable<Action> = this.actions$
    .ofType<LoadMyReboardDetails>(EmployeesDataHomeActionTypes.LOAD_MY_REBOARD_DETAILS)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.EMPLOYEES_DATA_HOME.getMyDetails}`)
          .pipe(
            map((data: IApiResult) => {
              console.log('data effects', data.Results);
              if (data.Success && data.Results) {
                return new LoadMyReboardDetailsSuccess(data.Results[0]);
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Data could not be loaded.', type: ToastTypes.ERROR })
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              ))
          );
      })
    );

  @Effect()
  loadActiveEmployeesData$: Observable<Action> = this.actions$
    .ofType<LoadActiveEmployeesData>(EmployeesDataHomeActionTypes.LOAD_ACTIVE_EMPLOYEES_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(constants.EMPLOYEES_DATA_HOME.activeEmployeesData(payload.sourceId))
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new LoadActiveEmployeesDataSuccess(<IEmployeeSummary[]>(data.Results));
              } else {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new ShowToast({ title: 'Employees Data Could Not Be Loaded', message: 'Something went wrong. Employees data could not be loaded.', type: ToastTypes.ERROR })
              }
            }),
            catchError((error: any) => of(
              new NotLoadingEmployeeData(),
              new ShowToast({ title: 'Employees Data Could Not Be Loaded', message: 'Something went wrong. Employees data could not be loaded. Error occured.', type: ToastTypes.ERROR })
            ))
          )
      })
    );

  @Effect()
  loadActiveReboardEmployeesData$: Observable<Action> = this.actions$
    .ofType<LoadActiveReboardEmployeesData>(EmployeesDataHomeActionTypes.LOAD_ACTIVE_REBOARD_EMPLOYEES_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.EMPLOYEES_DATA_HOME.activeReboardEmployees)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new LoadActiveReboardEmployeesDataSuccess(<IEmployeeSummary[]>(data.Results));
              } else {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new ShowToast({ title: 'Employees Data Could Not Be Loaded', message: 'Something went wrong. Employees data could not be loaded.', type: ToastTypes.ERROR })
              }
            }),
            catchError((error: any) => of(
              new NotLoadingEmployeeData(),
              new ShowToast({ title: 'Employees Data Could Not Be Loaded', message: 'Something went wrong. Employees data could not be loaded. Error occured.', type: ToastTypes.ERROR })
            ))
          )
      })
    );

  @Effect()
  loadReboardEmployeeDetails$: Observable<Action> = this.actions$
    .ofType<LoadHrReboardEmployeeDetails>(EmployeesDataHomeActionTypes.LOAD_HR_REBOARD_EMPLOYEE_DETAILS)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.EMPLOYEES_DATA_HOME.activeReboardEmployee}/${payload.employeeId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new LoadHrReboardEmployeeDetailsSuccess(<IEmployeeSummary>(data.Results[0]));
              } else {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new ShowToast({ title: 'Employee Data Could Not Be Loaded', message: 'Something went wrong. Employee data could not be loaded.', type: ToastTypes.ERROR })
              }
            }),
            catchError((error: any) => of(
              new NotLoadingEmployeeData(),
              new ShowToast({ title: 'Employee Data Could Not Be Loaded', message: 'Something went wrong. Employee data could not be loaded. Error occured.', type: ToastTypes.ERROR })
            ))
          )
      })
    );

  @Effect()
  loadInactiveEmployeesData$: Observable<Action> = this.actions$
    .ofType<LoadInactiveEmployeesData>(EmployeesDataHomeActionTypes.LOAD_INACTIVE_EMPLOYEES_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(constants.EMPLOYEES_DATA_HOME.inactiveEmployeesData(payload.sourceId))
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new LoadInactiveEmployeesDataSuccess(<IEmployeeSummary[]>(data.Results));
              } else {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new ShowToast({ title: 'Employees Data Could Not Be Loaded', message: 'Something went wrong. Employees data could not be loaded.', type: ToastTypes.ERROR })
              }
            }),
            catchError((error: any) => of(
              new NotLoadingEmployeeData(),
              new ShowToast({ title: 'Employees Data Could Not Be Loaded', message: 'Something went wrong. Employees data could not be loaded. Error occured.', type: ToastTypes.ERROR })
            ))
          )
      })
    );


  @Effect()
  reboardEmployee$: Observable<Action> = this.actions$
    .ofType<ReboardEmployee>(EmployeesDataHomeActionTypes.REBOARD_EMPLOYEE)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.EMPLOYEES_DATA_HOME.reboardEmployee}/${payload.employeeId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new ShowToast({ title: '', message: 'Reboard initaited successfully', type: ToastTypes.SUCCESS })
              } else {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new ShowToast({ title: 'Employees Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR })
              }
            }),
            catchError((error: any) => of(
              new NotLoadingEmployeeData(),
              new ShowToast({ title: 'Employees Data Could Not Be Loaded', message: 'Something went wrong. Employees data could not be loaded. Error occured.', type: ToastTypes.ERROR })
            ))
          )
      })
  );


  @Effect()
  reboardAllEmployees$: Observable<Action> = this.actions$
      .ofType<ReboardAllEmployees>(EmployeesDataHomeActionTypes.REBOARD_ALL_EMPLOYEES)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.EMPLOYEES_DATA_HOME.reboardAllEmployees)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new ShowToast({ title: '', message: 'Reboard for all employees initiated successfully', type: ToastTypes.SUCCESS })
              } else {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new ShowToast({ title: 'Employees Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR  })
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingEmployeeData(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  cancelAllReboards$: Observable<Action> = this.actions$
      .ofType<CancelReboardAllEmployees>(EmployeesDataHomeActionTypes.CANCEL_REBOARD_ALL_EMPLOYEES)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.EMPLOYEES_DATA_HOME.cancelAllReboard)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new ShowToast({ title: '', message: 'All reboards cancelled successfully', type: ToastTypes.SUCCESS })
              } else {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new ShowToast({ title: 'Employees Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR  })
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingEmployeeData(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  cancelReboardEmployee$: Observable<Action> = this.actions$
    .ofType<CancelReboardEmployee>(EmployeesDataHomeActionTypes.CANCEL_REBOARD_EMPLOYEE)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.EMPLOYEES_DATA_HOME.cancelReboard}/${payload.employeeId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new ShowToast({ title: '', message: 'Reboard cancelled successfully', type: ToastTypes.SUCCESS })
              } else {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new ShowToast({ title: 'Employees Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR })
              }
            }),
            catchError((error: any) => of(
              new NotLoadingEmployeeData(),
              new ShowToast({ title: 'Employees Data Could Not Be Loaded', message: 'Something went wrong. Employees data could not be loaded. Error occured.', type: ToastTypes.ERROR })
            ))
          )
      })
    );

  @Effect()
  hrRetrieveReboardEmployee$: Observable<Action> = this.actions$
    .ofType<RetrieveReboardEmployee>(EmployeesDataHomeActionTypes.RETRIEVE_REBOARD_EMPLOYEE)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.EMPLOYEES_DATA_HOME.retrieveEmployeeReboard}/${payload.employeeId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                this.store.dispatch(new NotProcessingReboardRetrieve());
                return new ShowToast({ title: '', message: 'Reboard successfully retrieved for update', type: ToastTypes.SUCCESS })
              } else {
                this.store.dispatch(new NotProcessingReboardRetrieve());
                return new ShowToast({ title: 'Data Could Not Be Retrieved', message: data.ErrorMessage, type: ToastTypes.ERROR })
              }
            }),
            catchError((error: any) => of(
              new NotProcessingReboardRetrieve(),
              new ShowToast({ title: 'Data Could Not Be Retrieved', message: 'Something went wrong. Data could not be retrieved. Error occured.', type: ToastTypes.ERROR })
            ))
          )
      })
    );

  @Effect()
  cancelMyReboard$: Observable<Action> = this.actions$
    .ofType<CancelMyReboard>(EmployeesDataHomeActionTypes.CANCEL_MY_REBOARD)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.EMPLOYEES_DATA_HOME.cancelMyReboard}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                this.store.dispatch(new NotProcessingMyReboardCancel());
                this.store.dispatch(new ComprehensiveDataLoad());
                this.store.dispatch(new LoadMyReboardDetails());
                return new ShowToast({ title: '', message: 'Reboard cancelled successfully', type: ToastTypes.SUCCESS })
              } else {
                this.store.dispatch(new NotProcessingMyReboardCancel());
                return new ShowToast({ title: 'Employees Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR })
              }
            }),
            catchError((error: any) => of(
              new NotProcessingMyReboardCancel(),
              new ShowToast({ title: 'Employees Data Could Not Be Loaded', message: 'Something went wrong. Employees data could not be loaded. Error occured.', type: ToastTypes.ERROR })
            ))
          )
      })
    );

  @Effect()
  submitDataReboardEmployee$: Observable<Action> = this.actions$
    .ofType<SubmitDataReboardEmployee>(EmployeesDataHomeActionTypes.SUBMIT_DATA_REBOARD_EMPLOYEE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.EMPLOYEES_DATA_HOME.submitReboard}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingEmployeeData());
                this.store.dispatch(new ComprehensiveDataLoad());
                this.store.dispatch(new LoadMyReboardDetails());
                return new ShowToast({ title: '', message: 'Data submitted successfully', type: ToastTypes.SUCCESS })
              } else {
                this.store.dispatch(new NotLoadingEmployeeData());
                return new ShowToast({ title: 'Data Could Not Be Submitted', message: data.ErrorMessage, type: ToastTypes.ERROR })
              }
            }),
            catchError((error: any) => of(
              new NotLoadingEmployeeData(),
              new ShowToast({ title: 'Data Could Not Be Submitted', message: 'Something went wrong. Employees data could not be submitted. Error occured.', type: ToastTypes.ERROR })
            ))
          )
      })
    );

  @Effect()
  startReboardEmployee$: Observable<Action> = this.actions$
    .ofType<StartMyReboard>(EmployeesDataHomeActionTypes.START_MY_REBOARD)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.EMPLOYEES_DATA_HOME.startReboard}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                this.store.dispatch(new NotProcessingReboardStart());
                this.store.dispatch(new ComprehensiveDataLoad());
                this.store.dispatch(new LoadMyReboardDetails());
                return new ShowToast({ title: '', message: 'Reboard started successfully', type: ToastTypes.SUCCESS })
              } else {
                this.store.dispatch(new NotProcessingReboardStart());
                return new ShowToast({ title: 'Data Could Not Be Started', message: data.ErrorMessage, type: ToastTypes.ERROR })
              }
            }),
            catchError((error: any) => of(
              new NotProcessingReboardStart(),
              new ShowToast({ title: 'Data Could Not Be Started', message: 'Something went wrong. Employees data could not be submitted. Error occured.', type: ToastTypes.ERROR })
            ))
          )
      })
    );

  @Effect()
  retrieveReboardEmployee$: Observable<Action> = this.actions$
    .ofType<RetrieveMyReboard>(EmployeesDataHomeActionTypes.RETRIEVE_MY_REBOARD)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.EMPLOYEES_DATA_HOME.retrieveReboard}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                this.store.dispatch(new NotProcessingReboardRetrieve());
                this.store.dispatch(new ComprehensiveDataLoad());
                this.store.dispatch(new LoadMyReboardDetails());
                return new ShowToast({ title: '', message: 'Reboard retrieved successfully', type: ToastTypes.SUCCESS })
              } else {
                this.store.dispatch(new NotProcessingReboardRetrieve());
                return new ShowToast({ title: 'Data Could Not Be Retrieved', message: data.ErrorMessage, type: ToastTypes.ERROR })
              }
            }),
            catchError((error: any) => of(
              new NotProcessingReboardRetrieve(),
              new ShowToast({ title: 'Data Could Not Be Retrieved', message: 'Something went wrong. Employees data could not be submitted. Error occured.', type: ToastTypes.ERROR })
            ))
          )
      })
    );



  @Effect()
  LoadEmployeesDataItem$: Observable<Action> = this.actions$
    .ofType<LoadEmployeesDataItem>(EmployeesDataHomeActionTypes.LOAD_EMPLOYEES_DATA_ITEM)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${constants.EMPLOYEES_DATA_HOME.employeeDataItem}?employeeID=${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadEmployeesDataItemSuccess(<IComprehensiveData>(data.Results[0]));
              } else {
                return new ShowToast({ title: 'Employee Data Item Could Not Be Loaded', message: 'Something went wrong. Employee data item could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR })
              ))
          );
      })
    );


  @Effect()
  loadEmployeesProfilePicture$: Observable<Action> = this.actions$
    .ofType<LoadEmployeesProfilePicture>(EmployeesDataHomeActionTypes.LOAD_EMPLOYEES_PROFILE_PICTURE)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.EMPLOYEES_DATA_HOME.employeeProfilePicture}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const photo = `${GENERAL.pngBase64Header}${data.Results[0]}`;
                return new LoadEmployeesProfilePictureSuccess(photo);
              } else {
                return new LoadEmployeesProfilePictureSuccess(PROFILE_AVATAR.uri);
              }
            }),
            catchError((error: any) =>
              of(
                new LoadEmployeesProfilePictureSuccess(PROFILE_AVATAR.uri)
                // new ShowToast({title: 'Employee Photo Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              ))
          );
      })
    );
}
