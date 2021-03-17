import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  RoleWeightActionTypes,
  LoadDataRoleWeight,
  LoadDataRoleWeightSuccess,
  SaveRoleWeight,
  NotProcessingRoleWeight,
  HideEditorRoleWeight,
  DeleteDataRoleWeight,
  LoadDocumentRoleWeight,
  LoadDocumentRoleWeightSuccess,
  LoadInlineDocumentRoleWeight,
  RemoveDataRoleWeight,
  AddRoleWeight,
  LoadAnalysisListRoleWeight,
  LoadAnalysisListRoleWeightSuccess,
  LoadAnalysisDetListRoleWeight,
  LoadAnalysisDetListRoleWeightSuccess,
  LoadPositionListRoleWeight,
  LoadPositionListRoleWeightSuccess,
  LoadDesignationListRoleWeight,
  LoadDesignationListRoleWeightSuccess,
  LoadGradeListRoleWeight,
  LoadGradeListRoleWeightSuccess,
  LoadEmployeeListRoleWeight,
  LoadEmployeeListRoleWeightSuccess,
} from './role-weight.actions';
import { IRoleWeight } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class RoleWeightEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataRoleWeight>(RoleWeightActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.ROLE_WEIGHT_URLs.getRoleWeightData)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataRoleWeightSuccess(<IRoleWeight[]>(
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
    .ofType<AddRoleWeight>(RoleWeightActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.ROLE_WEIGHT_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingRoleWeight(),
                  new HideEditorRoleWeight(),
                  new LoadDataRoleWeight()
                ]);
              } else {
                return from([
                  new NotProcessingRoleWeight(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRoleWeight(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveRoleWeight>(RoleWeightActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.ROLE_WEIGHT_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingRoleWeight(),
                  new HideEditorRoleWeight(),
                  new LoadDataRoleWeight()
                ]);
              } else {
                return from([
                  new NotProcessingRoleWeight(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingRoleWeight(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataRoleWeight>(RoleWeightActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.ROLE_WEIGHT_URLs.archiveData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataRoleWeight()
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
    loadAnalysisList$: Observable<Action> = this.actions$
      .ofType<LoadAnalysisListRoleWeight>(
        RoleWeightActionTypes.LOAD_ANALYSIS_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.ROLE_WEIGHT_URLs.getAnalysis).pipe(
            map((data: any) => {
              console.log('Analysis List', data);
              if (data.Success && data.Results) {
                return new LoadAnalysisListRoleWeightSuccess(<any[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: 'Something went wrong. Analysis data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
        })
      );
  
    @Effect()
    loadAnalysisDetList$: Observable<Action> = this.actions$
      .ofType<LoadAnalysisDetListRoleWeight>(
        RoleWeightActionTypes.LOAD_ANALYSIS_DETAIL_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.ROLE_WEIGHT_URLs.getAnalysisDet).pipe(
            map((data: any) => {
              console.log('AnalysisDet List', data);
              if (data.Success && data.Results) {
                return new LoadAnalysisDetListRoleWeightSuccess(<any[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: 'Something went wrong. AnalysisDet data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
        })
      );
  
    @Effect()
    loadPositionList$: Observable<Action> = this.actions$
      .ofType<LoadPositionListRoleWeight>(
        RoleWeightActionTypes.LOAD_POSITION_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.ROLE_WEIGHT_URLs.getPositions).pipe(
            map((data: any) => {
              console.log('Position List', data);
              if (data.Success && data.Results) {
                const transformedData = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                return new LoadPositionListRoleWeightSuccess(<any[]>(
                  transformedData
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: 'Something went wrong. Position data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
        })
      );
  
  
    @Effect()
    loadDesignationList$: Observable<Action> = this.actions$
      .ofType<LoadDesignationListRoleWeight>(
        RoleWeightActionTypes.LOAD_DESIGNATION_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.ROLE_WEIGHT_URLs.getDesignations).pipe(
            map((data: any) => {
              console.log('Designation List', data);
              if (data.Success && data.Results) {
                const transformedData = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                return new LoadDesignationListRoleWeightSuccess(<any[]>(
                  transformedData
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: 'Something went wrong. Designation data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
        })
      );
  
    @Effect()
    loadGradeList$: Observable<Action> = this.actions$
      .ofType<LoadGradeListRoleWeight>(
        RoleWeightActionTypes.LOAD_GRADE_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.ROLE_WEIGHT_URLs.getGrades).pipe(
            map((data: any) => {
              console.log('Grade List', data);
              if (data.Success && data.Results) {
                const transformedData = this.utilService.transformToSelectDataList(data.Results, 'id', 'description');
                return new LoadGradeListRoleWeightSuccess(<any[]>(
                  transformedData
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: 'Something went wrong. Grade data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
        })
      );
  
  
    @Effect()
    loadEmployeeList$: Observable<Action> = this.actions$
      .ofType<LoadEmployeeListRoleWeight>(
        RoleWeightActionTypes.LOAD_EMPLOYEE_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.ROLE_WEIGHT_URLs.getEmployees).pipe(
            map((data: any) => {
              console.log('Employee List', data);
              if (data.Success && data.Results) {
                return new LoadEmployeeListRoleWeightSuccess(<IPersonal[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: 'Something went wrong. Employee data could not be loaded.',
                  options: toastOptionsError()
                });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message:
                    'Something went wrong. Data could not be loaded. Error occured.',
                  options: toastOptionsError()
                })
              )
            )
          );
        })
      );

}
