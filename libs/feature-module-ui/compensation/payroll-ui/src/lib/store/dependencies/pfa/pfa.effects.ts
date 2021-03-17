import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  PfaActionTypes,
  LoadPfaData,
  LoadPfaSuccess,
  NotProcessingPfa,
  HideEditorPfa,
  SavePfa,
  UpdatePfa,
  DeletePfa,
  NotLoadingPfa,
  LoadNationPfa,
  LoadNationPfaSuccess,
  LoadStatePfa,
  LoadStatePfaSuccess,
  LoadCityPfa,
  LoadCityPfaSuccess,

} from './pfa.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption} from '@nutela/models/core-data';
import { IRootState } from '../../root/root.state';
import { IPfa } from '@nutela/models/compensation/payroll';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class PfaEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>) {}

  @Effect()
  loadPfaData$: Observable<Action> = this.actions$
    .ofType<LoadPfaData>(PfaActionTypes.LOAD_PFA_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.PFA_URLs.data)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success) {
                this.store.dispatch(new NotLoadingPfa());
                return new LoadPfaSuccess(<IPfa[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingPfa());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR});
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
    saveData$: Observable<Action> = this.actions$
      .ofType<SavePfa>(PfaActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(constants.PFA_URLs.add, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingPfa(),
                    new LoadPfaData(),
                    new HideEditorPfa(),
                  ]);
                } else {
                  return from([
                    new NotProcessingPfa(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingPfa(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdatePfa>(PfaActionTypes.UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          console.log('data update',payload.data);
          return this.apiService
            .update(`${constants.PFA_URLs.update}/${payload.recordId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingPfa(),
                    new LoadPfaData(),
                    new HideEditorPfa(),
                  ]);
                } else {
                  return from([
                    new NotProcessingPfa(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingPfa(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeletePfa>(PfaActionTypes.DELETE_PFA_DATA)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .update(`${constants.PFA_URLs.delete}/${payload.recordId}`, null)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),
                      new LoadPfaData()
                    ]);
                  } else {
                    return from([
                      new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR}),
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
        @Effect()
        loadNationData$: Observable<Action> = this.actions$
          .ofType<LoadNationPfa>(PfaActionTypes.LOAD_NATIONALITY_DATA)
          .pipe(
            switchMap(() => {
              return this.apiService
                .read(constants.PFA_URLs.nationalityData)
                .pipe(
                  map((data: any) => {
                    if (data.Success) {
                      return new LoadNationPfaSuccess(<ISelectOption[]>(
                        data.Results
                      ));
                    } else {
                      return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage? data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
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
          loadStateData$: Observable<Action> = this.actions$
            .ofType<LoadStatePfa>(PfaActionTypes.LOAD_STATE_DATA)
            .pipe(
              map(action => action.payload),
              switchMap(payload=> {
                return this.apiService
                  .read(`${constants.PFA_URLs.stateData}/${payload.countryId}`)
                  .pipe(
                    map((data: any) => {
                      if (data.Success) {
                        return new LoadStatePfaSuccess(<ISelectOption[]>(
                          data.Results
                        ));
                      } else {
                        return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage? data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
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
            loadCityData$: Observable<Action> = this.actions$
              .ofType<LoadCityPfa>(PfaActionTypes.LOAD_CITY_DATA)
              .pipe(
                map(action => action.payload),
                switchMap(payload=> {
                  return this.apiService
                    .read(`${constants.PFA_URLs.cityData}/${payload.stateId}`)
                    .pipe(
                      map((data: any) => {
                        if (data.Success) {
                          return new LoadCityPfaSuccess(<ISelectOption[]>(
                            data.Results
                          ));
                        } else {
                          return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage? data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
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

}

