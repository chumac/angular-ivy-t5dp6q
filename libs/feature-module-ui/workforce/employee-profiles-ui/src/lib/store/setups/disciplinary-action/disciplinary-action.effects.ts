import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  DisciplinaryActionSetupActionTypes,
  LoadDataDisciplinaryActionSetup,
  LoadDataDisciplinaryActionSetupSuccess,
  SaveDisciplinaryActionSetup,
  NotProcessingDisciplinaryActionSetup,
  HideEditorDisciplinaryActionSetup,
  DeleteDataDisciplinaryActionSetup,
  AddDisciplinaryActionSetup,
  NotLoadingDisciplinaryActionSetup,
  UpdateDisciplinaryActionSetup,
} from './disciplinary-action.actions';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { IPersonal, IDisciplinaryActionDefinition } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../root';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class DisciplinaryActionSetupEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService, private store: Store<IEmployeesProfileState>) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataDisciplinaryActionSetup>(DisciplinaryActionSetupActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.DISCIPLINARY_ACTION_SETUP_URLs.loadData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDisciplinaryActionSetup())
                return new LoadDataDisciplinaryActionSetupSuccess(<IDisciplinaryActionDefinition[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message: (data.error.status == 401) ? data.error.ErrorMessage : 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDisciplinaryActionSetup(),
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  addData$: Observable<Action> = this.actions$
    .ofType<AddDisciplinaryActionSetup>(DisciplinaryActionSetupActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.DISCIPLINARY_ACTION_SETUP_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingDisciplinaryActionSetup(),
                  new HideEditorDisciplinaryActionSetup(),
                  new LoadDataDisciplinaryActionSetup()
                ]);
              } else {
                return from([
                  new NotProcessingDisciplinaryActionSetup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingDisciplinaryActionSetup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveDisciplinaryActionSetup>(DisciplinaryActionSetupActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.DISCIPLINARY_ACTION_SETUP_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingDisciplinaryActionSetup(),
                  new HideEditorDisciplinaryActionSetup(),
                  new LoadDataDisciplinaryActionSetup()
                ]);
              } else {
                return from([
                  new NotProcessingDisciplinaryActionSetup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingDisciplinaryActionSetup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateData$: Observable<Action> = this.actions$
    .ofType<UpdateDisciplinaryActionSetup>(DisciplinaryActionSetupActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.DISCIPLINARY_ACTION_SETUP_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingDisciplinaryActionSetup(),
                  new HideEditorDisciplinaryActionSetup(),
                  new LoadDataDisciplinaryActionSetup()
                ]);
              } else {
                return from([
                  new NotProcessingDisciplinaryActionSetup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingDisciplinaryActionSetup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataDisciplinaryActionSetup>(DisciplinaryActionSetupActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.DISCIPLINARY_ACTION_SETUP_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataDisciplinaryActionSetup()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );
}
