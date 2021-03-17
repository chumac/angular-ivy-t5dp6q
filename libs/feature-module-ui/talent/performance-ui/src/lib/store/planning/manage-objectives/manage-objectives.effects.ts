import { Injectable } from '@angular/core';

import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, catchError, mergeMap, switchMap, take } from 'rxjs/operators';

import * as constants from '../../../constants/';
import {
  ApiService,
  toastOptionsError,
  toastOptionsSuccess
} from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import {
  HideEditorManageObjectives,
  NotProcessingManageObjectives,
  LoadPlanlistManageObjectives,
  LoadPlanlistManageObjectivesSuccess,
  ManageObjectivesActionTypes,
  NotProcessingDataGridManageObjectives,
  LoadObjectiveMasterDataManageObjectives,
  LoadObjectiveMasterDataManageObjectivesSuccess,
  LoadPerspectivelistManageObjectives,
  LoadPerspectivelistManageObjectivesSuccess,
  LoadWeightBalance,
  LoadWeightBalanceSuccess,
  LoadUnsubmittedObjectiveMasterDataManageObjectives,
  SaveManageObjectives,
  EditManageObjectives,
  RecallManageObjectives,
  HideRecallManageObjectives,
  SubmitManageObjectives,
  LoadSubmittedObjectiveMasterDataManageObjectives,
  DeleteObjectiveDataManageObjectives,
  TriggerUnSubmittedBtnManageObjectives,
  TriggerAwaitingApprovalBtnManageObjectives,
  LoadApprovedObjectiveMasterDataManageObjectives,
  TriggerApprovedBtnManageObjectives,
  DeleteAllObjectiveDataManageObjectives,
  LoadObjectiveInfoManageObjectivesSuccess,
  SaveFromApprovalManageObjectives,
  EditFromApprovalManageObjectives,
  LoadWeightBalanceLM,
  LoadWeightBalanceLMSuccess,
  LoadPreScoredObjectiveMasterDataManageObjectives,
  LoadPreScoredObjectiveMasterDataManageObjectivesSuccess,
} from './manage-objectives.actions';
import {
  IObjectiveDto, IPlan, IObjectiveMasterDto
} from '@nutela/models/talent/performance';
import { IPerformanceState } from '../../root/performance.state';
import { IPerspective } from 'libs/models/talent/performance/src/lib/interfaces/perspective.interface';
import { LoadObjectiveMasterDataObjectiveApproval, HideEditorObjectiveApproval, NotProcessingObjectiveApproval } from '../objective-approval';

@Injectable()
export class ManageObjectivesEffects {
  constructor(
    private store: Store<IPerformanceState>,
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService
  ) { }


  @Effect()
  loadPlanList$: Observable<Action> = this.actions$
    .ofType<LoadPlanlistManageObjectives>(
      ManageObjectivesActionTypes.LOAD_PLAN_LIST
    )
    .pipe(
      switchMap(() => {
        return this.apiService.read(`${constants.MANAGE_OBJECTIVES_URLs.getplans}`).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              return new LoadPlanlistManageObjectivesSuccess(<IPlan[]>(
                data.Results
              ));
            } else {
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Form data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
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
  loadPerspectiveList$: Observable<Action> = this.actions$
    .ofType<LoadPerspectivelistManageObjectives>(
      ManageObjectivesActionTypes.LOAD_PERSPECTIVE_LIST
    )
    .pipe(
      switchMap(() => {
        return this.apiService.read(`${constants.MANAGE_OBJECTIVES_URLs.getPerspectives}`).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              return new LoadPerspectivelistManageObjectivesSuccess(<IPerspective[]>(
                data.Results
              ));
            } else {
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Form data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
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
  loadWeightBalance$: Observable<Action> = this.actions$
    .ofType<LoadWeightBalance>(
      ManageObjectivesActionTypes.LOAD_WEIGHT_BALANCE
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.update(`${constants.MANAGE_OBJECTIVES_URLs.getWeightBalance}/${payload.perspectiveId}/${payload.planId}`, null).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              return new LoadWeightBalanceSuccess((
                data.Results[0]
              ));
            } else {
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Form data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) =>
            of(
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
    loadWeightBalanceLM$: Observable<Action> = this.actions$
      .ofType<LoadWeightBalanceLM>(
        ManageObjectivesActionTypes.LM_LOAD_WEIGHT_BALANCE
      )
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService.read(`${constants.MANAGE_OBJECTIVES_URLs.getWeightBalanceLM}/${payload.perspectiveId}/${payload.planId}/${payload.employeeId}`).pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadWeightBalanceLMSuccess((
                  data.Results[0]
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: 'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
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
      loadPreScoredObjectives$: Observable<Action> = this.actions$
        .ofType<LoadPreScoredObjectiveMasterDataManageObjectives>(
          ManageObjectivesActionTypes.LOAD_PRESCORED_OBJECTIVE_MASTER_DATA
        )
        .pipe(
          map(action => action.payload),
          switchMap((payload) => {
            return this.apiService.read(`${constants.MANAGE_OBJECTIVES_URLs.getPreScoredObjectiveMasters}/${payload.planId}`).pipe(
              map((data: IApiResult) => {
                if (data.Success && data.Results) {
                  return new LoadPreScoredObjectiveMasterDataManageObjectivesSuccess((
                    data.Results
                  ));
                } else {
                  return new ShowToast({
                    title: 'Data Could Not Be Loaded',
                    message: data.ErrorMessage?data.ErrorMessage:'Something went wrong. Form data could not be loaded.',
                    options: toastOptionsError()
                  });
                }
              }),
              catchError((error: any) =>
                of(
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
  loadObjectiveMasterData$: Observable<Action> = this.actions$
    .ofType<LoadObjectiveMasterDataManageObjectives>(
      ManageObjectivesActionTypes.LOAD_OBJECTIVE_MASTER_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.MANAGE_OBJECTIVES_URLs.getObjectiveMasters}/${payload}`).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              const dataResult = <IObjectiveMasterDto>data.Results[0];
              this.store.dispatch(new LoadObjectiveInfoManageObjectivesSuccess(dataResult));

              if (dataResult.status === constants.OBJECTIVE_SUBMIT_STATUS_TYPES.unSubmitted && dataResult.approval_status === constants.OBJECTIVE_APPROVAL_STATUS_TYPES.unAppproved) {
                return new LoadUnsubmittedObjectiveMasterDataManageObjectives(payload);
              }
              if (dataResult.status === constants.OBJECTIVE_SUBMIT_STATUS_TYPES.unSubmitted && dataResult.approval_status === constants.OBJECTIVE_APPROVAL_STATUS_TYPES.unAppproved) {
                return new LoadUnsubmittedObjectiveMasterDataManageObjectives(payload);
              }
              if (dataResult.status === constants.OBJECTIVE_SUBMIT_STATUS_TYPES.submitted && dataResult.approval_status === constants.OBJECTIVE_APPROVAL_STATUS_TYPES.unAppproved) {
                return new LoadSubmittedObjectiveMasterDataManageObjectives(payload);
              }
              if (dataResult.status === constants.OBJECTIVE_SUBMIT_STATUS_TYPES.submitted && dataResult.approval_status === constants.OBJECTIVE_APPROVAL_STATUS_TYPES.approved) {
                return new LoadApprovedObjectiveMasterDataManageObjectives(payload);
              }
              if (dataResult.status > constants.OBJECTIVE_SUBMIT_STATUS_TYPES.submitted && dataResult.approval_status === constants.OBJECTIVE_APPROVAL_STATUS_TYPES.approved) {
                return new LoadApprovedObjectiveMasterDataManageObjectives(payload);
              }
              
              return new NotProcessingDataGridManageObjectives();
              // return new LoadApprovedObjectiveMasterDataManageObjectives(payload);

            } else {
              this.store.dispatch(new NotProcessingManageObjectives());
              this.store.dispatch(new NotProcessingDataGridManageObjectives());
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. Data could not be loaded.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) => {
            return from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                options: toastOptionsError()
              }),
              new NotProcessingDataGridManageObjectives()
            ]);
          })
        );
      })
    );

  @Effect()
  loadUnSubmittedObjectiveMasterData$: Observable<Action> = this.actions$
    .ofType<LoadUnsubmittedObjectiveMasterDataManageObjectives>(
      ManageObjectivesActionTypes.LOAD_UNSUBMITTED_OBJECTIVE_MASTER_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.MANAGE_OBJECTIVES_URLs.getUnSubmittedObjectives}/${payload}`).pipe(
          map((data: IApiResult) => {
            if (data.Success && data.Results) {
              if(data.Results.length > 0) {
                this.store.dispatch(new NotProcessingDataGridManageObjectives());
                this.store.dispatch(new TriggerUnSubmittedBtnManageObjectives());
                return new LoadObjectiveMasterDataManageObjectivesSuccess(<IObjectiveMasterDto[]>(
                  data.Results
                ));
              }
              return new NotProcessingDataGridManageObjectives();
            } else {
              this.store.dispatch(new NotProcessingDataGridManageObjectives());
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. No Submitted Objective Record was found.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) => {
            return from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                options: toastOptionsError()
              }),
              new NotProcessingDataGridManageObjectives()
            ]);
          })
        );
      })
    );

  @Effect()
  loadSubmittedObjectiveMasterData$: Observable<Action> = this.actions$
    .ofType<LoadSubmittedObjectiveMasterDataManageObjectives>(
      ManageObjectivesActionTypes.LOAD_SUBMITTED_OBJECTIVE_MASTER_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.MANAGE_OBJECTIVES_URLs.getSubmittedObjectives}/${payload}`).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              this.store.dispatch(new NotProcessingDataGridManageObjectives());
              this.store.dispatch(new TriggerAwaitingApprovalBtnManageObjectives());
              return new LoadObjectiveMasterDataManageObjectivesSuccess(<IObjectiveMasterDto[]>(
                data.Results
              ));
            } else {
              this.store.dispatch(new NotProcessingDataGridManageObjectives());
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. No Record Awaiting Approval.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) => {
            return from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                options: toastOptionsError()
              }),
              new NotProcessingDataGridManageObjectives()
            ]);
          })
        );
      })
    );

  @Effect()
  loadApprovedObjectiveMasterData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedObjectiveMasterDataManageObjectives>(
      ManageObjectivesActionTypes.LOAD_APPROVED_OBJECTIVE_MASTER_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService.read(`${constants.MANAGE_OBJECTIVES_URLs.getApprovedObjectives}/${payload}`).pipe(
          map((data: any) => {
            if (data.Success && data.Results) {
              this.store.dispatch(new NotProcessingDataGridManageObjectives());
              this.store.dispatch(new TriggerApprovedBtnManageObjectives());
              return new LoadObjectiveMasterDataManageObjectivesSuccess(<IObjectiveMasterDto[]>(
                data.Results
              ));
            } else {
              this.store.dispatch(new NotProcessingDataGridManageObjectives());
              return new ShowToast({
                title: 'Data Could Not Be Loaded',
                message: 'Something went wrong. No Approved Record.',
                options: toastOptionsError()
              });
            }
          }),
          catchError((error: any) => {
            return from([
              new ShowToast({
                title: 'Data Could Not Be Loaded',
                message:
                  'Something went wrong. Form data could not be loaded. Error occured.',
                options: toastOptionsError()
              }),
              new NotProcessingDataGridManageObjectives()
            ]);
          })
        );
      })
    );

  @Effect()
  saveManageObjectives$: Observable<Action> = this.actions$
    .ofType<SaveManageObjectives>(ManageObjectivesActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.MANAGE_OBJECTIVES_URLs.addObjective}`, payload.objectiveData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingManageObjectives(),
                  new LoadObjectiveMasterDataManageObjectives(payload.planId),
                  new HideEditorManageObjectives()
                ]);
              } else {
                return from([
                  new NotProcessingManageObjectives(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingManageObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  editManageObjectives$: Observable<Action> = this.actions$
    .ofType<EditManageObjectives>(ManageObjectivesActionTypes.EDIT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.MANAGE_OBJECTIVES_URLs.updateObjective}/${payload.recordId}`, payload.objectiveData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingManageObjectives(),
                  new LoadObjectiveMasterDataManageObjectives(payload.planID),
                  new HideEditorManageObjectives(),
                ]);
              } else {
                return from([
                  new NotProcessingManageObjectives(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingManageObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  recallManageObjectives$: Observable<Action> = this.actions$
    .ofType<RecallManageObjectives>(ManageObjectivesActionTypes.RECALL)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.MANAGE_OBJECTIVES_URLs.recallObjective}`, payload.recallData)
          .pipe(
            switchMap((data: IApiResult) => {

              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingManageObjectives(),
                  new HideRecallManageObjectives(),
                  new LoadObjectiveMasterDataManageObjectives(payload.recallData.plan_id),
                ]);
              } else {
                return from([
                  new NotProcessingManageObjectives(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingManageObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  submitManageObjectives$: Observable<Action> = this.actions$
    .ofType<SubmitManageObjectives>(ManageObjectivesActionTypes.SUBMIT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.MANAGE_OBJECTIVES_URLs.submitObjective}/${payload}`, null)
          .pipe(
            switchMap((data: IApiResult) => {

              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingManageObjectives(),
                  new LoadObjectiveMasterDataManageObjectives(payload),
                ]);
              } else {
                return from([
                  new NotProcessingManageObjectives(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingManageObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteManageObjectiveData$: Observable<Action> = this.actions$
    .ofType<DeleteObjectiveDataManageObjectives>(ManageObjectivesActionTypes.DELETE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.MANAGE_OBJECTIVES_URLs.deleteObjective}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log('return value form server', data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadObjectiveMasterDataManageObjectives(payload.planID),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteAllManageObjectiveData$: Observable<Action> = this.actions$
    .ofType<DeleteAllObjectiveDataManageObjectives>(ManageObjectivesActionTypes.DELETE_ALL)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.MANAGE_OBJECTIVES_URLs.deleteAllObjective}/${payload.planID}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Records were deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadObjectiveMasterDataManageObjectives(payload.planID),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

    
  @Effect()
  saveFromApprovalManageObjectives$: Observable<Action> = this.actions$
    .ofType<SaveFromApprovalManageObjectives>(ManageObjectivesActionTypes.SAVE_FROM_APPROVAL)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.MANAGE_OBJECTIVES_URLs.approvalAddObjective}/${payload.approvalInfo['employee_id']}`, payload.objectiveData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingManageObjectives(),
                  new LoadObjectiveMasterDataObjectiveApproval({plan_id: payload.approvalInfo['plan_id'], employee_id: payload.approvalInfo['employee_id']}),
                  new HideEditorObjectiveApproval()
                ]);
              } else {
                return from([
                  new NotProcessingManageObjectives(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingManageObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  editFromApprovalManageObjectives$: Observable<Action> = this.actions$
    .ofType<EditFromApprovalManageObjectives>(ManageObjectivesActionTypes.EDIT_FROM_APPROVAL)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.MANAGE_OBJECTIVES_URLs.approvalUpdateObjective}/${payload.recordId}/${payload.approvalInfo['employee_id']}`, payload.objectiveData)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingManageObjectives(),
                  new LoadObjectiveMasterDataObjectiveApproval({plan_id: payload.approvalInfo['plan_id'], employee_id: payload.approvalInfo['employee_id']}),
                  new HideEditorObjectiveApproval(),
                ]);
              } else {
                return from([
                  new NotProcessingManageObjectives(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingManageObjectives(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );



}
