import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  RefereeActionTypes,
  LoadApprovedDataReferee,
  LoadApprovedDataRefereeSuccess,
  LoadAwaitingApprovalDataReferee,
  LoadAwaitingApprovalDataRefereeSuccess,
  SaveReferee,
  NotProcessingReferee,
  HideEditorReferee,
  DeleteApprovedDataReferee,
  DeleteAwaitingApprovalDataReferee,
  LoadDocumentReferee,
  LoadDocumentRefereeSuccess,
  LoadInlineDocumentReferee,
  RemoveAwaitingApprovalDataReferee,
  RemoveApprovedDataReferee,
  LoadApprovedPhotoReferee,
  LoadApprovedPhotoRefereeSuccess,
  LoadAwaitingApprovalPhotoReferee,
  LoadAwaitingApprovalPhotoRefereeSuccess,
  LoadDataReferee
} from './referee.actions';
import { IReferee } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { GENERAL } from '@nutela/shared/app-global';

@Injectable()
export class RefereeEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataReferee>(RefereeActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.REFEREES_DATA_URLs.approvedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataRefereeSuccess(<IReferee[]>(
                  data.Results[0]
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
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataReferee>(
      RefereeActionTypes.LOAD_AWAITING_APPROVAL_DATA
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            constants.REFEREES_DATA_URLs
              .awaitingApprovalData
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataRefereeSuccess(<IReferee[]>(
                  data.Results[0]
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
  submittedata$: Observable<Action> = this.actions$
    .ofType<SaveReferee>(RefereeActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.editMode?`${constants.REFEREES_DATA_URLs.update}?perRefereeID=${payload.recordId}`: constants.REFEREES_DATA_URLs.add;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was submitted successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingReferee(),
                  new HideEditorReferee(),
                  new LoadDataReferee(),
                ]);
              } else {
                return from([
                  new NotProcessingReferee(),
                  new ShowToast({title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReferee(),
                new ShowToast({title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteApprovedData$: Observable<Action> = this.actions$
    .ofType<DeleteApprovedDataReferee>(RefereeActionTypes.DELETE_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.REFEREES_DATA_URLs.deleteApprovedData}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new RemoveApprovedDataReferee({recordId: payload.recordId}),
                  new LoadDataReferee(),
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
    .ofType<DeleteAwaitingApprovalDataReferee>(RefereeActionTypes.DELETE_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
        .delete(`${constants.REFEREES_DATA_URLs.deleteAwaitingApprovalData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new RemoveAwaitingApprovalDataReferee({recordId: payload.recordId}),
                  new LoadDataReferee(),
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
    .ofType<LoadDocumentReferee>(RefereeActionTypes.LOAD_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.isApproved?`${constants.REFEREES_DATA_URLs.documentApproved}`: constants.REFEREES_DATA_URLs.documentAwaitingApproval;
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

                  return new LoadDocumentRefereeSuccess(docData);
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
    .ofType<LoadInlineDocumentReferee>(RefereeActionTypes.LOAD_INLINE_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.isApproved?`${constants.REFEREES_DATA_URLs.documentApproved}`: constants.REFEREES_DATA_URLs.documentAwaitingApproval;
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
    loadApprovedPhoto$: Observable<Action> = this.actions$
      .ofType<LoadApprovedPhotoReferee>(RefereeActionTypes.LOAD_APPROVED_PHOTO)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .read(`${constants.REFEREES_DATA_URLs.approvedImage}/${payload.recordId}`)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                  return new LoadApprovedPhotoRefereeSuccess(photo);
                } else {
                  return new LoadApprovedPhotoRefereeSuccess({});
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({ title: 'Approved Photo Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
                )
              )
            );
        })
      );






    @Effect()
    loadAwaitingApprovalPhoto$: Observable<Action> = this.actions$
      .ofType<LoadAwaitingApprovalPhotoReferee>(RefereeActionTypes.LOAD_AWAITING_APPROVAL_PHOTO)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .read(`${constants.REFEREES_DATA_URLs.awaitingApprovalImage}/${payload.recordId}`)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                  return new LoadAwaitingApprovalPhotoRefereeSuccess(photo);
                } else {
                  return new LoadAwaitingApprovalPhotoRefereeSuccess({});
                }
              }),
              catchError((error: any) =>
                of(
                  new ShowToast({ title: 'Awaiting Approval Photo Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
                )
              )
            );
        })
      );

      @Effect()
      refreshData$: Observable<Action> = this.actions$
        .ofType<LoadDataReferee>(RefereeActionTypes.REFRESH_DATA)
        .pipe(
          switchMap(() => {
            return this.apiService
              .read(constants.REFEREES_DATA_URLs.refreshData)
              .pipe(
                map((data: any) => {
                  if (data.Success && data.Results) {
                    return data
                  } else {
                    return new ShowToast({title: 'Data Could Not Be Refreshed', message: 'Something went wrong. Data could not be refreshed.', options: toastOptionsError()});
                  }
                }),
                switchMap((data : any) => {
                  if (data && data.Results) {
                    const approvedData = data.Results.filter(val => val.approval_status === constants.APPROVAL_STATUS.approved);
                    const awaitingApprovalData = data.Results.filter(val => val.approval_status === constants.APPROVAL_STATUS.queued);
                    return from([
                      new LoadApprovedDataRefereeSuccess(<IReferee[]>(approvedData)),
                      new LoadAwaitingApprovalDataRefereeSuccess(<IReferee[]>(awaitingApprovalData)),
                    ])
                  } else {
                    return from([
                      new LoadApprovedDataRefereeSuccess([]),
                      new LoadAwaitingApprovalDataRefereeSuccess([]),
                    ])
                  }
                })
              );
          })
        );


}
