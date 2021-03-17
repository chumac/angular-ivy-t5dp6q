import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  LeaveDefinitionActionTypes,
  LoadLeaveDefinitionData,
  LoadLeaveDefinitionDataSuccess,
  SaveLeaveDefinition,
  NotProcessingLeaveDefinition,
  HideEditorLeaveDefinition,
  UpdateLeaveDefinition,
  DeleteLeaveDefinition,
  NotLoadingLeaveDefinition,

} from './leave-definition.actions';
import {  ILeaveDefinition} from '@nutela/models/workforce/leave';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult } from '@nutela/models/core-data';
import { IAbsenceState } from '../../root';

@Injectable()
export class LeaveDefinitionEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IAbsenceState>) {}

  @Effect()
  loadLeaveDefinition$: Observable<Action> = this.actions$
    .ofType<LoadLeaveDefinitionData>(LeaveDefinitionActionTypes.LOAD_DEFINITION_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.LEAVE_DEFINITION_URLs.definitionData)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingLeaveDefinition());
                return new LoadLeaveDefinitionDataSuccess(<ILeaveDefinition[]>(
                  data.Results
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
    saveData$: Observable<Action> = this.actions$
      .ofType<SaveLeaveDefinition>(LeaveDefinitionActionTypes.SAVE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          console.log('Saving ...');
          const url= `${constants.LEAVE_DEFINITION_URLs.add}`
          console.log('url',url);
          console.log('from effect',payload.data);
          return this.apiService
            .create(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                console.log(data);

                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingLeaveDefinition(),
                    new LoadLeaveDefinitionData(),
                    new HideEditorLeaveDefinition()
                  ]);
                } else {
                  return from([
                    new NotProcessingLeaveDefinition(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingLeaveDefinition(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

    @Effect()
    saveUpdateData$: Observable<Action> = this.actions$
      .ofType<UpdateLeaveDefinition>(LeaveDefinitionActionTypes.UPDATED)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url= `${constants.LEAVE_DEFINITION_URLs.update}/${payload.recordId}`
          return this.apiService
            .update(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingLeaveDefinition(),
                    new LoadLeaveDefinitionData(),
                    new HideEditorLeaveDefinition()
                  ]);
                } else {
                  return from([
                    new NotProcessingLeaveDefinition(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingLeaveDefinition(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );

      @Effect()
        deleteData$: Observable<Action> = this.actions$
          .ofType<DeleteLeaveDefinition>(LeaveDefinitionActionTypes.DELETE)
          .pipe(
            map(action => action.payload),
            switchMap(payload => {
              console.log(`${constants.LEAVE_DEFINITION_URLs.delete}/${payload.recordId}`);
              return this.apiService
                .update(`${constants.LEAVE_DEFINITION_URLs.delete}/${payload.recordId}`, null)
                .pipe(
                  switchMap((data: IApiResult) => {
                    if (data.Success) {
                      return from([
                        new LoadLeaveDefinitionData(),
                        new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
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

