import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  Configuration360ActionTypes,
  LoadDataConfiguration360,
  LoadDataConfiguration360Success,
  SaveConfiguration360,
  NotProcessingConfiguration360,
  HideEditorConfiguration360,
  DeleteDataConfiguration360,
  LoadDocumentConfiguration360,
  LoadDocumentConfiguration360Success,
  LoadInlineDocumentConfiguration360,
  RemoveDataConfiguration360,
  AddConfiguration360,
  LoadAnalysisListConfiguration360,
  LoadAnalysisListConfiguration360Success,
  LoadAnalysisDetListConfiguration360,
  LoadAnalysisDetListConfiguration360Success,
  LoadPositionListConfiguration360,
  LoadPositionListConfiguration360Success,
  LoadDesignationListConfiguration360,
  LoadDesignationListConfiguration360Success,
  LoadGradeListConfiguration360,
  LoadGradeListConfiguration360Success,
  LoadEmployeeListConfiguration360,
  LoadEmployeeListConfiguration360Success,
  LoadPlanListConfiguration360,
  LoadPlanListConfiguration360Success,
} from './configuration360.actions';
import { IConfiguration360, IPlan } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';
import { IAnalysis, IAnalysisDetail } from '@nutela/models/workforce/personnel';
import { ISelectOption } from 'dist/libs/models/core-data';

@Injectable()
export class Configuration360Effects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataConfiguration360>(Configuration360ActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.CONFIGURATION360_URLs.getConfiguration360Data)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadDataConfiguration360Success(<IConfiguration360[]>(
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
    .ofType<AddConfiguration360>(Configuration360ActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.CONFIGURATION360_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingConfiguration360(),
                  new HideEditorConfiguration360(),
                  new LoadDataConfiguration360()
                ]);
              } else {
                return from([
                  new NotProcessingConfiguration360(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingConfiguration360(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveConfiguration360>(Configuration360ActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.CONFIGURATION360_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingConfiguration360(),
                  new HideEditorConfiguration360(),
                  new LoadDataConfiguration360()
                ]);
              } else {
                return from([
                  new NotProcessingConfiguration360(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingConfiguration360(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataConfiguration360>(Configuration360ActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.CONFIGURATION360_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataConfiguration360()
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
    loadPlanList$: Observable<Action> = this.actions$
      .ofType<LoadPlanListConfiguration360>(
        Configuration360ActionTypes.LOAD_PLAN_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.CONFIGURATION360_URLs.getPlan).pipe(
            map((data: any) => {
              console.log('Plan List', data);
              if (data.Success) {
                return new LoadPlanListConfiguration360Success(<IPlan[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({
                  title: 'Data Could Not Be Loaded',
                  message: 'Something went wrong. Plan list could not be loaded.',
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
    loadAnalysisList$: Observable<Action> = this.actions$
      .ofType<LoadAnalysisListConfiguration360>(
        Configuration360ActionTypes.LOAD_ANALYSIS_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.CONFIGURATION360_URLs.getAnalysis).pipe(
            map((data: any) => {
              console.log('Analysis List', data);
              if (data.Success) {
                return new LoadAnalysisListConfiguration360Success(<IAnalysis[]>(
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
      .ofType<LoadAnalysisDetListConfiguration360>(
        Configuration360ActionTypes.LOAD_ANALYSIS_DETAIL_LIST
      )
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService.read(`${constants.CONFIGURATION360_URLs.getAnalysisDet}/${payload}`).pipe(
            map((data: any) => {
              console.log('AnalysisDet List', data);
              if (data.Success) {
                return new LoadAnalysisDetListConfiguration360Success(<IAnalysisDetail[]>(
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
      .ofType<LoadPositionListConfiguration360>(
        Configuration360ActionTypes.LOAD_POSITION_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.CONFIGURATION360_URLs.getPositions).pipe(
            map((data: any) => {
              console.log('Position List', data);
              if (data.Success) {
                const transformedData = this.utilService.transformToSelectDataList(data.Results, 'position_id', 'description');
                return new LoadPositionListConfiguration360Success(<ISelectOption[]>(
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
      .ofType<LoadDesignationListConfiguration360>(
        Configuration360ActionTypes.LOAD_DESIGNATION_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.CONFIGURATION360_URLs.getDesignations).pipe(
            map((data: any) => {
              console.log('Designation List', data);
              if (data.Success) {
                const transformedData = this.utilService.transformToSelectDataList(data.Results, 'title_id', 'description');
                return new LoadDesignationListConfiguration360Success(<any[]>(
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
      .ofType<LoadGradeListConfiguration360>(
        Configuration360ActionTypes.LOAD_GRADE_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.CONFIGURATION360_URLs.getGrades).pipe(
            map((data: any) => {
              console.log('Grade List', data);
              if (data.Success) {
                const transformedData = this.utilService.transformToSelectDataList(data.Results, 'grade_id', 'description');
                return new LoadGradeListConfiguration360Success(<any[]>(
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
      .ofType<LoadEmployeeListConfiguration360>(
        Configuration360ActionTypes.LOAD_EMPLOYEE_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.CONFIGURATION360_URLs.getEmployees).pipe(
            map((data: any) => {
              console.log('Employee List', data);
              if (data.Success) {
                return new LoadEmployeeListConfiguration360Success(<IPersonal[]>(
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
