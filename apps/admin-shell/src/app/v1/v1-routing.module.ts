import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromCore from '@nutela/core';

import { AuthorizedGuard } from '@nutela/core';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: fromCore.SigninComponent },
  { path: 'authorization', component: fromCore.AuthorizationComponent },
  {
    path: 'd',
    data: { breadcrumb: { skip: true }},
    component: fromCore.AdmMasterPageComponent,
    children: [
      { path: '', redirectTo: 'workforce', pathMatch: 'full' },
      {
        path: 'analytics',
        data: { roles: ['analytics'], breadcrumb: 'Analytics' },
        loadChildren:
          '@nutela/feature-module-ui/platform/analytics-ui#FeatureModuleUiPlatformAnalyticsUiModule',
        canActivate: [AuthorizedGuard],
        canActivateChild: [AuthorizedGuard]
      },

      {
        path: 'approvals',
        data: { roles: ['approvals'], breadcrumb: 'Approvals' },
        loadChildren:
          '@nutela/feature-module-ui/approvals-ui#FeatureModuleUiApprovalsUiModule',
        canActivate: [AuthorizedGuard],
        canActivateChild: [AuthorizedGuard]
      },

      {
        path: 'workforce',
        data: {
          breadcrumb: 'Workforce'
        },
        children: [
          { path: '', redirectTo: 'employee-profiles', pathMatch: 'full' },
          {
            path: 'employee-profiles',
            data: { roles: ['employee-profiles'], breadcrumb: 'Employee Profiles' },
            loadChildren:
              '@nutela/feature-module-ui/workforce/employee-profiles-ui#FeatureModuleUiWorkforceEmployeeProfilesUiModule',
            canActivate: [AuthorizedGuard],
            canActivateChild: [AuthorizedGuard]
          },
          {
            path: 'absence',
            data: { roles: ['absence'], breadcrumb: 'Absence' },
            loadChildren:
              '@nutela/feature-module-ui/workforce/absence-ui#FeatureModuleUiWorkforceAbsenceUiModule',
            canActivate: [AuthorizedGuard],
            canActivateChild: [AuthorizedGuard]
          },
          {
            path: 'benefits',
            data: { roles: ['benefits'], breadcrumb: 'Benefits' },
            loadChildren:
              '@nutela/feature-module-ui/workforce/subscription-ui#FeatureModuleUiWorkforceSubscriptionUiModule',
            canActivate: [AuthorizedGuard],
            canActivateChild: [AuthorizedGuard]
          },
          {
            path: 'time',
            data: { roles: ['time'], breadcrumb: 'Time' },
            loadChildren:
              '@nutela/feature-module-ui/workforce/time-ui#FeatureModuleUiWorkforceTimeUiModule',
            canActivate: [AuthorizedGuard],
            canActivateChild: [AuthorizedGuard]
          },
          {
            path: 'exit',
            data: { roles: ['exit'], breadcrumb: 'Exit' },
            loadChildren:
              '@nutela/feature-module-ui/workforce/exit-ui#FeatureModuleUiWorkforceExitUiModule',
            canActivate: [AuthorizedGuard],
            canActivateChild: [AuthorizedGuard]
          },
          {
            path: 'processes',
            data: { roles: ['processes'], breadcrumb: 'processes' },
            loadChildren:
              '@nutela/feature-module-ui/workforce/processes-ui#FeatureModuleUiWorkforceProcessesUiModule',
            canActivate: [AuthorizedGuard],
            canActivateChild: [AuthorizedGuard]
          }
        ]
      },
      {
        path: 'compensation',
        data: {
          breadcrumb: 'Compensation'
        },
        children: [
          { path: '', redirectTo: 'loans', pathMatch: 'full' },
          {
            path: 'loans',
            data: { roles: ['loans'], breadcrumb: 'Loans' },
            loadChildren:
              '@nutela/feature-module-ui/compensation/loans-ui#FeatureModuleUiCompensationLoansUiModule',
            canActivate: [AuthorizedGuard],
            canActivateChild: [AuthorizedGuard]
          },
          {
            path: 'payroll',
            data: { roles: ['payroll'], breadcrumb: 'Payroll' },
            loadChildren:
              '@nutela/feature-module-ui/compensation/payroll-ui#FeatureModuleUiCompensationPayrollUiModule',
            canActivate: [AuthorizedGuard],
            canActivateChild: [AuthorizedGuard]
          },
          {
            path: 'payments',
            data: { roles: ['payment'], breadcrumb: 'Payments' },
            loadChildren:
              '@nutela/feature-module-ui/compensation/payment-ui#FeatureModuleUiCompensationPaymentUiModule',
            canActivate: [AuthorizedGuard],
            canActivateChild: [AuthorizedGuard]
          }
        ]
      },

      {
        path: 'talent',
        data: { breadcrumb: 'Talent'},
        children: [
          {
            path: 'performance',
            data: { roles: ['performance'], breadcrumb: 'Performance' },
            loadChildren:
              '@nutela/feature-module-ui/talent/performance-ui#FeatureModuleUiTalentPerformanceUiModule',
            canActivate: [AuthorizedGuard],
            canActivateChild: [AuthorizedGuard]
          },
          {
            path: 'learning',
            data: { roles: ['learning'], breadcrumb: 'Learning' },
            loadChildren:
              '@nutela/feature-module-ui/talent/learning-ui#FeatureModuleUiTalentLearningUiModule',
            canActivate: [AuthorizedGuard],
            canActivateChild: [AuthorizedGuard]
          }
        ]
      },

      {
        path: 'platform',
        data: { breadcrumb: 'Platform'},
        children: [
          {
            path: 'foundation',
            data: { roles: ['foundation'], breadcrumb: 'Foundation' },
            loadChildren:
              '@nutela/feature-module-ui/platform/hr-foundations-ui#FeatureModuleUiPlatformHrFoundationsUiModule',
            canActivate: [AuthorizedGuard],
            canActivateChild: [AuthorizedGuard]
          },
          {
            path: 'provisioning',
            data: { roles: ['provisioning'], breadcrumb: 'Provisioning' },
            loadChildren:
              '@nutela/feature-module-ui/platform/provisioning-ui#FeatureModuleUiPlatformProvisioningUiModule',
            canActivate: [AuthorizedGuard],
            canActivateChild: [AuthorizedGuard]
          },
          {
            path: 'data-administration',
            data: { breadcrumb: 'Data Administration' },
            children: [
              {
                path: 'lists',
                data: { roles: ['data-administration'], breadcrumb: 'Lists' },
                loadChildren:
                  '@nutela/feature-module-ui/platform/lookup-ui#FeatureModuleUiPlatformLookupUiModule',
                canActivate: [AuthorizedGuard],
                canActivateChild: [AuthorizedGuard]
              },
              {
                path: 'upload',
                data: { roles: ['data-administration'], breadcrumb: 'Uploads' },
                loadChildren:
                  '@nutela/feature-module-ui/platform/data-upload-ui#FeatureModuleUiPlatformDataUploadUiModule',
                canActivate: [AuthorizedGuard],
                canActivateChild: [AuthorizedGuard]
              }
            ]
          }
        ]
      },
      {
        path: 'enterprise-planning',
        data: { breadcrumb: 'Enterprise Planning' },
        children: [
          {
            path: 'enterprise-structure',
            data: { roles: ['enterprise-structure'], breadcrumb: 'Enterprise Structures'  },
            loadChildren:
              '@nutela/feature-module-ui/enterprise-planning/enterprise-structure-ui#FeatureModuleUiEnterprisePlanningEnterpriseStructureUiModule',
            canActivate: [AuthorizedGuard],
            canActivateChild: [AuthorizedGuard]
          }
        ]
      },

      {
        path: 'reports',
        data: { roles: ['report'], breadcrumb: 'Reports' },
        loadChildren:
          '@nutela/feature-module-ui/platform/reports-ui#FeatureModuleUiPlatformReportsUiModule',
        canActivate: [AuthorizedGuard],
        canActivateChild: [AuthorizedGuard]
      },
      {
        path: 'documents',
        data: { roles: ['document'], breadcrumb: 'Documents' },
        loadChildren:
          '@nutela/feature-module-ui/platform/documents-ui#FeatureModuleUiPlatformDocumentsUiModule',
        canActivate: [AuthorizedGuard],
        canActivateChild: [AuthorizedGuard]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class V1RoutingModule { }
