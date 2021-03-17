import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ICustomDataForm } from '@nutela/models/workforce/employee-profiles';

import * as constants from '../../constants';
import {
  ApiService,
  UtilService
} from '@nutela/core-services';
import { ShowToast } from '@nutela/store/shared';
import {
  NotProcessingProcessData,
  LoadSubmittedLetter,
  LoadSubmittedLetterSuccess,
  ProcessActionTypes,
  LoadProcessListData,
  LoadProcessListDataSuccess,
  NotLoadingProcessData,
  CancelMyProcess,
  LoadInterviewLink,
  LoadInterviewLinkSuccess,
  SubmitChecklistTransaction,
  LoadChecklistTypesSuccess,
  LoadChecklistTypes,
  LoadChecklistTransactionsSuccess,
  LoadChecklistTransactions,
  LoadLetterDocument,
  LoadLetterDocumentSuccess,
  LoadPendingResponsesSuccess,
  LoadPendingResponses,
  SubmitChecklistTransactionSuccess,
  LoadCustomFormData,
  LoadCustomFormDataSuccess,
  LoadExitEmployeePhoto,
  LoadExitEmployeePhotoSuccess,
  ProcessingSaveData,
  ProcessingRedirectData,
} from './process.actions';
import { ToastTypes, PROFILE_AVATAR, GENERAL } from '@nutela/shared/app-global';
import { IExitState } from '../root';
import { IResignationLetter, IProcessStep, IChecklistItem } from '../../interfaces';
import { IApiResult } from '@nutela/models/core-data';
import { StartInterview, StartInterviewSuccess } from '../resignation/resignation.actions'
import { LoadExitInitiationProcessStatus } from 'libs/store/shared/src/lib/notification';
import { CHECKLIST_ACTIONS } from '../../constants';
import { MatDialogRef } from '@angular/material';
import { EmployeeSelectorComponent } from '../../components/employee-selector/employee-selector.component';

@Injectable()
export class ProcessEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<IExitState>,
    private utilService: UtilService,
    private location: Location,
    public dialogRef: MatDialogRef<EmployeeSelectorComponent>,
  ) { }


  @Effect()
  loadSubmittedLetter$: Observable<Action> = this.actions$
      .ofType<LoadSubmittedLetter>(ProcessActionTypes.LOAD_SUBMITTED_LETTER)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = payload.employeeId ? `${constants.LM_EXIT_DATA_URLs.getLetter}/${payload.employeeId}` : `${constants.MY_EXIT_DATA_URLs.getSubmittedLetter}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                if (data.Results[0] && data.Results[0].doc_binary) {
                  const result = data.Results[0];
                  const docData = this.utilService.getDocumentData(
                    result.doc_binary,
                    result.doc_extension
                  );
                  this.store.dispatch(new LoadLetterDocumentSuccess(docData));
                  return new LoadSubmittedLetterSuccess(<IResignationLetter>(data.Results[0]));
                } else {
                  return new LoadSubmittedLetterSuccess(<IResignationLetter>(data.Results[0]));
                }
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.',
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    error.status == 401
                      ? error.error.ErrorMessage
                      : `Something went wrong. Form data could not be loaded. Error occured.`,
                  type: ToastTypes.ERROR
                })
              )
            )
          );
      })
  );

  @Effect()
  loadExitEmployeePhoto$: Observable<Action> = this.actions$
      .ofType<LoadExitEmployeePhoto>(ProcessActionTypes.LOAD_EMPLOYEE_PHOTO)
    .pipe(
      map(action => action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.LM_EXIT_DATA_URLs.profilePhoto}/${payload}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const photo = data.Results.length > 0 ? `${GENERAL.pngBase64Header}${data.Results[0].image_profile}` : PROFILE_AVATAR.uri;
                return new LoadExitEmployeePhotoSuccess(photo);
              } else {
                return new LoadExitEmployeePhotoSuccess(PROFILE_AVATAR.uri);
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Employee Photo Could Not Be Loaded', message: `Something went wrong. Form data could not be saved. Error occured.${console.error(error)}`, type: ToastTypes.ERROR })
              )
            )
          );
      })
    );


  @Effect()
  loadProcessListData$: Observable<Action> = this.actions$
    .ofType<LoadProcessListData>(ProcessActionTypes.LOAD_PROCESS_DATA)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = payload.employeeId ? `${constants.LM_EXIT_DATA_URLs.getProcessList}/${payload.employeeId}` : `${constants.MY_EXIT_DATA_URLs.getProcessList}`
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingProcessData());
                return new LoadProcessListDataSuccess(<IProcessStep[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingProcessData());
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.',
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingProcessData(),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    error.status == 401
                      ? error.error.ErrorMessage
                      : 'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  loadMyLetterDocument$: Observable<Action> = this.actions$
      .ofType<LoadLetterDocument>(ProcessActionTypes.LOAD_LETTER_DOCUMENT)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.MY_EXIT_DATA_URLs.document}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                let docData = null;

                if (data.Results && data.Results.length > 0) {
                  const result = data.Results[0];
                  docData = this.utilService.getDocumentData(
                    result.doc_binary,
                    result.doc_extension
                  );
                }
                return new LoadLetterDocumentSuccess(docData);
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.',
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    error.status == 401
                      ? error.error.ErrorMessage
                      : 'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  loadInterviewLink$: Observable<Action> = this.actions$
      .ofType<LoadInterviewLink>(ProcessActionTypes.LOAD_INTERVIEW_LINK_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.MY_EXIT_DATA_URLs.interviewLink}/${payload.recordId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingProcessData());
                data.Results[0] ?
                  this.store.dispatch(new StartInterview({ resignationId: payload.recordId })):
                  this.store.dispatch(new StartInterviewSuccess(false));
                return new LoadInterviewLinkSuccess(data.Results[0]);
              } else {
                this.store.dispatch(new NotLoadingProcessData());
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.',
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingProcessData(),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured. INTERVIEW LINK',
                  type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  loadChecklistTransactions$: Observable<Action> = this.actions$
      .ofType<LoadChecklistTransactions>(ProcessActionTypes.LOAD_CHECKLIST_TRANSACTIONS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.isLM ? `${constants.LM_EXIT_DATA_URLs.getChecklistTransactions}/${payload.resignationId}` : `${constants.MY_EXIT_DATA_URLs.getChecklistTransactions}/${payload.resignationId}`
        return this.apiService
          .read(url)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingProcessData());
                return new LoadChecklistTransactionsSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingProcessData());
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.',
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingProcessData(),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured. CHECKLIST TRanasction',
                  type: ToastTypes.ERROR
                })
              )
            )
          );
      })
  );


  @Effect()
  loadCutomForm$: Observable<Action> = this.actions$
      .ofType<LoadCustomFormData>(ProcessActionTypes.LOAD_CUSTOM_FORM_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.MY_EXIT_DATA_URLs.getCustomFormData}/${payload.transactionId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadCustomFormDataSuccess(<ICustomDataForm>(
                  data.Results[0]
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadChecklistTypes$: Observable<Action> = this.actions$
      .ofType<LoadChecklistTypes>(ProcessActionTypes.LOAD_CHECKLIST_TYPES)
    .pipe(
      // map(action => action.payload),
      switchMap(() => {
        return this.apiService
          .read(`${constants.CHECKLIST_DATA_URLs.getAll}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingProcessData());
                return new LoadChecklistTypesSuccess(<IChecklistItem[]>data.Results);
              } else {
                this.store.dispatch(new NotLoadingProcessData());
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.',
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingProcessData(),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  loadPendingResponses$: Observable<Action> = this.actions$
      .ofType<LoadPendingResponses>(ProcessActionTypes.LOAD_PENDING_RESPONSES)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.CHECKLIST_DATA_URLs.getPending}/${payload.resignationId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadPendingResponsesSuccess(data.Results);
              } else {
                this.store.dispatch(new NotLoadingProcessData());
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.',
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingProcessData(),
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  submitChecklistTransaction$: Observable<Action> = this.actions$
    .ofType<SubmitChecklistTransaction>(ProcessActionTypes.SUBMIT_CHECKLIST_TRANSACTIONS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.isLM ? `${constants.LM_EXIT_DATA_URLs.submitChecklistTransaction}/${payload.employeeId}/${payload.resignationId}` : `${constants.MY_EXIT_DATA_URLs.submitChecklistTransaction}/${payload.employeeId}/${payload.resignationId}`;
        return this.apiService.update(url, payload.data).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              payload.isLM ? this.store.dispatch(new LoadChecklistTransactions({ resignationId: payload.resignationId, isLM: payload.isLM })) : this.store.dispatch(new LoadChecklistTransactions({ resignationId: payload.resignationId, isLM: payload.isLM }));
              this.store.dispatch(new SubmitChecklistTransactionSuccess(data.Success));

              switch (payload.requestType) {
                case CHECKLIST_ACTIONS.submit:
                  this.store.dispatch(new NotProcessingProcessData());
                  this.location.back();
                  return from([
                    new ShowToast({
                      title: null,
                      message: `Your data was submitted successfully.`,
                      type: ToastTypes.SUCCESS
                    })
                  ]);

                case CHECKLIST_ACTIONS.save:
                  this.store.dispatch(new ProcessingSaveData(false));
                  return from([
                    new ShowToast({
                      title: null,
                      message: `Your data was saved successfully.`,
                      type: ToastTypes.SUCCESS
                    })
                  ]);

                case CHECKLIST_ACTIONS.redirect:
                  this.store.dispatch(new ProcessingRedirectData(false));
                  return from([
                    new ShowToast({
                      title: null,
                      message: `Your data was Redirected successfully.`,
                      type: ToastTypes.SUCCESS
                    })
                  ]);

                default:
                  break;
              }
            } else {
              this.store.dispatch(new SubmitChecklistTransactionSuccess(data.Success));
              this.store.dispatch(new ProcessingSaveData(false));
              this.store.dispatch(new ProcessingRedirectData(false));
              return from([
                new NotProcessingProcessData(),
                new ShowToast({
                  title: 'Data Could Not Be Saved',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : `Something went wrong. Form data could not be loaded.`,
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotProcessingProcessData(),
              new ProcessingSaveData(false),
              new ProcessingRedirectData(false),
              new ShowToast({
                title: 'Data Could Not Be Saved',
                message:
                  error.status == 401
                    ? error.error.ErrorMessage
                    : `Something went wrong. Form data could not be saved. Error occured. CATCH SUBMIT ERROR`,
                type: ToastTypes.ERROR
              })
            ])
          )
        );
      })
    );

  @Effect()
  cancelProcess$: Observable<Action> = this.actions$
    .ofType<CancelMyProcess>(ProcessActionTypes.CANCEL_MY_PROCESS)
    .pipe(
      // map(action => action.payload),
      switchMap(() => {
        const url = constants.MY_EXIT_DATA_URLs.cancelProcess;
        return this.apiService.update(url, null).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new ShowToast({
                  title: null,
                  message: `Your data was cancelled successfully.`,
                  type: ToastTypes.SUCCESS
                }),
                new NotLoadingProcessData(),
                new LoadExitInitiationProcessStatus(),
              ]);
            } else {
              return from([
                new NotLoadingProcessData(),
                new ShowToast({
                  title: 'Data Could Not Be Saved',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : `Something went wrong. Form data could not be loaded.`,
                  type: ToastTypes.ERROR
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotLoadingProcessData(),
              new ShowToast({
                title: 'Data Could Not Be Saved',
                message:
                  error.status == 401
                    ? error.error.ErrorMessage
                    : `Something went wrong. Form data could not be saved. Error occured.`,
                type: ToastTypes.ERROR
              })
            ])
          )
        );
      })
    );
}
