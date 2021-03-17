import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';

import { LoadHrReboardProfilePicture, LoadHrReboardProfilePictureSuccess, HrReboardProfilePictureActionTypes, LoadAwaitingApprovalHrReboardProfilePicture, LoadAwaitingApprovalHrReboardProfilePictureSuccess, SaveHrReboardProfilePicture, NotProcessingHrReboardProfilePicture, HideEditorHrReboardProfilePicture, DeleteAwaitingApprovalHrReboardProfilePicture, SaveUpdateHrReboardProfilePicture } from './hr-reboard-profile-picture.actions';
import { GENERAL, ToastTypes, PROFILE_AVATAR } from '@nutela/shared/app-global';
import { IProfilePicture } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class HrReboardProfilePictureEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadHrReboardProfilePicture$: Observable<Action> = this.actions$
    .ofType<LoadHrReboardProfilePicture>(HrReboardProfilePictureActionTypes.LOAD_EMPLOYEE_PHOTO)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.HR_REBOARD_PROFILE_PICTURE_DATA_URLs.awaitingApprovalProfilePhoto}?employeeID=${payload}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const photo = data.Results.length > 0 ? `${GENERAL.pngBase64Header}${data.Results[0].image_profile}` : `${PROFILE_AVATAR.uri}`;
                return new LoadHrReboardProfilePictureSuccess(photo);
              } else {
                return new LoadHrReboardProfilePictureSuccess(PROFILE_AVATAR.uri);
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Employee Photo Could Not Be Loaded', message: `Something went wrong. Form data could not be loaded. Error occured.`, type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadAwaitingApprovalHrReboardProfilePicture$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalHrReboardProfilePicture>(HrReboardProfilePictureActionTypes.LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.HR_REBOARD_PROFILE_PICTURE_DATA_URLs.awaitingApprovalProfilePhoto}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalHrReboardProfilePictureSuccess(<IProfilePicture>data.Results[0]);
              } else {
                return new LoadAwaitingApprovalHrReboardProfilePictureSuccess(undefined);
              }
            }),
            catchError((error: any) =>
              of(
                new LoadAwaitingApprovalHrReboardProfilePictureSuccess(undefined)
              )
            )
          );
      })
    );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveHrReboardProfilePicture>(HrReboardProfilePictureActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.HR_REBOARD_PROFILE_PICTURE_DATA_URLs.profilePhotoUpdate}/${payload.employeeId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new LoadAwaitingApprovalHrReboardProfilePicture(),
                  new NotProcessingHrReboardProfilePicture(),
                  new HideEditorHrReboardProfilePicture()
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardProfilePicture(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardProfilePicture(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  submitUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateHrReboardProfilePicture>(HrReboardProfilePictureActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.HR_REBOARD_PROFILE_PICTURE_DATA_URLs.profilePhotoUpdate}/${payload.employeeId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new LoadAwaitingApprovalHrReboardProfilePicture(),
                  new NotProcessingHrReboardProfilePicture(),
                  new HideEditorHrReboardProfilePicture()
                ]);
              } else {
                return from([
                  new NotProcessingHrReboardProfilePicture(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHrReboardProfilePicture(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  deleteAwaitingApprovalHrReboardProfilePicture$: Observable<Action> = this.actions$
    .ofType<DeleteAwaitingApprovalHrReboardProfilePicture>(HrReboardProfilePictureActionTypes.DELETE_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .delete(`${constants.HR_REBOARD_PROFILE_PICTURE_DATA_URLs.deleteAwaitingApprovalData}/${payload}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),
                 new LoadAwaitingApprovalHrReboardProfilePicture()
                ]);
              } else {
                return from([
                  new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );
}
