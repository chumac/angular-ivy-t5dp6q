import { Injectable } from '@angular/core';

import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import {
  ApiService,
  toastOptionsError,
  toastOptionsSuccess
} from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { LoadSingleEmployeeObjectiveData, LoadSingleEmployeeObjectivesActionTypes, LoadSingleEmployeeObjectiveDataSuccess, LoadSingleEmployeePlanlist, LoadSingleEmployeePlanlistSuccess, UploadSingleEmployeeObjectives, SingleEmployeeObjectiveExists, SingleEmployeeObjectiveExistsSuccess, SaveSingleEmployeeLoadObjectives, NotProcessingSingleEmployeeLoadObjectives, HideEditorSingleEmployeeLoadObjectives, NotProcessingDataGridSingleEmployeeLoadObjectives, ResetSingleEmployeeLoadObjectives, ValidateSingleEmployeeObjectives, ImportSingleEmployeeLoadObjectives, LoadSingleLoadEmployeelist, LoadSingleLoadEmployeelistSuccess, TriggerSingleEmployeeObjectiveExistBtnAction, TriggerSingleEmployeeObjectiveNonExistBtnAction, TriggerSingleEmployeeObjectiveValidBtnAction, NotValidatingSingleEmployeeLoadObjectives, NotImportingSingleEmployeeLoadObjectives, TriggerSingleEmployeeObjectiveResetBtnAction, DeleteSingleEmployeeLoadObjectives, TriggerSingleEmployeeObjectiveImportBtnAction } from './single-employee-load-objectives.actions';
import {
  IObjectiveDto, IPlan
} from '@nutela/models/talent/performance';
import { IPerformanceState } from '../../root/performance.state';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class LoadSingleEmployeeObjectivesEffects {
  constructor(
    private store: Store<IPerformanceState>,
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService
  ) { }

  @Effect()
  loadSingleEmployeeObjectiveData$: Observable<Action> = this.actions$
    .ofType<LoadSingleEmployeeObjectiveData>(
      LoadSingleEmployeeObjectivesActionTypes.LOAD_SINGLE_EMPLOYEE_OBJECTIVE_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.SINGLE_EMPLOYEE_LOAD_OBJECTIVES_URLs.getObjectives}/${payload.planID}/${payload.employeeID}`).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              this.store.dispatch(new NotProcessingDataGridSingleEmployeeLoadObjectives());
              return new LoadSingleEmployeeObjectiveDataSuccess(<IObjectiveDto[]>(
                data.Results
              ));
            } else {
              this.store.dispatch(new NotProcessingDataGridSingleEmployeeLoadObjectives());
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Form data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );

  @Effect()
  loadSingleEmployeePlanList$: Observable<Action> = this.actions$
    .ofType<LoadSingleEmployeePlanlist>(
      LoadSingleEmployeeObjectivesActionTypes.LOAD_PLAN_LIST
    )
    .pipe(
      switchMap(() => {
        return this.apiService.read(constants.SINGLE_EMPLOYEE_LOAD_OBJECTIVES_URLs.getplans).pipe(
          map((data: any) => {
            console.log('Single Employee plans list', data);
            if (data.Success && data.Results) {
              return new LoadSingleEmployeePlanlistSuccess(<IPlan[]>(
                data.Results
              ));
            } else {
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Form data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );

    @Effect()
    LoadSingleLoadEmployeelist$: Observable<Action> = this.actions$
      .ofType<LoadSingleLoadEmployeelist>(
        LoadSingleEmployeeObjectivesActionTypes.LOAD_EMPLOYEE_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.SINGLE_EMPLOYEE_LOAD_OBJECTIVES_URLs.getEmployees).pipe(
            map((data: any) => {
              console.log('Single Employee list', data);
              if (data.Success && data.Results) {
                return new LoadSingleLoadEmployeelistSuccess(<IPersonal[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: 'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
        })
      );

  @Effect()
  uploadSingleEmployeeObjectiveData$: Observable<Action> = this.actions$
    .ofType<UploadSingleEmployeeObjectives>(LoadSingleEmployeeObjectivesActionTypes.UPLOAD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.SINGLE_EMPLOYEE_LOAD_OBJECTIVES_URLs.uploadObjectives}/${payload.employeeID}/${payload.planID}?filename=${payload.filename}`, payload.objectiveData)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log('uploading xls sheet', JSON.stringify(payload.objectiveData));
              console.log('result from api', data);
              if (data.Success) {
                return from([
                  new LoadSingleEmployeeObjectiveData({planID: payload.planID, employeeID: payload.employeeID}),
                  new TriggerSingleEmployeeObjectiveExistBtnAction()
                ]);
              } else {
                return from([
                  // new NotProcessingLoadObjectives(),
                  // new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                // new NotProcessingLoadObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  singleEmployeeObjectiveExists$: Observable<Action> = this.actions$
    .ofType<SingleEmployeeObjectiveExists>(
      LoadSingleEmployeeObjectivesActionTypes.SINGLE_EMPLOYEE_OBJECTIVE_EXISTS
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.SINGLE_EMPLOYEE_LOAD_OBJECTIVES_URLs.getObjectives}/${payload.planID}/${payload.employeeID}`).pipe(
          map((data: any) => {
            console.log('checking if data exists', data);
            if (data.Success && data.Results) {
              if (data.Results.length > 0) {
                console.log('data exists : load m-objdata', data);
                this.store.dispatch(new NotProcessingDataGridSingleEmployeeLoadObjectives());
                this.store.dispatch(new TriggerSingleEmployeeObjectiveExistBtnAction());

                return new LoadSingleEmployeeObjectiveDataSuccess(data.Results);

              } else {
                this.store.dispatch(new NotProcessingDataGridSingleEmployeeLoadObjectives());
                this.store.dispatch(new TriggerSingleEmployeeObjectiveNonExistBtnAction());
                return new ShowToast({
                  title: 'No Record Found',
                  message: 'Upload a template.',
                  options: toastOptionsError()
                });
              }

            } else {
              console.log('general error ');
              this.store.dispatch(new NotProcessingDataGridSingleEmployeeLoadObjectives());
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) => 
            from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Data could not be loaded. Error occured.',
                options: toastOptionsError()
              }),
              new NotProcessingDataGridSingleEmployeeLoadObjectives()
            ])
          )
        );
      })
    );


  @Effect()
  saveSingleEmployeeLoadObjectives$: Observable<Action> = this.actions$
    .ofType<SaveSingleEmployeeLoadObjectives>(LoadSingleEmployeeObjectivesActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('sub values', `${constants.SINGLE_EMPLOYEE_LOAD_OBJECTIVES_URLs.editObjectives}/${payload.objectiveData.id}/${payload.employeeID}`, payload.objectiveData)

        return this.apiService
          .update(`${constants.SINGLE_EMPLOYEE_LOAD_OBJECTIVES_URLs.editObjectives}/${payload.objectiveData.id}/${payload.employeeID}`, payload.objectiveData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingSingleEmployeeLoadObjectives(),
                  new LoadSingleEmployeeObjectiveData({planID: payload.objectiveData.PlanInfo.id , employeeID: payload.employeeID}),
                  // new DisableImportBtnLoadObjectives(),
                  new HideEditorSingleEmployeeLoadObjectives()
                ]);
              } else {
                return from([
                  new NotProcessingSingleEmployeeLoadObjectives(),
                  new HideEditorSingleEmployeeLoadObjectives(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingSingleEmployeeLoadObjectives(),
                new HideEditorSingleEmployeeLoadObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  resetSingleEmployeeObjectiveData$: Observable<Action> = this.actions$
    .ofType<ResetSingleEmployeeLoadObjectives>(LoadSingleEmployeeObjectivesActionTypes.RESET)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SINGLE_EMPLOYEE_LOAD_OBJECTIVES_URLs.resetObjectives}/${payload.planID}/${payload.employeeID}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log('return value form server', data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadSingleEmployeeObjectiveData({planID: payload.planID , employeeID: payload.employeeID}),
                  new TriggerSingleEmployeeObjectiveResetBtnAction()
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
  validateSingleEmployeeObjectives$: Observable<Action> = this.actions$
    .ofType<ValidateSingleEmployeeObjectives>(LoadSingleEmployeeObjectivesActionTypes.VALIDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.SINGLE_EMPLOYEE_LOAD_OBJECTIVES_URLs.validateObjectives}/${payload.planId}/${payload.employeeID}`)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log('return value form server', data);

              if (data.Success) {
                console.log('success data', data);
                return from([
                  new ShowToast({ title: null, message: `Your data was validated successfully.`, options: toastOptionsSuccess() }),
                  new NotValidatingSingleEmployeeLoadObjectives(),
                  new TriggerSingleEmployeeObjectiveValidBtnAction()
                  // new HasIssuesLoadObjectives(false)
                ]);
              } else {
                console.log('fail data', data);
                this.store.dispatch(new LoadSingleEmployeeObjectiveData({planID: payload.planId , employeeID: payload.employeeID}));
                return from([
                  new NotValidatingSingleEmployeeLoadObjectives(),
                  // new HasIssuesLoadObjectives(true),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotValidatingSingleEmployeeLoadObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  importSingleEmployeeLoadObjectives$: Observable<Action> = this.actions$
    .ofType<ImportSingleEmployeeLoadObjectives>(LoadSingleEmployeeObjectivesActionTypes.IMPORT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.SINGLE_EMPLOYEE_LOAD_OBJECTIVES_URLs.importObjectives}/${payload.planID}/${payload.employeeID}`)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log('return value form server', data);

              if (data.Success) { 
                return from([
                  new ShowToast({ title: null, message: `Your data was imported successfully.`, options: toastOptionsSuccess() }),
                  new NotImportingSingleEmployeeLoadObjectives(),
                  new TriggerSingleEmployeeObjectiveImportBtnAction(),
                  new LoadSingleEmployeeObjectiveData({planID: payload.planID , employeeID: payload.employeeID}),
                ]);
              } else {
                return from([
                  new NotImportingSingleEmployeeLoadObjectives(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotImportingSingleEmployeeLoadObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

    
    @Effect()
    deleteSingleEmployeeLoadObjectives$: Observable<Action> = this.actions$
      .ofType<DeleteSingleEmployeeLoadObjectives>(LoadSingleEmployeeObjectivesActionTypes.DELETE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .delete(`${constants.SINGLE_EMPLOYEE_LOAD_OBJECTIVES_URLs.deleteObjective}/${payload.recordId}/${payload.employeeID}`)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                    new LoadSingleEmployeeObjectiveData({planID: payload.planID , employeeID: payload.employeeID}),
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
