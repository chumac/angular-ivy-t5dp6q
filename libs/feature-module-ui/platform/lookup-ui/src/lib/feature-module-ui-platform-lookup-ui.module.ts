import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { IgxGridModule } from 'igniteui-angular';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxLookupModule } from 'devextreme-angular/ui/lookup';
import { DxListModule } from 'devextreme-angular/ui/list';
import { SharedAppGlobalModule } from '@nutela/shared/app-global';
import { SharedUiModule } from '@nutela/shared/ui';
import { lookupReducer, lookupEffects } from './store/root';


import { NationalityComponent } from './components/nationality/nationality.component';
import { BusinessTypeComponent } from './components/business-type/business-type.component';
import { DocumentTagsComponent } from './components/document-tags/document-tags.component';
import { EducationGradesComponent } from './components/education-grades/education-grades.component';
import { QualificationsComponent } from './components/qualifications/qualifications.component';
import { EducationalCoursesComponent } from './components/educational-courses/educational-courses.component';
import { EducationalInstitutionsComponent } from './components/educational-institutions/educational-institutions.component';
import { EmploymentStatusComponent } from './components/employment-status/employment-status.component';
import { QualificationCategoriesComponent } from './components/qualification-categories/qualification-categories.component';
import { ReligionsComponent } from './components/religions/religions.component';
import { ProfessionalAwardsComponent } from './components/professional-awards/professional-awards.component';
import { StaffCategoriesComponent } from './components/staff-categories/staff-categories.component';
import { BusinessTypeEditorComponent } from './components/business-type/business-type-editor/business-type-editor.component';
import { DocumentTagsEditorComponent } from './components/document-tags/document-tags-editor/document-tags-editor.component';
import { EducationGradesEditorComponent } from './components/education-grades/education-grades-editor/education-grades-editor.component';
import { EducationalCoursesEditorComponent } from './components/educational-courses/educational-courses-editor/educational-courses-editor.component';
import { EducationalInstitutionsEditorComponent } from './components/educational-institutions/educational-institutions-editor/educational-institutions-editor.component';
import { EmploymentStatusEditorComponent } from './components/employment-status/employment-status-editor/employment-status-editor.component';
import { ProfesionalAwardsEditorComponent } from './components/professional-awards/profesional-awards-editor/profesional-awards-editor.component';
import { QualificationCategoriesEditorComponent } from './components/qualification-categories/qualification-categories-editor/qualification-categories-editor.component';
import { ReligionsEditorComponent } from './components/religions/religions-editor/religions-editor.component';
import { StaffCategoriesEditorComponent } from './components/staff-categories/staff-categories-editor/staff-categories-editor.component';
import { StateComponent } from './components/state/state.component';
import { CityComponent } from './components/city/city.component';
import { LgaComponent } from './components/lga/lga.component';
import { NationalityEditorComponent } from './components/nationality/nationality-editor/nationality-editor.component';
import { StateEditorComponent } from './components/state/state-editor/state-editor.component';
import { CityEditorComponent } from './components/city/city-editor/city-editor.component';
import { LgaEditorComponent } from './components/lga/lga-editor/lga-editor.component';
import { QualificationsEditorComponent } from './components/qualifications/qualifications-editor/qualifications-editor.component';
import { PermittedGuard } from '@nutela/core';
import { DepartmentComponent } from './components/department/department.component';
import { DepartmentEditorComponent } from './components/department/department-editor/department-editor.component';
import { FacultyComponent } from './components/faculty/faculty.component';
import { FacultyEditorComponent } from './components/faculty/faculty-editor/faculty-editor.component';

const routes: Routes = [
  {
    path: 'admin', data: { role: 'HR_DATA_ADMINISTRATION', breadcrumb: 'HR Admin' }, canActivateChild: [PermittedGuard],
    children: [
      { path: '', redirectTo: 'nationalities', pathMatch: 'full' },
      { path: 'nationalities', component: NationalityComponent, data: { state: 'nationalities', breadcrumb: 'Nationalities' } },
      { path: 'countries', component: NationalityComponent, data: { state: 'countries', breadcrumb: 'Countries' }},
      { path: 'states', component: StateComponent, data: { state: 'states', breadcrumb: 'States' }},
      { path: 'cities', component: CityComponent, data: { state: 'cities', breadcrumb: 'Cities' }},
      { path: 'lgas', component: LgaComponent, data: { state: 'lgas', role: 'HR_FOUNDATIONS', breadcrumb: 'Local Government Areas' }},

      { path: 'business-types', component: BusinessTypeComponent, data: { state: 'business-types', breadcrumb: 'Business Types' }},
      { path: 'document-tags', component: DocumentTagsComponent, data: { state: 'document-tags', breadcrumb: 'Document Tags' }},
      { path: 'educational-grades', component: EducationGradesComponent, data: { state: 'educational-grades', breadcrumb: 'Educational Grades' }},
      { path: 'educational-courses', component: EducationalCoursesComponent, data: { state: 'educational-courses', breadcrumb: 'Educational Courses' }},
      { path: 'educational-institutions', component: EducationalInstitutionsComponent, data: { state: 'educational-institutions', breadcrumb: 'Educational Institutions' }},
      { path: 'employment-status', component: EmploymentStatusComponent, data: { state: 'employment-status', breadcrumb: 'Employment Status' }},
      { path: 'qualification-categories', component: QualificationCategoriesComponent, data: { state: 'qualification-categories', breadcrumb: 'Qualification Categories' }},
      { path: 'qualifications', component: QualificationsComponent, data: { state: 'qualifications', breadcrumb: 'Qualifications' }},
      { path: 'religion', component: ReligionsComponent, data: { state: 'religion', breadcrumb: 'Religions' }},
      { path: 'professional-awards', component: ProfessionalAwardsComponent, data: { state: 'professional-awards', breadcrumb: 'Professional Awards' }},
      { path: 'staff-categories', component: StaffCategoriesComponent, data: { state: 'Staff-categories', breadcrumb: 'Staff Categories' }},
      { path: 'department', component: DepartmentComponent, data: { state: 'department', breadcrumb: 'Departments' }},
      { path: 'faculty', component: FacultyComponent, data: { state: 'faculty', breadcrumb: 'Faculties'}}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedUiModule,
    SharedAppGlobalModule,
    MDBBootstrapModulesPro,
    IgxGridModule,
    DxDateBoxModule,
    DxLookupModule,
    DxListModule,
    StoreModule.forFeature('hr-lookup', lookupReducer),
    EffectsModule.forRoot(lookupEffects),
    RouterModule.forChild(routes)
  ],
  declarations: [
    NationalityComponent,
    BusinessTypeComponent,
    DocumentTagsComponent,
    EducationGradesComponent,
    QualificationsComponent,
    EducationalCoursesComponent,
    EducationalInstitutionsComponent,
    EmploymentStatusComponent,
    QualificationCategoriesComponent,
    ReligionsComponent,
    ProfessionalAwardsComponent,
    StaffCategoriesComponent,
    BusinessTypeEditorComponent,
    DocumentTagsEditorComponent,
    EducationGradesEditorComponent,
    EducationalCoursesEditorComponent,
    EducationalInstitutionsEditorComponent,
    EmploymentStatusEditorComponent,
    ProfesionalAwardsEditorComponent,
    QualificationCategoriesEditorComponent,
    ReligionsEditorComponent,
    StaffCategoriesEditorComponent,
    StateComponent,
    CityComponent,
    LgaComponent,
    NationalityEditorComponent,
    StateEditorComponent,
    CityEditorComponent,
    LgaEditorComponent,
    QualificationsEditorComponent,
    DepartmentComponent,
    DepartmentEditorComponent,
    FacultyComponent,
    FacultyEditorComponent,

  ]
})
export class FeatureModuleUiPlatformLookupUiModule {}











// { path: '', redirectTo: 'nationalities', pathMatch: 'full' },
//       { path: 'nationalities', component: NationalityComponent, data: { state: 'nationalities', role: 'HR_FOUNDATIONS' } },
//       { path: 'countries', component:NationalityComponent, data:{state:'countries', role: 'HR_FOUNDATIONS' }},
//       { path: 'states', component:StateComponent, data:{state:'states', role: 'HR_FOUNDATIONS' }},
//       { path: 'cities', component:CityComponent, data:{state:'cities', role: 'HR_FOUNDATIONS' }},
//       { path: 'lgas', component:LgaComponent, data:{state:'lgas', role: 'HR_FOUNDATIONS' }},

//       { path: 'business-types', component:BusinessTypeComponent, data:{state:'business-types', role: 'HR_FOUNDATIONS' }},
//       { path: 'document-tags', component:DocumentTagsComponent, data:{state:'document-tags', role: 'HR_FOUNDATIONS' }},
//       { path: 'educational-grades', component:EducationGradesComponent, data:{state:'educational-grades', role: 'HR_FOUNDATIONS' }},
//       { path: 'educational-courses', component:EducationalCoursesComponent, data:{state:'educational-courses', role: 'HR_FOUNDATIONS' }},
//       { path: 'educational-institutions', component:EducationalInstitutionsComponent, data:{state:'educational-institutions', role: 'HR_FOUNDATIONS' }},
//       { path: 'employment-status', component:EmploymentStatusComponent, data:{state:'employment-status', role: 'HR_FOUNDATIONS' }},
//       { path: 'qualification-categories', component:QualificationCategoriesComponent, data:{state:'qualification-categories', role: 'HR_FOUNDATIONS' }},
//       { path: 'qualifications', component:QualificationsComponent, data:{state:'qualifications', role: 'HR_FOUNDATIONS' }},
//       { path: 'religion', component:ReligionsComponent, data:{state:'religion', role: 'HR_FOUNDATIONS' }},
//       { path: 'professional-awards', component:ProfessionalAwardsComponent, data:{state:'professional-awards', role: 'HR_FOUNDATIONS' }},
//       { path: 'staff-categories', component:StaffCategoriesComponent, data:{state:'Staff-categories', role: 'HR_FOUNDATIONS' }},
