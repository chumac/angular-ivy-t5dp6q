import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  SecurityActionTypes,
  LoadProcessedSecurity,
  LoadProcessedSecuritySuccess,
  LoadWaitingSecurity,
  LoadWaitingSecuritySuccess,
  LoadRole,
  LoadRoleSuccess,
  SaveSecurity,
  NotProcessingSecurity,
  HideEditorSecurity,
  DeleteSecurity,
  LoadIndividual,
  LoadIndividualSuccess,
  LoadSpecificType,
  LoadSpecificTypeSuccess,
  LoadSpecificStructure,
  LoadSpecificStructureSuccess,
  LoadUsers,
  LoadUsersSuccess,
  SaveMultipleSecurity,
  SaveMultiple,
  LoadSingleAction,
  LoadSingleActionSuccess,
  LoadBulkAction,
  LoadBulkActionSuccess,
  HideBulkEditorSecurity,
  LoadingDropdownSecurity,
  NotLoadingSecurity,

} from './security.actions';
import { ISecurity } from '@nutela/models/foundation';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { IHRFoundationState } from '../root';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class SecurityEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IHRFoundationState>) { }

  @Effect()
  loadProcessedSecurityData$: Observable<Action> = this.actions$
    .ofType<LoadProcessedSecurity>(SecurityActionTypes.LOAD_PROCESSED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SECURITY_URLs.processedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingSecurity());
                return new LoadProcessedSecuritySuccess(<ISecurity[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingSecurity());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingSecurity(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadWaitingSecurityData$: Observable<Action> = this.actions$
    .ofType<LoadWaitingSecurity>(SecurityActionTypes.LOAD_WAITING_DATA)
    .pipe(
      switchMap(() => {

        return this.apiService
          .read(constants.SECURITY_URLs.waitingData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingSecurity());
                return new LoadWaitingSecuritySuccess(<ISecurity[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingSecurity());
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingSecurity(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );





  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveSecurity>(SecurityActionTypes.SAVE_SECURITY)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.SECURITY_URLs.add}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingSecurity(),
                  new HideEditorSecurity(),
                  new LoadWaitingSecurity()
                ]);
              } else {
                return from([
                  new NotProcessingSecurity(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingSecurity(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  saveMultipleData$: Observable<Action> = this.actions$
    .ofType<SaveMultipleSecurity>(SecurityActionTypes.SAVE_MULTIPLE_SECURITY)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.SECURITY_URLs.bulk}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingSecurity(),
                  new HideBulkEditorSecurity(),
                  new LoadWaitingSecurity()
                ]);
              } else {
                return from([
                  new NotProcessingSecurity(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingSecurity(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  saveMultiple$: Observable<Action> = this.actions$
    .ofType<SaveMultiple>(SecurityActionTypes.SAVE_MULTIPLE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.SECURITY_URLs.bulk}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingSecurity(),
                  new LoadRole(),
                  new LoadIndividual(),
                ]);
              } else {
                return from([
                  new NotProcessingSecurity(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingSecurity(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteSecurity$: Observable<Action> = this.actions$
    .ofType<DeleteSecurity>(SecurityActionTypes.DELETE_SECURITY_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.CUSTOM_OPTIONS_URLs.delete}/${payload.SecurityKey}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  loadRoleData$: Observable<Action> = this.actions$
    .ofType<LoadRole>(SecurityActionTypes.LOAD_ROLE_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.WORKFLOW_DETAILS_URLs.roleData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new LoadingDropdownSecurity(false))
                return new LoadRoleSuccess(<ISelectOption[]>(data.Results));
              } else {
                this.store.dispatch(new LoadingDropdownSecurity(false))
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new LoadingDropdownSecurity(false),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadIndividualData$: Observable<Action> = this.actions$
    .ofType<LoadIndividual>(SecurityActionTypes.LOAD_INDIVIDUAL_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.WORKFLOW_DETAILS_URLs.individualData)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                this.store.dispatch(new LoadingDropdownSecurity(false))
                return new LoadIndividualSuccess(<ISelectOption[]>(
                  data.Results));
              } else {
                this.store.dispatch(new LoadingDropdownSecurity(false))
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new LoadingDropdownSecurity(false),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadSpecificType$: Observable<Action> = this.actions$
    .ofType<LoadSpecificType>(SecurityActionTypes.LOAD_SPECIFIC_TYPE_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.SECURITY_URLs.specificType)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'analysis_id', 'description');
                return new LoadSpecificTypeSuccess(<ISelectOption[]>(transformed));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message:data.ErrorMessage?data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadSpecificStructure$: Observable<Action> = this.actions$
    .ofType<LoadSpecificStructure>(SecurityActionTypes.LOAD_SPECIFIC_STRUCTURE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.SECURITY_URLs.specificStructure}/${payload.Id}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                console.log(data.Results)
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'analysis_det_id', 'description');
                return new LoadSpecificStructureSuccess(<ISelectOption[]>(transformed));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message:data.ErrorMessage?data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadUsers$: Observable<Action> = this.actions$
    .ofType<LoadUsers>(SecurityActionTypes.LOAD_USERS_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const url = payload && payload.analysis_det_id ? `${constants.SECURITY_URLs.availableUsers}/${payload.analysis_det_id}` : constants.WORKFLOW_DETAILS_URLs.individualData
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new LoadingDropdownSecurity(false))
                return new LoadUsersSuccess(data.Results);
              } else {
                this.store.dispatch(new LoadingDropdownSecurity(false))
                return new ShowToast({ title: 'Data Could Not Be Loaded', message:data.ErrorMessage?data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new LoadingDropdownSecurity(false),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );

  @Effect()
  loadSingleAction$: Observable<Action> = this.actions$
    .ofType<LoadSingleAction>(SecurityActionTypes.LOAD_SINGLE_ACTION)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.SECURITY_URLs.singleAction}`)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success) {
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                return new LoadSingleActionSuccess(<ISelectOption[]>(
                  transformed));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: data.ErrorMessage, type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: error.ErrorMessage, type: ToastTypes.ERROR }),
              )
            )
          );
      })
    );

  @Effect()
  loadBulkAction$: Observable<Action> = this.actions$
    .ofType<LoadBulkAction>(SecurityActionTypes.LOAD_BULK_ACTION)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.SECURITY_URLs.bulkAction}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const transformed = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                return new LoadBulkActionSuccess(<ISelectOption[]>(transformed));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message:data.ErrorMessage?data.ErrorMessage: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', type: ToastTypes.ERROR })
              )
            )
          );
      })
    );
}
