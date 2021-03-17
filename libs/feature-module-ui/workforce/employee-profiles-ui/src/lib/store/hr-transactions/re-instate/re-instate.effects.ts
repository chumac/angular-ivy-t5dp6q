import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { ApiService, UtilService, } from '@nutela/core-services';

import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import {
  LoadReInstateTransaction,
  LoadReInstateTransactionSuccess,
  ReInstateTransactionActionTypes,
  SaveReInstateTransaction,
  NotProcessingReInstateTransaction,
  HideEditorReInstateTransaction,
  NotLoadingReInstateTransaction,
  UpdateReInstateTransaction,
  LoadEmployeeList,
  LoadEmployeeListSuccess,
  LoadRecordCategory,
  LoadRecordCategorySuccess,
} from './re-instate.actions';
import { IReInstate } from '@nutela/models/workforce/employee-profiles';
import * as constants from '../../../constants';
import { ToastTypes } from '@nutela/shared/app-global';
import { IEmployeesProfileState } from '../../root';

@Injectable()
export class ReInstateTransactionEffects {
  constructor(
    private actions$: Actions,
    private utilService: UtilService,
    private apiService: ApiService,
    private store: Store<IEmployeesProfileState>
  ) { }


  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadReInstateTransaction>(ReInstateTransactionActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.REINSTATE_URLs.getAll}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingReInstateTransaction());
                return new LoadReInstateTransactionSuccess(<IReInstate[]>(
                    data.Results
                  ))
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
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
      .ofType<SaveReInstateTransaction>(ReInstateTransactionActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(constants.REINSTATE_URLs.create, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingReInstateTransaction(),
                    new HideEditorReInstateTransaction(),
                    new LoadReInstateTransaction()
                  ]);
                } else {
                  return from([
                    new NotProcessingReInstateTransaction(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingReInstateTransaction(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdateReInstateTransaction>(ReInstateTransactionActionTypes.UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url= `${constants.REINSTATE_URLs.update}/${payload.recordId}`
          console.log('url',url);
          return this.apiService
            .update(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingReInstateTransaction(),
                    new HideEditorReInstateTransaction(),
                    new LoadReInstateTransaction()
                  ]);
                } else {
                  return from([
                    new NotProcessingReInstateTransaction(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingReInstateTransaction(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

        @Effect()
        loadEmployee$: Observable<Action> = this.actions$
          .ofType<LoadEmployeeList>(ReInstateTransactionActionTypes.LOAD_EMPLOYEE_DATA)
          .pipe(
            switchMap(() => {
              return this.apiService
                .read(constants.REINSTATE_URLs.employeeList)
                .pipe(
                  map((data: any) => {
                    const system=this.utilService.transformToSelectDataList(data.Results,"employee_id","emp_fullname");
                    if (data.Success) {
                      return new LoadEmployeeListSuccess(<ISelectOption[]>(
                        system
                      ));
                    } else {
                      return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR});
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
        loadRecordCategory$: Observable<Action> = this.actions$
          .ofType<LoadRecordCategory>(ReInstateTransactionActionTypes.LOAD_RECORD_CATEGORY_DATA)
          .pipe(
            switchMap(() => {
              return this.apiService
                .read(constants.REINSTATE_URLs.recordCategory)
                .pipe(
                  map((data: any) => {
                    const system=this.utilService.transformToSelectDataList(data.Results,"id","description");
                    if (data.Success) {
                      return new LoadRecordCategorySuccess(<ISelectOption[]>(
                        system
                      ));
                    } else {
                      return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR});
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
