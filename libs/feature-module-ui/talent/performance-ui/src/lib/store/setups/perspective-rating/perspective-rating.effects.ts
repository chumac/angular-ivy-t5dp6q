import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as constants from '../../../constants';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  PerspectiveRatingActionTypes,
  LoadDataPerspectiveRating,
  LoadDataPerspectiveRatingSuccess,
  SavePerspectiveRating,
  NotProcessingPerspectiveRating,
  HideEditorPerspectiveRating,
  DeleteDataPerspectiveRating,
  LoadDocumentPerspectiveRating,
  LoadDocumentPerspectiveRatingSuccess,
  LoadInlineDocumentPerspectiveRating,
  RemoveDataPerspectiveRating,
  AddPerspectiveRating,
  LoadPerspectiveListPerspectiveRating,
  LoadPerspectiveListPerspectiveRatingSuccess,
  LoadAnalysisListPerspectiveRating,
  LoadAnalysisListPerspectiveRatingSuccess,
  LoadAnalysisDetListPerspectiveRating,
  LoadAnalysisDetListPerspectiveRatingSuccess,
  LoadPositionListPerspectiveRating,
  LoadPositionListPerspectiveRatingSuccess,
  LoadDesignationListPerspectiveRating,
  LoadDesignationListPerspectiveRatingSuccess,
  LoadGradeListPerspectiveRating,
  LoadGradeListPerspectiveRatingSuccess,
  LoadEmployeeListPerspectiveRating,
  LoadEmployeeListPerspectiveRatingSuccess,
  UploadDataPerspectiveRating,
} from './perspective-rating.actions';
import { IPerspectiveRating, IPerspective } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ShowToast, Download } from '@nutela/store/shared';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

@Injectable()
export class PerspectiveRatingEffects {
  constructor(private actions$: Actions, private apiService: ApiService, private utilService: UtilService) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadDataPerspectiveRating>(PerspectiveRatingActionTypes.LOAD_DATA)
    .pipe(
      map(action=>action.payload),
      switchMap((payload) => {
        return this.apiService
          .read(`${constants.PERSPECTIVE_RATING_URLs.getPerspectiveData}/${payload.persepectiveId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                return new LoadDataPerspectiveRatingSuccess(<IPerspectiveRating[]>(
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
    loadPerspectiveList$: Observable<Action> = this.actions$
      .ofType<LoadPerspectiveListPerspectiveRating>(PerspectiveRatingActionTypes.LOAD_PERSPECTIVE_LIST)
      .pipe(
        switchMap(() => {
          return this.apiService
            .read(constants.PERSPECTIVE_RATING_URLs.getPerspectiveList)
            .pipe(
              map((data: any) => {
                if (data.Success && data.Results) {
                  return new LoadPerspectiveListPerspectiveRatingSuccess(<IPerspective[]>(
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
    .ofType<AddPerspectiveRating>(PerspectiveRatingActionTypes.ADD)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.PERSPECTIVE_RATING_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingPerspectiveRating(),
                  new HideEditorPerspectiveRating(),
                  new LoadDataPerspectiveRating({persepectiveId: payload.persepectiveId})
                ]);
              } else {
                return from([
                  new NotProcessingPerspectiveRating(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPerspectiveRating(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SavePerspectiveRating>(PerspectiveRatingActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .update(`${constants.PERSPECTIVE_RATING_URLs.update}/${payload.recordId}`, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Your data was updated successfully.`, options: toastOptionsSuccess()}),
                  new NotProcessingPerspectiveRating(),
                  new HideEditorPerspectiveRating(),
                  new LoadDataPerspectiveRating({persepectiveId: payload.persepectiveId})
                ]);
              } else {
                return from([
                  new NotProcessingPerspectiveRating(),
                  new ShowToast({title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError()})
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingPerspectiveRating(),
                new ShowToast({title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteDataPerspectiveRating>(PerspectiveRatingActionTypes.DELETE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .delete(`${constants.PERSPECTIVE_RATING_URLs.deleteData}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess()}),
                  new LoadDataPerspectiveRating({persepectiveId: payload.persepectiveId})
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
    uploadPerspective$: Observable<Action> = this.actions$
      .ofType<UploadDataPerspectiveRating>(PerspectiveRatingActionTypes.UPLOAD_DATA)
      .pipe(
        map(action => action.payload),
        switchMap(payload => {
          return this.apiService
            .create(constants.PERSPECTIVE_RATING_URLs.upload, payload.objectiveData)
            .pipe(
              switchMap((data: IApiResult) => {
                if (data.Success) {
                  return from([
                    new ShowToast({title: null, message: `Your data was uploaded successfully.`, options: toastOptionsSuccess()}),
                    new NotProcessingPerspectiveRating(),
                    // new LoadDataPerspectiveRating()
                  ]);
                } else {
                  return from([
                    new NotProcessingPerspectiveRating(),
                    new ShowToast({title: 'Data Could Not Be Uploaded', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Please upload a valid perspective ratings template.`, options: toastOptionsError()})
                  ]);
                }
              }),
              catchError((error: any) =>
                from([
                  new NotProcessingPerspectiveRating(),
                  new ShowToast({title: 'Data Could Not Be Uploaded', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError()})
                ])
              )
            );
        })
      );


    @Effect()
    loadAnalysisList$: Observable<Action> = this.actions$
      .ofType<LoadAnalysisListPerspectiveRating>(
        PerspectiveRatingActionTypes.LOAD_ANALYSIS_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.FORM_TEMPLATE_URLs.getAnalysis).pipe(
            map((data: any) => {
              console.log('Analysis List', data);
              if (data.Success && data.Results) {
                return new LoadAnalysisListPerspectiveRatingSuccess(<any[]>(
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
      .ofType<LoadAnalysisDetListPerspectiveRating>(
        PerspectiveRatingActionTypes.LOAD_ANALYSIS_DETAIL_LIST
      )
      .pipe(
        map(action => action.payload),
        switchMap((payload) => {
          return this.apiService.read(`${constants.FORM_TEMPLATE_URLs.getAnalysisDet}/${payload}`).pipe(
            map((data: any) => {
              console.log('AnalysisDet List', data);
              if (data.Success && data.Results) {
                return new LoadAnalysisDetListPerspectiveRatingSuccess(<any[]>(
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
      .ofType<LoadPositionListPerspectiveRating>(
        PerspectiveRatingActionTypes.LOAD_POSITION_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.FORM_TEMPLATE_URLs.getPositions).pipe(
            map((data: any) => {
              console.log('Position List', data);
              if (data.Success && data.Results) {
                const transformedData = this.utilService.transformToSelectDataList(data.Results, 'position_id', 'description');
                return new LoadPositionListPerspectiveRatingSuccess(<any[]>(
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
      .ofType<LoadDesignationListPerspectiveRating>(
        PerspectiveRatingActionTypes.LOAD_DESIGNATION_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.FORM_TEMPLATE_URLs.getDesignations).pipe(
            map((data: any) => {
              console.log('Designation List', data);
              if (data.Success && data.Results) {
                const transformedData = this.utilService.transformToSelectDataList(data.Results, 'title_id', 'description');
                return new LoadDesignationListPerspectiveRatingSuccess(<any[]>(
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
      .ofType<LoadGradeListPerspectiveRating>(
        PerspectiveRatingActionTypes.LOAD_GRADE_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.FORM_TEMPLATE_URLs.getGrades).pipe(
            map((data: any) => {
              console.log('Grade List', data);
              if (data.Success && data.Results) {
                const transformedData = this.utilService.transformToSelectDataList(data.Results, 'grade_id', 'description');
                return new LoadGradeListPerspectiveRatingSuccess(<any[]>(
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
      .ofType<LoadEmployeeListPerspectiveRating>(
        PerspectiveRatingActionTypes.LOAD_EMPLOYEE_LIST
      )
      .pipe(
        switchMap(() => {
          return this.apiService.read(constants.FORM_TEMPLATE_URLs.getEmployees).pipe(
            map((data: any) => {
              console.log('Employee List', data);
              if (data.Success && data.Results) {
                return new LoadEmployeeListPerspectiveRatingSuccess(<IPersonal[]>(
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
