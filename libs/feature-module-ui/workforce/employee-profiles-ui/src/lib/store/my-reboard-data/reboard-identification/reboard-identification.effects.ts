import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService } from '@nutela/core-services';

import {
  ReboardIdentificationActionTypes,
  LoadDataReboardIdentification,
  LoadDataReboardIdentificationSuccess,
  SaveReboardIdentification,
  NotProcessingReboardIdentification,
  HideEditorReboardIdentification,
  LoadSignatureImageReboardIdentification,
  LoadSignatureImageReboardIdentificationSuccess,
  LoadPaygroupDataReboardIdentification,
  LoadPaygroupDataReboardIdentificationSuccess,
  LoadGradeDataReboardIdentification,
  LoadGradeDataReboardIdentificationSuccess,
  NotLoadingReboardIdentification,
  LoadPositionDataReboardIdentification,
  LoadPositionDataReboardIdentificationSuccess,
  SaveUpdateReboardIdentification
} from './reboard-identification.actions';
import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { GENERAL, ToastTypes } from '@nutela/shared/app-global';
import { IReboardIdentificationState } from './reboard-identification.state';

@Injectable()
export class ReboardIdentificationEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService, private store: Store<IReboardIdentificationState>) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataReboardIdentification>(ReboardIdentificationActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.REBOARD_IDENTIFICATION_DATA_URLs.get)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataReboardIdentificationSuccess(<IIdentification>(
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
    .ofType<SaveReboardIdentification>(ReboardIdentificationActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(constants.REBOARD_IDENTIFICATION_DATA_URLs.update, payload)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingReboardIdentification(),
                  new HideEditorReboardIdentification(),
                  new LoadDataReboardIdentification(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardIdentification(),
                  new ShowToast({ title: 'Data Could Not Be Saved ', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReboardIdentification(),
                new ShowToast({ title: 'Data Could Not Be Saved ', message: `Something went wrong. Form data could not be saved . Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
  );

  @Effect()
  submitUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateReboardIdentification>(ReboardIdentificationActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(constants.REBOARD_IDENTIFICATION_DATA_URLs.update, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                  new NotProcessingReboardIdentification(),
                  new HideEditorReboardIdentification(),
                  new LoadDataReboardIdentification(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardIdentification(),
                  new ShowToast({ title: 'Data Could Not Be Saved ', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReboardIdentification(),
                new ShowToast({ title: 'Data Could Not Be Saved ', message: `Something went wrong. Form data could not be saved . Error occured.`, type: ToastTypes.ERROR})
              ])
            )
          );
      })
    );

  @Effect()
  loadSignatureImageReboardIdentification$: Observable<Action> = this.actions$
    .ofType<LoadSignatureImageReboardIdentification>(ReboardIdentificationActionTypes.LOAD_SIGNATURE_IMAGE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.REBOARD_IDENTIFICATION_DATA_URLs.signatureImage)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const image = `${GENERAL.pngBase64Header}${data.Results[0]}`;
                return new LoadSignatureImageReboardIdentificationSuccess(image);
              } else {
                return new LoadSignatureImageReboardIdentificationSuccess({});
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
  loadPaygroups$: Observable<Action> = this.actions$
    .ofType<LoadPaygroupDataReboardIdentification>(ReboardIdentificationActionTypes.LOAD_PAYGROUP)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.SELECT_OPTION_URLs.paygroup}/${payload.gradeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const paygroupsTransformed = this.utilService.transformToSelectDataList(data.Results, 'paygroup_id', 'description');
                this.store.dispatch(new NotLoadingReboardIdentification());
                return new LoadPaygroupDataReboardIdentificationSuccess(
                  paygroupsTransformed
                );
              } else {
                this.store.dispatch(new NotLoadingReboardIdentification());
                return new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingReboardIdentification(),
                new ShowToast({ title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPaygrades$: Observable<Action> = this.actions$
    .ofType<LoadGradeDataReboardIdentification>(ReboardIdentificationActionTypes.LOAD_GRADE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SELECT_OPTION_URLs.grade)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const paygradesTransformed = this.utilService.transformToSelectDataList(data.Results, 'grade_id', 'description');
                this.store.dispatch(new NotLoadingReboardIdentification());
                return new LoadGradeDataReboardIdentificationSuccess(
                  paygradesTransformed
                );
              } else {
                this.store.dispatch(new NotLoadingReboardIdentification());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingReboardIdentification(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPositions$: Observable<Action> = this.actions$
    .ofType<LoadPositionDataReboardIdentification>(ReboardIdentificationActionTypes.LOAD_GRADE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SELECT_OPTION_URLs.grade)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const paygradesTransformed = this.utilService.transformToSelectDataList(data.Results, 'position_id', 'description');
                this.store.dispatch(new NotLoadingReboardIdentification());
                return new LoadPositionDataReboardIdentificationSuccess(
                  paygradesTransformed
                );
              } else {
                this.store.dispatch(new NotLoadingReboardIdentification());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingReboardIdentification(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

}
