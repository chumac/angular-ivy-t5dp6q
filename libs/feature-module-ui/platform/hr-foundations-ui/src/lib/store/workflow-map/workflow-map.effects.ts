import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  WorkflowMapActionTypes,
  LoadWorkflowMap,
  LoadWorkflowMapSuccess,
  SaveWorkflowMap,
  NotProcessingWorkflowMap,
  HideEditorWorkflowMap,
  LoadSystemData,
  LoadSystemDataSuccess,
  LoadWorkDefinition ,
  LoadWorkDefinitionSuccess,
  DeleteWorkflowMap,
} from './workflow-map.actions';
import { IWorkflowMap} from '@nutela/models/foundation';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast} from '@nutela/store/shared';
import { IHRFoundationState } from '../root';

@Injectable()
export class WorkflowMapEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IHRFoundationState>) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadWorkflowMap>(WorkflowMapActionTypes.LOAD_WORK_MAP_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.WORKFLOW_MAP_URLs.workMap)
          .pipe(
            map((data: any) => {
              console.log(data);
              if (data.Success) {
                this.store.dispatch(new NotProcessingWorkflowMap());
                return new LoadWorkflowMapSuccess(<IWorkflowMap[]>(
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
    loadSystemData$: Observable<Action> = this.actions$
      .ofType<LoadSystemData>(WorkflowMapActionTypes.LOAD_SYSTEM_DATA)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.WORKFLOW_MAP_URLs.systemData)
            .pipe(
              map((data: any) => {
                const system=this.utilService.transformToSelectDataList(data.Results,"entity_id","entitydescription");
                if (data.Success) {
                  console.log('system',data)
                  return new LoadSystemDataSuccess(<ISelectOption[]>(
                    system
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
    loadWorkDefinitionData$: Observable<Action> = this.actions$
      .ofType<LoadWorkDefinition>(WorkflowMapActionTypes.LOAD_WORK_DEFINITION_DATA)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.WORKFLOW_MAP_URLs.workDefinition)
            .pipe(
              map((data: any) => {
                console.log(data);
                const workflow=this.utilService.transformToSelectDataList(data.Results,"wflow_id","description")
                if (data.Success) {
                  return new LoadWorkDefinitionSuccess(<ISelectOption[]>(
                    workflow
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
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveWorkflowMap>(WorkflowMapActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('Saving ...');
       console.log('url from effect',constants.WORKFLOW_MAP_URLs.add);
       return this.apiService
          .create(constants.WORKFLOW_MAP_URLs.add,payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingWorkflowMap(),
                  new HideEditorWorkflowMap()
                ]);
              } else {
                return from([
                  new NotProcessingWorkflowMap(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingWorkflowMap(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

    @Effect()
    deleteData$: Observable<Action> = this.actions$
      .ofType<DeleteWorkflowMap>(WorkflowMapActionTypes.DELETE_WORK_MAP_DATA)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log(`${constants.WORKFLOW_MAP_URLs.delete}/${payload.recordId}`);
          return this.apiService
            .delete(`${constants.WORKFLOW_MAP_URLs.delete}/${payload.recordId}`)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
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
  }
