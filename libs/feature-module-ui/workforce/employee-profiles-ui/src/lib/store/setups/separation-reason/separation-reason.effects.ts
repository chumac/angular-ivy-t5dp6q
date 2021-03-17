import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  SeparationReasonSetupActionTypes,
  LoadDataSeparationReasonSetup,
  LoadDataSeparationReasonSetupSuccess,
  SaveSeparationReasonSetup,
  NotProcessingSeparationReasonSetup,
  HideEditorSeparationReasonSetup,
  DeleteDataSeparationReasonSetup,
  AddSeparationReasonSetup,
  NotLoadingSeparationReasonSetup,
} from './separation-reason.actions';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { ISeparationReasons } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../root';

@Injectable()
export class SeparationReasonSetupEffects {
  constructor(private actions$: Actions,
              private apiService: ApiService,
              private store: Store<IEmployeesProfileState>,
              private utilService: UtilService) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataSeparationReasonSetup>(SeparationReasonSetupActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SEPARATION_REASON_SETUP_URLs.loadData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingSeparationReasonSetup());
                return new LoadDataSeparationReasonSetupSuccess(<ISeparationReasons[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage :  'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
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
    .ofType<AddSeparationReasonSetup>(SeparationReasonSetupActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.SEPARATION_REASON_SETUP_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingSeparationReasonSetup(),
                  new HideEditorSeparationReasonSetup(),
                  new LoadDataSeparationReasonSetup()
                ]);
              } else {
                return from([
                  new NotProcessingSeparationReasonSetup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingSeparationReasonSetup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveSeparationReasonSetup>(SeparationReasonSetupActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SEPARATION_REASON_SETUP_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingSeparationReasonSetup(),
                  new HideEditorSeparationReasonSetup(),
                  new LoadDataSeparationReasonSetup()
                ]);
              } else {
                return from([
                  new NotProcessingSeparationReasonSetup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingSeparationReasonSetup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataSeparationReasonSetup>(SeparationReasonSetupActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.SEPARATION_REASON_SETUP_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataSeparationReasonSetup()
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
