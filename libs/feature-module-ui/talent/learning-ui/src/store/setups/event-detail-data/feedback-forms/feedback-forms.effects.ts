import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { IApiResult } from '@nutela/models/core-data';
import * as constants from '../../../../lib/constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  AddFeedbackForms,
  FeedbackFormsActionTypes,
  DeleteDataFeedbackForms,
  LoadDataFeedbackForms,
  LoadDataFeedbackFormsSuccess,
  NotProcessingFeedbackForms,
  HideEditorFeedbackForms,
  SaveFeedbackForms,
  LoadDataCustomForms,
  LoadDataCustomFormsSuccess,
  LoadDataFormAvailability,
  LoadDataFormAvailabilitySuccess,
  LoadDataFormRole,
  LoadDataFormRoleSuccess
} from './feedback-forms.actions';
import { IEventDetailFeedbackForms, IEventDetailCustomForms, IEventDetailFeedbackRole, IEventDetailFormAvailability } from '@nutela/models/talent/learning';
import { ShowToast, Download } from '@nutela/store/shared';

@Injectable()
export class FeedbackFormsEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {
  }

  @Effect()
  loadFeedbackFormsData$: Observable<Action> = this.actions$
    .ofType<LoadDataFeedbackForms>(FeedbackFormsActionTypes.LOAD_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.EVENT_DETAIL_FEEDBACK_FORMS_URLs.getEventDetailFeedbackFormsData}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataFeedbackFormsSuccess(<IEventDetailFeedbackForms[]>(
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
  addData$: Observable<Action> = this.actions$
    .ofType<AddFeedbackForms>(FeedbackFormsActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.EVENT_DETAIL_FEEDBACK_FORMS_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingFeedbackForms(),
                  new HideEditorFeedbackForms(),
                  new LoadDataFeedbackForms({recordId: payload.eventDetailId})
                ]);
              } else {
                return from([
                  new NotProcessingFeedbackForms(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFeedbackForms(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveFeedbackForms>(FeedbackFormsActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.EVENT_DETAIL_FEEDBACK_FORMS_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingFeedbackForms(),
                  new HideEditorFeedbackForms(),
                  new LoadDataFeedbackForms({recordId: payload.eventDetailId})
                ]);
              } else {
                return from([
                  new NotProcessingFeedbackForms(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFeedbackForms(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataFeedbackForms>(FeedbackFormsActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.EVENT_DETAIL_FEEDBACK_FORMS_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataFeedbackForms({ recordId: payload.eventDetailId })
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
  loadCustomFormData$: Observable<Action> = this.actions$
    .ofType<LoadDataCustomForms>(FeedbackFormsActionTypes.LOAD_FORM_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.EVENT_DETAIL_FEEDBACK_FORMS_URLs.getCustomFormData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataCustomFormsSuccess(<IEventDetailCustomForms[]>(
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
  loadFeedbackFormAvailableData$: Observable<Action> = this.actions$
    .ofType<LoadDataFormAvailability>(FeedbackFormsActionTypes.LOAD_FORM_AVAILABILITY_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.EVENT_DETAIL_FEEDBACK_FORMS_URLs.getFormAvailability)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataFormAvailabilitySuccess(<IEventDetailFormAvailability[]>(
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
    loadFeedbackFormRoleData$: Observable<Action> = this.actions$
    .ofType<LoadDataFormRole>(FeedbackFormsActionTypes.LOAD_FORM_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.EVENT_DETAIL_FEEDBACK_FORMS_URLs.getFormRole)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataFormRoleSuccess(<IEventDetailFeedbackRole[]>(
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
}
