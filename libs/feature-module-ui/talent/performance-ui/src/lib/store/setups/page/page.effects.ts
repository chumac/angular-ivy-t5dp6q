import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  PageActionTypes,
  LoadDataPage,
  LoadDataPageSuccess,
  SavePage,
  NotProcessingPage,
  HideEditorPage,
  DeleteDataPage,
  LoadDocumentPage,
  LoadDocumentPageSuccess,
  LoadInlineDocumentPage,
  RemoveDataPage,
  AddPage,
  LoadCompletedDataPage,
  LoadUncompletedDataPage,
  LoadUncompletedDataPageSuccess,
  LoadCompletedDataPageSuccess,
  LoadPageType,
  LoadPageTypeSuccess,
} from './page.actions';
import { IPage } from '@nutela/models/talent/performance';
import { IApiResult, IBasicData, ISelectOption } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';

@Injectable()
export class PageEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataPage>(PageActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PAGE_URLs.getPageData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataPageSuccess(<IPage[]>(
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
    loadPageType$: Observable<Action> = this.actions$
      .ofType<LoadPageType>(PageActionTypes.LOAD_PAGE_TYPE)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.PAGE_URLs.getPageTypes)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  const resultset = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                  return new LoadPageTypeSuccess(<ISelectOption[]>(
                    resultset
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
  loadCompletedPageData$: Observable<Action> = this.actions$
    .ofType<LoadCompletedDataPage>(PageActionTypes.LOAD_COMPLETED_PAGE_DATA)
    .pipe(
      switchMap(() => {
        console.log('completed');
        return this.apiService
          .read(constants.PAGE_URLs.getCompletedPageData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                console.log('completed');
                return new LoadCompletedDataPageSuccess(<IPage[]>(
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
  loadUncompletedPageData$: Observable<Action> = this.actions$
    .ofType<LoadUncompletedDataPage>(PageActionTypes.LOAD_UNCOMPLETED_PAGE_DATA)
    .pipe(
      switchMap(() => {
        console.log('uncompleted');
        return this.apiService
          .read(constants.PAGE_URLs.getUncompletedPageData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                console.log('uncompleted');
                return new LoadUncompletedDataPageSuccess(<IPage[]>(
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
    .ofType<AddPage>(PageActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.PAGE_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingPage(),
                  new LoadCompletedDataPage(),
                  new LoadUncompletedDataPage(),
                  new HideEditorPage()
                ]);
              } else {
                return from([
                  new NotProcessingPage(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPage(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SavePage>(PageActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.PAGE_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingPage(),
                  new HideEditorPage(),
                  new LoadCompletedDataPage(),
                  new LoadUncompletedDataPage()
                ]);
              } else {
                return from([
                  new NotProcessingPage(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPage(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataPage>(PageActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.PAGE_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadCompletedDataPage(),
                  new LoadUncompletedDataPage()
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
