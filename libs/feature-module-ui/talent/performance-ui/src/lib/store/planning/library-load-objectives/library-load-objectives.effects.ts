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
import { LoadLibraryObjectiveData, LoadLibraryObjectivesActionTypes, LoadLibraryObjectiveDataSuccess, LoadLibraryPlanlist, LoadLibraryPlanlistSuccess, UploadLibraryObjectives, LibraryObjectiveExists, LibraryObjectiveExistsSuccess, SaveLibraryLoadObjectives, NotProcessingLibraryLoadObjectives, HideEditorLibraryLoadObjectives, NotProcessingDataGridLibraryLoadObjectives, ResetLibraryLoadObjectives, ValidateLibraryObjectives, ImportLibraryLoadObjectives, LibraryObjectiveNotExists, TriggerLibraryObjectiveExistBtnAction, TriggerLibraryObjectiveResetBtnAction, TriggerLibraryObjectiveNonExistBtnAction, NotValidatingLibraryLoadObjectives, TriggerLibraryObjectiveValidBtnAction, NotImportingLibraryLoadObjectives, DeleteLibraryLoadObjectives, TriggerLibraryObjectiveImportBtnAction, LoadLibraryPerspectiveList, LoadLibraryPerspectiveListSuccess, LoadLibraryAnalysisList, LoadLibraryAnalysisListSuccess, LoadLibraryAnalysisDetListSuccess, LoadLibraryAnalysisDetList, LoadLibraryPositionList, LoadLibraryPositionListSuccess, LoadLibraryDesignationList, LoadLibraryDesignationListSuccess, LoadLibraryGradeList, LoadLibraryGradeListSuccess, LoadLibraryEmployeeList, LoadLibraryEmployeeListSuccess, CreateLibraryLoadObjectives } from './library-load-objectives.actions';
import {
  IObjectiveDto, IPlan, ILibraryObjective
} from '@nutela/models/talent/performance';
import { IPerformanceState } from '../../root/performance.state';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class LoadLibraryObjectivesEffects {
  constructor(
    private store: Store<IPerformanceState>,
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService
  ) { }

  @Effect()
  loadLibraryObjectiveData$: Observable<Action> = this.actions$
    .ofType<LoadLibraryObjectiveData>(
      LoadLibraryObjectivesActionTypes.LOAD_LIBRARY_OBJECTIVE_DATA
    )
    .pipe(
      // map(action => action.payload),
      switchMap(() => {
        return this.apiService.read(`${constants.LIBRARY_LOAD_OBJECTIVES_URLs.getObjectives}`).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              this.store.dispatch(new NotProcessingDataGridLibraryLoadObjectives());
              return new LoadLibraryObjectiveDataSuccess(<ILibraryObjective[]>(
                data.Results
              ));
            } else {
              this.store.dispatch(new NotProcessingDataGridLibraryLoadObjectives());
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
  loadLibraryPlanList$: Observable<Action> = this.actions$
    .ofType<LoadLibraryPlanlist>(
      LoadLibraryObjectivesActionTypes.LOAD_PLAN_LIST
    )
    .pipe(
      switchMap(() => {
        return this.apiService.read(constants.LIBRARY_LOAD_OBJECTIVES_URLs.getplans).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              return new LoadLibraryPlanlistSuccess(<IPlan[]>(
                data.Results
              ));
            } else {
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Plans data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );



  @Effect()
  loadLibraryPerspectiveList$: Observable<Action> = this.actions$
    .ofType<LoadLibraryPerspectiveList>(
      LoadLibraryObjectivesActionTypes.LOAD_PERSPECTIVE_LIST
    )
    .pipe(
      switchMap(() => {
        return this.apiService.read(constants.LIBRARY_LOAD_OBJECTIVES_URLs.getPerspectives).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              const transformedData = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              return new LoadLibraryPerspectiveListSuccess(<any[]>(
                transformedData
              ));
            } else {
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Perspective data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );

  @Effect()
  loadLibraryAnalysisList$: Observable<Action> = this.actions$
    .ofType<LoadLibraryAnalysisList>(
      LoadLibraryObjectivesActionTypes.LOAD_ANALYSIS_LIST
    )
    .pipe(
      switchMap(() => {
        return this.apiService.read(constants.LIBRARY_LOAD_OBJECTIVES_URLs.getAnalysis).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              return new LoadLibraryAnalysisListSuccess(<any[]>(
                data.Results
              ));
            } else {
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Analysis data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );

  @Effect()
  loadLibraryAnalysisDetList$: Observable<Action> = this.actions$
    .ofType<LoadLibraryAnalysisDetList>(
      LoadLibraryObjectivesActionTypes.LOAD_ANALYSIS_DETAIL_LIST
    )
    .pipe(
      switchMap(() => {
        return this.apiService.read(constants.LIBRARY_LOAD_OBJECTIVES_URLs.getAnalysisDet).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              return new LoadLibraryAnalysisDetListSuccess(<any[]>(
                data.Results
              ));
            } else {
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. AnalysisDet data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );

  @Effect()
  loadLibraryPositionList$: Observable<Action> = this.actions$
    .ofType<LoadLibraryPositionList>(
      LoadLibraryObjectivesActionTypes.LOAD_POSITION_LIST
    )
    .pipe(
      switchMap(() => {
        return this.apiService.read(constants.LIBRARY_LOAD_OBJECTIVES_URLs.getPositions).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              const transformedData = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              return new LoadLibraryPositionListSuccess(<any[]>(
                transformedData
              ));
            } else {
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Position data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );


  @Effect()
  loadLibraryDesignationList$: Observable<Action> = this.actions$
    .ofType<LoadLibraryDesignationList>(
      LoadLibraryObjectivesActionTypes.LOAD_DESIGNATION_LIST
    )
    .pipe(
      switchMap(() => {
        return this.apiService.read(constants.LIBRARY_LOAD_OBJECTIVES_URLs.getDesignations).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              const transformedData = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              return new LoadLibraryDesignationListSuccess(<any[]>(
                transformedData
              ));
            } else {
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Designation data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );

  @Effect()
  loadLibraryGradeList$: Observable<Action> = this.actions$
    .ofType<LoadLibraryGradeList>(
      LoadLibraryObjectivesActionTypes.LOAD_GRADE_LIST
    )
    .pipe(
      switchMap(() => {
        return this.apiService.read(constants.LIBRARY_LOAD_OBJECTIVES_URLs.getGrades).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              const transformedData = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              return new LoadLibraryGradeListSuccess(<any[]>(
                transformedData
              ));
            } else {
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Grade data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );


  @Effect()
  loadLibraryEmployeeList$: Observable<Action> = this.actions$
    .ofType<LoadLibraryEmployeeList>(
      LoadLibraryObjectivesActionTypes.LOAD_EMPLOYEE_LIST
    )
    .pipe(
      switchMap(() => {
        return this.apiService.read(constants.LIBRARY_LOAD_OBJECTIVES_URLs.getEmployees).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              return new LoadLibraryEmployeeListSuccess(<IPersonal[]>(
                data.Results
              ));
            } else {
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Employee data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );















































































  @Effect()
  uploadLibraryObjectiveData$: Observable<Action> = this.actions$
    .ofType<UploadLibraryObjectives>(LoadLibraryObjectivesActionTypes.UPLOAD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('uploading xls sheet', JSON.stringify(payload.objectiveData));
        return this.apiService
          .create(`${constants.LIBRARY_LOAD_OBJECTIVES_URLs.uploadObjectives}`, payload.objectiveData)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log('uploading xls sheet', JSON.stringify(payload.objectiveData));
              console.log('result from api', data);
              if (data.Success) {
                return from([
                  // new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  // new NotProcessingLoadObjectives(),
                  new LoadLibraryObjectiveData(),
                  new TriggerLibraryObjectiveExistBtnAction()
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
  libraryObjectiveExists$: Observable<Action> = this.actions$
    .ofType<LibraryObjectiveExists>(
      LoadLibraryObjectivesActionTypes.LIBRARY_OBJECTIVE_EXISTS
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.LIBRARY_LOAD_OBJECTIVES_URLs.getObjectives}/${payload}`).pipe(
          map((data: any) => {
            console.log('checking if data exists', data);
            if (data.Success && data.Results) {
              if (data.Results.length > 0) {
                console.log('data exists : load m-objdata', data);
                this.store.dispatch(new NotProcessingDataGridLibraryLoadObjectives());
                this.store.dispatch(new TriggerLibraryObjectiveExistBtnAction());

                return new LoadLibraryObjectiveDataSuccess(data.Results);

              } else {
                this.store.dispatch(new NotProcessingDataGridLibraryLoadObjectives());
                this.store.dispatch(new TriggerLibraryObjectiveNonExistBtnAction());
                return new ShowToast({
                  title: 'No Record Found',
                  message: 'Upload a template.',
                  options: toastOptionsError()
                });
              }

            } else {
              console.log('general error ');
              this.store.dispatch(new NotProcessingDataGridLibraryLoadObjectives());
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
              new NotProcessingDataGridLibraryLoadObjectives()
            ])
          )
        );
      })
    );

    @Effect()
    createLibraryLoadObjectives$: Observable<Action> = this.actions$
      .ofType<CreateLibraryLoadObjectives>(LoadLibraryObjectivesActionTypes.CREATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('payload', JSON.stringify(payload.objectiveData));
          return this.apiService
            .create(`${constants.LIBRARY_LOAD_OBJECTIVES_URLs.createObjectives}`, payload.objectiveData)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                    new NotProcessingLibraryLoadObjectives(),
                    // new LoadLibraryObjectiveData(payload.objectiveData.PlanInfo.id), part of the main work
                    // new DisableImportBtnLoadObjectives(),
                    new HideEditorLibraryLoadObjectives()
                  ]);
                } else {
                  return from([
                    new NotProcessingLibraryLoadObjectives(),
                    new HideEditorLibraryLoadObjectives(),
                    new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingLibraryLoadObjectives(),
                  new HideEditorLibraryLoadObjectives(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
                ])
              )
            );
        })
      );

  @Effect()
  saveLibraryLoadObjectives$: Observable<Action> = this.actions$
    .ofType<SaveLibraryLoadObjectives>(LoadLibraryObjectivesActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.LIBRARY_LOAD_OBJECTIVES_URLs.editObjectives}/${payload.objectiveData.id}`, payload.objectiveData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingLibraryLoadObjectives(),
                  // new LoadLibraryObjectiveData(payload.objectiveData.PlanInfo.id), part of the main work
                  // new DisableImportBtnLoadObjectives(),
                  new HideEditorLibraryLoadObjectives()
                ]);
              } else {
                return from([
                  new NotProcessingLibraryLoadObjectives(),
                  new HideEditorLibraryLoadObjectives(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingLibraryLoadObjectives(),
                new HideEditorLibraryLoadObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  resetLibraryObjectiveData$: Observable<Action> = this.actions$
    .ofType<ResetLibraryLoadObjectives>(LoadLibraryObjectivesActionTypes.RESET)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.LIBRARY_LOAD_OBJECTIVES_URLs.resetObjectives}/${payload.planID}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log('return value form server', data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadLibraryObjectiveData(),
                  new TriggerLibraryObjectiveResetBtnAction()
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
  validateLibraryObjectives$: Observable<Action> = this.actions$
    .ofType<ValidateLibraryObjectives>(LoadLibraryObjectivesActionTypes.VALIDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.LIBRARY_LOAD_OBJECTIVES_URLs.validateObjectives}/${payload.planId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log('return value form server', data);

              if (data.Success) {
                console.log('success data', data);
                return from([
                  new ShowToast({ title: null, message: `Your data was validated successfully.`, options: toastOptionsSuccess() }),
                  new NotValidatingLibraryLoadObjectives(),
                  new TriggerLibraryObjectiveValidBtnAction()
                  // new HasIssuesLoadObjectives(false)
                ]);
              } else {
                console.log('fail data', data);
                this.store.dispatch(new LoadLibraryObjectiveData());
                return from([
                  new NotValidatingLibraryLoadObjectives(),
                  // new HasIssuesLoadObjectives(true),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotValidatingLibraryLoadObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  importLibraryLoadObjectives$: Observable<Action> = this.actions$
    .ofType<ImportLibraryLoadObjectives>(LoadLibraryObjectivesActionTypes.IMPORT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.LIBRARY_LOAD_OBJECTIVES_URLs.importObjectives}/${payload.planID}`)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log('return value form server', data);

              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was imported successfully.`, options: toastOptionsSuccess() }),
                  new NotImportingLibraryLoadObjectives(),
                  new TriggerLibraryObjectiveImportBtnAction(),
                  new LoadLibraryObjectiveData(),
                ]);
              } else {
                return from([
                  new NotImportingLibraryLoadObjectives(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotImportingLibraryLoadObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteLibraryLoadObjectives$: Observable<Action> = this.actions$
    .ofType<DeleteLibraryLoadObjectives>(LoadLibraryObjectivesActionTypes.DELETE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.LIBRARY_LOAD_OBJECTIVES_URLs.deleteObjective}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadLibraryObjectiveData(),
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
