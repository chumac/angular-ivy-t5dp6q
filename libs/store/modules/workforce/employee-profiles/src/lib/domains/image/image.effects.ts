import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';

import { LoadEmployeePhoto, ImageActionTypes, LoadEmployeePhotoSuccess, LoadReportsToEmployeePhoto, LoadReportsToEmployeePhotoSuccess } from './image.actions';
import { GENERAL, ToastTypes, PROFILE_AVATAR } from '@nutela/shared/app-global';

@Injectable()
export class ImageEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadEmployeePhoto$: Observable<Action> = this.actions$
    .ofType<LoadEmployeePhoto>(ImageActionTypes.LOAD_EMPLOYEE_PHOTO)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.IMAGE_URLs.profilePhoto}/${payload}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const photo = data.Results.length > 0 ? `${GENERAL.pngBase64Header}${data.Results[0].image_profile}` : PROFILE_AVATAR.uri;
                return new LoadEmployeePhotoSuccess(photo);
              } else {
                return new LoadEmployeePhotoSuccess(PROFILE_AVATAR.uri);
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Employee Photo Could Not Be Loaded', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadReportsToEmployeePhoto$: Observable<Action> = this.actions$
    .ofType<LoadReportsToEmployeePhoto>(ImageActionTypes.LOAD_REPORTS_TO_EMPLOYEE_PHOTO)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.IMAGE_URLs.profilePhoto}/${payload}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const photo = data.Results.length > 0 ? `${GENERAL.pngBase64Header}${data.Results[0].image_profile}`: PROFILE_AVATAR.uri;  // Use only image_profile from returned object
                return new LoadReportsToEmployeePhotoSuccess(photo);
              } else {
                return new LoadReportsToEmployeePhotoSuccess(PROFILE_AVATAR.uri);
              }
            }),
            catchError((error: any) =>
              of(
                new LoadReportsToEmployeePhotoSuccess(PROFILE_AVATAR.uri)
                // new ShowToast({title: 'Reports To Employee Photo Could Not Be Loaded', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

}
