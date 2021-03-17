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
  HideEditorLoadObjectives,
  NotProcessingLoadObjectives,
  SaveLoadObjectives,
  SaveLoadObjectivesSuccess,
  SaveLoadObjectivesFailure,
  LoadPlanlistLoadObjectives,
  LoadPlanlistLoadObjectivesSuccess,
  LoadObjectiveDataLoadObjectives,
  LoadObjectiveDataLoadObjectivesSuccess,
  LoadObjectivesActionTypes,
  ObjectiveExists,
  ObjectiveExistsSuccess,
  UploadObjectives,
  DeleteObjectiveDataLoadObjectives,
  NotProcessingDataGridLoadObjectives,
  ValidateObjectives,
  ResetObjectiveDataLoadObjectives,
  ImportLoadObjectives,
  NotValidatingLoadObjectives,
  ValidateEventLoadObjectives,
  ImportEventLoadObjectives,
  ResetEventLoadObjectives,
  HasIssuesLoadObjectives,
  ResetObjectiveDataLoadObjectivesSuccess,
  ObjectiveExistsFailure,
  NotImportingLoadObjectives,
  UploadEventLoadObjectives
} from './load-objectives.actions';
import {
  IObjectiveDto, IPlan
} from '@nutela/models/talent/performance';
import { IPerformanceState } from '../../root/performance.state';

@Injectable()
export class LoadObjectivesEffects {
  constructor(
    private store: Store<IPerformanceState>,
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService
  ) { }


  @Effect()
  loadObjectiveData$: Observable<Action> = this.actions$
    .ofType<LoadObjectiveDataLoadObjectives>(
      LoadObjectivesActionTypes.LOAD_OBJECTIVE_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.LOAD_OBJECTIVES_URLs.getObjectives}/${payload.planID}`).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              if (payload.eventID === constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.upload) {
                this.store.dispatch(new UploadEventLoadObjectives());
              }
              if (payload.eventID === constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.reset) {
                this.store.dispatch(new ResetEventLoadObjectives());
                this.store.dispatch(new ObjectiveExistsSuccess(<boolean>(false)));
              }
              if (payload.eventID === constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.import) {
                this.store.dispatch(new ImportEventLoadObjectives());
              }
              return new LoadObjectiveDataLoadObjectivesSuccess(<IObjectiveDto[]>(
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
    .ofType<LoadPlanlistLoadObjectives>(
      LoadObjectivesActionTypes.LOAD_PLAN_LIST
    )
    .pipe(
      switchMap(() => {
        return this.apiService.read(constants.LOAD_OBJECTIVES_URLs.getplans).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              return new LoadPlanlistLoadObjectivesSuccess(<IPlan[]>(
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
    .ofType<ObjectiveExists>(
      LoadObjectivesActionTypes.OBJECTIVE_EXISTS
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.LOAD_OBJECTIVES_URLs.objectiveExists}/${payload}`).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              if (data.Results.length > 0) {
                this.store.dispatch(new NotProcessingDataGridLoadObjectives());
                this.store.dispatch(new LoadObjectiveDataLoadObjectivesSuccess(data.Results));
                return new ObjectiveExistsSuccess(<boolean>(
                  true
                ));
              } else {
                this.store.dispatch(new NotProcessingDataGridLoadObjectives());
                return new ObjectiveExistsSuccess(<boolean>(
                  false
                ));
              }
            } else {
              this.store.dispatch(new NotProcessingDataGridLoadObjectives());
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
              new NotProcessingDataGridLoadObjectives()
            ])
          )
        );
      })
    );

  @Effect()
  uploadObjectiveData$: Observable<Action> = this.actions$
    .ofType<UploadObjectives>(LoadObjectivesActionTypes.UPLOAD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('perf upload', JSON.stringify(payload.objectiveData));
        return this.apiService
          .create(`${constants.LOAD_OBJECTIVES_URLs.uploadObjectives}/${payload.planID}?filename=${payload.filename}`, payload.objectiveData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new LoadObjectiveDataLoadObjectives({ planID: payload.planID, eventID: constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.upload }),
                ]);
              } else {
                this.store.dispatch(new NotProcessingLoadObjectives());
                this.store.dispatch(new ShowToast({ title: 'Data Could Not Be Uploaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data could not be loaded.`, options: toastOptionsError() }));
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLoadObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveLoadObjectives$: Observable<Action> = this.actions$
    .ofType<SaveLoadObjectives>(LoadObjectivesActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.LOAD_OBJECTIVES_URLs.editObjectives}/${payload.objectiveData.id}`, payload.objectiveData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLoadObjectives(),
                  new LoadObjectiveDataLoadObjectives({ planID: payload.objectiveData.PlanInfo.id, eventID: constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.non }),
                  new HideEditorLoadObjectives()
                ]);
              } else {
                return from([
                  new NotProcessingLoadObjectives(),
                  new HideEditorLoadObjectives(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLoadObjectives(),
                new HideEditorLoadObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteObjectiveData$: Observable<Action> = this.actions$
    .ofType<DeleteObjectiveDataLoadObjectives>(LoadObjectivesActionTypes.DELETE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.LOAD_OBJECTIVES_URLs.deleteObjective}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadObjectiveDataLoadObjectives({ planID: payload.planID, eventID: constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.non }),
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
    .ofType<ResetObjectiveDataLoadObjectives>(LoadObjectivesActionTypes.RESET)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.LOAD_OBJECTIVES_URLs.resetObjectives}/${payload.planID}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadObjectiveDataLoadObjectives({ planID: payload.planID, eventID: constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.reset }),
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
    .ofType<ValidateObjectives>(LoadObjectivesActionTypes.VALIDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.LOAD_OBJECTIVES_URLs.validateObjective}/${payload.planId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was validated successfully.`, options: toastOptionsSuccess() }),
                  new NotValidatingLoadObjectives(),
                  new ValidateEventLoadObjectives(),
                  new HasIssuesLoadObjectives(false)
                ]);
              } else {
                this.store.dispatch(new LoadObjectiveDataLoadObjectives({ planID: payload.planId, eventID: constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.non }));
                return from([
                  new NotValidatingLoadObjectives(),
                  new HasIssuesLoadObjectives(true),
                  new ShowToast({ title: 'Data Could Not Be Validated', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Validation data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotValidatingLoadObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  importLoadObjectives$: Observable<Action> = this.actions$
    .ofType<ImportLoadObjectives>(LoadObjectivesActionTypes.IMPORT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.LOAD_OBJECTIVES_URLs.importObjective}/${payload.planID}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was imported successfully.`, options: toastOptionsSuccess() }),
                  new NotImportingLoadObjectives(),
                  new LoadObjectiveDataLoadObjectives({ planID: payload.planID, eventID: constants.OBJECTIVE_UPLOAD_EVENTS_CONSTANTS.import }),
                ]);
              } else {
                return from([
                  new NotImportingLoadObjectives(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotImportingLoadObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );



}
