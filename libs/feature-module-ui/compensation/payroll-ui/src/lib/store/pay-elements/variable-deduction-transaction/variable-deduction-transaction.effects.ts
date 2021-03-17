import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  VariableDeductionTransactionActionTypes,
  LoadVariableDeductionTransactionData,
  LoadVariableDeductionTransactionSuccess,
  NotProcessingVariableDeductionTransaction,
  HideEditorVariableDeductionTransaction,
  SaveVariableDeductionTransaction,
  UpdateVariableDeductionTransaction,
  DeleteVariableDeductionTransaction,
  NotLoadingVariableDeductionTransaction,
  LoadVariableDeductionListVariableDeductionTransaction,
  LoadVariableDeductionListVariableDeductionTransactionSuccess,

} from './variable-deduction-transaction.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption} from '@nutela/models/core-data';
import { IRootState } from '../../root/root.state';
import { IVariableDeductionTransaction } from '@nutela/models/compensation/payroll';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class VariableDeductionTransactionEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>) {}

  @Effect()
  loadVariableDeductionTransactionData$: Observable<Action> = this.actions$
    .ofType<LoadVariableDeductionTransactionData>(VariableDeductionTransactionActionTypes.LOAD_VARIABLE_DEDUCTION_TRANSACTION_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_DEDUCTION_TRANSACTION_URLs.data}`;
       console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success) {
                this.store.dispatch(new NotLoadingVariableDeductionTransaction());
                return new LoadVariableDeductionTransactionSuccess(<IVariableDeductionTransaction[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableDeductionTransaction());
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
  loadVariableDeductionList$: Observable<Action> = this.actions$
    .ofType<LoadVariableDeductionListVariableDeductionTransaction>(VariableDeductionTransactionActionTypes.LOAD_VARIABLE_DEDUCTION_LIST)
    .pipe(
      switchMap(() => {
        const url = `${constants.VARIABLE_DEDUCTION_TRANSACTION_URLs.vdeductionList}`;
       console.log(url)
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success) {
                const list = this.utilService.transformToSelectDataList(data.Results, 'vardeduction_id', 'description');
                this.store.dispatch(new NotLoadingVariableDeductionTransaction());
                return new LoadVariableDeductionListVariableDeductionTransactionSuccess(<ISelectOption[]>(
                  list
                ));
              } else {
                this.store.dispatch(new NotLoadingVariableDeductionTransaction());
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
      .ofType<SaveVariableDeductionTransaction>(VariableDeductionTransactionActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('data',payload.data);
          return this.apiService
            .create(constants.VARIABLE_DEDUCTION_TRANSACTION_URLs.create, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingVariableDeductionTransaction(),
                    new LoadVariableDeductionTransactionData(),
                    new HideEditorVariableDeductionTransaction(),
                  ]);
                } else {
                  return from([
                    new NotProcessingVariableDeductionTransaction(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingVariableDeductionTransaction(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdateVariableDeductionTransaction>(VariableDeductionTransactionActionTypes.UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          console.log('data update',payload.data);
          return this.apiService
            .update(`${constants.VARIABLE_DEDUCTION_TRANSACTION_URLs.update}/${payload.recordId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingVariableDeductionTransaction(),
                    new LoadVariableDeductionTransactionData(),
                    new HideEditorVariableDeductionTransaction(),
                  ]);
                } else {
                  return from([
                    new NotProcessingVariableDeductionTransaction(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingVariableDeductionTransaction(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteVariableDeductionTransaction>(VariableDeductionTransactionActionTypes.DELETE_VARIABLE_DEDUCTION_TRANSACTION_DATA)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .update(`${constants.VARIABLE_DEDUCTION_TRANSACTION_URLs.archive}/${payload.recordId}`, null)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),
                      new LoadVariableDeductionTransactionData(),
                      new NotLoadingVariableDeductionTransaction()
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

}

