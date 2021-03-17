import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { ApiService, UtilService, } from '@nutela/core-services';

import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import {
  LoadSeparationTransaction,
  LoadSeparationTransactionSuccess,
  SeparationTransactionActionTypes,
  SaveSeparationTransaction,
  NotProcessingSeparationTransaction,
  HideEditorSeparationTransaction,
  DeleteSeparationTransaction,
  NotLoadingSeparationTransaction,
  UpdateSeparationTransaction,
  LoadEmployeeList,
  LoadEmployeeListSuccess,
  LoadStatus,
  LoadStatusSuccess,
  LoadReason,
  LoadReasonSuccess,
  LoadAllowance,
  LoadAllowanceSuccess,
  LoadCurrency,
  LoadCurrencySuccess
} from './separation.actions';
import { ISeparation } from '@nutela/models/workforce/employee-profiles';
import * as constants from '../../../constants';
import { ToastTypes } from '@nutela/shared/app-global';
import { IEmployeesProfileState } from '../../root';

@Injectable()
export class SeparationTransactionEffects {
  constructor(
    private actions$: Actions,
    private utilService: UtilService,
    private apiService: ApiService,
    private store: Store<IEmployeesProfileState>
  ) { }


  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadSeparationTransaction>(SeparationTransactionActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.SEPARATIONS_URLs.allData}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingSeparationTransaction());
                return new LoadSeparationTransactionSuccess(<ISeparation[]>(
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
      .ofType<SaveSeparationTransaction>(SeparationTransactionActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(constants.SEPARATIONS_URLs.add, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingSeparationTransaction(),
                    new HideEditorSeparationTransaction(),
                    new LoadSeparationTransaction()
                  ]);
                } else {
                  return from([
                    new NotProcessingSeparationTransaction(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingSeparationTransaction(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdateSeparationTransaction>(SeparationTransactionActionTypes.UPDATE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url= `${constants.SEPARATIONS_URLs.update}/${payload.recordId}`
          console.log('url',url);
          return this.apiService
            .update(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingSeparationTransaction(),
                    new HideEditorSeparationTransaction(),
                    new LoadSeparationTransaction()
                  ]);
                } else {
                  return from([
                    new NotProcessingSeparationTransaction(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingSeparationTransaction(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteSeparationTransaction>(SeparationTransactionActionTypes.DELETE)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .update(`${constants.SEPARATIONS_URLs.delete}/${payload.recordId}`,null)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),
                      new LoadSeparationTransaction()
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
        loadEmployee$: Observable<Action> = this.actions$
          .ofType<LoadEmployeeList>(SeparationTransactionActionTypes.LOAD_EMPLOYEE_DATA)
          .pipe(
            switchMap(() => {
              return this.apiService
                .read(constants.SEPARATIONS_URLs.employeeList)
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
          loadStatus$: Observable<Action> = this.actions$
            .ofType<LoadStatus>(SeparationTransactionActionTypes.LOAD_STATUS_DATA)
            .pipe(
              switchMap(() => {
                return this.apiService
                  .read(constants.SEPARATIONS_URLs.status)
                  .pipe(
                    map((data: any) => {
                      const system=this.utilService.transformToSelectDataList(data.Results,"id","description",true,{value:"",label:"All"});
                      if (data.Success) {
                        return new LoadStatusSuccess(<ISelectOption[]>(
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
            loadReason$: Observable<Action> = this.actions$
              .ofType<LoadReason>(SeparationTransactionActionTypes.LOAD_REASONS_DATA)
              .pipe(
                switchMap(() => {
                  return this.apiService
                    .read(constants.SEPARATIONS_URLs.reasons)
                    .pipe(
                      map((data: any) => {
                        const system=this.utilService.transformToSelectDataList(data.Results,"status_id","description");
                        if (data.Success) {
                          return new LoadReasonSuccess(<ISelectOption[]>(
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
              loadAllowance$: Observable<Action> = this.actions$
                .ofType<LoadAllowance>(SeparationTransactionActionTypes.LOAD_ALLOWANCE_DATA)
                .pipe(
                  switchMap(() => {
                    return this.apiService
                      .read(constants.SEPARATIONS_URLs.allowance)
                      .pipe(
                        map((data: any) => {
                          const system=this.utilService.transformToSelectDataList(data.Results,"allowance_id","description");
                          if (data.Success) {
                            return new LoadAllowanceSuccess(<ISelectOption[]>(
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
                loadCurrency$: Observable<Action> = this.actions$
                  .ofType<LoadCurrency>(SeparationTransactionActionTypes.LOAD_CURRENCY_DATA)
                  .pipe(
                    switchMap(() => {
                      return this.apiService
                        .read(constants.SEPARATIONS_URLs.currency)
                        .pipe(
                          map((data: any) => {
                            const system=this.utilService.transformToSelectDataList(data.Results,"currency_id","currency_name");
                            if (data.Success) {
                              return new LoadCurrencySuccess(<ISelectOption[]>(
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
