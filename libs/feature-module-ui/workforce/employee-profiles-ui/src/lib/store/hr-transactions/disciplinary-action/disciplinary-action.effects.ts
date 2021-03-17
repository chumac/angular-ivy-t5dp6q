import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { ApiService, UtilService } from '@nutela/core-services';

import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import {
  DisciplinaryActionActionTypes,
  LoadApprovedDataDisciplinaryAction,
  LoadApprovedDataDisciplinaryActionSuccess,
  LoadAwaitingApprovalDataDisciplinaryAction,
  LoadAwaitingApprovalDataDisciplinaryActionSuccess,
  LoadTakeActionSelectOptionDataDisciplinaryAction,
  LoadTakeActionSelectOptionDataDisciplinaryActionSuccess,
  LoadActionRoleSelectOptionDataDisciplinaryAction,
  LoadActionRoleSelectOptionDataDisciplinaryActionSuccess,
  LoadRecommendationDataDisciplinaryAction,
  LoadRecommendationDataDisciplinaryActionSuccess,
  NotLoadingDisciplinaryAction,
  DeleteDataDisciplinaryAction,
  SaveDataDisciplinaryAction,
  HideEditorDisciplinaryAction,
  LoadRecommendationSelectOptionDataDisciplinaryActionSuccess,
  LoadRecommendationSelectOptionDataDisciplinaryAction,
  UpdateDataDisciplinaryAction
} from './disciplinary-action.actions';
import { IDisciplinaryActionTransaction, IRecommendationType } from '@nutela/models/workforce/employee-profiles';
import * as constants from '../../../constants';
import { ToastTypes } from '@nutela/shared/app-global';
import { IEmployeesProfileState } from '../../root';
import { NotProcessingDisciplinaryAction } from '../../employee-detailed-area';

@Injectable()
export class DisciplinaryActionTransEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IEmployeesProfileState>
  ) { }


  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataDisciplinaryAction>(DisciplinaryActionActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.DISCIPLINARY_ACTIONS_URLs.approvedData}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDisciplinaryAction());
                return new LoadApprovedDataDisciplinaryActionSuccess(<IDisciplinaryActionTransaction[]>(
                    data.Results
                  ))
              } else {
                this.store.dispatch(new NotLoadingDisciplinaryAction());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDisciplinaryAction(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadAwaitingData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataDisciplinaryAction>(DisciplinaryActionActionTypes.LOAD_AWAITING_APPROVAL_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.DISCIPLINARY_ACTIONS_URLs.awaitingData}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDisciplinaryAction());
                return new LoadAwaitingApprovalDataDisciplinaryActionSuccess(<IDisciplinaryActionTransaction[]>(
                    data.Results
                  ))
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDisciplinaryAction(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadTakeActionData$: Observable<Action> = this.actions$
    .ofType<LoadTakeActionSelectOptionDataDisciplinaryAction>(DisciplinaryActionActionTypes.LOAD_TAKE_ACTION_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.DISCIPLINARY_ACTIONS_URLs.takeActionTypes}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description')
                return new LoadTakeActionSelectOptionDataDisciplinaryActionSuccess(<ISelectOption[]>(
                    transformed
                  ))
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadRecommendationListData$: Observable<Action> = this.actions$
    .ofType<LoadRecommendationSelectOptionDataDisciplinaryAction>(DisciplinaryActionActionTypes.LOAD_RECOMMENDATION_LIST_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.DISCIPLINARY_ACTIONS_URLs.recommendationsList}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'daction_type_id', 'description');
                return new LoadRecommendationSelectOptionDataDisciplinaryActionSuccess(<ISelectOption[]>(
                    transformed
                  ))
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage?data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadActionRolesData$: Observable<Action> = this.actions$
    .ofType<LoadActionRoleSelectOptionDataDisciplinaryAction>(DisciplinaryActionActionTypes.LOAD_ACTION_ROLES_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.DISCIPLINARY_ACTIONS_URLs.actionRoleTypes}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description')
                return new LoadActionRoleSelectOptionDataDisciplinaryActionSuccess(<ISelectOption[]>(
                    transformed
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
  loadRecommendation$: Observable<Action> = this.actions$
    .ofType<LoadRecommendationDataDisciplinaryAction>(DisciplinaryActionActionTypes.LOAD_RECOMMENDATION_DATA)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${constants.DISCIPLINARY_ACTIONS_URLs.recommendation}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingDisciplinaryAction());
                return new LoadRecommendationDataDisciplinaryActionSuccess(<IRecommendationType>(data.Results[0]));
              } else {
                this.store.dispatch(new NotLoadingDisciplinaryAction());
                return new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingDisciplinaryAction(),
                new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataDisciplinaryAction>(DisciplinaryActionActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.DISCIPLINARY_ACTIONS_URLs.delete}/${payload.dactionId}`)
          .pipe(
            switchMap((data: IApiResult) => {

              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),
                  new LoadApprovedDataDisciplinaryAction()
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
    updateData$: Observable<Action> = this.actions$
      .ofType<UpdateDataDisciplinaryAction>(DisciplinaryActionActionTypes.UPDATE_DATA)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .update(`${constants.DISCIPLINARY_ACTIONS_URLs.update}/${payload.dactionId}`, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingDisciplinaryAction(),
                    new HideEditorDisciplinaryAction(),
                    new LoadAwaitingApprovalDataDisciplinaryAction(),
                    new LoadApprovedDataDisciplinaryAction()
                  ]);
                } else {
                  return from([
                    new NotProcessingDisciplinaryAction(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingDisciplinaryAction(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

    @Effect()
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveDataDisciplinaryAction>(DisciplinaryActionActionTypes.SAVE_DATA)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(constants.DISCIPLINARY_ACTIONS_URLs.create, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingDisciplinaryAction(),
                    new HideEditorDisciplinaryAction(),
                    new LoadAwaitingApprovalDataDisciplinaryAction(),
                    new LoadApprovedDataDisciplinaryAction()
                  ]);
                } else {
                  return from([
                    new NotProcessingDisciplinaryAction(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingDisciplinaryAction(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );


}
