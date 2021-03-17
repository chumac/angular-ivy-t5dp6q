import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import { ApiService, toastOptionsError, toastOptionsSuccess } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';

import {
  NewEmployeeActionTypes,
  LoadProvisionedDataNewEmployee,
  LoadProvisionedDataNewEmployeeSuccess,
  LoadStaffCategories,
  LoadStaffCategoriesSuccess,
  LoadDesignations,
  LoadDesignationsSuccess,
  LoadPositions,
  LoadPositionsSuccess,
  LoadEnterpriseStructurTypes,
  LoadEnterpriseStructurTypesSuccess,
  LoadEnterpriseStructureDetails,
  LoadEnterpriseStructureDetailsSuccess,
  SaveNewEmployee,
  NotProcessingNewEmployee,
  HideEditorNewEmployee,
  LoadStaffNumber,
  LoadStaffNumberSuccess,
  LoadPaygroups,
  LoadPaygroupsSuccess,
  LoadPaygrades,
  LoadPaygradesSuccess,
  LoadCostCenters,
  LoadCostCentersSuccess,
  LoadUsername,
  LoadUsernameSuccess,
  LoadRoleDataSuccess,
  LoadRoleData,
  LoadEmailsTo,
  LoadEmailsToSuccess,
  LoadRecordCategories,
  LoadRecordCategoriesSuccess,
  LoadUserTypes,
  LoadUserTypesSuccess,
  SaveUpdatedEmployee,
  HideEditorProvisionedEmployee,
  NotLoadingNewEmployee,
} from './new-employee.action';

import { ShowToast } from '@nutela/store/shared';
import { ISelectOption, IApiResult } from '@nutela/models/core-data';
import { PROVISIONED_DATA_URLs, DESGNATION_URLs, POSITION_URLs, ENTERPRISE_STRUCTURE_URLs, STAFF_CATEGORY_URLs } from '../../constants';
import { ProvisioningUtilService } from '../../services';
import { IProvisioning, IStaffCategory, IEnterpriseStructureType, IRolesTransform } from '../../models/interfaces';
import { ToastTypes } from '@nutela/shared/app-global';


@Injectable()
export class NewEmployeeEffect {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: ProvisioningUtilService, private store: Store<IAppState>) {}

  @Effect()
  loadProvisionedData$: Observable<Action> = this.actions$
    .ofType<LoadProvisionedDataNewEmployee>(NewEmployeeActionTypes.LOAD_PROVISIONED_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(PROVISIONED_DATA_URLs.provisionedData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingNewEmployee())
                return new LoadProvisionedDataNewEmployeeSuccess(<IProvisioning[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotProcessingNewEmployee());
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingNewEmployee(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be loaded. Error occured.`, type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadStaffCategories$: Observable<Action> = this.actions$
    .ofType<LoadStaffCategories>(NewEmployeeActionTypes.LOAD_STAFF_CATEGORIES)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(STAFF_CATEGORY_URLs.list)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                //
                return new LoadStaffCategoriesSuccess(<IStaffCategory[]>(
                  data.Results
                ));
              } else {
                //
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                // new NotLoadingNewEmployee(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be loaded. Error occured.`, type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadDesignations$: Observable<Action> = this.actions$
    .ofType<LoadDesignations>(NewEmployeeActionTypes.LOAD_DESIGNATIONS)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(DESGNATION_URLs.list)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const designationOptions = this.utilService.transformToSelectDataList(data.Results, 'title_id', 'description');
                //
                return new LoadDesignationsSuccess(<ISelectOption[]>(
                  designationOptions
                ));
              } else {
                //
                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                // new NotLoadingNewEmployee(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be loaded. Error occured.`, type: ToastTypes.ERROR})
              )
            )
          );
      })
    );


  @Effect()
  loadPositionsByDesignation$: Observable<Action> = this.actions$
    .ofType<LoadPositions>(NewEmployeeActionTypes.LOAD_POSITIONS)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${POSITION_URLs.getDataByDesignation}/${payload.designationId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const positionOptions = this.utilService.transformToSelectDataList(data.Results, 'PositionInfo.position_id', 'PositionInfo.description');
                this.store.dispatch(new NotProcessingNewEmployee());
                return new LoadPositionsSuccess(<ISelectOption[]>(
                  positionOptions
                ));
              } else {
                this.store.dispatch(new NotProcessingNewEmployee());
                return new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotProcessingNewEmployee(),
                new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );


  @Effect()
  loadPaygroups$: Observable<Action> = this.actions$
    .ofType<LoadPaygroups>(NewEmployeeActionTypes.LOAD_PAYGROUPS)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${PROVISIONED_DATA_URLs.getPaygroups}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const paygroupsTransformed = this.utilService.transformToSelectDataList(data.Results, 'paygroup_id', 'description');
                //
                return new LoadPaygroupsSuccess(
                  paygroupsTransformed
                  );
              } else {
                //
                return new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                // new NotLoadingNewEmployee(),
                new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

  @Effect()
  loadPaygrades$: Observable<Action> = this.actions$
    .ofType<LoadPaygrades>(NewEmployeeActionTypes.LOAD_PAYGADES)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(PROVISIONED_DATA_URLs.getPaygrades)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const paygradesTransformed = this.utilService.transformToSelectDataList(data.Results, 'grade_id', 'description');
                //
                return new LoadPaygradesSuccess(
                  paygradesTransformed
                  );
                } else {

                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingNewEmployee(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be loaded. Error occured.`, type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadEmailsTo$: Observable<Action> = this.actions$
    .ofType<LoadEmailsTo>(NewEmployeeActionTypes.LOAD_EMAILS_TO)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(PROVISIONED_DATA_URLs.getEmailTo)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const emailsTo = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');

                return new LoadEmailsToSuccess(<ISelectOption[]>(
                  emailsTo
                ));
                } else {

                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingNewEmployee(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be loaded. Error occured.`, type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadRecordCategories$: Observable<Action> = this.actions$
    .ofType<LoadRecordCategories>(NewEmployeeActionTypes.LOAD_RECORD_CATEGORIES)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(PROVISIONED_DATA_URLs.getRecordCategories)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const recordCategories = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');

                return new LoadRecordCategoriesSuccess(<ISelectOption[]>(
                  recordCategories
                ));
                } else {

                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingNewEmployee(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be loaded. Error occured.`, type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadUserTypes$: Observable<Action> = this.actions$
    .ofType<LoadUserTypes>(NewEmployeeActionTypes.LOAD_USER_TYPES)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(PROVISIONED_DATA_URLs.getUserTypes)
          .pipe(
            map((data: any) => {
              const userTypes = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
              if (data.Success && data.Results) {

                return new LoadUserTypesSuccess(<ISelectOption[]>(
                  userTypes
                ));
                } else {

                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingNewEmployee(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be loaded. Error occured.`, type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadStaffNumber$: Observable<Action> = this.actions$
    .ofType<LoadStaffNumber>(NewEmployeeActionTypes.LOAD_STAFF_NUMBER)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${PROVISIONED_DATA_URLs.staffNumber}/${payload.scheme}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {

                return new LoadStaffNumberSuccess(<string>(data.Results[0]));
              } else {

                return new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingNewEmployee(),
                new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

  @Effect()
  loadEnterpriseStructureTypes$: Observable<Action> = this.actions$
    .ofType<LoadEnterpriseStructurTypes>(NewEmployeeActionTypes.LOAD_ENTERPRISE_STRUCTURE_TYPES)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(ENTERPRISE_STRUCTURE_URLs.structureTypes)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {

                return new LoadEnterpriseStructurTypesSuccess(<IEnterpriseStructureType[]>(
                  data.Results

                ));
              } else {

                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingNewEmployee(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be loaded. Error occured.`, type: ToastTypes.ERROR})
              )
            )
          );
      })
    );

  @Effect()
  loadEnterpriseStructures$: Observable<Action> = this.actions$
    .ofType<LoadEnterpriseStructureDetails>(NewEmployeeActionTypes.LOAD_ENTERPRISE_STRUCTURE_DETAILS)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${ENTERPRISE_STRUCTURE_URLs.structureDetails}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {

                return new LoadEnterpriseStructureDetailsSuccess(
                  { structureDetailsList: data.Results}
                  );
              } else {

                return new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingNewEmployee(),
                new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

  @Effect()
  loadCostCenters$: Observable<Action> = this.actions$
    .ofType<LoadCostCenters>(NewEmployeeActionTypes.LOAD_COST_CENTERS)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${ENTERPRISE_STRUCTURE_URLs.constCenters}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const costCenterTransformed = this.utilService.transformToSelectDataList(data.Results, 'analysis_det_id', 'description');

                return new LoadCostCentersSuccess(
                  costCenterTransformed
                  );
              } else {

                return new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingNewEmployee(),
                new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );

  @Effect()
  autoGenerateUsername$: Observable<Action> = this.actions$
    .ofType<LoadUsername>(NewEmployeeActionTypes.LOAD_USERNAME)
    .pipe(
      map(action => action.payload),
      mergeMap((payload) => {
        return this.apiService
          .read(`${PROVISIONED_DATA_URLs.username}/${payload.firstname}/${payload.surname}/${payload.middlename}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {

                return new LoadUsernameSuccess(<string>(data.Results[0]));
              } else {

                return new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingNewEmployee(),
                new ShowToast({title: 'Data Item Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError()})
              )
            )
          );
      })
    );


  @Effect()
  loadRoleData$: Observable<Action> = this.actions$
    .ofType<LoadRoleData>(NewEmployeeActionTypes.LOAD_ROLE_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(PROVISIONED_DATA_URLs.roleData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                const rolesData = this.utilService.transformToRolesDataList(data.Results, 'rolename', 'sys_rolename');

                return new LoadRoleDataSuccess(<IRolesTransform[]>(
                  rolesData
                ));
              } else {

                return new ShowToast({title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError()});
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingNewEmployee(),
                new ShowToast({title: 'Data Could Not Be Loaded', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be loaded. Error occured.`, type: ToastTypes.ERROR})
              )
            )
          );
      })
    );


  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveNewEmployee>(NewEmployeeActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(PROVISIONED_DATA_URLs.create, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingNewEmployee(),
                  new HideEditorNewEmployee(),
                  new LoadProvisionedDataNewEmployee()
                ]);
              } else {
                return from([
                  new NotProcessingNewEmployee(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingNewEmployee(),
                new ShowToast({title: 'Data Could Not Be Saved', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be saved. Error occured.`, options: toastOptionsError()})
              ])
            )
          );
      })
    );


    @Effect()
    saveUpdateData$: Observable<Action> = this.actions$
      .ofType<SaveUpdatedEmployee>(NewEmployeeActionTypes.SAVE_UPDATED_EMPLOYEE)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          const url = `${PROVISIONED_DATA_URLs.update}/${payload.provId}`
          return this.apiService
            .create(url, payload.data)
            .pipe(
              switchMap((data: IApiResult) => {

                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingNewEmployee(),
                    new HideEditorProvisionedEmployee(),
                    new LoadProvisionedDataNewEmployee()
                  ]);
                } else {
                  return from([
                    new NotProcessingNewEmployee(),
                    new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingNewEmployee(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: (error.status == 401)? error.error.ErrorMessage: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR})
                ])
              )
            );
        })
      );


}
