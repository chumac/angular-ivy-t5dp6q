import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { IApiResult } from '@nutela/models/core-data';
import * as constants from '../../../../lib/constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  AddFacilitators,
  FacilitatorsActionTypes,
  DeleteDataFacilitators,
  LoadDataFacilitators,
  LoadDataFacilitatorsSuccess,
  NotProcessingFacilitators,
  HideEditorFacilitators,
  LoadDataFacilitatorsType,
  LoadDataFacilitatorsTypeSuccess,
  SaveFacilitators,
  LoadDocumentFacilitatorsSuccess,
  LoadDocumentFacilitators,
  LoadImageFacilitators,
  LoadImageFacilitatorsSuccess,
} from './facilitators.actions';
import { IEventDetailFacilitators, IEventDetailFacilitatorsType } from '@nutela/models/talent/learning';
import { ShowToast, Download } from '@nutela/store/shared';

@Injectable()
export class FacilitatorsEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {
  }

  @Effect()
  loadFacilitatorsData$: Observable<Action> = this.actions$
    .ofType<LoadDataFacilitators>(FacilitatorsActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.FACILITATORS_URLs.getEventDetailFacilitatorsData}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataFacilitatorsSuccess(<IEventDetailFacilitators[]>(
                  data.Results
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
  loadFacilitatorsDocument$: Observable<Action> = this.actions$
    .ofType<LoadDocumentFacilitators>(FacilitatorsActionTypes.LOAD_FACILITATORS_DOCUMENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.EVENT_DETAIL_ASSETS_URLs.getEventDetailAssetsDocument}/?docGuid=${payload.docGuid}`)
          .pipe(
            map((data: any) => {
              let docData = null;
              if (data.Success && data.Results) {
                docData = this.utilService.getDocumentData(data.Results[0], payload.docExt);
                return new LoadDocumentFacilitatorsSuccess(docData);
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
  loadFacilitatorsImage$: Observable<Action> = this.actions$
    .ofType<LoadImageFacilitators>(FacilitatorsActionTypes.LOAD_FACILITATORS_IMAGE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.EVENT_DETAIL_ASSETS_URLs.getEventDetailAssetsDocument}/?docGuid=${payload.docGuid}`)
          .pipe(
            map((data: any) => {
              let docData = null;
              if (data.Success && data.Results) {
                docData = this.utilService.getDocumentData(data.Results[0], payload.docExt);
                return new LoadImageFacilitatorsSuccess(docData);
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
  addData$: Observable<Action> = this.actions$
    .ofType<AddFacilitators>(FacilitatorsActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.FACILITATORS_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingFacilitators(),
                  new HideEditorFacilitators(),
                  new LoadDataFacilitators({ recordId: payload.eventDetailId })
                ]);
              } else {
                return from([
                  new NotProcessingFacilitators(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFacilitators(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveFacilitators>(FacilitatorsActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.FACILITATORS_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingFacilitators(),
                  new HideEditorFacilitators(),
                  new LoadDataFacilitators({ recordId: payload.eventDetailId })
                ]);
              } else {
                return from([
                  new NotProcessingFacilitators(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFacilitators(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataFacilitators>(FacilitatorsActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.FACILITATORS_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataFacilitators({ recordId: payload.eventDetailId })
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
  loadFacilitatorsType$: Observable<Action> = this.actions$
    .ofType<LoadDataFacilitatorsType>(FacilitatorsActionTypes.LOAD_DATA_TYPE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.FACILITATORS_URLs.getFacilitatorsType)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataFacilitatorsTypeSuccess(<IEventDetailFacilitatorsType[]>(
                  data.Results
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
}
