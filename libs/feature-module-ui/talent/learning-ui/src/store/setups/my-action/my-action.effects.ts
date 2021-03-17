import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { IApiResult } from '@nutela/models/core-data';
import * as constants from '../../../lib/constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  MyActionActionTypes,
  LoadDataMyAction,
  LoadDataMyActionSuccess,
  NotProcessingMyAction,
  ActionNominationLearningEvent,
  HideActionNominationEditorEvent,
  ManagerOptOutEvent,
  LoadFormDataMyAction,
  LoadFormDataMyActionSuccess,
  HideActionFeedbackFormEditorEvent,
  FeedbackFormEvent,
} from './my-action.actions';
import { IFeedBackForm, IMyAction } from '@nutela/models/talent/learning';
import { ShowToast } from '@nutela/store/shared';

@Injectable()
export class MyActionEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {
  }

  @Effect()
  loadMyActionData$: Observable<Action> = this.actions$
    .ofType<LoadDataMyAction>(MyActionActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.MY_ACTION_URLs.getMyActionData}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataMyActionSuccess(<IMyAction[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  actionNominationLearningEvent$: Observable<Action> = this.actions$
    .ofType<ActionNominationLearningEvent>(MyActionActionTypes.ACTION_NOMINATION_EVENT)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.EVENT_DETAIL_URLs.nominationEvent}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingMyAction(),
                  new HideActionNominationEditorEvent(),
                ]);
              } else {
                return from([
                  new NotProcessingMyAction(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingMyAction(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  actionOptOutData$: Observable<Action> = this.actions$
    .ofType<ManagerOptOutEvent>(MyActionActionTypes.MANAGER_OPTOUT_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.LEARNING_PLAN_URLs.managerOptOut}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record opt out successfully.`, options: toastOptionsSuccess() }),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Opt-out', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not Opt-out.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Opt-out', message: `Something went wrong. Record was not Opt-out.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  loadFormMyActionData$: Observable<Action> = this.actions$
    .ofType<LoadFormDataMyAction>(MyActionActionTypes.LOAD_FORM_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.MY_ACTION_URLs.getFormMyActionData}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadFormDataMyActionSuccess(<IFeedBackForm[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  saveFeedbackFormData$: Observable<Action> = this.actions$
    .ofType<FeedbackFormEvent>(MyActionActionTypes.FEEDBACK_FORM_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.MY_ACTION_URLs.saveFormMyActionData}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record submited successfully.`, options: toastOptionsSuccess() }),
                  new HideActionFeedbackFormEditorEvent()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be submited', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not submited.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be submited', message: `Something went wrong. Record was not submited.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

}
