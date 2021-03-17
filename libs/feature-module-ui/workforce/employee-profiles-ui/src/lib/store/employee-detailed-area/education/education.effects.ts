import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  EducationActionTypes,
  LoadApprovedDataEducation,
  LoadApprovedDataEducationSuccess,
  LoadAwaitingApprovalDataEducation,
  LoadAwaitingApprovalDataEducationSuccess,
  SaveEducation,
  NotProcessingEducation,
  HideEditorEducation,
  DeleteApprovedDataEducation,
  DeleteAwaitingApprovalDataEducation,
  LoadDocumentEducation,
  LoadDocumentEducationSuccess,
  LoadInlineDocumentEducation,
  LoadApprovedDataItemEducation,
  LoadApprovedDataItemEducationSuccess,
  LoadInstitutionsEducation,
  LoadInstitutionsEducationSuccess,
  LoadAllInstitutionsEducation,
  LoadCountryListEducation,
  LoadCountryListEducationSuccess,
} from './education.actions';
import { IEducation } from '@nutela/models/workforce/employee-profiles';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { IEmployeesProfileState } from '../../root';
import { INationality } from '@nutela/models/platform/lookup';

@Injectable()
export class EducationEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IEmployeesProfileState>) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataEducation>(EducationActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${constants.EDUCATIONAL_HISTORY.approvedData}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                console.log('data',data);
                this.store.dispatch(new NotProcessingEducation());
                return new LoadApprovedDataEducationSuccess(<IEducation[]>(
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
  loadApprovedDataItem$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataItemEducation>(EducationActionTypes.LOAD_APPROVED_DATA_ITEM)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${constants.EDUCATIONAL_HISTORY.approvedDataItem}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadApprovedDataItemEducationSuccess(<IEducation>(data.Results[0]));
              } else {
                return new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );





  @Effect()
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataEducation>(
      EducationActionTypes.LOAD_AWAITING_APPROVAL_DATA
    )
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${constants.EDUCATIONAL_HISTORY.awaitingApprovalData}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadAwaitingApprovalDataEducationSuccess(<IEducation[]>(
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
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveEducation>(EducationActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.editMode?`${constants.EDUCATIONAL_HISTORY.update}?educationID=${payload.recordId}&employeeID=${payload.employeeId}`: `${constants.EDUCATIONAL_HISTORY.add}?employeeID=${payload.employeeId}`;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was submitted successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingEducation(),
                  new HideEditorEducation(),
                  new LoadApprovedDataEducation({employeeId:payload.employeeId}),
                  new LoadAwaitingApprovalDataEducation({employeeId:payload.employeeId})
                ]);
              } else {
                return from([
                  new NotProcessingEducation(),
                  new ShowToast({title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingEducation(),
                new ShowToast({title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteApprovedData$: Observable<Action> = this.actions$
    .ofType<DeleteApprovedDataEducation>(EducationActionTypes.DELETE_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('HR Delete ', payload);

        return this.apiService
          .create(`${constants.EDUCATIONAL_HISTORY.deleteApprovedData}?educationID=${payload.recordId}&employeeID=${payload.employeeId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadApprovedDataEducation({employeeId:payload.employeeId}),
                  new LoadAwaitingApprovalDataEducation({employeeId:payload.employeeId})
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

  @Effect()
  deleteAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<DeleteAwaitingApprovalDataEducation>(EducationActionTypes.DELETE_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
        .delete(`${constants.EDUCATIONAL_HISTORY.deleteAwaitingApprovalData}?employeeID=${payload.employeeId}&educationID=${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadApprovedDataEducation({employeeId:payload.employeeId}),
                  new LoadAwaitingApprovalDataEducation({employeeId:payload.employeeId})
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

  @Effect()
  loadDocument$: Observable<Action> = this.actions$
    .ofType<LoadDocumentEducation>(EducationActionTypes.LOAD_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.isApproved?`${constants.EDUCATIONAL_HISTORY.documentApproved}`: constants.EDUCATIONAL_HISTORY.documentAwaitingApproval;
        return this.apiService
          .read(`${url}/${payload.recordId}/${payload.employeeId}`)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success) {
                  let docData = null;

                  if (data.Results && data.Results.length > 0) {
                    const result = data.Results[0];
                    docData = this.utilService.getDocumentData(result.data, result.extension);
                  }

                  return new LoadDocumentEducationSuccess(docData);
                } else {
                  return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
                )
              )
            );
      })
    );

  @Effect()
  loadInlineDocument$: Observable<Action> = this.actions$
    .ofType<LoadInlineDocumentEducation>(EducationActionTypes.LOAD_INLINE_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.isApproved?`${constants.EDUCATIONAL_HISTORY.documentApproved}`: constants.EDUCATIONAL_HISTORY.documentAwaitingApproval;
        return this.apiService
          .read(`${url}/${payload.recordId}/${payload.employeeId}`)
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
                  return new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
                )
              )
            );
      })
    );

    @Effect()
    loadInstitutionsData$: Observable<Action> = this.actions$
      .ofType<LoadInstitutionsEducation>(
        EducationActionTypes.LOAD_INSTITUTION_LIST
      )
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService
            .read(`${constants.EDUCATIONAL_HISTORY.institutionsList}/${payload.countryCode}`)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  console.log('institution list: ', data.Results)

                  const institutionsList = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                  return new LoadInstitutionsEducationSuccess(<INationality[]>(
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
      loadAllInstitutionsData$: Observable<Action> = this.actions$
        .ofType<LoadAllInstitutionsEducation>(
          EducationActionTypes.LOAD_ALL_INSTITUTION_LIST
        )
        .pipe(
          switchMap(() => {
            return this.apiService
              .read(`${constants.EDUCATIONAL_HISTORY.allInstitutionsList}`)
              .pipe(
                map((data: any) => {
                  if (data.Success && data.Results) {
                    const institutionsList = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                    return new LoadInstitutionsEducationSuccess(<INationality[]>(
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
      loadCountryListData$: Observable<Action> = this.actions$
        .ofType<LoadCountryListEducation>(
          EducationActionTypes.LOAD_COUNTRY_LIST
        )
        .pipe(
          switchMap(() => {
            return this.apiService
              .read(`${constants.EDUCATIONAL_HISTORY.countryList}`)
              .pipe(
                map((data: any) => {
                  if (data.Success && data.Results) {
                    const countryList = this.utilService.transformToSelectDataList(data.Results, 'description', 'description');
                    return new LoadCountryListEducationSuccess(<ISelectOption[]>(
                      countryList
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
}
