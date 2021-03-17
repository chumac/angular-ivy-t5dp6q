import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  ControlActionTypes,
  LoadDataControl,
  LoadDataControlSuccess,
  SaveControl,
  NotProcessingControl,
  HideEditorControl,
  DeleteDataControl,
  LoadDocumentControl,
  LoadDocumentControlSuccess,
  LoadInlineDocumentControl,
  RemoveDataControl,
  AddControl,
  LoadCustomPageListControl,
  LoadCustomPageListControlSuccess,
  NotProcessingGridControl,
  LoadSectionListControl,
  LoadSectionListControlSuccess
} from './control.actions';
import { IControl, ISection } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { IPerformanceState } from '../../root/performance.state';

@Injectable()
export class ControlEffects {
  constructor(private store: Store<IPerformanceState>, private actions$: Actions, private apiService: ApiService, private utilService: UtilService) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataControl>(ControlActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.CONTROL_URLs.getControlData}/${payload.pageID}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotProcessingGridControl());
                return new LoadDataControlSuccess(<IControl[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotProcessingGridControl());
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
    loadSectionData$: Observable<Action> = this.actions$
      .ofType<LoadSectionListControl>(ControlActionTypes.LOAD_SECTION_LIST)
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService
            .read(`${constants.CONTROL_URLs.getSectionList}/${payload.pageID}/${payload.widgetID}`)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  this.store.dispatch(new NotProcessingGridControl());
                  return new LoadSectionListControlSuccess(<ISection[]>(
                    data.Results
                  ));
                } else {
                  this.store.dispatch(new NotProcessingGridControl());
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
    loadCustomPageData$: Observable<Action> = this.actions$
      .ofType<LoadCustomPageListControl>(ControlActionTypes.LOAD_CUSTOM_PAGE_LIST)
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService
            .read(`${constants.CONTROL_URLs.getPageByAssetType}/${payload}`)
            .pipe(
              map((data: any) => {
                if (data.Success) {
                  return new LoadCustomPageListControlSuccess(<IControl[]>(
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
    .ofType<AddControl>(ControlActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.CONTROL_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingControl(),
                  //  new LoadDataControl(),
                  new HideEditorControl()
                ]);
              } else {
                return from([
                  new NotProcessingControl(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingControl(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveControl>(ControlActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.CONTROL_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingControl(),
                  new HideEditorControl(),
                  // new LoadDataControl()
                ]);
              } else {
                return from([
                  new NotProcessingControl(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingControl(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataControl>(ControlActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.CONTROL_URLs.archiveData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  // new LoadDataControl()
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
