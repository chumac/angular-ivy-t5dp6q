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
  LoadDataSubmittedLetters,
  LoadDataSubmittedLettersSuccess,
  HrResignationActionTypes,
  LoadResignationTypesSelectOption,
  LoadResignationTypesSelectOptionSuccess,
  CloseAllChecklists,
  LoadLetterDocument,
  LoadLetterDocumentSuccess,
  LoadHrResponseQueue,
  LoadHrResponseQueueSuccess,
  SubmitEmployeeResignationLetter,
  HideResignationEditor,
  LoadResignationReportUrl,
  LoadResignationReportUrlSuccess,
} from './hr-resignation.actions';
import {
  IResignationSubmitted,
  IResponse
} from 'libs/models/workforce/exit/src/lib/interfaces';
import { ToastTypes } from '@nutela/shared/app-global';
import { IExitState } from '../root';
import { ISelectOption } from 'dist/libs/models/core-data';
import { IQueueItem } from '../../interfaces';

@Injectable()
export class HrResignationEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<IExitState>,
    private utilService: UtilService
  ) { }

  @Effect()
  loadSubmittedResignation$: Observable<Action> = this.actions$
    .ofType<LoadDataSubmittedLetters>(
      HrResignationActionTypes.LOAD_SUBMITTED_RESIGNATIONS_DATA
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.HR_EXIT_DATA_URLs.getAllLetters)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingResignation());
                return new LoadDataSubmittedLettersSuccess(<
                  IResignationSubmitted[]
                  >data.Results);
              } else {
                this.store.dispatch(new NotProcessingResignation());
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
                new NotProcessingResignation(),
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
  loadLetterDocument$: Observable<Action> = this.actions$
    .ofType<LoadLetterDocument>(
      HrResignationActionTypes.LOAD_DOCUMENT
    )
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.HR_EXIT_DATA_URLs.document}/${payload.recordId}`)
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
  saveData$: Observable<Action> = this.actions$
    .ofType<SubmitEmployeeResignationLetter>(HrResignationActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService.create(constants.HR_EXIT_DATA_URLs.createEmployeeResignation, payload.data).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new ShowToast({
                  title: null,
                  message: `Your data was saved successfully.`,
                  type: ToastTypes.SUCCESS
                }),
                new NotProcessingResignation(),
                new HideResignationEditor(),
                new LoadDataSubmittedLetters()
              ]);
            } else {
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
  loadHrResponseQueue$: Observable<Action> = this.actions$
    .ofType<LoadHrResponseQueue>(
      HrResignationActionTypes.LOAD_HR_RESPONSE_QUEUE
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            `${constants.HR_EXIT_DATA_URLs.getResponseQueue}`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingResignation());
                return new LoadHrResponseQueueSuccess(<IQueueItem[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotProcessingResignation());
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
                new NotProcessingResignation(),
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
  loadResignationTypes$: Observable<Action> = this.actions$
    .ofType<LoadResignationTypesSelectOption>(
      HrResignationActionTypes.LOAD_RESIGNATION_TYPES_SELECT_OPTION
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
  closeAllChecklists$: Observable<Action> = this.actions$
      .ofType<CloseAllChecklists>(HrResignationActionTypes.CLOSE_ALL_CHECKLISTS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.HR_EXIT_DATA_URLs.closeAllChecklists;
        return this.apiService.read(`${url}/${payload.resignationId}/${payload.employeeId}`).pipe (
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new ShowToast({
                  title: null,
                  message: `Your data was saved successfully.`,
                  type: ToastTypes.SUCCESS
                }),
                new NotProcessingResignation()
              ]);
            } else {
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
  loadResignationReportUrl$: Observable<Action> = this.actions$
    .ofType<LoadResignationReportUrl>(
      HrResignationActionTypes.LOAD_REPORT_URL
    )
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.HR_EXIT_DATA_URLs.reportUrl}/${payload.resignationId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                window.open(data.Results[0], '_blank');
                return new LoadResignationReportUrlSuccess(<any>(
                  data.Results[0]
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
              from([
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    error.status == 401
                      ? error.error.ErrorMessage
                      : 'Something went wrong. Form data could not be loaded. Error occured.',
                  type: ToastTypes.ERROR
                })
              ])
            )
          );
      })
    );
}
