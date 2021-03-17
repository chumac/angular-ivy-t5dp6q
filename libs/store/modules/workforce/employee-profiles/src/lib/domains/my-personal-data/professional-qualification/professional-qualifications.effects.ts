import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  ProfessionalQualificationsActionTypes,
  LoadApprovedDataProfessionalQualifications,
  LoadApprovedDataProfessionalQualificationsSuccess,
  LoadAwaitingApprovalDataProfessionalQualifications,
  LoadAwaitingApprovalDataProfessionalQualificationsSuccess,
  SaveProfessionalQualifications,
  NotProcessingProfessionalQualifications,
  HideEditorProfessionalQualifications,
  DeleteApprovedDataProfessionalQualifications,
  DeleteAwaitingApprovalDataProfessionalQualifications,
  LoadDocumentProfessionalQualifications,
  LoadDocumentProfessionalQualificationsSuccess,
  LoadInlineDocumentProfessionalQualifications,
  RemoveAwaitingApprovalDataProfessionalQualifications,
  RemoveApprovedDataProfessionalQualifications,
  LoadApprovedDataItemProfessionalQualifications,
  LoadApprovedDataItemProfessionalQualificationsSuccess,
  LoadDataProfessionalQualifications
} from './professional-qualifications.actions';
import { IProfessionalQualification } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';

@Injectable()
export class ProfessionalQualificationsEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) { }

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataProfessionalQualifications>(ProfessionalQualificationsActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PROFESSIONAL_QUALIFICATIONS_DATA_URLs.approvedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataProfessionalQualificationsSuccess(<IProfessionalQualification[]>(
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
    loadApprovedDataItem$: Observable<Action> = this.actions$
      .ofType<LoadApprovedDataItemProfessionalQualifications>(ProfessionalQualificationsActionTypes.LOAD_APPROVED_DATA_ITEM)
      .pipe(
        map(action => action.payload),
        mergeMap((payload) => {
          return this.apiService
            .read(`${constants.PROFESSIONAL_QUALIFICATIONS_DATA_URLs.approvedDataItem}/${payload.recordId}`)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadApprovedDataItemProfessionalQualificationsSuccess(<IProfessionalQualification>(data.Results[0]));
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
    .ofType<LoadAwaitingApprovalDataProfessionalQualifications>(
      ProfessionalQualificationsActionTypes.LOAD_AWAITING_APPROVAL_DATA
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            constants.PROFESSIONAL_QUALIFICATIONS_DATA_URLs
              .awaitingApprovalData
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataProfessionalQualificationsSuccess(<IProfessionalQualification[]>(
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
    .ofType<SaveProfessionalQualifications>(ProfessionalQualificationsActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.editMode ? `${constants.PROFESSIONAL_QUALIFICATIONS_DATA_URLs.update}?proQualificationID=${payload.recordId}` : constants.PROFESSIONAL_QUALIFICATIONS_DATA_URLs.add;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was submitted successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingProfessionalQualifications(),
                  new HideEditorProfessionalQualifications(),
                  new LoadDataProfessionalQualifications(),
                ]);
              } else {
                return from([
                  new NotProcessingProfessionalQualifications(),
                  new ShowToast({ title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingProfessionalQualifications(),
                new ShowToast({ title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteApprovedData$: Observable<Action> = this.actions$
    .ofType<DeleteApprovedDataProfessionalQualifications>(ProfessionalQualificationsActionTypes.DELETE_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.PROFESSIONAL_QUALIFICATIONS_DATA_URLs.deleteApprovedData}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  // new RemoveApprovedDataProfessionalQualifications({ recordId: payload.recordId }),
                  new LoadDataProfessionalQualifications(),
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
    .ofType<DeleteAwaitingApprovalDataProfessionalQualifications>(ProfessionalQualificationsActionTypes.DELETE_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.PROFESSIONAL_QUALIFICATIONS_DATA_URLs.deleteAwaitingApprovalData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  // new RemoveAwaitingApprovalDataProfessionalQualifications({ recordId: payload.recordId }),
                  new LoadDataProfessionalQualifications(),
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
    .ofType<LoadDocumentProfessionalQualifications>(ProfessionalQualificationsActionTypes.LOAD_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.isApproved?`${constants.PROFESSIONAL_QUALIFICATIONS_DATA_URLs.documentApproved}`: constants.PROFESSIONAL_QUALIFICATIONS_DATA_URLs.documentAwaitingApproval;
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

                return new LoadDocumentProfessionalQualificationsSuccess(docData);
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
    .ofType<LoadInlineDocumentProfessionalQualifications>(ProfessionalQualificationsActionTypes.LOAD_INLINE_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.isApproved?`${constants.PROFESSIONAL_QUALIFICATIONS_DATA_URLs.documentApproved}`: constants.PROFESSIONAL_QUALIFICATIONS_DATA_URLs.documentAwaitingApproval;
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
    refreshData$: Observable<Action> = this.actions$
      .ofType<LoadDataProfessionalQualifications>(ProfessionalQualificationsActionTypes.REFRESH_DATA)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.PROFESSIONAL_QUALIFICATIONS_DATA_URLs.refreshData)
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
                  new LoadApprovedDataProfessionalQualificationsSuccess(<IProfessionalQualification[]>(approvedData)),
                  new LoadAwaitingApprovalDataProfessionalQualificationsSuccess(<IProfessionalQualification[]>(awaitingApprovalData)),
                ])
              })
            );
        })
      );

}
