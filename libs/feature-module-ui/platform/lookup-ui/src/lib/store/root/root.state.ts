
import { createFeatureSelector } from '@ngrx/store';
// import {} from '../';
import {
  IBusinessTypeState, IStaffCategoryState, IDocumentTagsState, IEducationalCoursesState, IEducationGradesState, IEducationalInstitutionState,
  IQualificationState, IEmployeeStatusState, IProfessionalAwardsState, IReligionsState, ICityState, IStateState, INationalityState, ILgaState,
  IQualificationCategoryState,
} from "../../store";
import { IDepartmentState } from '../department';
import { IFacultyState } from '../faculty';

export interface ILookupState {
  businessType: IBusinessTypeState;
  documentTags:IDocumentTagsState;
  educationalCourses: IEducationalCoursesState;
  educationGrades:IEducationGradesState;
  educationalInstitution: IEducationalInstitutionState;
  qualification: IQualificationState;
  qualificationCategory: IQualificationCategoryState;
  employeeStatus:IEmployeeStatusState;
  professionalAward:IProfessionalAwardsState;
  religion:IReligionsState;
  staffCategory:IStaffCategoryState;
  nationality: INationalityState,
  state:IStateState;
  city:ICityState;
  lga:ILgaState;
  department:IDepartmentState;
  faculty:IFacultyState;
}

export const initialState: ILookupState = {
  businessType:null,
  documentTags:null,
  educationalCourses:null,
  educationGrades:null,
  educationalInstitution:null,
  qualification:null,
  qualificationCategory:null,
  employeeStatus:null,
  professionalAward:null,
  religion:null,
  staffCategory: null,
  nationality:null,
  state:null,
  city:null,
  lga:null,
  department:null,
  faculty:null,
};

export const getRootState = createFeatureSelector<ILookupState>('hr-lookups');
