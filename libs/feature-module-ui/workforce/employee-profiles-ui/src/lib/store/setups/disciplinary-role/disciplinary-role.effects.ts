import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  DisciplinaryRoleSetupActionTypes,
  LoadDataDisciplinaryRoleSetup,
  LoadDataDisciplinaryRoleSetupSuccess,
  SaveDisciplinaryRoleSetup,
  NotProcessingDisciplinaryRoleSetup,
  HideEditorDisciplinaryRoleSetup,
  DeleteDataDisciplinaryRoleSetup,
  AddDisciplinaryRoleSetup,
  NotLoadingDisciplinaryRoleSetup,
} from './disciplinary-role.actions';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { IDisciplinaryRoleDefinition } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../root';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class DisciplinaryRoleSetupEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService, private store: Store<IEmployeesProfileState>) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataDisciplinaryRoleSetup>(DisciplinaryRoleSetupActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.DISCIPLINARY_ROLE_SETUP_URLs.loadData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDisciplinaryRoleSetup());
                return new LoadDataDisciplinaryRoleSetupSuccess(<IDisciplinaryRoleDefinition[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message:data.ErrorMessage?data.ErrorMessage:
                    'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDisciplinaryRoleSetup(),
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  addData$: Observable<Action> = this.actions$
    .ofType<AddDisciplinaryRoleSetup>(DisciplinaryRoleSetupActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.DISCIPLINARY_ROLE_SETUP_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingDisciplinaryRoleSetup(),
                  new HideEditorDisciplinaryRoleSetup(),
                  new LoadDataDisciplinaryRoleSetup()
                ]);
              } else {
                return from([
                  new NotProcessingDisciplinaryRoleSetup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingDisciplinaryRoleSetup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveDisciplinaryRoleSetup>(DisciplinaryRoleSetupActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.DISCIPLINARY_ROLE_SETUP_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingDisciplinaryRoleSetup(),
                  new HideEditorDisciplinaryRoleSetup(),
                  new LoadDataDisciplinaryRoleSetup()
                ]);
              } else {
                return from([
                  new NotProcessingDisciplinaryRoleSetup(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingDisciplinaryRoleSetup(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataDisciplinaryRoleSetup>(DisciplinaryRoleSetupActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.DISCIPLINARY_ROLE_SETUP_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataDisciplinaryRoleSetup()
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
