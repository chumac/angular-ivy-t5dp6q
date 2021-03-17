import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  SelfProcessTransactionActionTypes,
  LoadDataSelfProcessTransaction,
  LoadDataSelfProcessTransactionSuccess,
  SaveSelfProcessTransaction,
  NotProcessingSelfProcessTransaction,
  HideEditorSelfProcessTransaction,
  DeleteDataSelfProcessTransaction,
  AddSelfProcessTransaction,
  LoadAreaSelfProcessTransaction,
  LoadAreaSelfProcessTransactionSuccess,
} from './self-process-transaction.actions';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { ISelectOption } from 'dist/libs/models/core-data';
import { IProcessTransactionMaster, IProcessFormArea } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class SelfProcessTransactionEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService
  ) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataSelfProcessTransaction>(
      SelfProcessTransactionActionTypes.LOAD_DATA
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            `${
              constants.SELF_PROCESS_TRANSACTION_URLs
                .getSelfProcessTransactionData
            }`
          )
          .pipe(
            mergeMap((data: IApiResult) => [
              new NotProcessingSelfProcessTransaction(),
              data.Success
                ? new LoadDataSelfProcessTransactionSuccess(<
                    IProcessTransactionMaster[]
                  >data.Results)
                : new ShowToast({
                    title: 'Data Could Not Be Loaded',
                    message: data.ErrorMessage
                      ? data.ErrorMessage
                      : 'Something went wrong. Form data could not be loaded.',
                    options: toastOptionsError()
                  })
            ]),
            catchError((error: any) =>
              of(
                new NotProcessingSelfProcessTransaction(),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataSelfProcessTransaction>(SelfProcessTransactionActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${constants.SELF_PROCESS_TRANSACTION_URLs.delete}/${payload.recordId}/${payload.roleId}`
          )
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({
                    title: null,
                    message: `Record was deleted successfully.`,
                    options: toastOptionsSuccess()
                  }),
                  new LoadDataSelfProcessTransaction()
                ]);
              } else {
                return from([
                  new ShowToast({
                    title: 'Data Could Not Be Deleted',
                    message: data.ErrorMessage
                      ? data.ErrorMessage
                      : `Something went wrong. Record was not deleted.`,
                    options: toastOptionsError()
                  })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({
                  title: 'Data Could Not Be Deleted',
                  message: `Something went wrong. Record was not deleted.`,
                  options: toastOptionsError()
                })
              ])
            )
          );
      })
    );
}
