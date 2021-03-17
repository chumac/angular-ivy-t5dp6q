import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { ApiService,UtilService, toastOptionsError, toastOptionsSuccess } from '@nutela/core-services';

import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { DefinitionsActionTypes, LoadDataDefinitions, LoadDataDefinitionsSuccess, NotProcessingDefinitions, DeleteDataDefinition, SaveDataDefinition, HideEditorDefinition, SaveUpdateDataDefinition, LoadDataPayrollProfilesDefinition, LoadDataPayrollProfilesDefinitionSuccess, LoadDataDeductionRulesDefinition, LoadDataGroupNamesDefinition, LoadDataDeductionRulesDefinitionSuccess, LoadDataAmortizationRulesDefinitionSuccess, LoadDataAmortizationRulesDefinition, LoadDataDeductionAllowancesDefinition, LoadDataDeductionAllowancesDefinitionSuccess, NotLoadingDefinitions, LoadDataGroupNamesDefinitionSuccess, LoadIntDataDeductionAllowancesDefinition, LoadIntDataDeductionAllowancesDefinitionSuccess, LoadDataPayrollProfileListDefinition, LoadDataPayrollProfileListDefinitionSuccess } from './definitions.actions';
import * as constants from '../../constants';
import { ToastTypes } from '@nutela/shared/app-global';
import { ILoanState } from '../root';

@Injectable()
export class DefinitionsEffects {

  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService, private store: Store<ILoanState>) {}

  @Effect()
  loadLoanDefinitionsData$: Observable<Action> = this.actions$
    .ofType<LoadDataDefinitions>(DefinitionsActionTypes.LOAD_DATA_LOAN_DEFINITIONS)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_DEFINITIONS_DATA_URLs.getAll)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'loan_id', 'description');
                this.store.dispatch(new NotLoadingDefinitions());
                return new LoadDataDefinitionsSuccess(
                    data.Results,
                );
              } else {
                this.store.dispatch(new NotLoadingDefinitions());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDefinitions(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

  @Effect()
  loadPayrollProfilesLoanDefinitionData$: Observable<Action> = this.actions$
    .ofType<LoadDataPayrollProfilesDefinition>(DefinitionsActionTypes.LOAD_DATA_PAYROLL_PROFILES_LOAN_DEFINITION)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_DEFINITIONS_DATA_URLs.getPayrollProfiles)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingDefinitions());
                return new LoadDataPayrollProfilesDefinitionSuccess(data.Results);
              } else {
                this.store.dispatch(new NotProcessingDefinitions());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingDefinitions(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

  @Effect()
  loadPayrollProfileListLoanDefinitionData$: Observable<Action> = this.actions$
    .ofType<LoadDataPayrollProfileListDefinition>(DefinitionsActionTypes.LOAD_DATA_PAYROLL_PROFILES_LIST_LOAN_DEFINITION)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_DEFINITIONS_DATA_URLs.payrollProfileList)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'payroll_profile_id', 'description')
                return new LoadDataPayrollProfileListDefinitionSuccess(transformed);
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
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
  loadAmortizationRulesLoanDefinitionData$: Observable<Action> = this.actions$
    .ofType<LoadDataAmortizationRulesDefinition>(DefinitionsActionTypes.LOAD_DATA_AMORTIZATION_RULES_LOAN_DEFINITION)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_DEFINITIONS_DATA_URLs.getAmortizationRule)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                const rulesTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                this.store.dispatch(new NotProcessingDefinitions());
                return new LoadDataAmortizationRulesDefinitionSuccess(<ISelectOption[]>(
                  rulesTransformed

                ));
              } else {
                this.store.dispatch(new NotProcessingDefinitions());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingDefinitions(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

  @Effect()
  loadDeductionRulesLoanDefinitionData$: Observable<Action> = this.actions$
    .ofType<LoadDataDeductionRulesDefinition>(DefinitionsActionTypes.LOAD_DATA_DEDUCTION_RULES_LOAN_DEFINITION)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_DEFINITIONS_DATA_URLs.getDeductionRules)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                const rulesTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                this.store.dispatch(new NotProcessingDefinitions());
                return new LoadDataDeductionRulesDefinitionSuccess(<ISelectOption[]>(
                  rulesTransformed

                ));
              } else {
                this.store.dispatch(new NotProcessingDefinitions());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingDefinitions(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

  @Effect()
  loadGroupNamesLoanDefinitionData$: Observable<Action> = this.actions$
    .ofType<LoadDataGroupNamesDefinition>(DefinitionsActionTypes.LOAD_DATA_GROUP_NAMES_LOAN_DEFINITION)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LOAN_DEFINITIONS_DATA_URLs.getGroupNames)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                const namesTransformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                this.store.dispatch(new NotProcessingDefinitions());
                return new LoadDataGroupNamesDefinitionSuccess(<ISelectOption[]>(
                  namesTransformed

                ));
              } else {
                this.store.dispatch(new NotProcessingDefinitions());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingDefinitions(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );


    @Effect()
    deleteAwaitingApprovalData$: Observable<Action> = this.actions$
      .ofType<DeleteDataDefinition>(DefinitionsActionTypes.DELETE_DATA_LOAN_DEFINITION)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .update(`${constants.LOAN_DEFINITIONS_DATA_URLs.achive}/${payload.recordId}`, null)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingDefinitions(),
                    new LoadDataDefinitions()
                  ]);
                } else {
                  return from([
                    new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new ShowToast({title: 'Data Could Not Be Deleted', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

      @Effect()
      saveData$: Observable<Action> = this.actions$
        .ofType<SaveDataDefinition>(DefinitionsActionTypes.SAVE)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            const url = constants.LOAN_DEFINITIONS_DATA_URLs.create;
            return this.apiService
              .create(url, payload.data)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                      new NotProcessingDefinitions(),
                      new HideEditorDefinition(),
                      new LoadDataDefinitions()
                    ]);
                  } else {
                    return from([
                      new NotProcessingDefinitions(),
                      new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                    ]);
                  }
                }),
                catchError((error: any) =>
                  from([
                    new NotProcessingDefinitions(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be saved. Error occured.`, options: toastOptionsError()})
                  ])
                )
              );
          })
        );


  @Effect()
  loadAllowancesDataLoanDefinition$: Observable<Action> = this.actions$
    .ofType<LoadDataDeductionAllowancesDefinition>(DefinitionsActionTypes.LOAD_DATA_DEDUCTION_ALLOWANCES_LOAN_DEFINITION)
    .pipe(
      map(action => action.payload),
      mergeMap(payload => {
        return this.apiService
          .read(
            `${constants.LOAN_DEFINITIONS_DATA_URLs.getAllowances}/${payload.payrollProfileId}`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const allowancesTransformed = this.utilService.transformToSelectDataList(data.Results, 'allowance_id', 'description');
                this.store.dispatch(new NotProcessingDefinitions());
                return new LoadDataDeductionAllowancesDefinitionSuccess(<
                  ISelectOption[]
                >allowancesTransformed);
              } else {
                this.store.dispatch(new NotProcessingDefinitions());
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingDefinitions(),
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
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
  loadIntAllowancesDataLoanDefinition$: Observable<Action> = this.actions$
    .ofType<LoadIntDataDeductionAllowancesDefinition>(DefinitionsActionTypes.LOAD_INT_DATA_DEDUCTION_ALLOWANCES_LOAN_DEFINITION)
    .pipe(
      map(action => action.payload),
      mergeMap(payload => {
        return this.apiService
          .read(
            `${constants.LOAN_DEFINITIONS_DATA_URLs.getAllowances}/${payload.intPayrollProfileId}`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const allowancesTransformed = this.utilService.transformToSelectDataList(data.Results, 'allowance_id', 'description');
                this.store.dispatch(new NotProcessingDefinitions());
                return new LoadIntDataDeductionAllowancesDefinitionSuccess(<
                  ISelectOption[]
                >allowancesTransformed);
              } else {
                this.store.dispatch(new NotProcessingDefinitions());
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingDefinitions(),
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
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
        saveUpdateData$: Observable<Action> = this.actions$
          .ofType<SaveUpdateDataDefinition>(DefinitionsActionTypes.SAVE_UPDATE)
          .pipe(
            map(action => action.payload),
            switchMap(payload => {
              const url = `${constants.LOAN_DEFINITIONS_DATA_URLs.update}/${payload.recordId}`
              return this.apiService
                .update(url, payload.data)
                .pipe(
                  switchMap((data: IApiResult) => {
                    if (data.Success) {
                      return from([
                        new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                        new NotProcessingDefinitions(),
                        new HideEditorDefinition(),
                        new LoadDataDefinitions()
                      ]);
                    } else {
                      return from([
                        new NotProcessingDefinitions(),
                        new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                      ]);
                    }
                  }),
                  catchError((error: any) =>
                    from([
                      new NotProcessingDefinitions(),
                      new ShowToast({title: 'Data Could Not Be Saved', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be saved. Error occured.`, options: toastOptionsError()})
                    ])
                  )
                );
            })
          );

    }
