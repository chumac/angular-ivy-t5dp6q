
import { BusinessTypeEffects } from "../../store/business-type/business-type.effects";
import { StaffCategoryEffects } from "../../store/staff-categories/staff-categories.effects";
import { DocumentTagsEffects, } from "../../store/document-tags/document-tags.effects";
import { EducationalCoursesEffects, } from "../../store/educational-courses/educational-courses.effects";
import { EducationalGradesEffects, } from "../../store/educational-grade/educational-grade.effects";
import { EducationalInstitutionEffects, } from "../../store/educational-institution/educational-institution.effects";
import { QualificationEffects, } from "../../store/qualifications/qualifications.effects";
import { EmployeeStatusEffects, } from "../../store/employee-status/employee-status.effects";
import { ProfessionalAwardsEffects, } from "../../store/professional-awards/professional-awards.effects";
import { ReligionsEffects, } from "../../store/religions/religions.effects";
import { CityEffects, } from "../../store/locations/city/city.effects";
import { StateEffects, } from "../../store/locations/state/state.effects";
import { NationalityEffects, } from "../../store/locations/nationality/nationality.effects";
import { LgaEffects } from "../../store/locations/lga/lga.effects";
import { QualificationCategoryEffects } from "../../store/qualification-category/qualification-category.effects";
import { DepartmentEffects } from "../department";
import { FacultyEffects } from "../faculty";



export const lookupEffects = [
  BusinessTypeEffects, DocumentTagsEffects, EducationalCoursesEffects,EducationalGradesEffects, EducationalInstitutionEffects,
  QualificationEffects, EmployeeStatusEffects, ProfessionalAwardsEffects, ReligionsEffects,
  StaffCategoryEffects, CityEffects, StateEffects, NationalityEffects, LgaEffects,QualificationCategoryEffects,
  DepartmentEffects, FacultyEffects,
]

