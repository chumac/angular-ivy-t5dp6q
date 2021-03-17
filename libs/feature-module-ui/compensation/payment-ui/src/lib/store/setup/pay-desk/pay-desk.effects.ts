import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';



import { IApiResult } from '@nutela/models/core-data';
import { ApiService } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import * as constants from '../../../constants';
import { IRootState } from '../../root';
import { LoadData, PayDeskActionTypes, NotLoadingData, LoadDataSuccess, SaveData, NotProcessingData, HideEditor, LoadPaymentPlatformData, LoadPaymentPlatformDataSuccess } from './pay-desk.actions';

@Injectable()
export class PayDeskEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<IRootState>) { }


  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadData>(PayDeskActionTypes.LOAD_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.PAY_DESK_DATA_URLs.getAll)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingData());
                return new LoadDataSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.' + data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingData(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadPaymentPlatformData$: Observable<Action> = this.actions$
    .ofType<LoadPaymentPlatformData>(PayDeskActionTypes.LOAD_PAYMENT_PLATFORM_DATA)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.PAY_DESK_DATA_URLs.getPlatforms)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingData());
                return new LoadPaymentPlatformDataSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingData());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.' + data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingData(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: (error.status == 401) ? error.error.ErrorMessage : 'Something went wrong. data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );


  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveData>(PayDeskActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.PAY_DESK_DATA_URLs.create;
        return this.apiService
          .create(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingData(),
                  new HideEditor(),
                  new LoadData()
                ]);
              } else {
                return from([
                  new NotProcessingData(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingData(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );
}
