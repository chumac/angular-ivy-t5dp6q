import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  ExemptActionTypes,
  LoadDataExempt,
  LoadDataExemptSuccess,
  SaveExempt,
  NotProcessingExempt,
  HideEditorExempt,
  DeleteDataExempt,
  LoadDocumentExempt,
  LoadDocumentExemptSuccess,
  LoadInlineDocumentExempt,
  RemoveDataExempt,
  AddExempt,
  LoadPlanListExempt,
  LoadPlanListExemptSuccess,
  LoadEmployeeListExempt,
  LoadEmployeeListExemptSuccess,
  LoadAnalysisListExempt,
  LoadAnalysisListExemptSuccess,
  LoadAnalysisDetListExempt,
  LoadAnalysisDetListExemptSuccess,
  LoadPositionListExempt,
  LoadPositionListExemptSuccess,
  LoadDesignationListExempt,
  LoadDesignationListExemptSuccess,
  LoadGradeListExempt,
  LoadGradeListExemptSuccess,
} from './exempt.actions';
import { IExempt, IPlan } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class ExemptEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataExempt>(ExemptActionTypes.LOAD_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.EXEMPT_URLs.getExemptData)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadDataExemptSuccess(<IExempt[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  loadPlanData$: Observable<Action> = this.actions$
    .ofType<LoadPlanListExempt>(ExemptActionTypes.LOAD_PLAN_LIST)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.EXEMPT_URLs.getPlanList)
          .pipe(
            map((data: any) => {
              if (data.Success) {
                return new LoadPlanListExemptSuccess(<IPlan[]>(
                  data.Results
                ));
              } else {
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );

  @Effect()
  addData$: Observable<Action> = this.actions$
    .ofType<AddExempt>(ExemptActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.EXEMPT_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingExempt(),
                  new HideEditorExempt(),
                  new LoadDataExempt()
                ]);
              } else {
                return from([
                  new NotProcessingExempt(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingExempt(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveExempt>(ExemptActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(`${constants.EXEMPT_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingExempt(),
                  new HideEditorExempt(),
                  new LoadDataExempt()
                ]);
              } else {
                return from([
                  new NotProcessingExempt(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingExempt(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataExempt>(ExemptActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.EXEMPT_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadDataExempt()
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
              ])
            )
          );
      })
    );

    @Effect()
    loadAnalysisList$: Observable<Action> = this.actions$
      .ofType<LoadAnalysisListExempt>(
        ExemptActionTypes.LOAD_ANALYSIS_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.EXEMPT_URLs.getAnalysis).pipe(
            map((data: any) => {
              console.log('Analysis List', data);
              if (data.Success) {
                return new LoadAnalysisListExemptSuccess(<any[]>(
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
      .ofType<LoadAnalysisDetListExempt>(
        ExemptActionTypes.LOAD_ANALYSIS_DETAIL_LIST
      )
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService.read(`${constants.EXEMPT_URLs.getAnalysisDet}/${payload}`).pipe(
            map((data: any) => {
              console.log('AnalysisDet List', data);
              if (data.Success) {
                return new LoadAnalysisDetListExemptSuccess(<any[]>(
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
      .ofType<LoadPositionListExempt>(
        ExemptActionTypes.LOAD_POSITION_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.EXEMPT_URLs.getPositions).pipe(
            map((data: any) => {
              console.log('Position List', data);
              if (data.Success) {
                const transformedData = this.utilService.transformToSelectDataList(data.Results, 'position_id', 'description');
                return new LoadPositionListExemptSuccess(<any[]>(
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
      .ofType<LoadDesignationListExempt>(
        ExemptActionTypes.LOAD_DESIGNATION_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.EXEMPT_URLs.getDesignations).pipe(
            map((data: any) => {
              console.log('Designation List', data);
              if (data.Success) {
                const transformedData = this.utilService.transformToSelectDataList(data.Results, 'title_id', 'description');
                return new LoadDesignationListExemptSuccess(<any[]>(
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
      .ofType<LoadGradeListExempt>(
        ExemptActionTypes.LOAD_GRADE_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.EXEMPT_URLs.getGrades).pipe(
            map((data: any) => {
              console.log('Grade List', data);
              if (data.Success) {
                const transformedData = this.utilService.transformToSelectDataList(data.Results, 'grade_id', 'description');
                return new LoadGradeListExemptSuccess(<any[]>(
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
      .ofType<LoadEmployeeListExempt>(
        ExemptActionTypes.LOAD_EMPLOYEE_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.EXEMPT_URLs.getEmployees).pipe(
            map((data: any) => {
              console.log('Employee List', data);
              if (data.Success) {
                return new LoadEmployeeListExemptSuccess(<IPersonal[]>(
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
