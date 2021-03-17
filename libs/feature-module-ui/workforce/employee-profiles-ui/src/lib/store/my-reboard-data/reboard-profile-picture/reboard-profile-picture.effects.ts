import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';

import { LoadReboardProfilePicture, LoadReboardProfilePictureSuccess, ReboardProfilePictureActionTypes, LoadAwaitingApprovalReboardProfilePicture, LoadAwaitingApprovalReboardProfilePictureSuccess, SaveReboardProfilePicture, NotProcessingReboardProfilePicture, HideEditorReboardProfilePicture, DeleteAwaitingApprovalReboardProfilePicture, SaveUpdateReboardProfilePicture } from './reboard-profile-picture.actions';
import { GENERAL, ToastTypes, PROFILE_AVATAR } from '@nutela/shared/app-global';
import { IProfilePicture } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class ReboardProfilePictureEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadReboardProfilePicture$: Observable<Action> = this.actions$
    .ofType<LoadReboardProfilePicture>(ReboardProfilePictureActionTypes.LOAD_EMPLOYEE_PHOTO)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.REBOARD_PROFILE_PICTURE_DATA_URLs.profilePhoto}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const photo = data.Results.length > 0 ? `${GENERAL.pngBase64Header}${data.Results[0].image_profile}` : `${PROFILE_AVATAR.uri}`;
                return new LoadReboardProfilePictureSuccess(photo);
              } else {
                return new LoadReboardProfilePictureSuccess(PROFILE_AVATAR.uri);
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

  // @Effect()
  // loadAwaitingApprovalReboardProfilePicture$: Observable<Action> = this.actions$
  //   .ofType<LoadAwaitingApprovalReboardProfilePicture>(ReboardProfilePictureActionTypes.LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO)
  //   .pipe(
  //     switchMap(() => {
  //       return this.apiService
  //         .read(`${constants.PROFILE_PICTURE_DATA_URLs.awaitingApprovalProfilePhoto}`)
  //         .pipe(
  //           map((data: IApiResult) => {
  //             if (data.Success && data.Results) {
  //               return new LoadAwaitingApprovalReboardProfilePictureSuccess(<IProfilePicture>data.Results[0]);
  //             } else {
  //               return new LoadAwaitingApprovalReboardProfilePictureSuccess(undefined);
  //             }
  //           }),
  //           catchError((error: any) =>
  //             of(
  //               new LoadAwaitingApprovalReboardProfilePictureSuccess(undefined)
  //             )
  //           )
  //         );
  //     })
  //   );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveReboardProfilePicture>(ReboardProfilePictureActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.REBOARD_PROFILE_PICTURE_DATA_URLs.profilePhotoUpdate, payload)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new LoadReboardProfilePicture(),
                  new NotProcessingReboardProfilePicture(),
                  new HideEditorReboardProfilePicture()
                ]);
              } else {
                return from([
                  new NotProcessingReboardProfilePicture(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReboardProfilePicture(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  submitUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateReboardProfilePicture>(ReboardProfilePictureActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.REBOARD_PROFILE_PICTURE_DATA_URLs.profilePhotoUpdate, payload)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new LoadAwaitingApprovalReboardProfilePicture(),
                  new NotProcessingReboardProfilePicture(),
                  new HideEditorReboardProfilePicture()
                ]);
              } else {
                return from([
                  new NotProcessingReboardProfilePicture(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReboardProfilePicture(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  // @Effect()
  // deleteAwaitingApprovalReboardProfilePicture$: Observable<Action> = this.actions$
  //   .ofType<DeleteAwaitingApprovalReboardProfilePicture>(ReboardProfilePictureActionTypes.DELETE_AWAITING_APPROVAL_DATA)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap((payload) => {
  //       return this.apiService
  //         .delete(`${constants.PROFILE_PICTURE_DATA_URLs.deleteAwaitingApprovalData}/${payload}`)
  //         .pipe(
  //           switchMap((data: IApiResult) => {
  //             if (data.Success) {
  //               return from([
  //                 new ShowToast({title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),
  //                new LoadAwaitingApprovalReboardProfilePicture()
  //               ]);
  //             } else {
  //               return from([
  //                 new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR})
  //               ]);
  //             }
  //           }),
  //           catchError((error: any) =>
  //             from([
  //               new ShowToast({title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR})
  //             ])
  //           )
  //         );
  //     })
  //   );
}
