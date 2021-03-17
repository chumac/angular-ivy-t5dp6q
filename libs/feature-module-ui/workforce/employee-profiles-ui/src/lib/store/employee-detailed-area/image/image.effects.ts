import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';

import { LoadEmployeePhoto, ImageActionTypes, LoadEmployeePhotoSuccess, LoadAwaitingApprovalEmployeePhoto, LoadAwaitingApprovalEmployeePhotoSuccess, SaveEmployeePhoto, NotProcessingImage, HideEditorEmployeePhoto, LoadReportsToEmployeePhoto, LoadReportsToEmployeePhotoSuccess, DeleteAwaitingApprovalEmployeePhoto, LoadEmployeeFilePhoto, LoadEmployeeFilePhotoSuccess } from './image.actions';
import { GENERAL, PROFILE_AVATAR, ToastTypes } from '@nutela/shared/app-global';
import { IProfilePicture } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class ImageEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadEmployeePhoto$: Observable<Action> = this.actions$
    .ofType<LoadEmployeePhoto>(ImageActionTypes.HR_LOAD_EMPLOYEE_PHOTO)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.IMAGE.profilePhoto}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const photo = data.Results.length > 0 ? `${GENERAL.pngBase64Header}${data.Results[0].image_profile}` : `${PROFILE_AVATAR.uri}`;
                return new LoadEmployeePhotoSuccess(photo);
              } else {
                return new LoadEmployeePhotoSuccess(PROFILE_AVATAR.uri);
              }
            }),
            catchError((error: any) => {
              console.error(error);
              return of(
                new ShowToast({ title: 'Employee Photo Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() }),
              )
            }
            )
          );
      })
    );

  @Effect()
  loadEmployeeFilePhoto$: Observable<Action> = this.actions$
    .ofType<LoadEmployeeFilePhoto>(ImageActionTypes.HR_LOAD_EMPLOYEE_FILE_PHOTO)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.IMAGE.profilePhoto}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const photo = data.Results.length > 0 ? `${GENERAL.pngBase64Header}${data.Results[0].image_personal}` : `${PROFILE_AVATAR.uri}`;
                return new LoadEmployeeFilePhotoSuccess(photo);
              } else {
                return new LoadEmployeeFilePhotoSuccess(PROFILE_AVATAR.uri);
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Employee Photo Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() }),
              )
            )
          );
      })
    );

    @Effect()
  loadReportsToEmployeePhoto$: Observable<Action> = this.actions$
    .ofType<LoadReportsToEmployeePhoto>(ImageActionTypes.HR_LOAD_REPORTS_TO_EMPLOYEE_PHOTO)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.IMAGE.profilePhoto}/${payload.reportsToEmployeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const photo = `${GENERAL.pngBase64Header}${data.Results[0].image_profile}`; // Use only image_profile from returned object
                return new LoadReportsToEmployeePhotoSuccess(photo);
              } else {
                return new LoadReportsToEmployeePhotoSuccess(PROFILE_AVATAR.uri);
              }
            }),
            catchError((error: any) =>
              of(
                new LoadReportsToEmployeePhotoSuccess(PROFILE_AVATAR.uri)
              )
            )
          );
      })
    );


    @Effect()
    loadAwaitingApprovalEmployeePhoto$: Observable<Action> = this.actions$
      .ofType<LoadAwaitingApprovalEmployeePhoto>(ImageActionTypes.HR_LOAD_AWAITING_APPROVAL_EMPLOYEE_PHOTO)
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService
            .read(`${constants.IMAGE.awaitingApprovalProfiePhoto}/${payload.employeeId}`)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  console.log(data.Results);
                  return new LoadAwaitingApprovalEmployeePhotoSuccess(<IProfilePicture>data.Results[0]);
                } else {
                  return new LoadAwaitingApprovalEmployeePhotoSuccess(undefined);
                }
              }),
              catchError((error: any) =>
                of(
                  new LoadAwaitingApprovalEmployeePhotoSuccess(undefined)
                )
              )
            );
        })
      );


    @Effect()
    submitData$: Observable<Action> = this.actions$
      .ofType<SaveEmployeePhoto>(ImageActionTypes.HR_SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(constants.IMAGE.profilePhotoUpdate, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was submitted successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingImage(),
                    new HideEditorEmployeePhoto(),
                    new LoadAwaitingApprovalEmployeePhoto({employeeId: payload.employeeId})
                  ]);
                } else {
                  return from([
                    new NotProcessingImage(),
                    new ShowToast({title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingImage(),
                  new ShowToast({title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
      deleteAwaitingApprovalPhoto$: Observable<Action> = this.actions$
        .ofType<DeleteAwaitingApprovalEmployeePhoto>(ImageActionTypes.HR_DELETE_AWAITING_APPROVAL_DATA)
        .pipe(
          map(action => action.payload),
          switchMap((payload) => {
            return this.apiService
              .delete(`${constants.IMAGE.deleteAwaitingApprovalData}/${payload.id}`)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),
                     new LoadAwaitingApprovalEmployeePhoto({employeeId: payload.employeeId})
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
