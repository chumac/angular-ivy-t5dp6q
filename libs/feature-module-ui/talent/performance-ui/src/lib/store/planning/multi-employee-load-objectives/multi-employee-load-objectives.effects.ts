import { Injectable } from '@angular/core';

import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import * as constants from '../../../constants/';
import {
  ApiService,
  toastOptionsError,
  toastOptionsSuccess
} from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import {
  HideEditorMultiEmployeeLoadObjectives,
  NotProcessingMultiEmployeeLoadObjectives,
  SaveMultiEmployeeLoadObjectives,
  SaveMultiEmployeeLoadObjectivesSuccess,
  SaveMultiEmployeeLoadObjectivesFailure,
  LoadPlanlistMultiEmployeeLoadObjectives,
  LoadPlanlistMultiEmployeeLoadObjectivesSuccess,
  MultiEmployeeLoadObjectiveDataMultiEmployeeLoadObjectives,
  MultiEmployeeLoadObjectiveDataMultiEmployeeLoadObjectivesSuccess,
  MultiEmployeeLoadObjectivesActionTypes,
  MultiEmployeeObjectiveExists,
  MultiEmployeeObjectiveExistsSuccess,
  UploadMultiEmployeeObjectives,
  DeleteObjectiveDataMultiEmployeeLoadObjectives,
  NotProcessingDataGridMultiEmployeeLoadObjectives,
  ValidateMultiEmployeeObjectives,
  ResetObjectiveDataMultiEmployeeLoadObjectives,
  ImportMultiEmployeeLoadObjectives,
  NotValidatingMultiEmployeeLoadObjectives,
  ValidateEventMultiEmployeeLoadObjectives,
  ImportEventMultiEmployeeLoadObjectives,
  ResetEventMultiEmployeeLoadObjectives,
  HasIssuesMultiEmployeeLoadObjectives,
  ResetObjectiveDataMultiEmployeeLoadObjectivesSuccess,
  MultiEmployeeObjectiveExistsFailure,
  NotImportingMultiEmployeeLoadObjectives,
  UploadEventMultiEmployeeLoadObjectives
} from './multi-employee-load-objectives.actions';
import {
  IObjectiveDto, IPlan
} from '@nutela/models/talent/performance';
import { IPerformanceState } from '../../root/performance.state';

@Injectable()
export class MultiEmployeeLoadObjectivesEffects {
  constructor(
    private store: Store<IPerformanceState>,
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService
  ) { }


  @Effect()
  loadObjectiveData$: Observable<Action> = this.actions$
    .ofType<MultiEmployeeLoadObjectiveDataMultiEmployeeLoadObjectives>(
      MultiEmployeeLoadObjectivesActionTypes.MULTI_EMPLOYEE_LOAD_OBJECTIVE_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.MULTI_EMPLOYEE_LOAD_OBJECTIVES_URLs.getObjectives}/${payload.planID}`).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              if (payload.eventID === constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.upload) {
                this.store.dispatch(new UploadEventMultiEmployeeLoadObjectives());
              }
              if (payload.eventID === constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.reset) {
                this.store.dispatch(new ResetEventMultiEmployeeLoadObjectives());
                this.store.dispatch(new MultiEmployeeObjectiveExistsSuccess(<boolean>(false)));
              }
              if (payload.eventID === constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.import) {
                this.store.dispatch(new ImportEventMultiEmployeeLoadObjectives());
              }
              return new MultiEmployeeLoadObjectiveDataMultiEmployeeLoadObjectivesSuccess(<IObjectiveDto[]>(
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
  loadPlanList$: Observable<Action> = this.actions$
    .ofType<LoadPlanlistMultiEmployeeLoadObjectives>(
      MultiEmployeeLoadObjectivesActionTypes.LOAD_PLAN_LIST
    )
    .pipe(
      switchMap(() => {
        return this.apiService.read(constants.MULTI_EMPLOYEE_LOAD_OBJECTIVES_URLs.getplans).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              return new LoadPlanlistMultiEmployeeLoadObjectivesSuccess(<IPlan[]>(
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
  objectiveExists$: Observable<Action> = this.actions$
    .ofType<MultiEmployeeObjectiveExists>(
      MultiEmployeeLoadObjectivesActionTypes.OBJECTIVE_EXISTS
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.MULTI_EMPLOYEE_LOAD_OBJECTIVES_URLs.objectiveExists}/${payload}`).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              if (data.Results.length > 0) {
                this.store.dispatch(new NotProcessingDataGridMultiEmployeeLoadObjectives());
                this.store.dispatch(new MultiEmployeeLoadObjectiveDataMultiEmployeeLoadObjectivesSuccess(data.Results));
                return new MultiEmployeeObjectiveExistsSuccess(<boolean>(
                  true
                ));
              } else {
                this.store.dispatch(new NotProcessingDataGridMultiEmployeeLoadObjectives());
                return new MultiEmployeeObjectiveExistsSuccess(<boolean>(
                  false
                ));
              }
            } else {
              this.store.dispatch(new NotProcessingDataGridMultiEmployeeLoadObjectives());
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
              new NotProcessingDataGridMultiEmployeeLoadObjectives()
            ])
          )
        );
      })
    );

  @Effect()
  uploadObjectiveData$: Observable<Action> = this.actions$
    .ofType<UploadMultiEmployeeObjectives>(MultiEmployeeLoadObjectivesActionTypes.UPLOAD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.MULTI_EMPLOYEE_LOAD_OBJECTIVES_URLs.uploadObjectives}/${payload.planID}?filename=${payload.filename}`, payload.objectiveData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new MultiEmployeeLoadObjectiveDataMultiEmployeeLoadObjectives({ planID: payload.planID, eventID: constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.upload }),
                ]);
              } else {
                this.store.dispatch(new NotProcessingMultiEmployeeLoadObjectives());
                this.store.dispatch(new ShowToast({ title: 'Data Could Not Be Uploaded', message: data.Results ? JSON.stringify(data.Results[1]) : `Something went wrong. Data could not be loaded.`, options: toastOptionsError() }));
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingMultiEmployeeLoadObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Data could not be saved. Error occured.` + JSON.stringify(error), options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveMultiEmployeeLoadObjectives$: Observable<Action> = this.actions$
    .ofType<SaveMultiEmployeeLoadObjectives>(MultiEmployeeLoadObjectivesActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.MULTI_EMPLOYEE_LOAD_OBJECTIVES_URLs.editObjectives}/${payload.objectiveData.id}`, payload.objectiveData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingMultiEmployeeLoadObjectives(),
                  new MultiEmployeeLoadObjectiveDataMultiEmployeeLoadObjectives({ planID: payload.objectiveData.PlanInfo.id, eventID: constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.non }),
                  new HideEditorMultiEmployeeLoadObjectives()
                ]);
              } else {
                return from([
                  new NotProcessingMultiEmployeeLoadObjectives(),
                  new HideEditorMultiEmployeeLoadObjectives(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingMultiEmployeeLoadObjectives(),
                new HideEditorMultiEmployeeLoadObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteObjectiveData$: Observable<Action> = this.actions$
    .ofType<DeleteObjectiveDataMultiEmployeeLoadObjectives>(MultiEmployeeLoadObjectivesActionTypes.DELETE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.MULTI_EMPLOYEE_LOAD_OBJECTIVES_URLs.deleteObjective}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new MultiEmployeeLoadObjectiveDataMultiEmployeeLoadObjectives({ planID: payload.planID, eventID: constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.non }),
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
  resetObjectiveData$: Observable<Action> = this.actions$
    .ofType<ResetObjectiveDataMultiEmployeeLoadObjectives>(MultiEmployeeLoadObjectivesActionTypes.RESET)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.MULTI_EMPLOYEE_LOAD_OBJECTIVES_URLs.resetObjectives}/${payload.planID}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new MultiEmployeeLoadObjectiveDataMultiEmployeeLoadObjectives({ planID: payload.planID, eventID: constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.reset }),
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
  validateObjectives$: Observable<Action> = this.actions$
    .ofType<ValidateMultiEmployeeObjectives>(MultiEmployeeLoadObjectivesActionTypes.VALIDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.MULTI_EMPLOYEE_LOAD_OBJECTIVES_URLs.validateObjectives}/${payload.planId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was validated successfully.`, options: toastOptionsSuccess() }),
                  new NotValidatingMultiEmployeeLoadObjectives(),
                  new ValidateEventMultiEmployeeLoadObjectives(),
                  new HasIssuesMultiEmployeeLoadObjectives(false)
                ]);
              } else {
                this.store.dispatch(new MultiEmployeeLoadObjectiveDataMultiEmployeeLoadObjectives({ planID: payload.planId, eventID: constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.non }));
                return from([
                  new NotValidatingMultiEmployeeLoadObjectives(),
                  new HasIssuesMultiEmployeeLoadObjectives(true),
                  new ShowToast({ title: 'Data Could Not Be Validated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Validation data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotValidatingMultiEmployeeLoadObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  importMultiEmployeeLoadObjectives$: Observable<Action> = this.actions$
    .ofType<ImportMultiEmployeeLoadObjectives>(MultiEmployeeLoadObjectivesActionTypes.IMPORT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.MULTI_EMPLOYEE_LOAD_OBJECTIVES_URLs.importObjectives}/${payload.planID}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was imported successfully.`, options: toastOptionsSuccess() }),
                  new NotImportingMultiEmployeeLoadObjectives(),
                  new MultiEmployeeLoadObjectiveDataMultiEmployeeLoadObjectives({ planID: payload.planID, eventID: constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.import }),
                ]);
              } else {
                return from([
                  new NotImportingMultiEmployeeLoadObjectives(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotImportingMultiEmployeeLoadObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );



}
