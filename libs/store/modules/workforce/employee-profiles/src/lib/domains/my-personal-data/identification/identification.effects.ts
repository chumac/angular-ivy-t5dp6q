import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsSuccess } from '@nutela/core-services';

import {
  IdentificationActionTypes,
  LoadApprovedDataIdentification,
  LoadApprovedDataIdentificationSuccess,
  LoadAwaitingApprovalDataIdentification,
  LoadAwaitingApprovalDataIdentificationSuccess,
  SaveIdentification,
  NotProcessingIdentification,
  HideEditorIdentification,
  DeleteAwaitingApprovalDataIdentification,
  LoadSignatureImage,
  LoadSignatureImageSuccess,
  LoadAwaitingApprovalSignatureImage,
  LoadAwaitingApprovalSignatureImageSuccess
} from './identification.actions';
import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { GENERAL, ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class IdentificationEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataIdentification>(IdentificationActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PERSONAL_INFORMATION_IDENTIFICATION_DATA_URLs.approvedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadApprovedDataIdentificationSuccess(<IIdentification>(
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
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataIdentification>(
      IdentificationActionTypes.LOAD_AWAITING_APPROVAL_DATA
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            constants.PERSONAL_INFORMATION_IDENTIFICATION_DATA_URLs
              .awaitingApprovalData
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataIdentificationSuccess(<IIdentification>(
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
    .ofType<SaveIdentification>(IdentificationActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.PERSONAL_INFORMATION_IDENTIFICATION_DATA_URLs.update, payload)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was submitted successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingIdentification(),
                  new HideEditorIdentification(),
                  new LoadApprovedDataIdentification(),
                  new LoadAwaitingApprovalDataIdentification(),
                  new LoadAwaitingApprovalSignatureImage(),
                ]);
              } else {
                return from([
                  new NotProcessingIdentification(),
                  new ShowToast({ title: 'Data Could Not Be Submitted ', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingIdentification(),
                new ShowToast({ title: 'Data Could Not Be Submitted ', message: `Something went wrong. Form data could not be submitted . Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

    @Effect()
    deleteAwaitingApprovalData$: Observable<Action> = this.actions$
      .ofType<DeleteAwaitingApprovalDataIdentification>(IdentificationActionTypes.DELETE_AWAITING_APPROVAL_DATA)
      .pipe(
        switchMap(() => {

          return this.apiService
            .delete(constants.PERSONAL_INFORMATION_IDENTIFICATION_DATA_URLs.deleteAwaitingApprovalData)
            .pipe(
              switchMap((data: IApiResult) => {

                if (data.Success) {
                  return from([
                    new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                    new LoadAwaitingApprovalDataIdentification(),
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
  loadSignatureImage$: Observable<Action> = this.actions$
    .ofType<LoadSignatureImage>(IdentificationActionTypes.LOAD_SIGNATURE_IMAGE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PERSONAL_INFORMATION_IDENTIFICATION_DATA_URLs.signatureImage)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const image = `${GENERAL.pngBase64Header}${data.Results[0]}`;
                return new LoadSignatureImageSuccess(image);
              } else {
                return new LoadSignatureImageSuccess({});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Signature Image Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );


  @Effect()
  loadAwaitingApprovalSignatureImage$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalSignatureImage>(IdentificationActionTypes.LOAD_AWAITING_APPROVAL_SIGNATURE_IMAGE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PERSONAL_INFORMATION_IDENTIFICATION_DATA_URLs.awaitingApprovalSignatureImage)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const photo = `${GENERAL.pngBase64Header}${data.Results[0]}`;
                return new LoadAwaitingApprovalSignatureImageSuccess(photo);
              } else {
                return new LoadAwaitingApprovalSignatureImageSuccess({});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Awaiting Approval Signature Image Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

}
