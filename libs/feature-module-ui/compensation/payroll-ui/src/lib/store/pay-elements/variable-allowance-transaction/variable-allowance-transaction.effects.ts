import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  VariableAllowanceTransactionActionTypes,
  LoadVariableAllowanceTransactionData,
  LoadVariableAllowanceTransactionSuccess,
  NotProcessingVariableAllowanceTransaction,
  HideEditorVariableAllowanceTransaction,
  SaveVariableAllowanceTransaction,
  UpdateVariableAllowanceTransaction,
  DeleteVariableAllowanceTransaction,
  NotLoadingVariableAllowanceTransaction,
  LoadVariableAllowanceListVariableAllowanceTransactionSuccess,
  LoadVariableAllowanceListVariableAllowanceTransaction,

} from './variable-allowance-transaction.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption} from '@nutela/models/core-data';
import { IRootState } from '../../root/root.state';
import { IVariableAllowanceTransaction } from '@nutela/models/compensation/payroll';

@Injectable()
export class VariableAllowanceTransactionEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>) {}

  @Effect()
  loadVariableAllowanceTransactionData$: Observable<Action> = this.actions$
    .ofType<LoadVariableAllowanceTransactionData>(VariableAllowanceTransactionActionTypes.LOAD_VARIABLE_ALLOWANCE_TRANSACTION_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_ALLOWANCE_TRANSACTION_URLs.data}`;
       console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success) {
                this.store.dispatch(new NotLoadingVariableAllowanceTransaction());
                return new LoadVariableAllowanceTransactionSuccess(<IVariableAllowanceTransaction[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableAllowanceTransaction());
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
  loadVariableAllowanceList$: Observable<Action> = this.actions$
    .ofType<LoadVariableAllowanceListVariableAllowanceTransaction>(VariableAllowanceTransactionActionTypes.LOAD_VARIABLE_ALLOWANCE_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_ALLOWANCE_TRANSACTION_URLs.vallowanceList}`;
       console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success) {
                const list = this.utilService.transformToSelectDataList(data.Results, 'varallowance_id', 'description');
                this.store.dispatch(new NotLoadingVariableAllowanceTransaction());
                return new LoadVariableAllowanceListVariableAllowanceTransactionSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableAllowanceTransaction());
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
      .ofType<SaveVariableAllowanceTransaction>(VariableAllowanceTransactionActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('data',payload.data);
          return this.apiService
            .create(constants.VARIABLE_ALLOWANCE_TRANSACTION_URLs.create, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingVariableAllowanceTransaction(),
                    new LoadVariableAllowanceTransactionData(),
                    new HideEditorVariableAllowanceTransaction(),
                  ]);
                } else {
                  return from([
                    new NotProcessingVariableAllowanceTransaction(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingVariableAllowanceTransaction(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdateVariableAllowanceTransaction>(VariableAllowanceTransactionActionTypes.UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {

          return this.apiService
            .update(`${constants.VARIABLE_ALLOWANCE_TRANSACTION_URLs.update}/${payload.recordId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingVariableAllowanceTransaction(),
                    new LoadVariableAllowanceTransactionData(),
                    new HideEditorVariableAllowanceTransaction(),
                  ]);
                } else {
                  return from([
                    new NotProcessingVariableAllowanceTransaction(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingVariableAllowanceTransaction(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteVariableAllowanceTransaction>(VariableAllowanceTransactionActionTypes.DELETE_VARIABLE_ALLOWANCE_TRANSACTION_DATA)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .update(`${constants.VARIABLE_ALLOWANCE_TRANSACTION_URLs.archive}/${payload.recordId}`, null)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                      new LoadVariableAllowanceTransactionData(),
                    ]);
                  } else {
                    return from([
                      new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError()}),
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

