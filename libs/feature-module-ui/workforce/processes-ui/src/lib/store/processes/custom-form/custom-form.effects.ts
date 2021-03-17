import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  CustomFormActionTypes,
  LoadDataCustomForm,
  LoadDataCustomFormSuccess,
  SaveCustomForm,
  NotProcessingCustomForm,
  HideEditorCustomForm,
  DeleteDataCustomForm,
  AddCustomForm,
  LoadDataSetTypeCustomForm,
  LoadDataSetTypeCustomFormSuccess,
  LoadCascadeDataSetTypeCustomForm,
  LoadCascadeDataSetTypeCustomFormSuccess,
  LoadTypeListCustomForm,
  LoadTypeListCustomFormSuccess,
  LoadAreaListCustomForm,
  LoadScopeListCustomForm,
  LoadScopeListCustomFormSuccess,
  LoadAreaListCustomFormSuccess,
  LoadEligibilityListCustomForm,
  LoadEligibilityListCustomFormSuccess,
  LoadWorkFlowListCustomForm,
  LoadWorkFlowListCustomFormSuccess,
} from './custom-form.actions';
import { IApiResult, IBasicData } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { ICustomForm, ICustomFormType, ICustomFormArea, ICustomFormScope, ICustomFormEligibility } from '@nutela/models/workforce/employee-profiles';
import { IWorkDefinition } from '@nutela/models/foundation';

@Injectable()
export class CustomFormEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataCustomForm>(CustomFormActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(`${constants.CUSTOM_FORM_URLs.loadCustomForms}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataCustomFormSuccess(<ICustomForm[]>(
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
  addData$: Observable<Action> = this.actions$
    .ofType<AddCustomForm>(CustomFormActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.CUSTOM_FORM_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingCustomForm(),
                  new HideEditorCustomForm(),
                  new LoadDataCustomForm()
                ]);
              } else {
                return from([
                  new NotProcessingCustomForm(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingCustomForm(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveCustomForm>(CustomFormActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.CUSTOM_FORM_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingCustomForm(),
                  new HideEditorCustomForm(),
                  new LoadDataCustomForm()
                ]);
              } else {
                return from([
                  new NotProcessingCustomForm(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingCustomForm(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataCustomForm>(CustomFormActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.CUSTOM_FORM_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataCustomForm()
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

    // Load Drop down data set types
    @Effect()
    loadDataSetType$: Observable<Action> = this.actions$
      .ofType<LoadDataSetTypeCustomForm>(CustomFormActionTypes.LOAD_DATA_SET_TYPE)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(`${constants.CUSTOM_FORM_URLs.loadDataSetTypes}`)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadDataSetTypeCustomFormSuccess(<IBasicData[]>(
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

    // Load Drop down cascade data set types
    @Effect()
    loadCascadeDataSetType$: Observable<Action> = this.actions$
      .ofType<LoadCascadeDataSetTypeCustomForm>(CustomFormActionTypes.LOAD_CASCADE_DATA_SET_TYPE)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(`${constants.CUSTOM_FORM_URLs.loadCascadeDataSetTypes}`)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadCascadeDataSetTypeCustomFormSuccess(<IBasicData[]>(
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

    // Types 
    @Effect()
    loadTypeList$: Observable<Action> = this.actions$
      .ofType<LoadTypeListCustomForm>(CustomFormActionTypes.LOAD_TYPE_LIST)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(`${constants.CUSTOM_FORM_URLs.loadTypeList}`)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadTypeListCustomFormSuccess(<ICustomFormType[]>(
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
    
    // Areas
    @Effect()
    loadAreaList$: Observable<Action> = this.actions$
      .ofType<LoadAreaListCustomForm>(CustomFormActionTypes.LOAD_AREA_LIST)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(`${constants.CUSTOM_FORM_URLs.loadAreaList}`)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadAreaListCustomFormSuccess(<ICustomFormArea[]>(
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

    // Scopes
    @Effect()
    loadScopeList$: Observable<Action> = this.actions$
      .ofType<LoadScopeListCustomForm>(CustomFormActionTypes.LOAD_SCOPE_LIST)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(`${constants.CUSTOM_FORM_URLs.loadScopeList}`)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadScopeListCustomFormSuccess(<ICustomFormScope[]>(
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

    // Eligibility
    @Effect()
    LoadEligibilityList$: Observable<Action> = this.actions$
      .ofType<LoadEligibilityListCustomForm>(CustomFormActionTypes.LOAD_ELIGIBILITY)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(`${constants.CUSTOM_FORM_URLs.loadEligibilityList}`)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadEligibilityListCustomFormSuccess(<ICustomFormEligibility[]>(
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

    // Workflow
    @Effect()
    LoadWorkFlowList$: Observable<Action> = this.actions$
      .ofType<LoadWorkFlowListCustomForm>(CustomFormActionTypes.LOAD_WORKFLOW_LIST)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(`${constants.CUSTOM_FORM_URLs.loadWorkFlowList}`)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadWorkFlowListCustomFormSuccess(<IWorkDefinition[]>(
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


}
