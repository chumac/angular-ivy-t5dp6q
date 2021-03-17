import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';

import { LoadProfilePicture, LoadProfilePictureSuccess, ProfilePictureActionTypes, LoadAwaitingApprovalProfilePicture, LoadAwaitingApprovalProfilePictureSuccess, SaveProfilePicture, NotProcessingProfilePicture, HideEditorProfilePicture, DeleteAwaitingApprovalProfilePicture } from './profile-picture.actions';
import { GENERAL, ToastTypes, PROFILE_AVATAR } from '@nutela/shared/app-global';
import { IProfilePicture } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class ProfilePictureEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadProfilePicture$: Observable<Action> = this.actions$
    .ofType<LoadProfilePicture>(ProfilePictureActionTypes.LOAD_EMPLOYEE_PHOTO)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.PROFILE_PICTURE_DATA_URLs.profilePhoto}/${payload}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const photo = data.Results.length > 0 ? `${GENERAL.pngBase64Header}${data.Results[0].image_profile}` : `${PROFILE_AVATAR.uri}`;
                return new LoadProfilePictureSuccess(photo);
              } else {
                return new LoadProfilePictureSuccess(PROFILE_AVATAR.uri);
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
  loadAwaitingApprovalProfilePicture$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalProfilePicture>(ProfilePictureActionTypes.LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.PROFILE_PICTURE_DATA_URLs.awaitingApprovalProfilePhoto}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalProfilePictureSuccess(<IProfilePicture>data.Results[0]);
              } else {
                return new LoadAwaitingApprovalProfilePictureSuccess(undefined);
              }
            }),
            catchError((error: any) =>
              of(
                new LoadAwaitingApprovalProfilePictureSuccess(undefined)
              )
            )
          );
      })
    );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveProfilePicture>(ProfilePictureActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.PROFILE_PICTURE_DATA_URLs.profilePhotoUpdate, payload)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was submitted successfully.`, type: ToastTypes.SUCCESS}),
                  new LoadAwaitingApprovalProfilePicture(),
                  new NotProcessingProfilePicture(),
                  new HideEditorProfilePicture()
                ]);
              } else {
                return from([
                  new NotProcessingProfilePicture(),
                  new ShowToast({title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingProfilePicture(),
                new ShowToast({title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.` + error, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  deleteAwaitingApprovalProfilePicture$: Observable<Action> = this.actions$
    .ofType<DeleteAwaitingApprovalProfilePicture>(ProfilePictureActionTypes.DELETE_AWAITING_APPROVAL_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .delete(`${constants.PROFILE_PICTURE_DATA_URLs.deleteAwaitingApprovalData}/${payload}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),
                 new LoadAwaitingApprovalProfilePicture()
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
