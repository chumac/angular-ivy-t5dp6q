import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import {
  ApiService,
  UtilService,
  toastOptionsError
} from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { DOCUMENT_DATA_URLs } from '../../constants';
import { ToastTypes } from '@nutela/shared/app-global';
import {
  LoadDataDocument,
  DocumentActionTypes,
  LoadDataDocumentSuccess,
  NotProcessingDocument,
  DownloadDocument,
  NotLoadingDocument,
  LoadDocumentType,
  LoadDocumentTypeSuccess
} from './document.actions';
import { IDocument, IDocumentType } from '@nutela/models/platform/document';
import { IAppState } from '@nutela/store/app-state';

@Injectable()
export class DocumentEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  @Effect()
  loadDocumentType$: Observable<Action> = this.actions$
    .ofType<LoadDocumentType>(DocumentActionTypes.LOAD_DOCUMENT_TYPE)
    .pipe(
      switchMap(() => {
        return this.apiService.read(DOCUMENT_DATA_URLs.getDocumentType).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              this.store.dispatch(new NotLoadingDocument());
              return new LoadDocumentTypeSuccess(<IDocumentType[]>data.Results);
            } else {
              this.store.dispatch(new NotLoadingDocument());
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new NotLoadingDocument(),
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataDocument>(DocumentActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${DOCUMENT_DATA_URLs.getDocumentData}/${payload.recordId}`).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              this.store.dispatch(new NotLoadingDocument());
              return new LoadDataDocumentSuccess(<IDocument[]>data.Results);
            } else {
              this.store.dispatch(new NotLoadingDocument());
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
              new NotLoadingDocument(),
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Data could not be loaded. Error occured.',
                options: toastOptionsError()
              })
            )
          )
        );
      })
    );

  @Effect()
  downloadDocumentUrl$: Observable<Action> = this.actions$.pipe(
    ofType<DownloadDocument>(DocumentActionTypes.DOWNLOAD_DOCUMENT),
    map(action => action.payload),
    switchMap(payload => {
      return this.apiService
        .read(`${DOCUMENT_DATA_URLs.getDocumentUrl}?docGuid=${payload.docGuId}.${payload.docExt}`)
        .pipe(
          switchMap((data: IApiResult) => {DataTransferItemList
            if (data.Success && data.Results) {
              this.utilService.openBase64URL(this.utilService.getSafeBase64URL(data.Results[0], this.utilService.getMimeType(payload.docExt)));
              return from([
                new NotProcessingDocument(),
                new ShowToast({
                  title: null,
                  message: 'Document was loaded',
                  type: ToastTypes.INFO
                }),
              ]);
            } else {
              return from([
                new NotProcessingDocument(),
                new ShowToast({
                  title: null,
                  message: 'Document not available.',
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            of(
              new NotProcessingDocument(),
              new ShowToast({
                title: 'Document Could Not Be Loaded',
                message:
                  'Something went wrong. Document data could not be loaded.',
                type: ToastTypes.ERROR
              })
            )
          )
        );
    })
  );
}
