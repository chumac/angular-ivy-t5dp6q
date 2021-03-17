import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  WorkDefinitionActionTypes,
  LoadWorkDefinition,
  LoadWorkDefinitionSuccess,
  SaveWorkDefinition,
  NotProcessingWorkDefinition,
  HideEditorWorkDefinition,
  DeleteWorkDefinition,
  SaveWorkDefinitionStep,
  LoadPosition,
  LoadPositionSuccess,
  LoadIndividual,
  LoadIndividualSuccess,
  LoadRole,
  LoadRoleSuccess,
  HideStepWorkDefinition,
  NotLoadingWorkDefinition,
} from './work-definition.actions';
import { IWorkDefinition } from '@nutela/models/foundation';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { IHRFoundationState } from '../root';
import { HideEditorWorkDetails, LoadWorkDetails } from '../workflow-details';

@Injectable()
export class WorkDefinitionEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IHRFoundationState>) {}

  @Effect()
  loadWorkDefinitionData$: Observable<Action> = this.actions$
    .ofType<LoadWorkDefinition>(WorkDefinitionActionTypes.LOAD_WORK_DEFINITION_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.WORKFLOW_DEFINITION_URLS.approvedData)
          .pipe(
            map((data: any) => {
              console.log(data);
              if (data.Success) {
                this.store.dispatch(new NotLoadingWorkDefinition());
                return new LoadWorkDefinitionSuccess(<IWorkDefinition[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage :'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
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
    .ofType<SaveWorkDefinition>(WorkDefinitionActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('Saving ...');
        return this.apiService
          .create(constants.WORKFLOW_DEFINITION_URLS.post, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingWorkDefinition(),
                  new HideEditorWorkDefinition(),
                  new LoadWorkDefinition()
                ]);
              } else {
                return from([
                  new NotProcessingWorkDefinition(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingWorkDefinition(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

    @Effect()
  saveUpdateData$: Observable<Action> = this.actions$
    .ofType<SaveWorkDefinition>(WorkDefinitionActionTypes.UPDATED)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url= `${constants.WORKFLOW_DEFINITION_URLS.update}/${payload.recordId}`
        return this.apiService
          .update(url, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);

              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingWorkDefinition(),
                  new HideEditorWorkDefinition(),
                  new LoadWorkDefinition()
                ]);
              } else {
                return from([
                  new NotProcessingWorkDefinition(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingWorkDefinition(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

    @Effect()
      deleteData$: Observable<Action> = this.actions$
        .ofType<DeleteWorkDefinition>(WorkDefinitionActionTypes.DELETE_WORK_DEFINITION_DATA)
        .pipe(
          map(action => action.payload),
          switchMap(payload => {
            return this.apiService
              .delete(`${constants.WORKFLOW_DEFINITION_URLS.archive}/${payload.recordId}`)
              .pipe(
                switchMap((data: IApiResult) => {
                  if (data.Success) {
                    return from([
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

        @Effect()
        addStep$: Observable<Action> = this.actions$
          .ofType<SaveWorkDefinitionStep>(WorkDefinitionActionTypes.SAVE_STEP)
          .pipe(
            map(action => action.payload),
            switchMap(payload => {
              console.log('Saving ...');
              console.log('effect', payload.data);
              return this.apiService
                .create( constants.WORKFLOW_DETAILS_URLs.addStep, payload.data)
                .pipe(
                  switchMap((data: IApiResult) => {
                    console.log(data);

                    if (data.Success) {
                      return from([
                        new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                        new NotProcessingWorkDefinition(),
                        new LoadWorkDetails({recordId:payload.wflowId}),
                        new HideStepWorkDefinition(),
                        new HideEditorWorkDetails(),
                      ]);
                    } else {
                      return from([
                        new NotProcessingWorkDefinition(),
                        new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                      ]);
                    }
                  }),
                  catchError((error: any) =>
                    from([
                      new NotProcessingWorkDefinition(),
                      new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                    ])
                  )
                );
            })
          );

     @Effect()
    loadPositionData$: Observable<Action> = this.actions$
      .ofType<LoadPosition>(WorkDefinitionActionTypes.LOAD_POSITION_DATA)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.WORKFLOW_DETAILS_URLs.positionData)
            .pipe(
              map((data: any) => {
                const system=this.utilService.transformToSelectDataList(data.Results,"position_id","description");
                if (data.Success) {
                  return new LoadPositionSuccess(<ISelectOption[]>(
                    system
                  ));
                } else {
                  return new ShowToast({title: 'Data Could Not Be Loaded', message:data.ErrorMessage ? data.ErrorMessage : 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
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
      loadIndividualData$: Observable<Action> = this.actions$
        .ofType<LoadIndividual>(WorkDefinitionActionTypes.LOAD_INDIVIDUAL_DATA)
        .pipe(
          switchMap(() => {
            return this.apiService
              .read(constants.WORKFLOW_DETAILS_URLs.individualData)
              .pipe(
                map((data: any) => {
                  const system=this.utilService.transformToSelectDataList(data.Results,"employee_surname","emp_fullname");
                  if (data.Success ) {
                    return new LoadIndividualSuccess(<ISelectOption[]>(
                      system
                    ));
                  } else {
                    return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage :'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
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
        loadRoleData$: Observable<Action> = this.actions$
          .ofType<LoadRole>(WorkDefinitionActionTypes.LOAD_ROLE_DATA)
          .pipe(
            switchMap(() => {
              return this.apiService
                .read(constants.WORKFLOW_DETAILS_URLs.roleData)
                .pipe(
                  map((data: any) => {
                    const system=this.utilService.transformToSelectDataList(data.Results,"sys_rolename","rolename");
                    if (data.Success) {
                      return new LoadRoleSuccess(<ISelectOption[]>(
                        system
                      ));
                    } else {
                      return new ShowToast({title: 'Data Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage :'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
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
