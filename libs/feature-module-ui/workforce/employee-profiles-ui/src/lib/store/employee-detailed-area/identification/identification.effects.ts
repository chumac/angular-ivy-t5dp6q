import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess } from '@nutela/core-services';

import {
  IdentificationActionTypes,
  LoadApprovedDataHRIdentification,
  LoadApprovedDataHRIdentificationSuccess,
  LoadAwaitingApprovalDataHRIdentification,
  LoadAwaitingApprovalDataHRIdentificationSuccess,
  SaveHRIdentification,
  NotProcessingHRIdentification,
  HideEditorHRIdentification,
  DeleteAwaitingApprovalDataIdentification,
  LoadGrade,
  LoadGradeSuccess,
  LoadPosition,
  LoadPositionSuccess,
  LoadPayGroup,
  LoadPayGroupSuccess,
  LoadJobTitle,
  LoadJobTitleSuccess,
  LoadActingJobTitle,
  LoadActingJobTitleSuccess,
  LoadPaymentMode,
  LoadPaymentModeSuccess,
  LoadReportTo,
  LoadReportToSuccess,
  LoadBackUpOfficer,
  LoadBackUpOfficerSuccess
} from './identification.actions';
import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { IEmployeesProfileState } from '../../root';

@Injectable()
export class IdentificationEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IEmployeesProfileState>) {}

  @Effect()
  loadApprovedData$: Observable<Action> = this.actions$
    .ofType<LoadApprovedDataHRIdentification>(IdentificationActionTypes.HR_LOAD_APPROVED_DATA)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.IDENTIFICATION_INFORMATION.approvedData}?employeeID=${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingHRIdentification());
                return new LoadApprovedDataHRIdentificationSuccess(<IIdentification>(
                  data.Results[0]
                ));
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
  loadAwaitingApprovalData$: Observable<Action> = this.actions$
    .ofType<LoadAwaitingApprovalDataHRIdentification>(
      IdentificationActionTypes.HR_LOAD_AWAITING_APPROVAL_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.IDENTIFICATION_INFORMATION.awaitingApprovalData}?employeeID=${payload.employeeId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadAwaitingApprovalDataHRIdentificationSuccess(<IIdentification>(
                  data.Results[0]
                ));
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
  submitData$: Observable<Action> = this.actions$
    .ofType<SaveHRIdentification>(IdentificationActionTypes.HR_SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.IDENTIFICATION_INFORMATION.updateAwaitingApprovalData}/${payload.employeeId}/${payload.employeeinfo_id}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was submitted successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingHRIdentification(),
                  new HideEditorHRIdentification(),
                  new LoadAwaitingApprovalDataHRIdentification({employeeId:payload.employeeId}),
                  new LoadApprovedDataHRIdentification({employeeId:payload.employeeId}),
                ]);
              } else {
                return from([
                  new NotProcessingHRIdentification(),
                  new ShowToast({title: 'Data Could Not Be Submitted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingHRIdentification(),
                new ShowToast({title: 'Data Could Not Be Submitted', message: `Something went wrong. Form data could not be submitted. Error occured.`, options: toastOptionsError()})
              ])
            )
          );
      })
    );

    @Effect()
    deleteAwaitingApprovalData$: Observable<Action> = this.actions$
      .ofType<DeleteAwaitingApprovalDataIdentification>(IdentificationActionTypes.HR_DELETE_AWAITING_APPROVAL_DATA)
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {

          return this.apiService
            .delete(`${constants.IDENTIFICATION_INFORMATION.deleteAwaitingApprovalData}/${payload.id}`)
            .pipe(
              switchMap((data: IApiResult) => {

                if (data.Success) {
                  return from([
                    new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                    new LoadAwaitingApprovalDataHRIdentification({employeeId:payload.employeeId}),
                    new LoadApprovedDataHRIdentification({employeeId:payload.employeeId}),
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
// loading all drop downs

@Effect()
loadGrade$: Observable<Action> = this.actions$
  .ofType<LoadGrade>(IdentificationActionTypes.HR_LOAD_GRADE)
  .pipe(
    switchMap(() => {
      return this.apiService
        .read(constants.IDENTIFICATION_INFORMATION.grade)
        .pipe(
          map((data: any) => {
            const grade=this.utilService.transformToSelectDataList(data.Results,"grade_id","description");
            if (data.Success) {
              return new LoadGradeSuccess(<ISelectOption[]>(
                grade
              ));
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
  loadPositionData$: Observable<Action> = this.actions$
    .ofType<LoadPosition>(IdentificationActionTypes.HR_LOAD_POSITION)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.IDENTIFICATION_INFORMATION.position)
          .pipe(
            map((data: any) => {
              const position=this.utilService.transformToSelectDataList(data.Results,"position_id","description");
              if (data.Success) {
                return new LoadPositionSuccess(<ISelectOption[]>(
                  position
                ));
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
    loadPayGroup$: Observable<Action> = this.actions$
      .ofType<LoadPayGroup>(IdentificationActionTypes.HR_LOAD_PAY_GROUP)
        .pipe(
          map(action => action.payload),
        switchMap((payload) => {
          return this.apiService
            .read(`${constants.IDENTIFICATION_INFORMATION.paygroupByGradeId}/${payload.gradeId}`)
            .pipe(
              map((data: any) => {
                const Group=this.utilService.transformToSelectDataList(data.Results,"paygroup_id","description");
                if (data.Success) {
                  return new LoadPayGroupSuccess(<ISelectOption[]>(
                    Group
                  ));
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
    loadJobTitle$: Observable<Action> = this.actions$
      .ofType<LoadJobTitle>(IdentificationActionTypes.HR_LOAD_JOB_TITLE)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.IDENTIFICATION_INFORMATION.jobTitle)
            .pipe(
              map((data: any) => {
                const Title=this.utilService.transformToSelectDataList(data.Results,"title_id","description");
                if (data.Success) {
                  return new LoadJobTitleSuccess(<ISelectOption[]>(
                    Title
                  ));
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
      loadActingJobTitle$: Observable<Action> = this.actions$
        .ofType<LoadActingJobTitle>(IdentificationActionTypes.HR_LOAD_ACTING_JOB_TITLE)
        .pipe(
          switchMap(() => {
            return this.apiService
              .read(constants.IDENTIFICATION_INFORMATION.actingJobTitle)
              .pipe(
                map((data: any) => {
                  const Title=this.utilService.transformToSelectDataList(data.Results,"title_id","description");
                  if (data.Success) {
                    return new LoadActingJobTitleSuccess(<ISelectOption[]>(
                      Title
                    ));
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
        loadPaymentMode$: Observable<Action> = this.actions$
          .ofType<LoadPaymentMode>(IdentificationActionTypes.HR_LOAD_PAYMENT_MODE)
          .pipe(
            switchMap(() => {
              return this.apiService
                .read(constants.IDENTIFICATION_INFORMATION.paymentMode)
                .pipe(
                  map((data: any) => {
                    const position=this.utilService.transformToSelectDataList(data.Results,"description","description");
                    if (data.Success) {
                      return new LoadPaymentModeSuccess(<ISelectOption[]>(
                        position
                      ));
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
          loadReportTo$: Observable<Action> = this.actions$
            .ofType<LoadReportTo>(IdentificationActionTypes.HR_LOAD_REPORT_TO)
            .pipe(
              switchMap(() => {
                return this.apiService
                  .read(constants.IDENTIFICATION_INFORMATION.reportTo)
                  .pipe(
                    map((data: any) => {
                      const report=this.utilService.transformToSelectDataList(data.Results,"employee_id","emp_fullname");
                      if (data.Success) {
                        return new LoadReportToSuccess(<ISelectOption[]>(
                          report
                        ));
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
            loadBackUpOfficer$: Observable<Action> = this.actions$
              .ofType<LoadBackUpOfficer>(IdentificationActionTypes.HR_LOAD_BACK_UP_OFFICER)
              .pipe(
                switchMap(() => {
                  return this.apiService
                    .read(constants.IDENTIFICATION_INFORMATION.backUpOfficer)
                    .pipe(
                      map((data: any) => {
                        const backUp=this.utilService.transformToSelectDataList(data.Results,"employee_id","emp_fullname");
                        if (data.Success) {
                          return new LoadBackUpOfficerSuccess(<ISelectOption[]>(
                            backUp
                          ));
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
}
