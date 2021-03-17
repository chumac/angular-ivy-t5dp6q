import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../constants';
import {
  ApiService,
  toastOptionsError,
  toastOptionsSuccess,
  UtilService
} from '@nutela/core-services';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import {
  ResignActionTypes,
  LoadLetterResign,
  LoadLetterResignSuccess,
  LoadReviewChecklistDataResign,
  LoadReviewChecklistDataResignSuccess,
  LoadExitCompletedUrlDataResign,
  LoadExitCompletedUrlDataResignSuccess,
  LoadExitInterviewStatusDataResign,
  LoadExitInterviewStatusDataResignSuccess,
} from './resign.actions';
import {
  IReviewChecklist
} from 'libs/models/workforce/exit/src/lib/interfaces';
import { ToastTypes } from '@nutela/shared/app-global';
import { IExitState } from '../root';
import { IResignationLetter } from '../../interfaces';

@Injectable()
export class ResignEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<IExitState>,
    private utilService: UtilService
  ) { }

  @Effect()
  loadResignationLetter$: Observable<Action> = this.actions$
    .ofType<LoadLetterResign>(ResignActionTypes.LOAD_RESIGNATION_LETTER)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.MY_EXIT_DATA_URLs.getSubmittedLetter)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadLetterResignSuccess(<IResignationLetter[]>(
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

  @Effect()
  loadChecklistData$: Observable<Action> = this.actions$
    .ofType<LoadReviewChecklistDataResign>(
      ResignActionTypes.LOAD_REVIEW_CHECKLIST_DATA
    )
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload.employeeId ? `${constants.LM_EXIT_DATA_URLs.getChecklistTransactions}/${payload.letterId}/${payload.employeeId}` :
          `${constants.MY_EXIT_DATA_URLs.getChecklistTransactions}/${payload.letterId}`
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadReviewChecklistDataResignSuccess(<
                  IReviewChecklist[]
                  >data.Results);
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
  loadExitCompletedUrl$: Observable<Action> = this.actions$
    .ofType<LoadExitCompletedUrlDataResign>(
      ResignActionTypes.LOAD_EXIT_COMPLETED_URL_DATA
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.MY_EXIT_DATA_URLs.getExitCompletedUrl)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadExitCompletedUrlDataResignSuccess(<
                  string[]
                  >data.Results);
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
  loadExitInterviewStatus$: Observable<Action> = this.actions$
    .ofType<LoadExitInterviewStatusDataResign>(
      ResignActionTypes.LOAD_EXIT_INTERVIEW_STATUS
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.MY_EXIT_DATA_URLs.getExitInterviewStatus)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadExitInterviewStatusDataResignSuccess(<
                  string[]
                  >data.Results);
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
