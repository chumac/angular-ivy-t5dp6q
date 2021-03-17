import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  ContractPageDefinitionActionTypes,
  LoadDataContractPageDefinition,
  LoadDataContractPageDefinitionSuccess,
  SaveContractPageDefinition,
  NotProcessingContractPageDefinition,
  HideEditorContractPageDefinition,
  DeleteDataContractPageDefinition,
  LoadDocumentContractPageDefinition,
  LoadDocumentContractPageDefinitionSuccess,
  LoadInlineDocumentContractPageDefinition,
  RemoveDataContractPageDefinition,
  AddContractPageDefinition,
  LoadContractPageListContractPageDefinition,
  LoadContractPageListContractPageDefinitionSuccess,
} from './contract-page-definition.actions';
import { IContractPageDefinition, IPage } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';

@Injectable()
export class ContractPageDefinitionEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataContractPageDefinition>(ContractPageDefinitionActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.CONTRACT_PAGE_DEFINITION_URLs.getContractPageDefData)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadDataContractPageDefinitionSuccess(<IContractPageDefinition[]>(
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
    loadContractPageData$: Observable<Action> = this.actions$
      .ofType<LoadContractPageListContractPageDefinition>(ContractPageDefinitionActionTypes.LOAD_CONTRACT_PAGE_LIST)
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService
            .read(`${constants.CONTRACT_PAGE_DEFINITION_URLs.getContractPageList}/${payload}`)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  return new LoadContractPageListContractPageDefinitionSuccess(<IPage[]>(
                    data.Results
                  ));
                } else {
                  return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Grid data could not be loaded.', options: toastOptionsError() });
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Grid data could not be loaded. Error occured.', options: toastOptionsError() })
                )
              )
            );
        })
      );

  @Effect()
  addData$: Observable<Action> = this.actions$
    .ofType<AddContractPageDefinition>(ContractPageDefinitionActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.CONTRACT_PAGE_DEFINITION_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingContractPageDefinition(),
                  new HideEditorContractPageDefinition(),
                  new LoadDataContractPageDefinition()
                ]);
              } else {
                return from([
                  new NotProcessingContractPageDefinition(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingContractPageDefinition(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveContractPageDefinition>(ContractPageDefinitionActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.CONTRACT_PAGE_DEFINITION_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingContractPageDefinition(),
                  new HideEditorContractPageDefinition(),
                  new LoadDataContractPageDefinition()
                ]);
              } else {
                return from([
                  new NotProcessingContractPageDefinition(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingContractPageDefinition(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataContractPageDefinition>(ContractPageDefinitionActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.CONTRACT_PAGE_DEFINITION_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataContractPageDefinition()
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
