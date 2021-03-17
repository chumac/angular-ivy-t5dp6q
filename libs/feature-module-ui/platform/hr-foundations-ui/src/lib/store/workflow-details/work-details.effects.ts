import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  WorkDetailsActionTypes,
  LoadWorkDetails,
  LoadWorkDetailsSuccess,
  SaveWorkDetails,
  NotProcessingWorkDetails,
  HideEditorWorkDetails,
  DeleteWorkDetails,
  NotLoadingWorkDetails,
  LoadProcessingRule,
  LoadProcessingRuleSuccess,
} from './work-details.actions';
import { IWorkDetails } from '@nutela/models/foundation';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast} from '@nutela/store/shared';
import { IHRFoundationState } from '../root';

@Injectable()
export class WorkDetailsEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IHRFoundationState>) {}

  @Effect()
  loadWorkDetailsData$: Observable<Action> = this.actions$
    .ofType<LoadWorkDetails>(WorkDetailsActionTypes.LOAD_WORK_DETAILS_DATA)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${constants.WORKFLOW_DETAILS_URLs.stepData}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              console.log(data);
              if (data.Success) {
                this.store.dispatch(new NotLoadingWorkDetails());
                return new LoadWorkDetailsSuccess(<IWorkDetails[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
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
    loadProcessingRule$: Observable<Action> = this.actions$
      .ofType<LoadProcessingRule>(WorkDetailsActionTypes.PROCESSING_RULE)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(`${constants.WORKFLOW_DETAILS_URLs.processingRule}`)
            .pipe(
              map((data: any) => {
                console.log(data);
                if (data.Success) {
                  const system=this.utilService.transformToSelectDataList(data.Results,"id","description");
                  this.store.dispatch(new NotLoadingWorkDetails());
                  return new LoadProcessingRuleSuccess(<ISelectOption[]>(
                    system
                  ));
                } else {
                  return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
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
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveWorkDetails>(WorkDetailsActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('data from effect',payload.data);
        const url=`${constants.WORKFLOW_DETAILS_URLs.update}/${payload.workID}/${payload.recordId}`
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);

              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingWorkDetails(),
                  new HideEditorWorkDetails(),
                  new LoadWorkDetails({recordId:payload.workID})
                ]);
              } else {
                return from([
                  new NotProcessingWorkDetails(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingWorkDetails(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

    @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteWorkDetails>(WorkDetailsActionTypes.DELETE_WORK_DETAILS_DATA)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            console.log(`${constants.WORKFLOW_DETAILS_URLs.delete}/${payload.workID}/${payload.recordId}`);
            return this.apiService
              .delete(`${constants.WORKFLOW_DETAILS_URLs.delete}/${payload.workID}/${payload.recordId}`)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
                      new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                      new LoadWorkDetails({recordId:payload.workID}),
                    ]);
                  } else {
                    return from([
                      new ShowToast({title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
                    ]);
                  }
                }),
                catchError((error: any) =>
                  from([
                    new ShowToast({title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError()})
                  ])
                )
              );
          })
        );
  }
