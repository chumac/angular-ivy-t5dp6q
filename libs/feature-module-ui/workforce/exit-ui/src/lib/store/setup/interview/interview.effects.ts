import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import {
  ApiService,
  toastOptionsError,
  toastOptionsSuccess,
  UtilService
} from '@nutela/core-services';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';

import {
  IReviewChecklist,
  IInterviewForm,
  IInterviewQuestion
} from 'libs/models/workforce/exit/src/lib/interfaces';
import { ToastTypes } from '@nutela/shared/app-global';
import { IExitState } from '../../root';
import { LoadDataFormInterview, InterviewActionTypes, LoadDataFormInterviewSuccess, LoadDataQuestionInterview, LoadDataQuestionInterviewSuccess, NotProcessingInterview, SubmitFormInterview, SubmitQuestionInterview } from './interview.actions';

@Injectable()
export class InterviewEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<IExitState>,
    private utilService: UtilService
  ) { }

  @Effect()
  loadInterviewFormsData$: Observable<Action> = this.actions$
    .ofType<LoadDataFormInterview>(InterviewActionTypes.LOAD_FORMS_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.INTERVIEW_DATA_URLs.getAll)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataFormInterviewSuccess(<IInterviewForm[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
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
  loadChecklistData$: Observable<Action> = this.actions$
    .ofType<LoadDataQuestionInterview>(InterviewActionTypes.LOAD_QUESTIONS_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(
            `${constants.INTERVIEW_DATA_URLs.getAll}/${
            payload.formId
            }`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataQuestionInterviewSuccess(<
                  IInterviewQuestion[]
                  >data.Results);
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  options: toastOptionsError()
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
  saveFormData$: Observable<Action> = this.actions$
    .ofType<SubmitFormInterview>(InterviewActionTypes.SAVE_FORM)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.INTERVIEW_DATA_URLs.save;
        return this.apiService.create(url, payload.data).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new ShowToast({
                  title: null,
                  message: `Your data was saved successfully.`,
                  options: toastOptionsSuccess()
                }),
                new NotProcessingInterview(),
              ]);
            } else {
              return from([
                new NotProcessingInterview(),
                new ShowToast({
                  title: 'Data Could Not Be Saved',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : `Something went wrong. Form data could not be loaded.`,
                  options: toastOptionsError()
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotProcessingInterview(),
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
  saveQuestionData$: Observable<Action> = this.actions$
    .ofType<SubmitQuestionInterview>(InterviewActionTypes.SAVE_QUESTION)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.INTERVIEW_DATA_URLs.saveQuestion;
        return this.apiService.create(url, payload.data).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new ShowToast({
                  title: null,
                  message: `Your data was saved successfully.`,
                  options: toastOptionsSuccess()
                }),
                new NotProcessingInterview(),
              ]);
            } else {
              return from([
                new NotProcessingInterview(),
                new ShowToast({
                  title: 'Data Could Not Be Saved',
                  message: data.ErrorMessage
                    ? data.ErrorMessage
                    : `Something went wrong. Form data could not be loaded.`,
                  options: toastOptionsError()
                })
              ]);
            }
          }),
          catchError((error: any) =>
            from([
              new NotProcessingInterview(),
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
