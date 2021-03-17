import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';



import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ApiService, UtilService, toastOptionsSuccess, toastOptionsError } from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import * as constants from '../../constants';
import { LoadDataDisbursements, DisbursementsActionTypes, NotProcessingDisbursements, LoadDataDisbursementsSuccess, SaveDisbursement, HideEditorDisbursement, LoadDefinitions, LoadDefinitionsSuccess, NotLoadingDisbursements, LoadDataDisbursed, LoadDataDisbursedSuccess } from './disbursements.actions';
import { ILoanState } from '../root';

@Injectable()
export class DisbursementsEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<ILoanState>, private utilService: UtilService) {}

  @Effect()
  loadDisbursementData$: Observable<Action> = this.actions$
    .ofType<LoadDataDisbursements>(DisbursementsActionTypes.LOAD_DATA_LOAN_DISBURSEMENTS)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.LOAN_DISBURSEMENTS_DATA_URLs
            .getUnDisbursed)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                 this.store.dispatch(new NotLoadingDisbursements());
                  return new LoadDataDisbursementsSuccess(data.Results);
                } else {
                  this.store.dispatch(new NotLoadingDisbursements());
                  return new ShowToast({title: 'Loan Disbursements Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotLoadingDisbursements(),
                  new ShowToast({title: 'Loan Disbursements Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Loan Disbursements data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
      })
    );

  @Effect()
  loadDisbursedData$: Observable<Action> = this.actions$
    .ofType<LoadDataDisbursed>(DisbursementsActionTypes.LOAD_DATA_LOAN_DISBURSED)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.LOAN_DISBURSEMENTS_DATA_URLs
            .getDisbursed)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                 this.store.dispatch(new NotLoadingDisbursements());
                  return new LoadDataDisbursedSuccess(data.Results);
                } else {
                  this.store.dispatch(new NotLoadingDisbursements());
                  return new ShowToast({title: 'Loan Disbursements Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotLoadingDisbursements(),
                  new ShowToast({title: 'Loan Disbursements Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Loan Disbursements data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
      })
    );

  @Effect()
  loadDefinitionsData$: Observable<Action> = this.actions$
    .ofType<LoadDefinitions>(DisbursementsActionTypes.LOAD_DATA_LOAN_DEFINITIONS)
    .pipe(
      map(action => action),
      switchMap(payload => {
        return this.apiService
          .read(constants.LOAN_DEFINITIONS_DATA_URLs.getAll)
            .pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  const definitions = this.utilService.transformToSelectDataList(data.Results, 'loan_id', 'description');
                 this.store.dispatch(new NotProcessingDisbursements());
                  return new LoadDefinitionsSuccess(<ISelectOption[]>definitions);
                } else {
                  this.store.dispatch(new NotProcessingDisbursements());
                  return new ShowToast({title: 'Loan Definitions Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotProcessingDisbursements(),
                  new ShowToast({title: 'Loan Definitions Data Could Not Be Loaded', message: 'Something went wrong. Loan Definitions data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
      })
    );


    @Effect()
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveDisbursement>(DisbursementsActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = constants.LOAN_DISBURSEMENTS_DATA_URLs.create;
          return this.apiService
            .create(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingDisbursements(),
                    new HideEditorDisbursement(),
                    new LoadDataDisbursements(),
                    new LoadDataDisbursed()
                  ]);
                } else {
                  return from([
                    new NotProcessingDisbursements(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingDisbursements(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be saved. Error occured.`, options: toastOptionsError()})
                ])
              )
            );
        })
      );
}
