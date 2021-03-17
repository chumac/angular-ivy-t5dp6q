import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  SubscriptionDefinitionActionTypes,
  LoadDataSubscriptionDefinition,
  LoadDataSubscriptionDefinitionSuccess,
  SaveSubscriptionDefinition,
  NotProcessingSubscriptionDefinition,
  HideEditorSubscriptionDefinition,
  DeleteDataSubscriptionDefinition,
  LoadDocumentSubscriptionDefinition,
  LoadDocumentSubscriptionDefinitionSuccess,
  LoadInlineDocumentSubscriptionDefinition,
  RemoveDataSubscriptionDefinition,
  AddSubscriptionDefinition,
  LoadSubscriptionPageListSubscriptionDefinition,
  LoadSubscriptionPageListSubscriptionDefinitionSuccess,
} from './subscription-definition.actions';
import { ISubscriptionDefinition, IPage } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';

@Injectable()
export class SubscriptionDefinitionEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataSubscriptionDefinition>(SubscriptionDefinitionActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SUBSCRIPTION_DEFINITION_URLs.getsubscriptiontDefinitionData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataSubscriptionDefinitionSuccess(<ISubscriptionDefinition[]>(
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
  loadSubscriptionPageData$: Observable<Action> = this.actions$
    .ofType<LoadSubscriptionPageListSubscriptionDefinition>(SubscriptionDefinitionActionTypes.LOAD_SUBSCRIPTION_PAGE_LIST)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.SUBSCRIPTION_DEFINITION_URLs.getSubscriptionList}/${payload}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadSubscriptionPageListSubscriptionDefinitionSuccess(<IPage[]>(
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
    .ofType<AddSubscriptionDefinition>(SubscriptionDefinitionActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.SUBSCRIPTION_DEFINITION_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingSubscriptionDefinition(),
                  new HideEditorSubscriptionDefinition(),
                  new LoadDataSubscriptionDefinition()
                ]);
              } else {
                return from([
                  new NotProcessingSubscriptionDefinition(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingSubscriptionDefinition(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveSubscriptionDefinition>(SubscriptionDefinitionActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SUBSCRIPTION_DEFINITION_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingSubscriptionDefinition(),
                  new HideEditorSubscriptionDefinition(),
                  new LoadDataSubscriptionDefinition()
                ]);
              } else {
                return from([
                  new NotProcessingSubscriptionDefinition(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingSubscriptionDefinition(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataSubscriptionDefinition>(SubscriptionDefinitionActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.SUBSCRIPTION_DEFINITION_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataSubscriptionDefinition()
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
