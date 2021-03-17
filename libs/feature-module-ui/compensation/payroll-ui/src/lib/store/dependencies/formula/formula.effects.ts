import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, UtilService } from '@nutela/core-services';

import {
  FormulaActionTypes,
  LoadFormulaData,
  LoadFormulaSuccess,
  NotProcessingFormula,
  HideEditorFormula,
  SaveFormula,
  UpdateFormula,
  DeleteDataFormula,
  NotLoadingFormula,
  LoadRoleData,
  LoadRoleDataSuccess,
  LoadFilteredFormula,
  HasFormulaAdminRole
} from './formula.actions';
import { ShowToast } from '@nutela/store/shared';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { IRootState } from '../../root/root.state';
import { IFormula } from '@nutela/models/compensation/payroll';
import { IRolesTransform } from 'libs/feature-module-ui/platform/provisioning-ui/src/lib/models/interfaces';
import { ProvisioningUtilService } from 'libs/feature-module-ui/platform/provisioning-ui/src/lib/services';
import { ToastTypes } from '@nutela/shared/app-global';

@Injectable()
export class FormulaEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IRootState>, private pUtilService: ProvisioningUtilService) { }

  @Effect()
  loadFormulaData$: Observable<Action> = this.actions$
    .ofType<LoadFormulaData>(FormulaActionTypes.LOAD_FORMULA_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.FORMULA_URLs.getAllFormulas}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: IApiResult) => {
              if (data.Success && data.Results) {
                return new LoadFormulaSuccess(<IFormula[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingFormula());
                  this.store.dispatch(new HasFormulaAdminRole(!(data.ErrorMessage.includes('py_formula_admin'))))
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Data Could Not Be Loaded.`, type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  loadRoleData$: Observable<Action> = this.actions$
    .ofType<LoadRoleData>(FormulaActionTypes.LOAD_ROLE_DATA)
    .pipe(
      switchMap(() => {
        const url = `${constants.PAYGROUP_URLs.roles}`;
        return this.apiService
          .read(url)
          .pipe(
            map((data: any) => {
              console.log('data', data);
              if (data.Success && data.Results) {
                const rolesData = this.pUtilService.transformToRolesDataList(data.Results, 'rolename', 'sys_rolename');
                this.store.dispatch(new NotLoadingFormula());
                return new LoadRoleDataSuccess(<IRolesTransform[]>(
                  rolesData
                ));
              } else {
                this.store.dispatch(new NotLoadingFormula());
                return new ShowToast({
                  title: 'Data Item Could Not Be Loaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form Data Could Not Be Loaded.`, type: ToastTypes.ERROR
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Item Could Not Be Loaded',
                  message:
                    'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR
                })
              )
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveFormula>(FormulaActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('data', payload.data);
        return this.apiService
          .create(constants.FORMULA_URLs.create, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingFormula(),
                  new LoadFormulaData(),
                  new HideEditorFormula(),
                  // new LoadFilteredFormula({ payrollProfileId: null })
                ]);
              } else {
                return from([
                  new NotProcessingFormula(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be saved.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFormula(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  updateData$: Observable<Action> = this.actions$
    .ofType<UpdateFormula>(FormulaActionTypes.UPDATE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log('Saving ...');
        console.log('data update', payload.data);
        return this.apiService
          .update(`${constants.FORMULA_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              console.log(data);
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, type: ToastTypes.SUCCESS }),
                  new NotProcessingFormula(),
                  new HideEditorFormula(),
                  new LoadFormulaData(),
                  // new LoadFilteredFormula({ payrollProfileId: null })
                ]);
              } else {
                console.log(data)
                return from([
                  new NotProcessingFormula(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, type: ToastTypes.ERROR })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingFormula(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.`, type: ToastTypes.ERROR })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataFormula>(FormulaActionTypes.DELETE_FORMULA_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.FORMULA_URLs.delete}/${payload.recordId}`, null)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, type: ToastTypes.SUCCESS }),
                  new LoadFormulaData(),
                  new LoadFilteredFormula({ payrollProfileId: payload.payrollProfile })
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, type: ToastTypes.ERROR }),
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

}

