import { ActionReducerMap } from "@ngrx/store";

import { ILookupState } from "./root.state";
// import {
//   businessTypeReducer, staffCategoryReducer, documentTagsReducer, educationalCoursesReducer, educationGradeReducer, educationalInstitutionReducer,
//   qualificationReducer, employeeStatusReducer, professionalAwardsReducer, religionReducer, cityReducer, stateReducer, nationalityReducer, lgaReducer,
//   qualificationCategoryReducer,
// } from "../../store";

import { businessTypeReducer } from "../../store/business-type/business-type.reducers";
import { staffCategoryReducer } from "../../store/staff-categories/staff-categories.reducers";
import { documentTagsReducer, } from "../../store/document-tags/document-tags.reducers";
import { educationalCoursesReducer, } from "../../store/educational-courses/educational-courses.reducers";
import { educationGradeReducer, } from "../../store/educational-grade/educational-grade.reducers";
import { educationalInstitutionReducer, } from "../../store/educational-institution/educational-institution.reducers";
import { qualificationReducer, } from "../../store/qualifications/qualifications.reducers";
import { employeeStatusReducer, } from "../../store/employee-status/employee-status.reducers";
import { professionalAwardsReducer, } from "../../store/professional-awards/professional-awards.reducers";
import { religionReducer, } from "../../store/religions/religions.reducers";
import { cityReducer, } from "../../store/locations/city/city.reducers";
import { stateReducer, } from "../../store/locations/state/state.reducers";
import { nationalityReducer, } from "../../store/locations/nationality/nationality.reducers";
import { lgaReducer } from "../../store/locations/lga/lga.reducers";
import { qualificationCategoryReducer } from "../../store/qualification-category/qualification-category.reducers";
import { departmentReducer } from "../department";
import { facultyReducer } from "../faculty";


export const lookupReducer: ActionReducerMap<ILookupState> = {
  businessType:businessTypeReducer,
  documentTags:documentTagsReducer,
  educationalCourses:educationalCoursesReducer,
  educationGrades:educationGradeReducer,
  educationalInstitution:educationalInstitutionReducer,
  qualification:qualificationReducer,
  qualificationCategory: qualificationCategoryReducer,
  employeeStatus:employeeStatusReducer,
  professionalAward:professionalAwardsReducer,
  religion:religionReducer,
  staffCategory: staffCategoryReducer,
  lga:lgaReducer,
  city: cityReducer,
  state: stateReducer,
  nationality: nationalityReducer,
  department:departmentReducer,
  faculty:facultyReducer
};
