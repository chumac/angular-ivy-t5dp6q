import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  HrReboardEducationActionTypes,
  LoadDataHrReboardEducation,
  LoadDataHrReboardEducationSuccess,
  SaveHrReboardEducation,
  NotProcessingHrReboardEducation,
  HideEditorHrReboardEducation,
  LoadDocumentHrReboardEducation,
  LoadDocumentHrReboardEducationSuccess,
  LoadInlineDocumentHrReboardEducation,
  LoadInstitutionsHrReboardEducation,
  LoadInstitutionsHrReboardEducationSuccess,
  LoadCountryListHrReboardEducation,
  LoadCountryListHrReboardEducationSuccess,
  LoadAllInstitutionsHrReboardEducation,
  SaveUpdateHrReboardEducation,
  DeleteDataHrReboardEducation
} from './hr-reboard-education.actions';
import { IEducation } from '@nutela/models/workforce/employee-profiles';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { INationality } from '@nutela/models/platform/lookup';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class HrReboardEducationEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataHrReboardEducation>(HrReboardEducationActionTypes.LOAD_DATA)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.HR_REBOARD_EDUCATIONAL_HISTORY_DATA_URLs.getList}?employeeID=${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataHrReboardEducationSuccess(<IEducation[]>(
                  data.Results[0]
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
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveHrReboardEducation>(HrReboardEducationActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.HR_REBOARD_EDUCATIONAL_HISTORY_DATA_URLs.createData}/${payload.employeeId}`;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingHrReboardEducation(),
                  new HideEditorHrReboardEducation(),
                  new LoadDataHrReboardEducation({ employeeId: payload.employeeId })
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardEducation(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardEducation(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  submitUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateHrReboardEducation>(HrReboardEducationActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.HR_REBOARD_EDUCATIONAL_HISTORY_DATA_URLs.updateAwaitingApprovalData}/${payload.recordId}/${payload.employeeId}`;
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingHrReboardEducation(),
                  new LoadDataHrReboardEducation({ employeeId: payload.employeeId }),
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardEducation(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardEducation(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataHrReboardEducation>(HrReboardEducationActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.HR_REBOARD_EDUCATIONAL_HISTORY_DATA_URLs.deleteAwaitingApprovalData}/${payload.employeeId}/${payload.educationId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataHrReboardEducation({ employeeId: payload.employeeId })
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
    .ofType<LoadDocumentHrReboardEducation>(HrReboardEducationActionTypes.LOAD_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.HR_REBOARD_EDUCATIONAL_HISTORY_DATA_URLs.documentAwaitingApproval;
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

                  return new LoadDocumentHrReboardEducationSuccess(docData);
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
    .ofType<LoadInlineDocumentHrReboardEducation>(HrReboardEducationActionTypes.LOAD_INLINE_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.HR_REBOARD_EDUCATIONAL_HISTORY_DATA_URLs.documentAwaitingApproval;
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
        .ofType<LoadInstitutionsHrReboardEducation>(
          HrReboardEducationActionTypes.LOAD_INSTITUTION_LIST
        )
        .pipe(
          map(action => action.payload),
          switchMap((payload) => {
            return this.apiService
              .read(`${constants.HR_REBOARD_EDUCATIONAL_HISTORY_DATA_URLs.institutionsList}/${payload.countryCode}`)
              .pipe(
                map((data: any) => {
                  if (data.Success && data.Results) {
                    const institutionsList = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                    return new LoadInstitutionsHrReboardEducationSuccess(<INationality[]>(
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
          .ofType<LoadAllInstitutionsHrReboardEducation>(
            HrReboardEducationActionTypes.LOAD_ALL_INSTITUTION_LIST
          )
          .pipe(
            switchMap(() => {
              console.log('All inst payload')
              return this.apiService
                .read(`${constants.HR_REBOARD_EDUCATIONAL_HISTORY_DATA_URLs.allInstitutionsList}`)
                .pipe(
                  map((data: any) => {
                    if (data.Success && data.Results) {
                      const institutionsList = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                      return new LoadInstitutionsHrReboardEducationSuccess(<INationality[]>(
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
          .ofType<LoadCountryListHrReboardEducation>(
            HrReboardEducationActionTypes.LOAD_COUNTRY_LIST
          )
          .pipe(
            switchMap(() => {
              return this.apiService
                .read(`${constants.HR_REBOARD_EDUCATIONAL_HISTORY_DATA_URLs.countryList}`)
                .pipe(
                  map((data: any) => {
                    if (data.Success && data.Results) {
                      const countryList = this.utilService.transformToSelectDataList(data.Results, 'description', 'description');
                      return new LoadCountryListHrReboardEducationSuccess(<ISelectOption[]>(
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
