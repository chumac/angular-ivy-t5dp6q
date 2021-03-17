import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, UtilService } from '@nutela/core-services';
import {
  ReboardGuarantorActionTypes,
  LoadDataReboardGuarantor,
  LoadDataReboardGuarantorSuccess,
  SaveReboardGuarantor,
  NotProcessingReboardGuarantor,
  HideEditorReboardGuarantor,
  LoadDocumentReboardGuarantor,
  LoadDocumentReboardGuarantorSuccess,
  LoadInlineDocumentReboardGuarantor,
  LoadInlineDocumentReboardGuarantorSuccess,
  LoadPhotoReboardGuarantor,
  LoadPhotoReboardGuarantorSuccess,
  SaveUpdateReboardGuarantor,
  DeleteDataReboardGuarantor
} from './reboard-guarantor.actions';
import { IGuarantor } from '@nutela/models/workforce/employee-profiles';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { GENERAL, ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class ReboardGuarantorEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataReboardGuarantor>(ReboardGuarantorActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.REBOARD_PERSONAL_GUARANTORS_DATA_URLs.getAll)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataReboardGuarantorSuccess(<IGuarantor[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveReboardGuarantor>(ReboardGuarantorActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.REBOARD_PERSONAL_GUARANTORS_DATA_URLs.create;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingReboardGuarantor(),
                  new HideEditorReboardGuarantor(),
                  new LoadDataReboardGuarantor(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardGuarantor(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReboardGuarantor(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  submitUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateReboardGuarantor>(ReboardGuarantorActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = `${constants.REBOARD_PERSONAL_GUARANTORS_DATA_URLs.update}/${payload.recordId}`;
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingReboardGuarantor(),
                  new HideEditorReboardGuarantor(),
                  new LoadDataReboardGuarantor(),
                ]);
              } else {
                return from([
                  new NotProcessingReboardGuarantor(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingReboardGuarantor(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataReboardGuarantor>(ReboardGuarantorActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.REBOARD_PERSONAL_GUARANTORS_DATA_URLs.deleteData}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDataReboardGuarantor(),
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
  loadDocument$: Observable<Action> = this.actions$
    .ofType<LoadDocumentReboardGuarantor>(ReboardGuarantorActionTypes.LOAD_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.REBOARD_PERSONAL_GUARANTORS_DATA_URLs.document;
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

                return new LoadDocumentReboardGuarantorSuccess(docData);
              } else {
                return new ShowToast({ title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadInlineDocument$: Observable<Action> = this.actions$
    .ofType<LoadInlineDocumentReboardGuarantor>(ReboardGuarantorActionTypes.LOAD_INLINE_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.REBOARD_PERSONAL_GUARANTORS_DATA_URLs.document;
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

                return new LoadInlineDocumentReboardGuarantorSuccess(docData);
              } else {
                return new ShowToast({ title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Document Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPhoto$: Observable<Action> = this.actions$
    .ofType<LoadPhotoReboardGuarantor>(ReboardGuarantorActionTypes.LOAD_PHOTO)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.REBOARD_PERSONAL_GUARANTORS_DATA_URLs.image}/${payload.recordId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                const photo = `${GENERAL.pngBase64Header}${data.Results[0].data}`;
                return new LoadPhotoReboardGuarantorSuccess(photo);
              } else {
                return new LoadPhotoReboardGuarantorSuccess({});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Approved Photo Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

}
