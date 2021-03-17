import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { IApiResult } from '@nutela/models/core-data';
import * as constants from '../../../../lib/constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  AddPreRequisites,
  PreRequisitesActionTypes,
  DeleteDataPreRequisites,
  LoadDataPreRequisites,
  LoadDataPreRequisitesSuccess,
  NotProcessingPreRequisites,
  HideEditorPreRequisites,
  SavePreRequisites,
  LoadDataPreRequisitesType,
  LoadDataPreRequisitesTypeSuccess,
} from './pre-requisites.actions';
import { IEventDetailPreRequisites, IEventDetailPreRequisitesType } from '@nutela/models/talent/learning';
import { ShowToast, Download } from '@nutela/store/shared';

@Injectable()
export class PreRequisitesEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {
  }

  @Effect()
  loadPreRequisitesData$: Observable<Action> = this.actions$
    .ofType<LoadDataPreRequisites>(PreRequisitesActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.EVENT_DETAIL_PRE_REQUISITES_URLs.getEventDetailPreRequisitesData}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataPreRequisitesSuccess(<IEventDetailPreRequisites[]>(
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
  addData$: Observable<Action> = this.actions$
    .ofType<AddPreRequisites>(PreRequisitesActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.EVENT_DETAIL_PRE_REQUISITES_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingPreRequisites(),
                  new HideEditorPreRequisites(),
                  new LoadDataPreRequisites({recordId: payload.eventDetailId})
                ]);
              } else {
                return from([
                  new NotProcessingPreRequisites(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPreRequisites(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SavePreRequisites>(PreRequisitesActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.EVENT_DETAIL_PRE_REQUISITES_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingPreRequisites(),
                  new HideEditorPreRequisites(),
                  new LoadDataPreRequisites({recordId: payload.eventDetailId})
                ]);
              } else {
                return from([
                  new NotProcessingPreRequisites(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPreRequisites(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataPreRequisites>(PreRequisitesActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.EVENT_DETAIL_PRE_REQUISITES_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataPreRequisites({ recordId: payload.eventDetailId })
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
  loadPreRequisitesType$: Observable<Action> = this.actions$
    .ofType<LoadDataPreRequisitesType>(PreRequisitesActionTypes.LOAD_DATA_TYPE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.EVENT_DETAIL_PRE_REQUISITES_URLs.getPreRequisitesType)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataPreRequisitesTypeSuccess(<IEventDetailPreRequisitesType[]>(
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
}
