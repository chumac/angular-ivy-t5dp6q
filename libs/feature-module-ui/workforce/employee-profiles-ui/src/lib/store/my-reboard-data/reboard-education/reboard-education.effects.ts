import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  ReboardEducationActionTypes,
  LoadDataReboardEducation,
  LoadDataReboardEducationSuccess,
  SaveReboardEducation,
  NotProcessingReboardEducation,
  HideEditorReboardEducation,
  LoadDocumentReboardEducation,
  LoadDocumentReboardEducationSuccess,
  LoadInlineDocumentReboardEducation,
  LoadInstitutionsReboardEducation,
  LoadInstitutionsReboardEducationSuccess,
  LoadCountryListReboardEducation,
  LoadCountryListReboardEducationSuccess,
  LoadAllInstitutionsReboardEducation,
  SaveUpdateReboardEducation,
  DeleteDataReboardEducation,
  LoadDataItemReboardEducation,
  LoadDataItemReboardEducationSuccess
} from './reboard-education.actions';
import { IEducation } from '@nutela/models/workforce/employee-profiles';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { INationality } from '@nutela/models/platform/lookup';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class ReboardEducationEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataReboardEducation>(ReboardEducationActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.REBOARD_EDUCATIONAL_HISTORY_DATA_URLs.getList)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataReboardEducationSuccess(<IEducation[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadDataItem$: Observable<Action> = this.actions$
    .ofType<LoadDataItemReboardEducation>(ReboardEducationActionTypes.LOAD_DATA_ITEM)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${constants.REBOARD_EDUCATIONAL_HISTORY_DATA_URLs.dataItem}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataItemReboardEducationSuccess(<IEducation>(data.Results[0]));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveReboardEducation>(ReboardEducationActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.REBOARD_EDUCATIONAL_HISTORY_DATA_URLs.create;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingReboardEducation(),
                  new HideEditorReboardEducation(),
                  new LoadDataReboardEducation(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardEducation(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReboardEducation(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  submitUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateReboardEducation>(ReboardEducationActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.REBOARD_EDUCATIONAL_HISTORY_DATA_URLs.update}/${payload.recordId}`;
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingReboardEducation(),
                  new HideEditorReboardEducation(),
                  new LoadDataReboardEducation(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardEducation(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReboardEducation(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataReboardEducation>(ReboardEducationActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.REBOARD_EDUCATIONAL_HISTORY_DATA_URLs.deleteData}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataReboardEducation(),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  loadDocument$: Observable<Action> = this.actions$
    .ofType<LoadDocumentReboardEducation>(ReboardEducationActionTypes.LOAD_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.REBOARD_EDUCATIONAL_HISTORY_DATA_URLs.document;
        return this.apiService
          .read(`${url}/${payload.recordId}`)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success) {
                  let docData = null;

                  if (data.Results && data.Results.length > 0) {
                    const result = data.Results[0];
                    docData = this.utilService.getDocumentData(result.data, result.extension);
                  }

                  return new LoadDocumentReboardEducationSuccess(docData);
                } else {
                  return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
      })
    );

  @Effect()
  loadInlineDocument$: Observable<Action> = this.actions$
    .ofType<LoadInlineDocumentReboardEducation>(ReboardEducationActionTypes.LOAD_INLINE_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.REBOARD_EDUCATIONAL_HISTORY_DATA_URLs.document;
        return this.apiService
          .read(`${url}/${payload.recordId}`)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success) {
                  let docData = null;

                  if (data.Results && data.Results.length > 0) {
                    const result = data.Results[0];
                    docData = this.utilService.getDocumentData(result.data, result.extension);

                    return new Download(docData);
                  } else {
                    return new Download(null);
                  }
                } else {
                  return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
      })
    );

      @Effect()
      loadInstitutionsData$: Observable<Action> = this.actions$
        .ofType<LoadInstitutionsReboardEducation>(
          ReboardEducationActionTypes.LOAD_INSTITUTION_LIST
        )
        .pipe(
          map(action => action.payload),
          switchMap((payload) => {
            return this.apiService
              .read(`${constants.EDUCATIONAL_HISTORY_DATA_URLs.institutionsList}/${payload.countryCode}`)
              .pipe(
                map((data: any) => {
                  if (data.Success && data.Results) {
                    const institutionsList = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                    return new LoadInstitutionsReboardEducationSuccess(<INationality[]>(
                      data.Results
                    ));
                  } else {
                    return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                  }
                }),
                catchError((error: any) =>
                  of(
                    new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                  )
                )
              );
          })
        );

        @Effect()
        loadAllInstitutionsData$: Observable<Action> = this.actions$
          .ofType<LoadAllInstitutionsReboardEducation>(
            ReboardEducationActionTypes.LOAD_ALL_INSTITUTION_LIST
          )
          .pipe(
            switchMap(() => {
              console.log('All inst payload')
              return this.apiService
                .read(`${constants.EDUCATIONAL_HISTORY_DATA_URLs.allInstitutionsList}`)
                .pipe(
                  map((data: any) => {
                    if (data.Success && data.Results) {
                      const institutionsList = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                      return new LoadInstitutionsReboardEducationSuccess(<INationality[]>(
                        data.Results
                      ));
                    } else {
                      return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                    }
                  }),
                  catchError((error: any) =>
                    of(
                      new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                    )
                  )
                );
            })
          );

        @Effect()
        loadCountryListData$: Observable<Action> = this.actions$
          .ofType<LoadCountryListReboardEducation>(
            ReboardEducationActionTypes.LOAD_COUNTRY_LIST
          )
          .pipe(
            switchMap(() => {
              return this.apiService
                .read(`${constants.EDUCATIONAL_HISTORY_DATA_URLs.countryList}`)
                .pipe(
                  map((data: any) => {
                    if (data.Success && data.Results) {
                      const countryList = this.utilService.transformToSelectDataList(data.Results, 'description', 'description');
                      return new LoadCountryListReboardEducationSuccess(<ISelectOption[]>(
                        countryList
                      ));
                    } else {
                      return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                    }
                  }),
                  catchError((error: any) =>
                    of(
                      new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                    )
                  )
                );
            })
          );

}
