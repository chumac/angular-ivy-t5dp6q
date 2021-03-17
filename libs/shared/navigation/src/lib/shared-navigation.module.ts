import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

import { FlexLayoutModule } from '@angular/flex-layout';

// For MDB Angular Pro
import {
  SidenavModule,
  WavesModule,
  AccordionModule
} from 'ng-uikit-pro-standard';

import { SharedAppGlobalModule } from '@nutela/shared/app-global';

import { SelfServiceNavigationComponent } from './components/self-service-navigation/self-service-navigation.component';
import { EmployeeProfileNavigationComponent } from './components/employee-profile-navigation/employee-profile-navigation.component';
import { SeparationNavigationComponent } from './components/separation-navigation/separation-navigation.component';
import { AbsenceNavigationComponent } from './components/absence-navigation/absence-navigation.component';
import { PerformanceNavigationComponent } from './components/performance-navigation/performance-navigation.component';
import { LearningNavigationComponent } from './components/learning-navigation/learning-navigation.component';
import { CompetencyNavigationComponent } from './components/competency-navigation/competency-navigation.component';
import { RecruitNavigationComponent } from './components/recruit-navigation/recruit-navigation.component';
import { PaymentsNavigationComponent } from './components/payments-navigation/payments-navigation.component';
import { RootNavigationComponent } from './components/root-navigation/root-navigation.component';
import { MegaMenuContentComponent } from './components/mega-menu-content/mega-menu-content.component';
import { LoanNavigationComponent } from './components/loan-navigation/loan-navigation.component';
import { LookupNavigationComponent } from './components/lookup-navigation/lookup-navigation.component';
import { MedicalNavigationComponent } from './components/medical-navigation/medical-navigation.component';
import { EnterpriseStructureNavigationComponent } from './components/enterprise-structure-navigation/enterprise-structure-navigation.component';
import { SubscriptionNavigationComponent } from './components/subscription-navigation/subscription-navigation.component';
import { HrFoundationsNavigationComponent } from './components/hr-foundations-navigation/hr-foundations-navigation.component';
import { ProvisioningNavigationComponent } from './components/provisioning-navigation/provisioning-navigation.component';
import { WipNavigationComponent } from './components/wip-navigation/wip-navigation.component';
import { ExitNavigationComponent } from './components/exit-navigation/exit-navigation.component';
import { PayrollNavigationComponent } from './components/payroll-navigation/payroll-navigation.component';
import { CustomProcessNavigationComponent } from './components/custom-process-navigation/custom-process-navigation.component';

const components = [
  RootNavigationComponent,
  MegaMenuContentComponent,
  SelfServiceNavigationComponent,
  EmployeeProfileNavigationComponent,
  CustomProcessNavigationComponent,
  SeparationNavigationComponent,
  AbsenceNavigationComponent,
  PerformanceNavigationComponent,
  LearningNavigationComponent,
  CompetencyNavigationComponent,
  RecruitNavigationComponent,
  PayrollNavigationComponent,
  PaymentsNavigationComponent,
  LoanNavigationComponent,
  LookupNavigationComponent,
  MedicalNavigationComponent,
  EnterpriseStructureNavigationComponent,
  SubscriptionNavigationComponent,
  HrFoundationsNavigationComponent,
  ProvisioningNavigationComponent,
  ExitNavigationComponent,
  WipNavigationComponent,
  RootNavigationComponent,
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MDBBootstrapModulesPro.forRoot(),
    SidenavModule,
    WavesModule,
    AccordionModule,
    SharedAppGlobalModule
  ],
  declarations: components,
  exports: components
})
export class SharedNavigationModule {}
