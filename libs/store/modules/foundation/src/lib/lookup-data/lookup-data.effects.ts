import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable, from } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

import { ApiService, UtilService } from '@nutela/core-services';
import * as constants from '@nutela/shared/app-global';

import {
  LookupDataActionTypes,
  LookupDataLoadSuccess,
  LookupDataLoadFailure,
  LoadInstitutions,
  LoadInstitutionsSuccess,
  LoadInstitutionsFailure,
  LoadCourses,
  LoadCoursesSuccess,
  LoadCoursesFailure,
  LoadLeaveTypesSuccess,
  LoadLeaveTypes,
  LoadLeaveTypesFailure,
  LoadActivePersonnel,
  LoadActivePersonnelSuccess,
  LoadActivePersonnelFailure,
  LoadHourlyLeaveTypes,
  LoadHourlyLeaveTypesSuccess,
  LoadHourlyLeaveTypesFailure,
  LoadPerformancePlans,
  LoadPerformancePlansSuccess,
  LoadCurrentPerformancePlans,
  LoadCurrentPerformancePlansSuccess,
  LoadOrgData,
  LoadFaculties,
  LoadFacultiesSuccess,
  LoadFacultiesFailure,
  LoadDepartments,
  LoadDepartmentsSuccess,
  LoadOrganisations,
  LoadOrganisationsSuccess,
  LoadOrganisationsFailure,
  LoadProfessionalQualificationsSuccess,
  LoadActivePersonnelHR,
  LoadActivePersonnelHRSuccess,
  LoadProjects,
  LoadProjectsFailure,
  LoadCostCentersFailure,
  LoadWorkHourTypesFailure,
  LoadWorkHourTypes,
  LoadCountries,
  LoadCountriesSuccess,
  LoadDailyLeaveTypes,
  LoadDailyLeaveTypesSuccess,
  LoadDailyLeaveTypesFailure,
  LoadProfessionalInstitutions,
  LoadProfessionalInstitutionsSuccess
} from './lookup-data.actions';
import { ILookupData, ISelectOptionData, IOrganization } from '@nutela/models/common';
import { SelectOptionDataLoad, SelectOptionDataLoadInstitutions, SelectOptionDataLoadCourses, SelectOptionDataLoadLeaveTypes, SelectOptionDataLoadActivePersonnel, SelectOptionDataLoadHourlyLeaveTypes, SelectOptionDataLoadPerformancePlans, SelectOptionDataLoadCurrentPerformancePlans, SelectOptionDataLoadFaculties, SelectOptionDataLoadDepartments, SelectOptionDataLoadOrganisations, SelectOptionDataLoadProfessionalQualifications, SelectOptionDataLoadActivePersonnelHR, SelectOptionDataLoadCostCenters, SelectOptionDataLoadWorkHourTypes, SelectOptionDataLoadProjects, SelectOptionDataLoadCountries, SelectOptionDataLoadDailyLeaveTypes, SelectOptionDataLoadProfessionalInstitutions } from '../select-option-data';
import {
  ISelectOption,
  INationalitySelectOption,
  IBasicData
} from '@nutela/models/core-data';
import { IInstitution, ICourse } from '@nutela/models/talent/learning';
import { ILeaveType } from '@nutela/models/workforce/leave';
import { IPersonal, IBasicOrganisation } from '@nutela/models/workforce/employee-profiles';
import { IPlan } from '@nutela/models/talent/performance';
import { LoadCostCenters } from 'libs/feature-module-ui/platform/provisioning-ui/src/lib/store/new-employee';
import { INationality } from '@nutela/models/platform/lookup';

@Injectable()
export class LookupDataEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private utilservice: UtilService
  ) {}

  @Effect()
  loadData$: Observable<Action> = this.actions$.pipe(
    ofType(LookupDataActionTypes.LOAD),
    switchMap(() =>
      this.apiService.read(constants.LOOKUP_DATA_URLs.getData).pipe(
        switchMap(data => {
          let val = <ILookupData>data.Results[0];
          val.id = constants.GENERAL.defaultEntityId;
          return from([
            new LoadOrgData(val.OrgInfo),
            // new LoadFaculties(),
            // new LoadDepartments(),
            // new LoadCountries(),
            // new LoadOrganisations(),
            new LookupDataLoadSuccess({ lookupData: val }),
            new SelectOptionDataLoad({
              selectOptionData: this.getSelectOptionData(val)
            })
          ]);
        }),
        catchError((error: any) => of(new LookupDataLoadFailure(error)))
      )
    )
  );

  @Effect()
  loadInstitutions$: Observable<Action> = this.actions$.pipe(
    ofType<LoadInstitutions>(LookupDataActionTypes.LOAD_INSTITUTIONS),
    switchMap(() =>
      this.apiService.read(constants.INSTITUTION_URLs.list).pipe(
        switchMap(data => {
          let resultset = <IInstitution[]>data.Results;
          let institutions =  resultset.filter((result) => {
              return result.institution_type === 1;
          });

          let professionalQualifications = resultset.filter((result) => {
              return result.institution_type === 0;
          });

          return from([
            new LoadInstitutionsSuccess({ institutions: institutions }),
            new LoadProfessionalQualificationsSuccess({ professionalQualifications: professionalQualifications }),
            new SelectOptionDataLoadInstitutions({
              institutions: this.utilservice.transformToSelectDataList(institutions, 'institution_id', 'description')
            }),
            new SelectOptionDataLoadProfessionalQualifications({
              professionalQualifications: this.utilservice.transformToSelectDataList(professionalQualifications, 'institution_id', 'description')
            }),
          ]);
        }),
        catchError((error: any) => of(new LoadInstitutionsFailure(error)))
      )
    )
  );

  @Effect()
  loadProfessionalInstitutions$: Observable<Action> = this.actions$.pipe(
    ofType<LoadProfessionalInstitutions>(LookupDataActionTypes.LOAD_PROFESSIONAL_INSTITUTIONS),
    switchMap(() =>
      this.apiService.read(constants.PROFESSIONAL_INSTITUTIONS_URLs.list).pipe(
        switchMap(data => {
          let professionalInstitution = <IInstitution[]>data.Results;
          return from([
            new LoadProfessionalInstitutionsSuccess({ professionalInstitution: professionalInstitution }),
            new SelectOptionDataLoadProfessionalInstitutions({
              professionalInstitutions: this.utilservice.transformToSelectDataList(professionalInstitution, 'qualification_id', 'description')
            })
          ]);
        }),
        catchError((error: any) => of(new LoadFacultiesFailure(error)))
      )
    )
  );

  @Effect()
  loadFaculties$: Observable<Action> = this.actions$.pipe(
    ofType<LoadFaculties>(LookupDataActionTypes.LOAD_FACULTIES),
    switchMap(() =>
      this.apiService.read(constants.FACULTY_URLs.list).pipe(
        switchMap(data => {
          let faculties = <IBasicData[]>data.Results;
          return from([
            new LoadFacultiesSuccess({ faculties: faculties }),
            new SelectOptionDataLoadFaculties({
              faculties: this.utilservice.transformToSelectDataList(faculties, 'description', 'description')
            })
          ]);
        }),
        catchError((error: any) => of(new LoadFacultiesFailure(error)))
      )
    )
  );

  @Effect()
  loadDepartments$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDepartments>(LookupDataActionTypes.LOAD_DEPARTMENTS),
    switchMap(() =>
      this.apiService.read(constants.DEPARTMENT_URLs.list).pipe(
        switchMap(data => {
          let departments = <IBasicData[]>data.Results;

          return from([
            new LoadDepartmentsSuccess({ departments: departments }),
            new SelectOptionDataLoadDepartments({
              departments: this.utilservice.transformToSelectDataList(departments, 'description', 'description')
            })
          ]);
        }),
        catchError((error: any) => of(new LoadInstitutionsFailure(error)))
      )
    )
  );

  @Effect()
  loadCountries$: Observable<Action> = this.actions$.pipe(
    ofType<LoadCountries>(LookupDataActionTypes.LOAD_COUNTRIES),
    switchMap(() =>
      this.apiService.read(constants.COUNTRY_URLs.list).pipe(
        switchMap(data => {
          let countries = <INationality[]>data.Results;
          return from([
            new LoadCountriesSuccess({ countries: countries }),
            new SelectOptionDataLoadCountries({
              countries: this.utilservice.transformToSelectDataList(countries, 'nationality_id', 'description')
            })
          ]);
        }),
        catchError((error: any) => of(new LoadFacultiesFailure(error)))
      )
    )
  );

  @Effect()
  loadOrganisations$: Observable<Action> = this.actions$.pipe(
    ofType<LoadOrganisations>(LookupDataActionTypes.LOAD_ORGANISATIONS),
    switchMap(() =>
      this.apiService.read(constants.ORGANISATION_URLs.list).pipe(
        switchMap(data => {
          let organisations = <IBasicOrganisation[]>data.Results;

          return from([
            new LoadOrganisationsSuccess({ organisations: organisations }),
            new SelectOptionDataLoadOrganisations({
              organisations: organisations
            })
          ]);
        }),
        catchError((error: any) => of(new LoadOrganisationsFailure(error)))
      )
    )
  );

  @Effect()
  loadCourses$: Observable<Action> = this.actions$.pipe(
    ofType<LoadCourses>(LookupDataActionTypes.LOAD_COURSES),
    switchMap(() =>
      this.apiService.read(constants.COURSE_URLs.list).pipe(
        switchMap(data => {
          let courses = <ICourse[]>data.Results;

          return from([
            new LoadCoursesSuccess({ courses: courses }),
            new SelectOptionDataLoadCourses({
              courses: this.utilservice.transformToSelectDataList(courses, 'course_id', 'description')
            })
          ]);
        }),
        catchError((error: any) => of(new LoadCoursesFailure(error)))
      )
    )
  );

  @Effect()
  loadLeaveTypes$: Observable<Action> = this.actions$.pipe(
    ofType<LoadLeaveTypes>(LookupDataActionTypes.LOAD_LEAVE_TYPES),
    switchMap(() =>
      this.apiService.read(constants.LEAVE_URLs.getDailyLeaveTypes).pipe(
        switchMap(data => {
          let leaveTypes = <ILeaveType[]>data.Results;

          return from([
            new LoadLeaveTypesSuccess({ leaveTypes: leaveTypes }),
            new SelectOptionDataLoadLeaveTypes({
              leaveTypes: this.utilservice.transformToSelectDataList(leaveTypes, 'leave_id', 'description')
            })
          ]);
        }),
        catchError((error: any) => of(new LoadLeaveTypesFailure(error)))
      )
    )
  );

  @Effect()
  loadHourlyLeaveTypes$: Observable<Action> = this.actions$.pipe(
    ofType<LoadHourlyLeaveTypes>(LookupDataActionTypes.LOAD_HOURLY_LEAVE_TYPES),
    switchMap(() =>
      this.apiService.read(constants.LEAVE_URLs.getHourlyLeaveTypes).pipe(
        switchMap(data => {
          let leaveTypes = <ILeaveType[]>data.Results;

          return from([
            new LoadHourlyLeaveTypesSuccess({ leaveTypes: leaveTypes }),
            new SelectOptionDataLoadHourlyLeaveTypes({
              leaveTypes: this.utilservice.transformToSelectDataList(leaveTypes, 'leave_id', 'description')
            })
          ]);
        }),
        catchError((error: any) => of(new LoadHourlyLeaveTypesFailure(error)))
      )
    )
  );

  @Effect()
  loadDailyLeaveTypes$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDailyLeaveTypes>(LookupDataActionTypes.LOAD_DAILY_LEAVE_TYPES),
    switchMap(() =>
      this.apiService.read(constants.LEAVE_URLs.getDailyLeaveTypes).pipe(
        switchMap(data => {
          let leaveTypes = <ILeaveType[]>data.Results;

          return from([
            new LoadDailyLeaveTypesSuccess({ dailyLeaveTypes: leaveTypes }),
            new SelectOptionDataLoadDailyLeaveTypes({
              dailyLeaveTypes: this.utilservice.transformToSelectDataList(leaveTypes, 'leave_id', 'description')
            })
          ]);
        }),
        catchError((error: any) => of(new LoadDailyLeaveTypesFailure(error)))
      )
    )
  );

  @Effect()
  loadActivePersonnel$: Observable<Action> = this.actions$.pipe(
    ofType<LoadActivePersonnel>(LookupDataActionTypes.LOAD_ACTIVE_PERSONNEL),
    switchMap(() =>
      this.apiService.read(constants.PERSONNEL_URLs.getActivePersonnel).pipe(
        switchMap(data => {
          let activePersonnel = <IPersonal[]>data.Results;
          return from([
            new LoadActivePersonnelSuccess({ activePersonnel: activePersonnel }),
            new SelectOptionDataLoadActivePersonnel({

              activePersonnel: this.utilservice.transformToSelectDataList(activePersonnel, 'employee_id', 'emp_fullname')
            })
          ]);
        }),
        catchError((error: any) => of(new LoadActivePersonnelFailure(error)))
      )
    )
  );

  @Effect()
  loadActivePersonnelHR$: Observable<Action> = this.actions$.pipe(
    ofType<LoadActivePersonnelHR>(LookupDataActionTypes.LOAD_HR_ACTIVE_PERSONNEL),
    switchMap(() =>
      this.apiService.read(constants.PERSONNEL_URLs.getActivePersonnelHR).pipe(
        switchMap(data => {
          let activePersonnelHR = <IPersonal[]>data.Results;
          return from([
            new LoadActivePersonnelHRSuccess({ activePersonnelHR: activePersonnelHR }),
            new SelectOptionDataLoadActivePersonnelHR({

              activePersonnelHR: this.utilservice.transformToSelectDataList(activePersonnelHR, 'employee_id', 'emp_fullname')
            })
          ]);
        }),
        catchError((error: any) => of(new LoadActivePersonnelFailure(error)))
      )
    )
  );

@Effect()
loadPerformancePlans$: Observable<Action> = this.actions$.pipe(
  ofType<LoadPerformancePlans>(LookupDataActionTypes.LOAD_PERFORMANCE_PLANS),
  switchMap(() =>
    this.apiService.read(constants.PERFORMANCE_URLs.getPlans).pipe(
      switchMap(data => {
        let plans = <IPlan[]>data.Results;

        return from([
          new LoadPerformancePlansSuccess({ plans: plans }),
          new SelectOptionDataLoadPerformancePlans({
            plans: this.utilservice.transformToSelectDataList(plans, 'id', 'description')
          })
        ]);
      }),
      catchError((error: any) => of(new LoadLeaveTypesFailure(error)))
    )
  ));


@Effect()
loadCurrentPerformancePlan$: Observable<Action> = this.actions$.pipe(
  ofType<LoadCurrentPerformancePlans>(LookupDataActionTypes.LOAD_CURRENT_PERFORMANCE_PLANS),
  switchMap(() =>
    this.apiService.read(constants.PERFORMANCE_URLs.getCurrentPlan).pipe(
      switchMap(data => {
        let plans = <IPlan[]>data.Results;

        return from([
          new LoadCurrentPerformancePlansSuccess({ plans: plans }),
          new SelectOptionDataLoadCurrentPerformancePlans({
            plans: this.utilservice.transformToSelectDataList(plans, 'id', 'description')
          })
        ]);
      }),
      catchError((error: any) => of(new LoadLeaveTypesFailure(error)))
    )
  ));

@Effect()
loadProjects$: Observable<Action> = this.actions$.pipe(
  ofType<LoadProjects>(LookupDataActionTypes.LOAD_PROJECTS),
  switchMap(() =>
    this.apiService.read(constants.PROJECT_URLs.list).pipe(
      switchMap(data => {
        let projects = <IBasicData[]>data.Results;

        return from([
          new SelectOptionDataLoadProjects({
            projects: this.utilservice.transformToSelectDataList(projects, 'id', 'description')
          })
        ]);
      }),
      catchError((error: any) => of(new LoadProjectsFailure(error)))
    )
  )
);

@Effect()
loadCostCenters$: Observable<Action> = this.actions$.pipe(
  ofType<LoadCostCenters>(LookupDataActionTypes.LOAD_COST_CENTERS),
  switchMap(() =>
    this.apiService.read(`${constants.COST_CENTER_URLs.list}/0`).pipe(
      switchMap(data => {
        let costCenters = <IBasicData[]>data.Results;

        return from([
          new SelectOptionDataLoadCostCenters({
            costCenters: this.utilservice.transformToSelectDataList(costCenters, 'id', 'description')
          })
        ]);
      }),
      catchError((error: any) => of(new LoadCostCentersFailure(error)))
    )
  )
);

// @Effect()
// loadWorkHourTypes$: Observable<Action> = this.actions$.pipe(
//   ofType<LoadWorkHourTypes>(LookupDataActionTypes.LOAD_WORK_HOUR_TYPES),
//   map(action => action.payload),
//   switchMap((payload) =>
//     this.apiService.read(`${constants.WORK_HOUR_TYPE_URLs.list}?tms_date=${payload}`).pipe(
//       switchMap(data => {
//         let workHourTypes = <IBasicData[]>data.Results;
//         console.log(workHourTypes);
//         console.log(`${constants.WORK_HOUR_TYPE_URLs.list}?tms_date=${payload}`);

//         return from([
//           new SelectOptionDataLoadWorkHourTypes({
//             workHourTypes: this.utilservice.transformToSelectDataList(workHourTypes, 'id', 'description')
//           })
//         ]);
//       }),
//       catchError((error: any) => of(new LoadWorkHourTypesFailure(error)))
//     )
//   )
// );

  getSelectOptionData(data: ILookupData): ISelectOptionData {
  return {
      id: constants.GENERAL.defaultEntityId,
      Titles: this.utilservice.transformToSelectDataList(data.Titles),
      MaritalStatus: this.utilservice.transformToSelectDataList(
        data.MaritalStatus
      ),
      Nationality: null, //this.deepTransformToSelectDataList(data.Nationality),
      Gender: this.utilservice.transformToSelectDataList(data.Gender),
      Banks: this.utilservice.transformToSelectDataList(data.BankList, 'bank_id', 'description'),
      BusinessType: this.utilservice.transformToSelectDataList(
        data.BusinessType,
        'biztype_id',
        'description'
      ),
      Religion: this.utilservice.transformToSelectDataList(
        data.Religion,
        'religion_id',
        'description'
      ),
      RelationshipType: this.utilservice.transformToSelectDataList(
        data.RelationshipType),
      BeneficiaryRelationshipTypes: this.utilservice.transformToSelectDataList(
        data.BeneficiaryRelationshipTypes,
        'requirement_type',
        'description'
      ),
      RequirementTypeEducationalLevels: this.utilservice.transformToSelectDataList(
        data.RequirementTypeEducationalLevels,
        'requirement_type',
        'description'
      ),
      RequirementTypeQualificationLevels: this.utilservice.transformToSelectDataList(
        data.RequirementTypeQualificationLevels,
        'requirement_type',
        'description'
      ),
      RequirementTypeGuarantorLevels: this.utilservice.transformToSelectDataList(
        data.RequirementTypeGuarantorLevels,
        'requirement_type',
        'description'
      ),
      RequirementTypeFamilyRelationshipLevels: this.utilservice.transformToSelectDataList(
        data.RequirementTypeFamilyRelationshipLevels,
        'requirement_type',
        'description'
      ),
      RequirementTypeEmployerLevels: this.utilservice.transformToSelectDataList(
        data.RequirementTypeEmployerLevels,
        'requirement_type',
        'description'
      ),
      DependantRelationshipTypes: this.utilservice.transformToSelectDataList(
        data.DependantRelationshipTypes,
        'dependent_type',
        'description'
      ),
      RequirementTypeRefereeLevels: this.utilservice.transformToSelectDataList(
        data.RequirementTypeRefereeLevels,
        'requirement_type',
        'description'
      ),
      PFA: this.utilservice.transformToSelectDataList(
        data.PFA,
        'pfa_id',
        'description'
      ),
      WorkflowEntityList: this.utilservice.transformToSelectDataList(
        data.WorkflowEntityList,
        'entity_id',
        'entitydescription'
      ),
      WorkflowEntitySourceNameMapList: this.utilservice.transformToSelectDataList(
        data.WorkflowEntityList,
        'sourcename_map',
        'entitydescription'
      ),
      EducationalGrades: this.utilservice.transformToSelectDataList(
        data.EducationGradeList,
        'edugrade_id',
        'description'
      ),
      Qualifications: this.utilservice.transformToSelectDataList(
        data.QualificationList,
        'qualification_id',
        'description'
      ),
      ProfessionalAwards: this.utilservice.transformToSelectDataList(
        data.ProAwardList,
        'proaward_id',
        'description'
      )
    };
  }

  deepTransformToSelectDataList(list: any): ISelectOption[] {
    let param = this.utilservice.getNationalityDeepTransformParameters();
    param.list = list;

    const tempList: INationalitySelectOption[] = this.utilservice.deepTransformToSelectDataList(
      param
    );

    return <INationalitySelectOption[]>tempList;
  }
}
