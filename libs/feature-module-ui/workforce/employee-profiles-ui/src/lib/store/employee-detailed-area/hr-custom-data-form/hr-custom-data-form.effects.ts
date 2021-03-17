import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  HrCustomDataFormActionTypes,
  LoadDataHrCustomDataForm,
  LoadDataHrCustomDataFormSuccess,
  SaveHrCustomDataForm,
  NotProcessingHrCustomDataForm,
  HideEditorHrCustomDataForm,
  DeleteDataHrCustomDataForm,
  AddHrCustomDataForm,
  SubmitHrCustomDataForm,
  NotProcessingAltHrCustomDataForm,
} from './hr-custom-data-form.actions';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { ISelectOption } from 'dist/libs/models/core-data';
import { IHrCustomDataForm } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class HrCustomDataFormEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataHrCustomDataForm>(HrCustomDataFormActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.HR_CUSTOM_DATA_FORM_URLs.getHrCustomDataFormData}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataHrCustomDataFormSuccess(<IHrCustomDataForm[]>(
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
    .ofType<AddHrCustomDataForm>(HrCustomDataFormActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.HR_CUSTOM_DATA_FORM_URLs.add}/${payload.employeeId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingHrCustomDataForm(),
                  new HideEditorHrCustomDataForm(),
                  new LoadDataHrCustomDataForm({employeeId: payload.employeeId})
                ]);
              } else {
                return from([
                  new NotProcessingHrCustomDataForm(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrCustomDataForm(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveHrCustomDataForm>(HrCustomDataFormActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.HR_CUSTOM_DATA_FORM_URLs.update}/${payload.recordId}?employeeID=${payload.employeeId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingHrCustomDataForm(),
                  new HideEditorHrCustomDataForm(),
                  new LoadDataHrCustomDataForm({employeeId: payload.employeeId})
                ]);
              } else {
                return from([
                  new NotProcessingHrCustomDataForm(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrCustomDataForm(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );


    @Effect()
    submitData$: Observable<Action> = this.actions$
      .ofType<SubmitHrCustomDataForm>(HrCustomDataFormActionTypes.SUBMIT_DATA)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .update(`${constants.HR_CUSTOM_DATA_FORM_URLs.submitData}/${payload.recordId}?employeeID=${payload.employeeId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Record was submitted successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingAltHrCustomDataForm(),
                    new HideEditorHrCustomDataForm(),  
                    new LoadDataHrCustomDataForm({employeeId: payload.employeeId})
                  ]);
                } else {
                  return from([
                    new NotProcessingAltHrCustomDataForm(),
                    new ShowToast({title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not submitted.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingAltHrCustomDataForm(),
                  new ShowToast({title: 'Data Could Not Be Submitted', message: `Something went wrong. Record was not submitted.`, options: toastOptionsError()})
                ])
              )
            );
        })
      );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataHrCustomDataForm>(HrCustomDataFormActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.HR_CUSTOM_DATA_FORM_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  // new LoadDataHrCustomDataForm()
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
