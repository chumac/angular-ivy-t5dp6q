import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  FormTemplateDetailActionTypes,
  LoadDataFormTemplateDetail,
  LoadDataFormTemplateDetailSuccess,
  SaveFormTemplateDetail,
  NotProcessingFormTemplateDetail,
  HideEditorFormTemplateDetail,
  DeleteDataFormTemplateDetail,
  LoadDocumentFormTemplateDetail,
  LoadDocumentFormTemplateDetailSuccess,
  LoadInlineDocumentFormTemplateDetail,
  RemoveDataFormTemplateDetail,
  AddFormTemplateDetail,
  LoadTemplateListFormTemplateDetailSuccess,
  LoadTemplateListFormTemplateDetail,
  LoadPageListFormTemplateDetail,
  LoadPageListFormTemplateDetailSuccess,
} from './form-template-detail.actions';
import { IFormTemplateDetail, IFormTemplate, IPage } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';

@Injectable()
export class FormTemplateDetailEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataFormTemplateDetail>(FormTemplateDetailActionTypes.LOAD_DATA)
    .pipe(
      map(action=>action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.FORM_TEMPLATE_DETAIL_URLs.getFormTemplateDetailData}/${payload.formTemplateId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadDataFormTemplateDetailSuccess(<IFormTemplateDetail[]>(
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
  loadTemplateListData$: Observable<Action> = this.actions$
    .ofType<LoadTemplateListFormTemplateDetail>(FormTemplateDetailActionTypes.LOAD_FORM_TEMPLATE_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.FORM_TEMPLATE_DETAIL_URLs.getFormTemplateData)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadTemplateListFormTemplateDetailSuccess(<IFormTemplate[]>(
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
    loadPageListData$: Observable<Action> = this.actions$
      .ofType<LoadPageListFormTemplateDetail>(FormTemplateDetailActionTypes.LOAD_PAGE_LIST)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.FORM_TEMPLATE_DETAIL_URLs.getPageList)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  return new LoadPageListFormTemplateDetailSuccess(<IPage[]>(
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
    .ofType<AddFormTemplateDetail>(FormTemplateDetailActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.FORM_TEMPLATE_DETAIL_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingFormTemplateDetail(),
                  new HideEditorFormTemplateDetail(),
                  new LoadDataFormTemplateDetail({formTemplateId: payload.formTemplateId})
                ]);
              } else {
                return from([
                  new NotProcessingFormTemplateDetail(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFormTemplateDetail(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveFormTemplateDetail>(FormTemplateDetailActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.FORM_TEMPLATE_DETAIL_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingFormTemplateDetail(),
                  new HideEditorFormTemplateDetail(),
                  new LoadDataFormTemplateDetail({formTemplateId: payload.formTemplateId})
                ]);
              } else {
                return from([
                  new NotProcessingFormTemplateDetail(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFormTemplateDetail(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataFormTemplateDetail>(FormTemplateDetailActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.FORM_TEMPLATE_DETAIL_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataFormTemplateDetail({formTemplateId: payload.formTemplateId})
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
