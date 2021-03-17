import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  SectionActionTypes, 
  LoadDataSection,
  LoadDataSectionSuccess,
  SaveSection,
  NotProcessingSection,
  HideEditorSection,
  DeleteDataSection,
  LoadDocumentSection,
  LoadDocumentSectionSuccess,
  LoadInlineDocumentSection,
  RemoveDataSection,
  AddSection,
  LoadCustomPageListSection,
  LoadCustomPageListSectionSuccess,
  NotProcessingGridSection
} from './section.actions';
import { ISection } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { IPerformanceState } from '../../root/performance.state';

@Injectable()
export class SectionEffects {
  constructor(private store: Store<IPerformanceState>, private actions$: Actions, private apiService: ApiService, private utilService: UtilService) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataSection>(SectionActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.SECTION_URLs.getSectionData}/${payload.pageID}/${payload.widgetID}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingGridSection());
                return new LoadDataSectionSuccess(<ISection[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotProcessingGridSection());
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
      .ofType<LoadCustomPageListSection>(SectionActionTypes.LOAD_CUSTOM_PAGE_LIST)
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService
            .read(`${constants.SECTION_URLs.getPageByAssetType}/${payload}`)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadCustomPageListSectionSuccess(<ISection[]>(
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
    .ofType<AddSection>(SectionActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.SECTION_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingSection(),
                  //  new LoadDataSection(),
                  new HideEditorSection()
                ]);
              } else {
                return from([
                  new NotProcessingSection(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingSection(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveSection>(SectionActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.SECTION_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingSection(),
                  new HideEditorSection(),
                  // new LoadDataSection()
                ]);
              } else {
                return from([
                  new NotProcessingSection(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingSection(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataSection>(SectionActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.SECTION_URLs.archiveData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  // new LoadDataSection()
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
