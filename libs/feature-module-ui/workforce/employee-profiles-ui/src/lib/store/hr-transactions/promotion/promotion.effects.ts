import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';

import { ApiService, toastOptionsError, UtilService } from '@nutela/core-services';

import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import {
  LoadApprovedDataPromotion,
  LoadApprovedDataPromotionSuccess,
  PromotionActionTypes,
  LoadAwaitingApprovalDataPromotion,
  LoadAwaitingApprovalDataPromotionSuccess,
  LoadPendingDataPromotion,
  LoadPendingDataPromotionSuccess,
  NotProcessingPromotion,
  HideEditorPromotion,
  SaveDataPromotion,
  LoadPaygradeDataPromotion,
  LoadPaygradeDataPromotionSuccess,
  LoadPaygroupDataPromotion,
  LoadPaygroupDataPromotionSuccess,
  LoadCurrentPaygradeDataPromotion,
  LoadCurrentPaygradeDataPromotionSuccess,
  LoadCurrentPaygroupDataPromotion,
  LoadCurrentPaygroupDataPromotionSuccess,
  LoadArrearsStatusDataPromotion,
  LoadArrearsStatusDataPromotionSuccess,
  LoadSubmissionProcessDataPromotion,
  LoadSubmissionProcessDataPromotionSuccess,
  SubmitDataPromotion,
  HideSubmissionProcessEditorPromotion,
  DeleteDataPromotion,
  LoadEmployeeCurrentGradePaygroupDataPromotion,
  LoadEmployeeCurrentGradePaygroupDataPromotionSuccess,
  NotLoadingPromotion,
  LoadActionDataPromotion,
  LoadActionDataPromotionSuccess
} from './promotion.actions';
import { IPromotion } from '@nutela/models/workforce/employee-profiles';
import * as constants from '../../../constants';
import { ToastTypes } from '@nutela/shared/app-global';
import { IEmployeesProfileState } from '../../root';

@Injectable()
export class PromotionEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IEmployeesProfileState>
  ) { }


  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataPromotion>(PromotionActionTypes.LOAD_APPROVED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.PROMOTIONS_URLs.getApproved}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingPromotion());
                return new LoadApprovedDataPromotionSuccess(<IPromotion[]>(
                    data.Results
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
  loadAwaitingData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataPromotion>(PromotionActionTypes.LOAD_AWAITING_APPROVAL_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.PROMOTIONS_URLs.getAwaiting}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingPromotion());
                return new LoadAwaitingApprovalDataPromotionSuccess(<IPromotion[]>(
                    data.Results
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
  loadPendingData$: Observable<Action> = this.actions$
    .ofType<LoadPendingDataPromotion>(PromotionActionTypes.LOAD_PENDING_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.PROMOTIONS_URLs.getUnsubmitted}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingPromotion());
                return new LoadPendingDataPromotionSuccess(<IPromotion[]>(
                    data.Results
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
    loadPaygrades$: Observable<Action> = this.actions$
      .ofType<LoadPaygradeDataPromotion>(PromotionActionTypes.LOAD_PAYGRADE_DATA)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.PROMOTIONS_URLs.paygrades)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  const paygradesTransformed = this.utilService.transformToSelectDataList(data.Results, 'grade_id', 'description');
                  this.store.dispatch(new NotProcessingPromotion());
                  return new LoadPaygradeDataPromotionSuccess(
                    paygradesTransformed
                    );
                  } else {
                    this.store.dispatch(new NotProcessingPromotion());
                  return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotProcessingPromotion(),
                  new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
        })
      );

    @Effect()
    loadAllPaygroups$: Observable<Action> = this.actions$
      .ofType<LoadCurrentPaygroupDataPromotion>(PromotionActionTypes.LOAD_CURRENT_PAYGROUP_DATA)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.PROMOTIONS_URLs.allPaygroups)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  const paygradesTransformed = this.utilService.transformToSelectDataList(data.Results, 'paygroup_id', 'description');
                  this.store.dispatch(new NotProcessingPromotion());
                  return new LoadCurrentPaygroupDataPromotionSuccess(
                    paygradesTransformed
                    );
                  } else {
                    this.store.dispatch(new NotProcessingPromotion());
                  return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotProcessingPromotion(),
                  new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
        })
      );

  @Effect()
  loadPaygroupsByGrade$: Observable<Action> = this.actions$
    .ofType<LoadPaygroupDataPromotion>(PromotionActionTypes.LOAD_PAYGROUP_DATA)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${constants.PROMOTIONS_URLs.paygroupsByGrade}/${payload.gradeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const paygroupsTransformed = this.utilService.transformToSelectDataList(data.Results, 'paygroup_id', 'description');
                this.store.dispatch(new NotProcessingPromotion());
                return new LoadPaygroupDataPromotionSuccess(
                  paygroupsTransformed
                  );
              } else {
                this.store.dispatch(new NotProcessingPromotion());
                return new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingPromotion(),
                new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );



    // @Effect()
    // loadCurrentPaygrades$: Observable<Action> = this.actions$
    //   .ofType<LoadCurrentPaygradeDataPromotion>(PromotionActionTypes.LOAD_CURRENT_PAYGRADE_DATA)
    //   .pipe(
    //     switchMap(() => {
    //       return this.apiService
    //         .read(constants.PROMOTIONS_URLs.paygrades)
    //         .pipe(
    //           map((data: any) => {
    //             if (data.Success && data.Results) {
    //               const paygradesTransformed = this.utilService.transformToSelectDataList(data.Results, 'grade_id', 'description');
    //               this.store.dispatch(new NotProcessingPromotion());
    //               return new LoadCurrentPaygradeDataPromotionSuccess(
    //                 paygradesTransformed
    //                 );
    //               } else {
    //                 this.store.dispatch(new NotProcessingPromotion());
    //               return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
    //             }
    //           }),
    //           catchError((error: any) =>
    //             of(
    //               new NotProcessingPromotion(),
    //               new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
    //             )
    //           )
    //         );
    //     })
    //   );

  // @Effect()
  // loadCurrentPaygroups$: Observable<Action> = this.actions$
  //   .ofType<LoadCurrentPaygroupDataPromotion>(PromotionActionTypes.LOAD_CURRENT_PAYGROUP_DATA)
  //   .pipe(
  //     map(action => action.payload),
  //     mergeMap((payload) => {
  //       return this.apiService
  //         .read(`${constants.PROMOTIONS_URLs.paygroupsByGrade}`)
  //         .pipe(
  //           map((data: any) => {
  //             if (data.Success && data.Results) {
  //               const paygroupsTransformed = this.utilService.transformToSelectDataList(data.Results, 'paygroup_id', 'description');
  //               this.store.dispatch(new NotProcessingPromotion());
  //               return new LoadCurrentPaygroupDataPromotionSuccess(
  //                 paygroupsTransformed
  //                 );
  //             } else {
  //               this.store.dispatch(new NotProcessingPromotion());
  //               return new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
  //             }
  //           }),
  //           catchError((error: any) =>
  //             of(
  //               new NotProcessingPromotion(),
  //               new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
  //             )
  //           )
  //         );
  //     })
  //   );

  @Effect()
  loadEmployeeCurrentGradeAndPaygroup$: Observable<Action> = this.actions$
    .ofType<LoadEmployeeCurrentGradePaygroupDataPromotion>(PromotionActionTypes.LOAD_EMPLOYEE_CURRENT_GRADE_PAYGROUP_DATA)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${constants.PROMOTIONS_URLs.currentGradeAndPaygroup}/${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingPromotion());
                return new LoadEmployeeCurrentGradePaygroupDataPromotionSuccess(
                  data.Results[0]
                  );
              } else {
                this.store.dispatch(new NotProcessingPromotion());
                return new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingPromotion(),
                new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
              )
            )
          );
      })
    );



    @Effect()
    loadArrearsStatus$: Observable<Action> = this.actions$
      .ofType<LoadArrearsStatusDataPromotion>(PromotionActionTypes.LOAD_ARREARS_STATUS_DATA)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.PROMOTIONS_URLs.arrearStatus)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  const transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                  this.store.dispatch(new NotProcessingPromotion());
                  return new LoadArrearsStatusDataPromotionSuccess(
                    transformed
                    );
                  } else {
                    this.store.dispatch(new NotProcessingPromotion());
                  return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotProcessingPromotion(),
                  new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
        })
      );


    @Effect()
    loadActions$: Observable<Action> = this.actions$
      .ofType<LoadActionDataPromotion>(PromotionActionTypes.LOAD_ACTIONS_DATA)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.PROMOTIONS_URLs.actions)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  const transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                  this.store.dispatch(new NotProcessingPromotion());
                  return new LoadActionDataPromotionSuccess(
                    transformed
                    );
                  } else {
                    this.store.dispatch(new NotProcessingPromotion());
                  return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotProcessingPromotion(),
                  new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
        })
      );

    @Effect()
    loadSubmissionProcess$: Observable<Action> = this.actions$
      .ofType<LoadSubmissionProcessDataPromotion>(PromotionActionTypes.LOAD_SUBMISSION_PROCESS_DATA)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.PROMOTIONS_URLs.submissionProcess)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  const transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                  this.store.dispatch(new NotProcessingPromotion());
                  return new LoadSubmissionProcessDataPromotionSuccess(
                    transformed
                    );
                  } else {
                    this.store.dispatch(new NotProcessingPromotion());
                  return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
                }
              }),
              catchError((error: any) =>
                of(
                  new NotProcessingPromotion(),
                  new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR})
                )
              )
            );
        })
      );


  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataPromotion>(PromotionActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.PROMOTIONS_URLs.delete}/${payload.promotion_id}`)
          .pipe(
            switchMap((data: IApiResult) => {

              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS}),
                  new LoadApprovedDataPromotion(),
                  new LoadPendingDataPromotion(),
                  new LoadAwaitingApprovalDataPromotion()
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
      .ofType<SaveDataPromotion>(PromotionActionTypes.SAVE_DATA)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = payload.editMode? `${constants.PROMOTIONS_URLs.updateApproved}/${payload.promotion_id}` : constants.PROMOTIONS_URLs.create;
          return this.apiService
            .create(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingPromotion(),
                    new HideEditorPromotion(),
                    new LoadPendingDataPromotion(),
                    new LoadApprovedDataPromotion()
                  ]);
                } else {
                  return from([
                    new NotProcessingPromotion(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingPromotion(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

    @Effect()
    submitData$: Observable<Action> = this.actions$
      .ofType<SubmitDataPromotion>(PromotionActionTypes.SUBMIT_DATA)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = (payload.processId === 0 || payload.processId == undefined)? constants.PROMOTIONS_URLs.submitIndividual : constants.PROMOTIONS_URLs.submitBatch;
          return this.apiService
            .update(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS}),
                    new NotProcessingPromotion(),
                    new HideSubmissionProcessEditorPromotion(),
                    new LoadPendingDataPromotion(),
                  ]);
                } else {
                  return from([
                    new NotProcessingPromotion(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingPromotion(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );

}
