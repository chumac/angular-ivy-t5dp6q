import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  DefaultCurrencyActionTypes,
  LoadDefaultCurrencyData,
  LoadDefaultCurrencySuccess,
  NotProcessingDefaultCurrency,
  HideEditorDefaultCurrency,
  SaveDefaultCurrency,
  UpdateDefaultCurrency,
  DeleteDefaultCurrency,
  NotLoadingDefaultCurrency,

} from './default-currency.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult } from '@nutela/models/core-data';
import { IRootState } from '../../root/root.state';
import { IDefaultCurrency } from '@nutela/models/compensation/payroll';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class DefaultCurrencyEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>) { }

  @Effect()
  loadDefaultCurrencyData$: Observable<Action> = this.actions$
    .ofType<LoadDefaultCurrencyData>(DefaultCurrencyActionTypes.LOAD_DEFAULT_CURRENCY_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.DEFAULT_CURRENCY_URLs.getAll}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDefaultCurrency());
                return new LoadDefaultCurrencySuccess(<IDefaultCurrency[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingDefaultCurrency());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
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

  // @Effect()
  // saveData$: Observable<Action> = this.actions$
  //   .ofType<SaveDefaultCurrency>(DefaultCurrencyActionTypes.SAVE)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(payload => {
  //       console.log('data', payload.data);
  //       return this.apiService
  //         .create(constants.DEFAULT_CURRENCY_URLs.create, payload.data)
  //         .pipe(
  //           switchMap((data: IApiResult) => {
  //             console.log(data);
  //             if (data.Success) {
  //               return from([
  //                 new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
  //                 new NotProcessingDefaultCurrency(),
  //                 new HideEditorDefaultCurrency(),
  //                 new LoadDefaultCurrencyData(),
  //               ]);
  //             } else {
  //               return from([
  //                 new NotProcessingDefaultCurrency(),
  //                 new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
  //               ]);
  //             }
  //           }),
  //           catchError((error: any) =>
  //             from([
  //               new NotProcessingDefaultCurrency(),
  //               new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
  //             ])
  //           )
  //         );
  //     })
  //   );

  @Effect()
  updateData$: Observable<Action> = this.actions$
    .ofType<UpdateDefaultCurrency>(DefaultCurrencyActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('Saving ...');
        console.log('data update', payload.data);
        return this.apiService
          .update(`${constants.DEFAULT_CURRENCY_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingDefaultCurrency(),
                  new HideEditorDefaultCurrency(),
                  new LoadDefaultCurrencyData(),
                ]);
              } else {
                return from([
                  new NotProcessingDefaultCurrency(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingDefaultCurrency(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDefaultCurrency>(DefaultCurrencyActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.DEFAULT_CURRENCY_URLs.deactivate}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadDefaultCurrencyData(),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR }),
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

}

