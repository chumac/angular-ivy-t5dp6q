import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  OptionActionTypes,
  LoadCustomOption,
  LoadCustomOptionSuccess,
  LoadGlobalOption,
  LoadGlobalOptionSuccess,
  SaveCustomOption,
  SaveGlobalOption,
  NotProcessingOption,
  HideEditorOption,
  DeleteOption,

} from './option.actions';
import { IOptions } from '@nutela/models/foundation';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { IHRFoundationState } from '../root';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class OptionEffects {
  constructor(private actions$: Actions,
              private apiService: ApiService,
              private utilService: UtilService,
              private store: Store<IHRFoundationState>) {}

  @Effect()
  loadCustomData$: Observable<Action> = this.actions$
    .ofType<LoadCustomOption>(OptionActionTypes.LOAD_CUSTOM_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.CUSTOM_OPTIONS_URLs.approvedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingOption());
                return new LoadCustomOptionSuccess(<IOptions[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR});
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
    loadGlobalData$: Observable<Action> = this.actions$
      .ofType<LoadGlobalOption>(OptionActionTypes.LOAD_GLOBAL_APPROVED_DATA)
      .pipe(
        switchMap(() => {

          return this.apiService
            .read(constants.GLOBAL_OPTIONS_URLs.approvedData)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  this.store.dispatch(new NotProcessingOption());
                  return new LoadGlobalOptionSuccess(<IOptions[]>(
                    data.Results
                  ));
                } else {
                  return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR});
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
  saveCustomData$: Observable<Action> = this.actions$
    .ofType<SaveCustomOption>(OptionActionTypes.SAVE_CUSTOM)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.CUSTOM_OPTIONS_URLs.update}/${payload.optionKey}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingOption(),
                  new HideEditorOption(),
                  new LoadCustomOption(),
                ]);
              } else {
                return from([
                  new NotProcessingOption(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingOption(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

    @Effect()
    deleteCustomOption$: Observable<Action> = this.actions$
      .ofType<DeleteOption>(OptionActionTypes.DELETE_OPTION_DATA)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .delete(`${constants.CUSTOM_OPTIONS_URLs.delete}/${payload.optionKey}`)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                    new LoadCustomOption(),
                  ]);
                } else {
                  return from([
                    new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
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
      saveGlobalData$: Observable<Action> = this.actions$
        .ofType<SaveGlobalOption>(OptionActionTypes.SAVE_GLOBAL)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .create(`${constants.GLOBAL_OPTIONS_URLs.update}`, payload.data)
              .pipe(
                switchMap((data: IApiResult) => {
                  console.log(data);
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                      new NotProcessingOption(),
                      new HideEditorOption(),
                      new LoadCustomOption(),
                    ]);
                  } else {
                    return from([
                      new NotProcessingOption(),
                      new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                    ]);
                  }
                }),
                catchError((error: any) =>
                  from([
                    new NotProcessingOption(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                  ])
                )
              );
          })
        );
  }
