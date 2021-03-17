import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';
import {
  GuarantorActionTypes,
  LoadApprovedDataGuarantor,
  LoadApprovedDataGuarantorSuccess,
  LoadAwaitingApprovalDataGuarantor,
  LoadAwaitingApprovalDataGuarantorSuccess,
  SaveGuarantor,
  NotProcessingGuarantor,
  HideEditorGuarantor,
  DeleteApprovedDataGuarantor,
  DeleteAwaitingApprovalDataGuarantor,
  LoadDocumentGuarantor,
  LoadDocumentGuarantorSuccess,
  LoadInlineDocumentGuarantor,
  LoadInlineDocumentGuarantorSuccess,
  RemoveAwaitingApprovalDataGuarantor,
  RemoveApprovedDataGuarantor,
  LoadApprovedPhotoGuarantor,
  LoadApprovedPhotoGuarantorSuccess,
  LoadAwaitingApprovalPhotoGuarantor,
  LoadAwaitingApprovalPhotoGuarantorSuccess,
  LoadDataGuarantor
} from './guarantor.actions';
import { IGuarantor } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { GENERAL } from '@nutela/shared/app-global';

@Injectable()
export class GuarantorEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) { }

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataGuarantor>(GuarantorActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PERSONAL_GUARANTORS_DATA_URLs.approvedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataGuarantorSuccess(<IGuarantor[]>(
                  data.Results[0]
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
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataGuarantor>(
      GuarantorActionTypes.LOAD_AWAITING_APPROVAL_DATA
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            constants.PERSONAL_GUARANTORS_DATA_URLs
              .awaitingApprovalData
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataGuarantorSuccess(<IGuarantor[]>(
                  data.Results[0]
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
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveGuarantor>(GuarantorActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.editMode ? `${constants.PERSONAL_GUARANTORS_DATA_URLs.update}?guarantorID=${payload.recordId}` : constants.PERSONAL_GUARANTORS_DATA_URLs.add;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was submitted successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingGuarantor(),
                  new HideEditorGuarantor(),
                  new LoadDataGuarantor(),
                ]);
              } else {
                return from([
                  new NotProcessingGuarantor(),
                  new ShowToast({ title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingGuarantor(),
                new ShowToast({ title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteApprovedData$: Observable<Action> = this.actions$
    .ofType<DeleteApprovedDataGuarantor>(GuarantorActionTypes.DELETE_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.PERSONAL_GUARANTORS_DATA_URLs.deleteApprovedData}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new RemoveApprovedDataGuarantor({ recordId: payload.recordId }),
                  new LoadDataGuarantor(),
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

  @Effect()
  deleteAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<DeleteAwaitingApprovalDataGuarantor>(GuarantorActionTypes.DELETE_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.PERSONAL_GUARANTORS_DATA_URLs.deleteAwaitingApprovalData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new RemoveAwaitingApprovalDataGuarantor({ recordId: payload.recordId }),
                  new LoadDataGuarantor(),
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

  @Effect()
  loadDocument$: Observable<Action> = this.actions$
    .ofType<LoadDocumentGuarantor>(GuarantorActionTypes.LOAD_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.isApproved?`${constants.PERSONAL_GUARANTORS_DATA_URLs.documentApproved}`: constants.PERSONAL_GUARANTORS_DATA_URLs.documentAwaitingApproval;
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

                return new LoadDocumentGuarantorSuccess(docData);
              } else {
                return new ShowToast({ title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  loadInlineDocument$: Observable<Action> = this.actions$
    .ofType<LoadInlineDocumentGuarantor>(GuarantorActionTypes.LOAD_INLINE_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.isApproved?`${constants.PERSONAL_GUARANTORS_DATA_URLs.documentApproved}`: constants.PERSONAL_GUARANTORS_DATA_URLs.documentAwaitingApproval;
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

                return new LoadInlineDocumentGuarantorSuccess(docData);
              } else {
                return new ShowToast({ title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  loadApprovedPhoto$: Observable<Action> = this.actions$
    .ofType<LoadApprovedPhotoGuarantor>(GuarantorActionTypes.LOAD_APPROVED_PHOTO)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.PERSONAL_GUARANTORS_DATA_URLs.approvedImage}/${payload.recordId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                return new LoadApprovedPhotoGuarantorSuccess(photo);
              } else {
                return new LoadApprovedPhotoGuarantorSuccess({});
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
    .ofType<LoadAwaitingApprovalPhotoGuarantor>(GuarantorActionTypes.LOAD_AWAITING_APPROVAL_PHOTO)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.PERSONAL_GUARANTORS_DATA_URLs.awaitingApprovalImage}/${payload.recordId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                return new LoadAwaitingApprovalPhotoGuarantorSuccess(photo);
              } else {
                return new LoadAwaitingApprovalPhotoGuarantorSuccess({});
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
      .ofType<LoadDataGuarantor>(GuarantorActionTypes.REFRESH_DATA)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.PERSONAL_GUARANTORS_DATA_URLs.refreshData)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return data
                } else {
                  return new ShowToast({title: 'Data Could Not Be Refreshed', message: 'Something went wrong. Data could not be refreshed.', options: toastOptionsError()});
                }
              }),
              switchMap((data : any) => {
                const approvedData = data.Results.filter(val => val.approval_status === constants.APPROVAL_STATUS.approved);
                const awaitingApprovalData = data.Results.filter(val => val.approval_status === constants.APPROVAL_STATUS.queued);
                return from([
                  new LoadApprovedDataGuarantorSuccess(<IGuarantor[]>(approvedData)),
                  new LoadAwaitingApprovalDataGuarantorSuccess(<IGuarantor[]>(awaitingApprovalData)),
                ])
              })
            );
        })
      );

}
