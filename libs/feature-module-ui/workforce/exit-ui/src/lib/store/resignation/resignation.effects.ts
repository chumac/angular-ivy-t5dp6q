import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../constants';
import {
  ApiService,
  UtilService
} from '@nutela/core-services';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import {
  NotProcessingResignation,
  LoadDataSubmittedResignation,
  LoadDataSubmittedResignationSuccess,
  ResignationActionTypes,
  LoadDataResponsesResignation,
  LoadDataResponsesResignationSuccess,
  SubmitResignationLetter,
  SubmitResignationLetterSuccess,
  SubmitResignationLetterFailure,
  LoadResignationTypesSelectOption,
  LoadResignationTypesSelectOptionSuccess,
  LoadMySubordinates,
  LoadMySubordinatesSuccess,
  LoadEmployeeExitProcessInitiationStatus,
  LoadEmployeeExitProcessInitiationStatusSuccess,
  LoadExitInitiationStatus,
  LoadExitInitiationStatusSuccess,
  LoadDocumentResign,
  LoadDocumentResignSuccess,
  StartInterview,
  StartInterviewSuccess,
  HideLetterEditor,
  NotLoadingResignation,
  LoadDataProxyResignationsSuccess,
  LoadDataProxyResignations,
} from './resignation.actions';
import {
  IResignationSubmitted,
  IResponse
} from 'libs/models/workforce/exit/src/lib/interfaces';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { IExitState } from '../root';
import { ISelectOption } from 'dist/libs/models/core-data';
import { IEmployee } from '@nutela/models/compensation/loans';
import { LoadExitInitiationProcessStatus } from 'libs/store/shared/src/lib/notification';
import { LoadInterviewLinkSuccess, LoadCustomFormData } from '../process/process.actions';
import { Router } from '@angular/router';

@Injectable()
export class ResignationEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<IExitState>,
    private utilService: UtilService,
    private router: Router,
  ) { }

   @Effect()
  loadSubmittedResignation$: Observable<Action> = this.actions$
       .ofType<LoadDataSubmittedResignation>(ResignationActionTypes.LOAD_SUBMITTED_RESIGNATIONS_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.MY_EXIT_DATA_URLs.getSubmittedLetter)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {

                if (data.Results.length && data.Results[0].doc_binary) {
                  const result = data.Results[0];
                  const docData = this.utilService.getDocumentData(
                    result.doc_binary,
                    result.doc_extension
                  );

                  this.store.dispatch(new LoadDocumentResignSuccess(docData));
                }
                this.store.dispatch(new NotLoadingResignation());
                return new LoadDataSubmittedResignationSuccess(<IResignationSubmitted[]>(data.Results));
              } else {
                this.store.dispatch(new NotLoadingResignation());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingResignation(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: (error.status == 401) ? error.error.ErrorMessage : `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              )
            )
          );
      })
  );


  @Effect()
  loadProxyResignations$: Observable<Action> = this.actions$
    .ofType<LoadDataProxyResignations>(
      ResignationActionTypes.LOAD_PROXY_RESIGNATIONS_DATA
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LM_EXIT_DATA_URLs.getProxyResignations)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadDataProxyResignationsSuccess(<IResignationSubmitted[]>(data.Results));
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
  startInterview$: Observable<Action> = this.actions$
    .ofType<StartInterview>(ResignationActionTypes.START_INTERVIEW)
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.MY_EXIT_DATA_URLs.startInterview}/${payload.resignationId}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingResignation())
                const link = +data.Results[0]
                if (!isNaN(link)) {
                  this.store.dispatch(new LoadCustomFormData({ transactionId: link }))
                } else {
                  window.open(data.Results[0], '_blank')
                }
                return new StartInterviewSuccess(<boolean>(data.Success));
              } else {
                this.store.dispatch(new NotProcessingResignation())
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : `Something went wrong. Form data could not be loaded.`,
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new StartInterviewSuccess(false),
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
    .ofType<LoadDocumentResign>(
      ResignationActionTypes.LOAD_DOCUMENT
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.MY_EXIT_DATA_URLs.document)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                let docData = null;

                if (data.Results && data.Results.length > 0) {
                  const result = data.Results[0];
                  docData = this.utilService.getDocumentData(
                    result.doc_binary,
                    result.doc_extension
                  );
                }
                return new LoadDocumentResignSuccess(docData);
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded. MY DOCUMENT 1',
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
                      : 'Something went wrong. Form data could not be loaded. Error occured. MY DOCUMENT 2',
                  type: ToastTypes.ERROR
                })
              )
            )
          );
      })
  );

  @Effect()
  loadResignationTypes$: Observable<Action> = this.actions$
    .ofType<LoadResignationTypesSelectOption>(
      ResignationActionTypes.LOAD_RESIGNATION_TYPES_SELECT_OPTION
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            `${constants.MY_RESIGNATION_DATA_URLs.resignationTypes}`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                return new LoadResignationTypesSelectOptionSuccess(<ISelectOption[]>(
                  transformed
                ));
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
  loadMySubordinates$: Observable<Action> = this.actions$
    .ofType<LoadMySubordinates>(
      ResignationActionTypes.LOAD_MY_SUBORDINATES
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            `${constants.MY_RESIGNATION_DATA_URLs.employeeSubordinates}`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                // const transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                this.store.dispatch(new NotLoadingResignation());
                return new LoadMySubordinatesSuccess(<IEmployee[]>(data.Results));
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
  loadInitiationStatus$: Observable<Action> = this.actions$
    .ofType<LoadExitInitiationStatus>(
      ResignationActionTypes.LOAD_EXIT_INITIATION_STATUS
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            constants.MY_EXIT_DATA_URLs.getIntiationStatus
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadExitInitiationStatusSuccess(<boolean>(data.Results[0]));
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
  loadEmployeeInitiationStatus$: Observable<Action> = this.actions$
    .ofType<LoadEmployeeExitProcessInitiationStatus>(
      ResignationActionTypes.LOAD_EMPLOYEE_PROCESS_INITIATION_STATUS
    )
      .pipe(
        map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${constants.MY_EXIT_DATA_URLs.getIntiationStatus}/${payload.employeeId}`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                // const transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                return new LoadEmployeeExitProcessInitiationStatusSuccess(<boolean>(data.Results[0]));
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
  saveData$: Observable<Action> = this.actions$
      .ofType<SubmitResignationLetter>(ResignationActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.employeeId ? constants.LM_EXIT_DATA_URLs.createProxyResignation : constants.MY_EXIT_DATA_URLs.submitResignation;
        return this.apiService.create(url, payload.data).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              if (payload.employeeId) {
                this.store.dispatch(new LoadDataProxyResignations())
              } else {
                this.store.dispatch(new LoadExitInitiationProcessStatus())
                this.store.dispatch(new SubmitResignationLetterSuccess())
                this.router.navigate([
                  STANDARD_ROUTES.processList
                ]);
              }

              return from([
                new ShowToast({
                  title: null,
                  message: `Your data was saved successfully.`,
                  type: ToastTypes.SUCCESS
                }),
                new NotProcessingResignation(),
                new HideLetterEditor()
              ]);
            } else {
              this.store.dispatch(new SubmitResignationLetterFailure());
              return from([
                new NotProcessingResignation(),
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
              new NotProcessingResignation(),
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


  @Effect()
  loadResponsesData$: Observable<Action> = this.actions$
    .ofType<LoadDataResponsesResignation>(
      ResignationActionTypes.LOAD_RESPONSES_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${constants.HR_EXIT_DATA_URLs.getResponses}/${payload.letterId}`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataResponsesResignationSuccess(<IResponse[]>(
                  data.Results
                ));
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
}
