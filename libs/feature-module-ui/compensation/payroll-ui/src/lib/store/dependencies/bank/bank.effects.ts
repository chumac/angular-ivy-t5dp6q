import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  BankActionTypes,
  LoadBankData,
  LoadBankSuccess,
  NotProcessingBank,
  HideEditorBank,
  SaveBank,
  UpdateBank,
  DeleteBank,
  NotLoadingBank,
  LoadNation,
  LoadNationSuccess,
  LoadState,
  LoadStateSuccess,

} from './bank.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption} from '@nutela/models/core-data';
import { IRootState } from '../../root/root.state';
import { IBank } from '@nutela/models/compensation/payroll';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class BankEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>) {}

  @Effect()
  loadBankData$: Observable<Action> = this.actions$
    .ofType<LoadBankData>(BankActionTypes.LOAD_BANK_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.BANK_URLs.Data}`;
       console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success) {
                this.store.dispatch(new NotLoadingBank());
                return new LoadBankSuccess(<IBank[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingBank());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage:'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
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
      .ofType<SaveBank>(BankActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('data',payload.data);
          return this.apiService
            .create(constants.BANK_URLs.create, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingBank(),
                    new LoadBankData(),
                    new HideEditorBank(),
                  ]);
                } else {
                  return from([
                    new NotProcessingBank(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingBank(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdateBank>(BankActionTypes.UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          console.log('data update',payload.data);
           return this.apiService
            .update(`${constants.BANK_URLs.update}/${payload.recordId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingBank(),
                    new LoadBankData(),
                    new HideEditorBank(),
                  ]);
                } else {
                  return from([
                    new NotProcessingBank(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingBank(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteBank>(BankActionTypes.DELETE_BANK_DATA)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .delete(`${constants.BANK_URLs.delete}/${payload.recordId}`)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),
                      new LoadBankData(),
                      new NotLoadingBank(),
                    ]);
                  } else {
                    return from([
                      new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR }),
                      new NotLoadingBank()
                    ]);
                  }
                }),
                catchError((error: any) =>
                  from([
                    new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR }),
                    new NotLoadingBank()
                  ])
                )
              );
          })
        );

        @Effect()
        loadNationData$: Observable<Action> = this.actions$
          .ofType<LoadNation>(BankActionTypes.LOAD_NATIONALITY_DATA)
          .pipe(
            switchMap(() => {
              return this.apiService
                .read(constants.BANK_URLs.nationalityData)
                .pipe(
                  map((data: any) => {
                    console.log('data',data);
                    if (data.Success) {
                      return new LoadNationSuccess(<ISelectOption[]>(
                        data.Results
                      ));
                    } else {
                      return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
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
          loadState$: Observable<Action> = this.actions$
            .ofType<LoadState>(BankActionTypes.LOAD_STATE_DATA)
            .pipe(
              map(action => action.payload),
              switchMap(payload=> {
                return this.apiService
                  .read(`${constants.BANK_URLs.stateData}/${payload.countryId}`)
                  .pipe(
                    map((data: any) => {
                      console.log('data',data);
                      if (data.Success) {
                        return new LoadStateSuccess(<ISelectOption[]>(
                          data.Results
                        ));
                      } else {
                        return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
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

