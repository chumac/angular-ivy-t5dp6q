import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  ProcessFormDefinitionActionTypes,
  LoadDataProcessFormDefinition,
  LoadDataProcessFormDefinitionSuccess,
  SaveProcessFormDefinition,
  NotProcessingProcessFormDefinition,
  HideEditorProcessFormDefinition,
  DeleteDataProcessFormDefinition,
  AddProcessFormDefinition,
  LoadAreaProcessFormDefinition,
  LoadAreaProcessFormDefinitionSuccess,
} from './process-form-definition.actions';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { ISelectOption } from 'dist/libs/models/core-data';
import { IProcessFormDefinition, IProcessFormArea } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class ProcessFormDefinitionEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataProcessFormDefinition>(ProcessFormDefinitionActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.PROCESS_FORM_DEFINITION_URLs.getProcessFormDefinitionData}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataProcessFormDefinitionSuccess(<IProcessFormDefinition[]>(
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
  loadArea$: Observable<Action> = this.actions$
    .ofType<LoadAreaProcessFormDefinition>(ProcessFormDefinitionActionTypes.LOAD_AREA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.PROCESS_FORM_DEFINITION_URLs.loadAreaList}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAreaProcessFormDefinitionSuccess(<IProcessFormArea[]>(
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
    .ofType<AddProcessFormDefinition>(ProcessFormDefinitionActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.PROCESS_FORM_DEFINITION_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingProcessFormDefinition(),
                  new HideEditorProcessFormDefinition(),
                  new LoadDataProcessFormDefinition()
                ]);
              } else {
                return from([
                  new NotProcessingProcessFormDefinition(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingProcessFormDefinition(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveProcessFormDefinition>(ProcessFormDefinitionActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.PROCESS_FORM_DEFINITION_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingProcessFormDefinition(),
                  new HideEditorProcessFormDefinition(),
                  new LoadDataProcessFormDefinition()
                ]);
              } else {
                return from([
                  new NotProcessingProcessFormDefinition(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingProcessFormDefinition(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataProcessFormDefinition>(ProcessFormDefinitionActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.PROCESS_FORM_DEFINITION_URLs.delete}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataProcessFormDefinition()
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
