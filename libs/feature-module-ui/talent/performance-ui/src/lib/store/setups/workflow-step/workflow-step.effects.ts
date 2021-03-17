import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  WorkflowStepActionTypes,
  LoadDataWorkflowStep,
  LoadDataWorkflowStepSuccess,
  SaveWorkflowStep,
  NotProcessingWorkflowStep,
  HideEditorWorkflowStep,
  DeleteDataWorkflowStep,
  LoadDocumentWorkflowStep,
  LoadDocumentWorkflowStepSuccess,
  LoadInlineDocumentWorkflowStep,
  RemoveDataWorkflowStep,
  AddWorkflowStep,
  LoadDefinitionWorkflowStep,
  LoadDefinitionWorkflowStepSuccess,
} from './workflow-step.actions';
import { IWorkflowStep, IWorkflowDefinition } from '@nutela/models/talent/performance';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';

@Injectable()
export class WorkflowStepEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataWorkflowStep>(WorkflowStepActionTypes.LOAD_DATA)
    .pipe(
      map(action=>action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.WORKFLOW_STEP_URLs.getWorkflowStepData}/${payload.workFlowId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataWorkflowStepSuccess(<IWorkflowStep[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  loadDefinitionData$: Observable<Action> = this.actions$
    .ofType<LoadDefinitionWorkflowStep>(WorkflowStepActionTypes.LOAD_WORKFLOW_DEFINITION)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.WORKFLOW_STEP_URLs.getWorkflowDefinition)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const workflowDef = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                return new LoadDefinitionWorkflowStepSuccess(<ISelectOption[]>(
                  workflowDef
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  addData$: Observable<Action> = this.actions$
    .ofType<AddWorkflowStep>(WorkflowStepActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.WORKFLOW_STEP_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingWorkflowStep(),
                  new HideEditorWorkflowStep(),
                  new LoadDataWorkflowStep({workFlowId: payload.workFlowId})
                ]);
              } else {
                return from([
                  new NotProcessingWorkflowStep(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingWorkflowStep(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveWorkflowStep>(WorkflowStepActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.WORKFLOW_STEP_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingWorkflowStep(),
                  new HideEditorWorkflowStep(),
                  new LoadDataWorkflowStep({workFlowId: payload.workFlowId})
                ]);
              } else {
                return from([
                  new NotProcessingWorkflowStep(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingWorkflowStep(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataWorkflowStep>(WorkflowStepActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.WORKFLOW_STEP_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataWorkflowStep({workFlowId: payload.workFlowId})
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
