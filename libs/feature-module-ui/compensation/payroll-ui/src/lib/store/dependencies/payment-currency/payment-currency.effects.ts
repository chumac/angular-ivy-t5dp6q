import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  CurrencyActionTypes,
  LoadCurrencyData,
  LoadCurrencySuccess,
  NotProcessingCurrency,
  HideEditorCurrency,
  SaveCurrency,
  UpdateCurrency,
  DeleteCurrency,
  NotLoadingCurrency,

} from './payment-currency.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult} from '@nutela/models/core-data';
import { IRootState } from '../../root/root.state';
import { ICurrency } from '@nutela/models/compensation/payroll';

@Injectable()
export class CurrencyEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>) {}

  @Effect()
  loadCurrencyData$: Observable<Action> = this.actions$
    .ofType<LoadCurrencyData>(CurrencyActionTypes.LOAD_CURRENCY_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYMENT_CURRENCY_URLs.Data}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new NotLoadingCurrency());
                return new LoadCurrencySuccess(<ICurrency[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingCurrency());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage, options: toastOptionsError()});
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
      .ofType<SaveCurrency>(CurrencyActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(constants.PAYMENT_CURRENCY_URLs.add, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingCurrency(),
                    new HideEditorCurrency(),
                    new LoadCurrencyData(),
                  ]);
                } else {
                  return from([
                    new NotProcessingCurrency(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingCurrency(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdateCurrency>(CurrencyActionTypes.UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .update(`${constants.PAYMENT_CURRENCY_URLs.update}/${payload.recordId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingCurrency(),
                    new HideEditorCurrency(),
                    new LoadCurrencyData(),
                  ]);
                } else {
                  return from([
                    new NotProcessingCurrency(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingCurrency(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteCurrency>(CurrencyActionTypes.DELETE_CURRENCY_DATA)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .update(`${constants.PAYMENT_CURRENCY_URLs.delete}/${payload.recordId}`, null)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                      new LoadCurrencyData(),
                      new NotLoadingCurrency()
                    ]);
                  } else {
                    return from([
                      new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError() }),
                      new NotLoadingCurrency()
                    ]);
                  }
                }),
                catchError((error: any) =>
                  from([
                    new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError() }),
                    new NotLoadingCurrency()
                  ])
                )
              );
          })
        );

}

