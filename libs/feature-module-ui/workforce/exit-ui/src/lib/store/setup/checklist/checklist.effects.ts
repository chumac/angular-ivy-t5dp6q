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
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, WORKFLOW_DEFINITION_URLS } from '@nutela/shared/app-global';
import { IExitState } from '../../root';
import {
  LoadDataChecklistSetup,
  ChecklistActionTypes,
  LoadDataChecklistSetupSuccess,
  LoadValidationRoleChecklistSetup,
  LoadValidationRoleChecklistSetupSuccess,
  LoadPositionSelectOption,
  LoadPositionSelectOptionSuccess,
  LoadRoleSelectOption,
  LoadRoleSelectOptionSuccess,
  LoadWorkflowSelectOption,
  LoadWorkflowSelectOptionSuccess,
  SaveChecklistSetup,
  NotProcessingChecklistSetup,
  SaveUpdateChecklistSetup,
  ArchiveChecklistSetup,
  HideEditorChecklistSetup,
  NotLoadingChecklistSetup
} from './checklist.actions';
import { IChecklistItem } from '../../../interfaces';

@Injectable()
export class ChecklistEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<IExitState>,
    private utilService: UtilService
  ) { }

  @Effect()
  loadChecklist$: Observable<Action> = this.actions$
    .ofType<LoadDataChecklistSetup>(ChecklistActionTypes.LOAD_CHECKLIST_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.CHECKLIST_DATA_URLs.getAll)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingChecklistSetup())
                return new LoadDataChecklistSetupSuccess(<IChecklistItem[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingChecklistSetup())
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingChecklistSetup(),
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
  loadPositions$: Observable<Action> = this.actions$
    .ofType<LoadPositionSelectOption>(ChecklistActionTypes.LOAD_POSITION_SELECT_OPTION_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.CHECKLIST_DATA_URLs.positions)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadPositionSelectOptionSuccess(<any[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
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
  loadRoles$: Observable<Action> = this.actions$
    .ofType<LoadRoleSelectOption>(ChecklistActionTypes.LOAD_ROLES_SELECT_OPTION_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.CHECKLIST_DATA_URLs.roles)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadRoleSelectOptionSuccess(<any[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
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
  loadWorkflowDefinitions$: Observable<Action> = this.actions$
    .ofType<LoadWorkflowSelectOption>(ChecklistActionTypes.LOAD_WORKFLOW_DEFINITION_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(WORKFLOW_DEFINITION_URLS.approvedData)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadWorkflowSelectOptionSuccess(<any[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
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
  loadValidationRolesData$: Observable<Action> = this.actions$
    .ofType<LoadValidationRoleChecklistSetup>(
      ChecklistActionTypes.LOAD_VALIDATION_ROLE_DATA
    )
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(
            `${constants.CHECKLIST_DATA_URLs.getValidationRole}`
          )
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadValidationRoleChecklistSetupSuccess(<
                  any[]
                  >data.Results);
              } else {
                this.store.dispatch(new LoadValidationRoleChecklistSetupSuccess(<
                  any[]
                  >[{ description: 'Colleague', id: 0 }, { description: 'Workflow', id: 1 }]));
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.',
                  type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new LoadValidationRoleChecklistSetupSuccess(<
                  any[]
                  >[{ description: 'Colleague', id: 0 }, { description: 'Workflow', id: 1 }]),
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
    .ofType<SaveChecklistSetup>(ChecklistActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.CHECKLIST_DATA_URLs.create;
        return this.apiService.create(url, payload.data).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new HideEditorChecklistSetup(),
                new LoadDataChecklistSetup(),
                new ShowToast({
                  title: null,
                  message: `Your data was saved successfully.`,
                  type: ToastTypes.SUCCESS
                }),
                new NotProcessingChecklistSetup()
              ]);
            } else {
              return from([
                new NotProcessingChecklistSetup(),
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
              new NotProcessingChecklistSetup(),
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
  updateData$: Observable<Action> = this.actions$
    .ofType<SaveUpdateChecklistSetup>(ChecklistActionTypes.SAVE_UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.CHECKLIST_DATA_URLs.update;
        return this.apiService.update(`${url}/${payload.recordId}`, payload.data).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new ShowToast({
                  title: null,
                  message: `Your data was saved successfully.`,
                  type: ToastTypes.SUCCESS
                }),
                new NotProcessingChecklistSetup(),
                new HideEditorChecklistSetup(),
              ]);
            } else {
              return from([
                new NotProcessingChecklistSetup(),
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
              new NotProcessingChecklistSetup(),
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
  archiveData$: Observable<Action> = this.actions$
    .ofType<ArchiveChecklistSetup>(ChecklistActionTypes.ARCHIVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = constants.CHECKLIST_DATA_URLs.archive;
        return this.apiService.update(`url/${payload.recordId}`, null).pipe(
          switchMap((data: IApiResult) => {
            if (data.Success) {
              return from([
                new ShowToast({
                  title: null,
                  message: `Your data was archived successfully.`,
                  type: ToastTypes.SUCCESS
                }),
                new NotProcessingChecklistSetup()
              ]);
            } else {
              return from([
                new NotProcessingChecklistSetup(),
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
              new NotProcessingChecklistSetup(),
              new ShowToast({
                title: 'Data Could Not Be Archived',
                message:
                  error.status == 401
                    ? error.error.ErrorMessage
                    : `Something went wrong. Form data could not be archived. Error occured.`,
                type: ToastTypes.ERROR
              })
            ])
          )
        );
      })
    );

}
