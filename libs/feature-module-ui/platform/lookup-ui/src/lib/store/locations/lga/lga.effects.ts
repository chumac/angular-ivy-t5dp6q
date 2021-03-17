import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  LgaActionTypes,
  LoadLgaData,
  LoadLgaSuccess,
  SaveLga,
  NotProcessingLga,
  HideEditorLga,
  UpdateLga,
  DeleteLga,
  LoadNationLga,
  LoadNationLgaSuccess,
  LoadLgaState,
  LoadLgaStateSuccess,

} from './lga.actions';
import { ShowToast } from '@nutela/store/shared';
import { ILga } from '@nutela/models/platform/lookup';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ILookupState } from '../../../store';

@Injectable()
export class LgaEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<ILookupState>) {}

  @Effect()
  loadLgaData$: Observable<Action> = this.actions$
    .ofType<LoadLgaData>(LgaActionTypes.LOAD_LGA_DATA)
    .pipe(
      map(action=>action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.Location_URLs.lgaData}/${payload.stateId}`)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success) {
                this.store.dispatch(new NotProcessingLga());
                return new LoadLgaSuccess(<ILga[]>(
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
      .ofType<SaveLga>(LgaActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          console.log('data',payload.data);
          return this.apiService
            .create(`${constants.Location_URLs.lgaAdd}/${payload.stateId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingLga(),
                    new HideEditorLga(),
                    new LoadLgaData({stateId:payload.stateId})
                  ]);
                } else {
                  return from([
                    new NotProcessingLga(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingLga(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdateLga>(LgaActionTypes.UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          console.log('data update',payload.data);
          return this.apiService
            .update(`${constants.Location_URLs.lgaUpdate}/${payload.stateId}/${payload.LgaId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingLga(),
                    new HideEditorLga(),
                    new LoadLgaData({stateId:payload.stateId})
                  ]);
                } else {
                  return from([
                    new NotProcessingLga(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingLga(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteLga>(LgaActionTypes.DELETE)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            console.log(`${constants.Location_URLs.lgaDelete}/${payload.stateId}/${payload.LgaId}`);
            return this.apiService
              .delete(`${constants.Location_URLs.lgaDelete}/${payload.stateId}/${payload.LgaId}`)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                      new LoadLgaData({stateId:payload.stateId})
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

        @Effect()
        loadNationData$: Observable<Action> = this.actions$
          .ofType<LoadNationLga>(LgaActionTypes.LOAD_NATIONALITY_DATA)
          .pipe(
            switchMap(() => {
              return this.apiService
                .read(constants.Location_URLs.nationalityData)
                .pipe(
                  map((data: any) => {
                    console.log('data',data);
                    if (data.Success) {
                      return new LoadNationLgaSuccess(<ISelectOption[]>(
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
        loadStateData$: Observable<Action> = this.actions$
          .ofType<LoadLgaState>(LgaActionTypes.LOAD_STATE_DATA)
          .pipe(
            map(action => action.payload),
            switchMap(payload=> {
              return this.apiService
                .read(`${constants.Location_URLs.stateData}/${payload.countryId}`)
                .pipe(
                  map((data: any) => {
                    console.log('data',data);
                    if (data.Success) {
                      return new LoadLgaStateSuccess(<ISelectOption[]>(
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
}

