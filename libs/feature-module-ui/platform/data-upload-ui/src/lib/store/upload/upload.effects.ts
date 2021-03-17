import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  UploadActionTypes,
  LoadUploadData,
  LoadUploadSuccess,
  NotProcessingUpload,
  HideEditorUpload,
  SaveUpload,
  UpdateUpload,
  DeleteUpload,
  NotLoadingUpload,
  LoadDestination,
  LoadDestinationSuccess,
  LoadStatus,
  LoadStatusSuccess,
  LoadTemplateData,
  LoadTemplateSuccess,
  LoadUploadStatus,
  LoadUploadStatusSuccess,
  ReverseUpload,

} from './upload.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { IDataUploadState } from '../root';
import { IUpload } from '@nutela/models/platform/data-upload';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class UploadEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IDataUploadState>) {}

  @Effect()
  loadUploadData$: Observable<Action> = this.actions$
    .ofType<LoadUploadData>(UploadActionTypes.LOAD_UPLOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        // const url = payload.referenceId?`${constants.Upload.byReference}/${payload.referenceId}`: `${constants.Upload.byStatus}/${payload.statusId}`;
        const url =`${constants.Upload.byStatus}/${payload.statusId}`;
        console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success) {
                this.store.dispatch(new NotLoadingUpload());
                return new LoadUploadSuccess((
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingUpload());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage:'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
            of(
              new NotProcessingUpload(),
              new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
            )
          )
        );
      })
    );

    @Effect()
    loadTemplateData$: Observable<Action> = this.actions$
      .ofType<LoadTemplateData>(UploadActionTypes.LOAD_TEMPLATE_DATA)
      .pipe(
        switchMap(()=> {
          return this.apiService
            .read(constants.Upload.templateUpload)
            .pipe(
              map((data: any) => {
                console.log('data', data);
                if (data.Success) {
                  this.store.dispatch(new NotLoadingUpload());
                  return new LoadTemplateSuccess((
                    data.Results
                  ));
                } else {
                  this.store.dispatch(new NotLoadingUpload());
                  return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage:'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                }
              }),
              catchError((error: any) =>
              of(
                new NotProcessingUpload(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
        })
      );

      @Effect()
      loadUploadStatusData$: Observable<Action> = this.actions$
        .ofType<LoadUploadStatus>(UploadActionTypes.LOAD_UPLOAD_STATUS)
        .pipe(
          map(action => action.payload),
          switchMap((payload)=> {
            const url =`${constants.Upload.uploadStatus}/${payload.Id}`;
            return this.apiService
              .read(url)
              .pipe(
                map((data: any) => {
                  console.log('data', data);
                  if (data.Success) {
                    this.store.dispatch(new NotLoadingUpload());
                    return new LoadUploadStatusSuccess((
                      data.Results
                    ));
                  } else {
                    this.store.dispatch(new NotLoadingUpload());
                    return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage:'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                  }
                }),
                catchError((error: any) =>
                of(
                  new NotProcessingUpload(),
                  new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
          })
        );

    @Effect()
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveUpload>(UploadActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          // console.log('data',payload.data);
          return this.apiService
            .create(constants.Upload.add, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                // console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingUpload(),
                    new HideEditorUpload(),
                    new LoadDestination(),
                    new LoadUploadData({statusId:payload.statusId})
                  ]);
                } else {
                  return from([
                    new NotProcessingUpload(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
             of(
               new NotProcessingUpload(),
               new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
             )
           )
         );
        })
      );

      @Effect()
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdateUpload>(UploadActionTypes.UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          console.log('data update',payload.data);
          return this.apiService
            .update(`${constants.Upload.add}/${payload.recordId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingUpload(),
                    new HideEditorUpload(),
                  ]);
                } else {
                  return from([
                    new NotProcessingUpload(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
              of(
                new NotProcessingUpload(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
        })
      );

      @Effect()
    reverseData$: Observable<Action> = this.actions$
      .ofType<ReverseUpload>(UploadActionTypes.REVERSE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('data update');
          return this.apiService
            .update(`${constants.Upload.reverse}/${payload.recordId}`, null)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was reversed successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingUpload(),
                    new HideEditorUpload(),
                    new LoadUploadData({statusId:payload.statusId}),
                  ]);
                } else {
                  return from([
                    new NotProcessingUpload(),
                    new ShowToast({title: 'Data Could Not Be reversed', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
              of(
                new NotProcessingUpload(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
        })
      );

      @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteUpload>(UploadActionTypes.DELETE_UPLOAD_DATA)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            console.log(`${constants.Upload.delete}/${payload.recordId}`);
            return this.apiService
              .delete(`${constants.Upload.delete}/${payload.recordId}`)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                      new LoadUploadData({statusId:payload.statusId})

                    ]);
                  } else {
                    return from([
                      new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError()}),
                    ]);
                  }
                }),
                catchError((error: any) =>
             of(
               new NotProcessingUpload(),
               new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
             )
           )
         );
          })
        );

        @Effect()
        loadStatus$: Observable<Action> = this.actions$
          .ofType<LoadStatus>(UploadActionTypes.LOAD_STATUS)
          .pipe(
            switchMap(() => {
              return this.apiService
                .read(constants.Upload.status)
                .pipe(
                  map((data: any) => {
                    if (data.Success) {
                      console.log('stat', data)
                      const status=this.utilService.transformToSelectDataList(data.Results,"id","description");
                      return new LoadStatusSuccess(<ISelectOption[]>(
                        status
                      ));
                    } else {
                      return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
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
          loadDestination$: Observable<Action> = this.actions$
            .ofType<LoadDestination>(UploadActionTypes.LOAD_DESTINATION)
            .pipe(
              switchMap(() => {
                return this.apiService
                  .read(constants.Upload.destination)
                  .pipe(
                    map((data: any) => {
                      if (data.Success) {
                        return new LoadDestinationSuccess(<ISelectOption[]>(
                          data.Results
                        ));
                      } else {
                        return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
                      }
                    }),
                    catchError((error: any) =>
                    of(
                      new NotProcessingUpload(),
                      new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                    )
                  )
                );
              })
            );

}

