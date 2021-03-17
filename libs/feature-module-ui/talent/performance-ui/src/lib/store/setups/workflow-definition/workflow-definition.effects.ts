import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  WorkflowDefinitionActionTypes,
  LoadDataWorkflowDefinition,
  LoadDataWorkflowDefinitionSuccess,
  SaveWorkflowDefinition,
  NotProcessingWorkflowDefinition,
  HideEditorWorkflowDefinition,
  DeleteDataWorkflowDefinition,
  LoadDocumentWorkflowDefinition,
  LoadDocumentWorkflowDefinitionSuccess,
  LoadInlineDocumentWorkflowDefinition,
  RemoveDataWorkflowDefinition,
  AddWorkflowDefinition,
  LoadAnalysisListWorkflowDefinition,
  LoadAnalysisListWorkflowDefinitionSuccess,
  LoadAnalysisDetListWorkflowDefinition,
  LoadAnalysisDetListWorkflowDefinitionSuccess,
  LoadPositionListWorkflowDefinition,
  LoadPositionListWorkflowDefinitionSuccess,
  LoadDesignationListWorkflowDefinition,
  LoadDesignationListWorkflowDefinitionSuccess,
  LoadGradeListWorkflowDefinition,
  LoadGradeListWorkflowDefinitionSuccess,
  LoadEmployeeListWorkflowDefinition,
  LoadEmployeeListWorkflowDefinitionSuccess,
} from './workflow-definition.actions';
import { IWorkflowDefinition } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { IAnalysisDetail, IAnalysis } from '@nutela/models/workforce/personnel';

@Injectable()
export class WorkflowDefinitionEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataWorkflowDefinition>(WorkflowDefinitionActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.WORKFLOW_DEFINITION_URLs.getWorkflowDefinitionData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataWorkflowDefinitionSuccess(<IWorkflowDefinition[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

  @Effect()
  addData$: Observable<Action> = this.actions$
    .ofType<AddWorkflowDefinition>(WorkflowDefinitionActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.WORKFLOW_DEFINITION_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingWorkflowDefinition(),
                  new HideEditorWorkflowDefinition(),
                  new LoadDataWorkflowDefinition()
                ]);
              } else {
                return from([
                  new NotProcessingWorkflowDefinition(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingWorkflowDefinition(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveWorkflowDefinition>(WorkflowDefinitionActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.WORKFLOW_DEFINITION_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingWorkflowDefinition(),
                  new HideEditorWorkflowDefinition(),
                  new LoadDataWorkflowDefinition()
                ]);
              } else {
                return from([
                  new NotProcessingWorkflowDefinition(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingWorkflowDefinition(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataWorkflowDefinition>(WorkflowDefinitionActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.WORKFLOW_DEFINITION_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataWorkflowDefinition()
                ]);
              } else {
                return from([
                  new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
              ])
            )
          );
      })
    );

    @Effect()
    loadAnalysisList$: Observable<Action> = this.actions$
      .ofType<LoadAnalysisListWorkflowDefinition>(
        WorkflowDefinitionActionTypes.LOAD_ANALYSIS_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.WORKFLOW_DEFINITION_URLs.getAnalysis).pipe(
            map((data: any) => {
              console.log('Analysis List', data);
              if (data.Success) {
                return new LoadAnalysisListWorkflowDefinitionSuccess(<IAnalysis[]>(
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
    loadAnalysisDetList$: Observable<Action> = this.actions$
      .ofType<LoadAnalysisDetListWorkflowDefinition>(
        WorkflowDefinitionActionTypes.LOAD_ANALYSIS_DETAIL_LIST
      )
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService.read(`${constants.WORKFLOW_DEFINITION_URLs.getAnalysisDet}/${payload}`).pipe(
            map((data: any) => {
              console.log('AnalysisDet List', data);
              if (data.Success) {
                return new LoadAnalysisDetListWorkflowDefinitionSuccess(<IAnalysisDetail[]>(
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
    loadPositionList$: Observable<Action> = this.actions$
      .ofType<LoadPositionListWorkflowDefinition>(
        WorkflowDefinitionActionTypes.LOAD_POSITION_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.WORKFLOW_DEFINITION_URLs.getPositions).pipe(
            map((data: any) => {
              console.log('Position List', data);
              if (data.Success) {
                const transformedData = this.utilService.transformToSelectDataList(data.Results, 'position_id', 'description');
                return new LoadPositionListWorkflowDefinitionSuccess(<any[]>(
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
    loadDesignationList$: Observable<Action> = this.actions$
      .ofType<LoadDesignationListWorkflowDefinition>(
        WorkflowDefinitionActionTypes.LOAD_DESIGNATION_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.WORKFLOW_DEFINITION_URLs.getDesignations).pipe(
            map((data: any) => {
              console.log('Designation List', data);
              if (data.Success) {
                const transformedData = this.utilService.transformToSelectDataList(data.Results, 'title_id', 'description');
                return new LoadDesignationListWorkflowDefinitionSuccess(<any[]>(
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
    loadGradeList$: Observable<Action> = this.actions$
      .ofType<LoadGradeListWorkflowDefinition>(
        WorkflowDefinitionActionTypes.LOAD_GRADE_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.WORKFLOW_DEFINITION_URLs.getGrades).pipe(
            map((data: any) => {
              console.log('Grade List', data);
              if (data.Success) {
                const transformedData = this.utilService.transformToSelectDataList(data.Results, 'grade_id', 'description');
                return new LoadGradeListWorkflowDefinitionSuccess(<any[]>(
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
    loadEmployeeList$: Observable<Action> = this.actions$
      .ofType<LoadEmployeeListWorkflowDefinition>(
        WorkflowDefinitionActionTypes.LOAD_EMPLOYEE_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.WORKFLOW_DEFINITION_URLs.getEmployees).pipe(
            map((data: any) => {
              console.log('Employee List', data);
              if (data.Success) {
                return new LoadEmployeeListWorkflowDefinitionSuccess(<IPersonal[]>(
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
}
