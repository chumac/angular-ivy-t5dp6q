import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  DocumentTagsActionTypes,
  LoadDocumentTagsData,
  LoadDocumentTagsSuccess,
  SaveDocumentTags,
  NotProcessingDocumentTags,
  HideEditorDocumentTags,
  UpdateDocumentTags,
  DeleteDocumentTags,

} from './document-tags.actions';
import { ShowToast } from '@nutela/store/shared';
import { IDocumentTags } from '@nutela/models/platform/lookup';
import { IApiResult } from '@nutela/models/core-data';
import { ILookupState } from '../../store';


@Injectable()
export class DocumentTagsEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<ILookupState>) {}

  @Effect()
  loadDocumentTagsData$: Observable<Action> = this.actions$
    .ofType<LoadDocumentTagsData>(DocumentTagsActionTypes.LOAD_DOCUMENT_TAGS_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.DOCUMENT_TAGS_URLs.data)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success) {
                this.store.dispatch(new NotProcessingDocumentTags());
                return new LoadDocumentTagsSuccess(<IDocumentTags[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

    @Effect()
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveDocumentTags>(DocumentTagsActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          console.log('data',payload.data);
          return this.apiService
            .create(constants.DOCUMENT_TAGS_URLs.add, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingDocumentTags(),
                    new HideEditorDocumentTags(),
                    new LoadDocumentTagsData()
                  ]);
                } else {
                  return from([
                    new NotProcessingDocumentTags(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingDocumentTags(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdateDocumentTags>(DocumentTagsActionTypes.UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          console.log('data update',payload.data);
          return this.apiService
            .update(`${constants.DOCUMENT_TAGS_URLs.update}/${payload.recordId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingDocumentTags(),
                    new HideEditorDocumentTags(),
                    new LoadDocumentTagsData(),
                  ]);
                } else {
                  return from([
                    new NotProcessingDocumentTags(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingDocumentTags(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteDocumentTags>(DocumentTagsActionTypes.DELETE)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            console.log(`${constants.DOCUMENT_TAGS_URLs.delete}/${payload.recordId}`);
            return this.apiService
              .delete(`${constants.DOCUMENT_TAGS_URLs.delete}/${payload.recordId}`)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                      new LoadDocumentTagsData(),
                    ]);
                  } else {
                    return from([
                      new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
                    ]);
                  }
                }),
                catchError((error: any) =>
                  from([
                    new ShowToast({title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
                  ])
                )
              );
          })
        );
}

