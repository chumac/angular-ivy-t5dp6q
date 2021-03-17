import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, catchError, delay, tap, take } from 'rxjs/operators';

import * as constants from '@nutela/shared/app-global';
import { ApiService, toastOptionsError, toastOptionsSuccess, UtilService } from '@nutela/core-services';

import {
  WorkflowAlternatesActionTypes,
  LoadWorkflowAlternates,
  LoadWorkflowAlternatesSuccess,
  SaveWorkflowAlternates,
  NotProcessingWorkflowAlternates,
  HideEditorWorkflowAlternates,
  DeleteWorkflowAlternates,
  LoadSingleWorkflowAlternates,
  LoadSingleWorkflowAlternatesSuccess,
  LoadSystemData,
  LoadSystemDataSuccess,
  LoadWorkDefinition,
  LoadWorkDefinitionSuccess,
  LoadCostCenter,
  LoadCostCenterSuccess,
  LoadGrade,
  LoadGradeSuccess,
  LoadForEmployee,
  LoadForEmployeeSuccess,
  LoadPositionCategory,
  LoadCategory,
  LoadDesignation,
  LoadStaffGroup,
  LoadStaffGroupSuccess,
  LoadDesignationSuccess,
  LoadCategorySuccess,
  LoadPositionCategorySuccess,
  LoadPosition,
  LoadPositionSuccess,
  NotLoadingWorkflowAlternates,
} from './alt-workflow-map.actions';
import { IWorkflowAlternates } from '@nutela/models/foundation';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { ShowToast } from '@nutela/store/shared';
import { IHRFoundationState } from '../root';

@Injectable()
export class AltWorkflowMapEffects {
  constructor(private actions$: Actions,
    private apiService: ApiService,
    private utilService: UtilService,
    private store: Store<IHRFoundationState>) { }

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .ofType<LoadWorkflowAlternates>(WorkflowAlternatesActionTypes.LOAD_ALT_WORK_MAP_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.WORKFLOW_MAP_ALt_URLs.altMap)
          .pipe(
            map((data: any) => {
              console.log(data);
              if (data.Success && data.Results) {
                this.store.dispatch(new NotProcessingWorkflowAlternates());
                return new LoadWorkflowAlternatesSuccess(<IWorkflowAlternates[]>(
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
  loadSingleData$: Observable<Action> = this.actions$
    .ofType<LoadSingleWorkflowAlternates>(WorkflowAlternatesActionTypes.LOAD_ALT_WORK_MAP_SINGLE_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.WORKFLOW_MAP_ALt_URLs.singleData}/${payload.recordId}`)
          .pipe(
            map((data: any) => {
              if (data.Success && data.Results) {
                this.store.dispatch(new NotLoadingWorkflowAlternates());
                return new LoadSingleWorkflowAlternatesSuccess(<IWorkflowAlternates[]>(
                  data.Results
                ));
              } else {
                this.store.dispatch(new NotLoadingWorkflowAlternates())
                return new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', options: toastOptionsError() });
              }
            }),
            catchError((error: any) =>
              of(
                new NotLoadingWorkflowAlternates(),
                new ShowToast({ title: 'Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded. Error occured.', options: toastOptionsError() })
              )
            )
          );
      })
    );


  @Effect()
  saveData$: Observable<Action> = this.actions$
    .ofType<SaveWorkflowAlternates>(WorkflowAlternatesActionTypes.SAVE)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .create(constants.WORKFLOW_MAP_ALt_URLs.add, payload.data)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Your data was saved successfully.`, options: toastOptionsSuccess() }),
                  new NotProcessingWorkflowAlternates(),
                  new HideEditorWorkflowAlternates(),
                  new LoadSingleWorkflowAlternates({ recordId: payload.ruleType }),
                ]);
              } else {
                return from([
                  new NotProcessingWorkflowAlternates(),
                  new ShowToast({ title: 'Data Could Not Be Saved', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Form data could not be loaded.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new NotProcessingWorkflowAlternates(),
                new ShowToast({ title: 'Data Could Not Be Saved', message: `Something went wrong. Form data could not be saved. Error occured.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  deleteData$: Observable<Action> = this.actions$
    .ofType<DeleteWorkflowAlternates>(WorkflowAlternatesActionTypes.DELETE_ALT_WORK_MAP_DATA)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        console.log(`${constants.WORKFLOW_MAP_ALt_URLs.delete}/${payload.recordId}`);
        return this.apiService
          .delete(`${constants.WORKFLOW_MAP_ALt_URLs.delete}/${payload.recordId}`)
          .pipe(
            switchMap((data: IApiResult) => {
              if (data.Success) {
                return from([
                  new ShowToast({ title: null, message: `Record was deleted successfully.`, options: toastOptionsSuccess() }),
                  new LoadSingleWorkflowAlternates({ recordId: payload.ruleType }),
                ]);
              } else {
                return from([
                  new ShowToast({ title: 'Data Could Not Be Deleted', message: data.ErrorMessage ? data.ErrorMessage : `Something went wrong. Record was not deleted.`, options: toastOptionsError() })
                ]);
              }
            }),
            catchError((error: any) =>
              from([
                new ShowToast({ title: 'Data Could Not Be Deleted', message: `Something went wrong. Record was not deleted.` + error, options: toastOptionsError() })
              ])
            )
          );
      })
    );

  @Effect()
  loadSystemData$: Observable<Action> = this.actions$
    .ofType<LoadSystemData>(WorkflowAlternatesActionTypes.LOAD_SYSTEM_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.WORKFLOW_MAP_URLs.systemData)
          .pipe(
            map((data: any) => {
              const system = this.utilService.transformToSelectDataList(data.Results, "sourcename_map", "entitydescription");
              if (data.Success) {
                return new LoadSystemDataSuccess(<ISelectOption[]>(
                  system
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
  loadWorkDefinitionData$: Observable<Action> = this.actions$
    .ofType<LoadWorkDefinition>(WorkflowAlternatesActionTypes.LOAD_WORK_DEFINITION_DATA)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.WORKFLOW_MAP_URLs.workDefinition)
          .pipe(
            map((data: any) => {
              const workflow = this.utilService.transformToSelectDataList(data.Results, "wflow_id", "description")
              if (data.Success) {
                return new LoadWorkDefinitionSuccess(<ISelectOption[]>(
                  workflow
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
  loadCostCenter$: Observable<Action> = this.actions$
    .ofType<LoadCostCenter>(WorkflowAlternatesActionTypes.LOAD_COST_CENTER)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        return this.apiService
          .read(`${constants.WORKFLOW_MAP_ALt_URLs.costCenter}/${payload.analysis_det_id}`)
          .pipe(
            map((data: any) => {
              console.log('cost', data);
              // const system=this.utilService.transformToSelectDataList(data.Results,"analysis_det_id","description");
              if (data.Success) {
                return new LoadCostCenterSuccess(<ISelectOption[]>(
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
  loadGrade$: Observable<Action> = this.actions$
    .ofType<LoadGrade>(WorkflowAlternatesActionTypes.LOAD_GRADE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.WORKFLOW_MAP_ALt_URLs.grade)
          .pipe(
            map((data: any) => {
              const grade = this.utilService.transformToSelectDataList(data.Results, "grade_id", "description");
              if (data.Success) {
                return new LoadGradeSuccess(<ISelectOption[]>(
                  grade
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
  loadForEmployee$: Observable<Action> = this.actions$
    .ofType<LoadForEmployee>(WorkflowAlternatesActionTypes.LOAD_FOR_EMPLOYEE)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.WORKFLOW_MAP_ALt_URLs.forEmployee)
          .pipe(
            map((data: any) => {
              const employee = this.utilService.transformToSelectDataList(data.Results, "employee_id", "emp_fullname");
              if (data.Success) {
                return new LoadForEmployeeSuccess(<ISelectOption[]>(
                  employee
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
  loadPosition$: Observable<Action> = this.actions$
    .ofType<LoadPosition>(WorkflowAlternatesActionTypes.LOAD_POSITION)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.WORKFLOW_MAP_ALt_URLs.position)
          .pipe(
            map((data: any) => {
              const position = this.utilService.transformToSelectDataList(data.Results, "position_id", "description");
              if (data.Success) {
                return new LoadPositionSuccess(<ISelectOption[]>(
                  position
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
  loadPositionCategory$: Observable<Action> = this.actions$
    .ofType<LoadPositionCategory>(WorkflowAlternatesActionTypes.LOAD_POSITION_CATEGORY)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.WORKFLOW_MAP_ALt_URLs.positionCategory)
          .pipe(
            map((data: any) => {
              const positionCategory = this.utilService.transformToSelectDataList(data.Results, "id", "description");
              if (data.Success) {
                return new LoadPositionCategorySuccess(<ISelectOption[]>(
                  positionCategory
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
  loadCategory$: Observable<Action> = this.actions$
    .ofType<LoadCategory>(WorkflowAlternatesActionTypes.LOAD_CATEGORY)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.WORKFLOW_MAP_ALt_URLs.category)
          .pipe(
            map((data: any) => {
              const category = this.utilService.transformToSelectDataList(data.Results, "category_id", "description");
              if (data.Success) {
                return new LoadCategorySuccess(<ISelectOption[]>(
                  category
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
  loadDesignation$: Observable<Action> = this.actions$
    .ofType<LoadDesignation>(WorkflowAlternatesActionTypes.LOAD_DESIGNATION)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.WORKFLOW_MAP_ALt_URLs.designation)
          .pipe(
            map((data: any) => {
              const designation = this.utilService.transformToSelectDataList(data.Results, "title_id", "description");
              if (data.Success) {
                return new LoadDesignationSuccess(<ISelectOption[]>(
                  designation
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
  loadStaffGroup$: Observable<Action> = this.actions$
    .ofType<LoadStaffGroup>(WorkflowAlternatesActionTypes.LOAD_STAFF_GROUP)
    .pipe(
      switchMap(() => {
        return this.apiService
          .read(constants.WORKFLOW_MAP_ALt_URLs.staffGroup)
          .pipe(
            map((data: any) => {
              const staffGroup = this.utilService.transformToSelectDataList(data.Results, "id", "description");
              if (data.Success) {
                return new LoadStaffGroupSuccess(<ISelectOption[]>(
                  staffGroup
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
}
