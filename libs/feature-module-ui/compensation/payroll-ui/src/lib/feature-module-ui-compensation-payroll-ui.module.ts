import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { IgxButtonModule, IgxCheckboxModule, IgxGridModule, IgxIconModule, IgxListModule, } from 'igniteui-angular';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxLookupModule } from 'devextreme-angular/ui/lookup';
import { DxListModule, DxSelectBoxModule } from 'devextreme-angular';

import { SharedAppGlobalModule } from '@nutela/shared/app-global';
import { SharedUiModule } from '@nutela/shared/ui';
import { PermittedGuard } from '@nutela/core';

import { rootReducer, rootEffects } from './store/root';
import { RolesPickerComponent } from './components/setups/dependencies/roles-picker/roles-picker.component';
import {
  FixedAllowanceRateEditorComponent,
  FixedAllowanceEditorComponent,
  FixedAllowancesComponent,
  FixedAllowanceViewerComponent,
  FixedAllowanceConfigureEditorComponent,
  FixedAllowancePaygroupRatesComponent,
  FixedAllowanceEmployeeRatesComponent,
  FixedAllowanceGlobalRatesComponent,
  FixedAllowanceEmployeeRateViewerComponent,
  FixedAllowancePaygroupRateViewerComponent,
  FixedAllowanceGlobalRateViewerComponent,
} from './components/setups/pay-elements/fixed-allowances';
import {
  FixedDeductionRateEditorComponent,
  FixedDeductionEditorComponent,
  FixedDeductionsComponent,
  FixedDeductionViewerComponent,
  FixedDeductionConfigureEditorComponent,
  FixedDeductionPaygroupRatesComponent,
  FixedDeductionEmployeeRatesComponent,
  FixedDeductionGlobalRateViewerComponent,
  FixedDeductionGlobalRatesComponent,
  FixedDeductionPaygroupRateViewerComponent,
  FixedDeductionEmployeeRateViewerComponent,
} from './components/setups/pay-elements/fixed-deductions';
import {
  VariableDeductionTransactionEditorComponent,
  VariableDeductionTransactionsComponent,
  VariableDeductionTransactionViewerComponent
} from './components/setups/pay-elements/variable-deduction-transactions';
import {
  VariableDeductionEditorComponent,
  VariableDeductionsComponent,
  VariableDeductionViewerComponent,
  VariableDeductionRatesComponent,
  VariableDeductionRateEditorComponent,
  VariableDeductionRateViewerComponent,
} from './components/setups/pay-elements/variable-deductions';
import {
  VariableAllowanceTransactionEditorComponent,
  VariableAllowanceTransactionsComponent,
  VariableAllowanceTransactionViewerComponent,
} from './components/setups/pay-elements/variable-allowance-transactions';
import {
  VariableAllowanceEditorComponent,
  VariableAllowancesComponent,
  VariableAllowanceViewerComponent,
  VariableAllowanceRatesComponent,
  VariableAllowanceRateEditorComponent,
  VariableAllowanceRateViewerComponent,
} from './components/setups/pay-elements/variable-allowances';
import {
  ProfilesComponent,
  ProfileEditorComponent,
  ProfileViewerComponent,
} from './components/setups/dependencies/profiles';
import { BankEditorComponent, BanksComponent } from './components/setups/dependencies/banks';
import {
  CalendarEditorComponent,
  CalendarComponent,
  ProfileCalendarComponent,
  ProfileCalendarEditorComponent,
  GlobalWorkComponent,
  GroupWorkComponent,
  PersonalWorkComponent,
  CalendarViewerComponent,
} from './components/setups/calendar';
import {
  DefaultCurrencyEditorComponent,
  DefaultCurrenciesComponent,
} from './components/setups/dependencies/default-currencies';
import {
  FormulaEditorComponent,
  FormulaeComponent,
} from './components/setups/dependencies/formulae';
import {
  PaymentCurrencyEditorComponent,
  PaymentCurrenciesComponent,
} from './components/setups/dependencies/payment-currencies';
import { PfaEditorComponent, PfasComponent } from './components/setups/dependencies/pfas';
import {
  PayGroupsComponent,
  PayGroupEditorComponent,
  PayGroupViewerComponent
} from './components/setups/dependencies/pay-groups';
import {
  RecoverEditorComponent,
  RunComponent,
  RunEditorComponent
} from './components/execution/payroll-run';
import {
  LastRunItemsComponent,
  LastRunItemStatusViewerComponent,
  FigureViewerComponent,
  FinalizeEditorComponent
} from './components/execution/last-run-items';

import { ItemSelectionComponent } from './components/setups/pay-elements/item-selection/item-selection.component';
import { NewStaffArrearComponent } from './components/setups/exclusions/new-staff-arrear/new-staff-arrear.component';
import { NewStaffEditorComponent } from './components/setups/exclusions/new-staff-arrear/new-staff-editor/new-staff-editor.component';
import { ExclusionsTransactionComponent } from './components/setups/exclusions/exclusions-transaction/exclusions-transaction.component';
import { TransactionEditorComponent } from './components/setups/exclusions/exclusions-transaction/transaction-editor/transaction-editor.component';
import { ExclusionsCloseTransactionEditorComponent } from './components/setups/exclusions/exclusions-transaction/exclusions-close-transaction-editor/exclusions-close-transaction-editor.component';
// import { TransactionConfigureComponent } from './components/setups/exclusions/exclusions-transaction/transaction-configure/transaction-configure.component';
// import { TransactionConfigureEditorComponent } from './components/setups/exclusions/exclusions-transaction/transaction-configure/transaction-configure-editor/transaction-configure-editor.component';
import { ReliefsAndExemptionsComponent } from './components/setups/regulation/reliefs-and-exemptions/reliefs-and-exemptions.component';
import { ReliefEditorComponent } from './components/setups/regulation/reliefs-and-exemptions/relief-editor/relief-editor.component';
import { ConfigureReliefComponent } from './components/setups/regulation/reliefs-and-exemptions/relief-editor/configure-relief/configure-relief.component';
import { GradesEditorComponent } from './components/setups/regulation/reliefs-and-exemptions/grades-editor/grades-editor.component';
import { AddGradesEditorComponent } from './components/setups/regulation/reliefs-and-exemptions/grades-editor/add-grades-editor/add-grades-editor.component';
import { PaygroupEditorComponent } from './components/setups/regulation/reliefs-and-exemptions/pay-group/paygroup-editor.component';
import { AddPayGroupEditorComponent } from './components/setups/regulation/reliefs-and-exemptions/pay-group/add-paygroup-editor/add-paygroup-editor.component';
import { EmployeeEditorComponent } from './components/setups/regulation/reliefs-and-exemptions/employee/employee-editor.component';
import { AddEmployeeEditorComponent } from './components/setups/regulation/reliefs-and-exemptions/employee/add-employee-editor/add-employee-editor.component';
import { AddReliefComponent } from './components/setups/regulation/reliefs-and-exemptions/relief-editor/add-relief/add-relief.component';
import { ViewReliefComponent } from './components/setups/regulation/reliefs-and-exemptions/relief-editor/view-relief/view-relief.component';
import { FixedDeductionComponent } from './components/setups/regulation/reliefs-and-exemptions/relief-editor/fixed-deduction/fixed-deduction.component';
// import { ViewReliefEditorComponent } from './components/setups/regulation/reliefs-and-exemptions/relief-editor/view-relief-editor/view-relief-editor.component';
import { TransactionConfigureComponent } from './components/setups/exclusions/transaction-configure/transaction-configure.component';
import { TransactionConfigureEditorComponent } from './components/setups/exclusions/transaction-configure/transaction-configure-editor/transaction-configure-editor.component';
import { TaxManagementComponent } from './components/setups/tax-management/tax-management.component';
import { PercentageGrossComponent } from './components/setups/tax-management/percentage-gross/percentage-gross.component';
import { PercentageGrossEditorComponent } from './components/setups/tax-management/percentage-gross/percentage-gross-editor/percentage-gross-editor.component';
import { TaxStandardComponent } from './components/setups/tax-management/tax-standard/tax-standard.component';
import { TaxStandardEditorComponent } from './components/setups/tax-management/tax-standard/tax-standard-editor/tax-standard-editor.component';
import { RangePercentageComponent } from './components/setups/tax-management/range-percentage/range-percentage.component';
import { RangePercentageEditorComponent } from './components/setups/tax-management/range-percentage/range-percentage-editor/range-percentage-editor.component';
import { RangeValueComponent } from './components/setups/tax-management/range-value/range-value.component';
import { RangeValueEditorComponent } from './components/setups/tax-management/range-value/range-value-editor/range-value-editor.component';
import { FixDeductionComponent } from './components/setups/tax-management/fix-deduction/fix-deduction.component';
import { TaxManagementProfileEditorComponent } from './components/setups/tax-management/tax-management-profile-editor/tax-management-profile-editor.component';
import { TaxStandardViewComponent } from './components/setups/tax-management/tax-standard/tax-standard-view/tax-standard-view.component';
import { RangePercentageViewComponent } from './components/setups/tax-management/range-percentage/range-percentage-view/range-percentage-view.component';
import { RangeValueViewComponent } from './components/setups/tax-management/range-value/range-value-view/range-value-view.component';
import { PercentageGrossViewComponent } from './components/setups/tax-management/percentage-gross/percentage-gross-view/percentage-gross-view.component';
import {
  PayrollIntegrationComponent,
  PayrollIntegrationEditorComponent,
  PayrollIntegrationViewerComponent } from './components/execution/payroll-integration';
import { ReviewPlanEditorComponent, ReviewPlansComponent, ReviewPlanDetailsComponent, ReviewGroupsComponent, ReviewGroupEditorComponent, ReviewPlanDetailEditorComponent } from './components/setups/salary';
import { ReviewPlanViewerComponent } from './components/setups/salary/review-plans/review-plan-viewer/review-plan-viewer.component';

const routes: Routes = [
  {
    path: 'admin', data: { role: 'HR_PAYROLL', breadcrumb: 'HR Admin' }, canActivateChild: [PermittedGuard],
    children: [
      { path: '', redirectTo: 'profiles', pathMatch: 'full' },
      { path: 'profiles', component: ProfilesComponent, data: { state: 'payroll-profiles', breadcrumb: 'Payroll Profiles' } },
      {
        path: 'dependencies', data: { breadcrumb: 'Dependencies' }, children: [
          { path: '', redirectTo: 'formula', pathMatch: 'full' },
          { path: 'formula', component: FormulaeComponent, data: { state: 'formulae', breadcrumb: 'Formulae' } },
          { path: 'payment-groups', component: PayGroupsComponent, data: { state: 'paygroups', breadcrumb: 'Payment Groups' } },
          { path: 'financial-institutions', component: BanksComponent, data: { state: 'bank', breadcrumb: 'Financial Institutions' } },
          { path: 'pension-funds', component: PfasComponent, data: { state: 'pfas', breadcrumb: 'Pension Fund Admins' } },
        ]
      },
      {
        path: 'exclusions', data: { breadcrumb: 'exclusions' }, children: [
          { path: '', redirectTo: 'new-staff-arrear', pathMatch: 'full' },
          { path: 'new-staff-arrear', component: NewStaffArrearComponent, data: { state: 'new-staff-arrear', breadcrumb: 'new-staff-arrear' } }
        ]
      },
      {
        path: 'multi-currencies', data: { breadcrumb: 'Dependencies' }, children: [
          { path: '', redirectTo: 'default-currency', pathMatch: 'full' },
          { path: 'default-currency', component: DefaultCurrenciesComponent, data: { state: 'default-currencies', breadcrumb: 'Default Currencies' } },
          { path: 'payment-currencies', component: PaymentCurrenciesComponent, data: { state: 'payment-currencies', breadcrumb: 'Payment Currencies' } },
        ]
      },
      {
        path: 'calendars', data: { breadcrumb: 'Dependencies' }, children: [
          { path: '', redirectTo: 'payroll-profiles', pathMatch: 'full' },
          { path: 'payroll-profiles', component: CalendarComponent, data: { state: 'payroll-calendar', breadcrumb: 'Payroll Calendars' } },
          { path: 'payroll-profile/:id', component: ProfileCalendarComponent, data: { state: 'profile-calendar', breadcrumb: 'Profile Calendar' } },
          { path: 'global-work', component: GlobalWorkComponent, data: { state: 'global-work', breadcrumb: 'Global Work Calendars' } },
          { path: 'group', component: GroupWorkComponent, data: { state: 'group', breadcrumb: 'Group Calendars' } },
          { path: 'personal', component: PersonalWorkComponent, data: { state: 'personal', breadcrumb: 'Personal Calendar' } },
        ]
      },
      {
        path: 'allowances', data: { breadcrumb: 'Pay Elements' }, children: [
          { path: '', redirectTo: 'fixed', pathMatch: 'full' },
          { path: 'fixed', component: FixedAllowancesComponent, data: { state: 'fixed-allowances', breadcrumb: 'Fixed Allowances' } },
          { path: 'paygroup-rates/:allowanceId', component: FixedAllowancePaygroupRatesComponent, data: { state: 'fixed-allowances', breadcrumb: 'Paygroup Rates' } },
          { path: 'employee-rates/:allowanceId', component: FixedAllowanceEmployeeRatesComponent, data: { state: 'fixed-allowances', breadcrumb: 'Employee Rates' } },
          { path: 'global-rates', component: FixedAllowanceGlobalRatesComponent, data: { state: 'fixed-allowances', breadcrumb: 'Global Rates' } },
          { path: 'variable', component: VariableAllowancesComponent, data: { state: 'variable-allowances', breadcrumb: 'Variable Allowance' } },
          { path: 'variable-rates/:varallowanceId', component: VariableAllowanceRatesComponent, data: { state: 'variable-allowance-rates', breadcrumb: 'Variable Allowance Rates' } },
          { path: 'transactions', component: VariableAllowanceTransactionsComponent, data: { state: 'variable-allowance-transactions', breadcrumb: 'Variable Allowance Transactions' } },
        ]
      },
      {
        path: 'deductions', data: { breadcrumb: 'Pay Elements' }, children: [
          { path: '', redirectTo: 'fixed', pathMatch: 'full' },
          { path: 'fixed', component: FixedDeductionsComponent, data: { state: 'fixed-deductions', breadcrumb: 'Fixed Deductions' } },
          { path: 'paygroup-rates/:deductionId', component: FixedDeductionPaygroupRatesComponent, data: { state: 'fixed-deductions', breadcrumb: 'Fixed Deduction Paygroup Rates' } },
          { path: 'employee-rates/:deductionId', component: FixedDeductionEmployeeRatesComponent, data: { state: 'fixed-deductions', breadcrumb: 'Fixed Deduction Employee Rates' } },
          { path: 'global-rates', component: FixedDeductionGlobalRatesComponent, data: { state: 'fixed-deductions', breadcrumb: 'Fixed Deduction Global Rates' } },
          { path: 'variable', component: VariableDeductionsComponent, data: { state: 'variable-deductions', breadcrumb: 'Variable Deductions' } },
          { path: 'variable-rates/:vardeductionId', component: VariableDeductionRatesComponent, data: { state: 'variable-deduction-rates', breadcrumb: 'Variable Deductions Rates' } },
          { path: 'transactions', component: VariableDeductionTransactionsComponent, data: { state: 'variable-deduction-transactions', breadcrumb: 'Variable Deduction Transactions' } },
        ]
      },
      {
        path: 'tax-management', data: { breadcrumb: 'Tax Management' }, children: [
          { path: '', redirectTo: 'profiles', pathMatch: 'full' },
          { path: 'profiles', component: TaxManagementComponent, data: { state: 'profiles', breadcrumb: 'profiles' } },
          { path: 'percentage-gross/:payrollProfileID', component: PercentageGrossComponent, data: { state: 'percentage-gross', breadcrumb: 'Percentage Gross' } },
          { path: 'standard/:payrollProfileID', component: TaxStandardComponent, data: { state: 'standard', breadcrumb: 'Standard' } },
          { path: 'range-percent/:payrollProfileID', component: RangePercentageComponent, data: { state: 'range-percent', breadcrumb: 'Range Percent' } },
          { path: 'range-value/:payrollProfileID', component: RangeValueComponent, data: { state: 'range-value', breadcrumb: 'Range Value' } },
        ]
      },
      {
        path: 'execution', data: { breadcrumb: 'Executions' }, children: [
          { path: 'payroll-run', component: RunComponent, data: { state: 'payroll-run', breadcrumb: 'Payroll Run' } },
          { path: 'last-run/:profileID', component: LastRunItemsComponent, data: { state: 'lastRunItem', breadcrumb: 'Last Run Items' } },
          { path: 'integrate/:profileID', component: PayrollIntegrationComponent, data: { state: 'payrollIntegration', breadcrumb: 'Integration' } },
        ]
      },
      {
        path: 'transaction', data: { breadcrumb: 'Transaction' }, children: [
          { path: 'exclusion-transaction', component: ExclusionsTransactionComponent, data: { state: 'exclusion-transaction', breadcrumb: 'Exclusion Transaction' } },
          { path: 'exclusion-configure/:exclusionId', component: TransactionConfigureComponent, data: { state: 'exclusion-configure', breadcrumb: 'Exclusion Configure' } },

        ]
      },
      {
        path: 'integration', data: { breadcrumb: 'Integration' }, children: [
        ]
      },
      {
        path: 'overtime', children: [

        ]
      },
      {
        path: 'salary', data: { breadcrumb: 'Salary' }, children: [
          { path: 'review-groups', component: ReviewGroupsComponent, data: { state: 'review-groups', breadcrumb: 'Review Groups' } },
          { path: 'review-plans/:groupId/:profileId', component: ReviewPlansComponent, data: { state: 'review-plans', breadcrumb: 'Review Plans' } },
          { path: 'review-plan/details/:planId', component: ReviewPlanDetailsComponent, data: { state: 'review-plan-details', breadcrumb: 'Review Plan Details' } },
        ]
      },
      {
        path: 'regulations', data: { breadcrumb: 'Regulations' }, children: [
          { path: '', redirectTo: 'reliefs-and-exemptions', pathMatch: 'full' },
          { path: 'reliefs-and-exemptions', component: ReliefsAndExemptionsComponent, data: { state: 'reliefs-and-exemptions', breadcrumb: 'Reliefs And Exemptions' } },
          { path: 'reliefs-grade/:relieftId/:profileId', component: GradesEditorComponent, data: { state: 'reliefs-and-exemptions', breadcrumb: 'Reliefs Grades' } },
          { path: 'reliefs-profile/:profileId', component: ReliefEditorComponent, data: { state: 'reliefs-profile', breadcrumb: 'Reliefs Profile' } },
          { path: 'reliefs-paygroup/:relieftId/:profileId', component: PaygroupEditorComponent, data: { state: 'reliefs-paygroup', breadcrumb: 'Reliefs Paygroup' } },
          { path: 'reliefs-employee/:relieftId/:profileId', component: EmployeeEditorComponent, data: { state: 'reliefs-employee', breadcrumb: 'Reliefs Employee' } },
        ]
      },
    ]
  }
]


@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModulesPro,
    IgxGridModule,
    DxDateBoxModule,
    DxLookupModule,
    DxSelectBoxModule,
    DxListModule,
    SharedUiModule,
    SharedAppGlobalModule,
    StoreModule.forFeature('payroll', rootReducer),
    EffectsModule.forRoot(rootEffects),
    RouterModule.forChild(routes),
    IgxIconModule,
    IgxListModule,
    IgxCheckboxModule,
    IgxButtonModule
  ],
  declarations: [
    ProfilesComponent,
    ProfileEditorComponent,
    ProfileViewerComponent,

    BanksComponent,
    BankEditorComponent,

    CalendarEditorComponent,
    CalendarComponent,
    ProfileCalendarComponent,
    ProfileCalendarEditorComponent,
    GlobalWorkComponent,
    GroupWorkComponent,
    PersonalWorkComponent,
    CalendarViewerComponent,

    DefaultCurrencyEditorComponent,
    DefaultCurrenciesComponent,

    FormulaEditorComponent,
    FormulaeComponent,

    PaymentCurrencyEditorComponent,
    PaymentCurrenciesComponent,

    PfaEditorComponent,
    PfasComponent,

    FixedAllowanceRateEditorComponent,
    FixedAllowanceEditorComponent,
    FixedAllowancesComponent,
    FixedAllowanceViewerComponent,
    FixedAllowanceConfigureEditorComponent,
    FixedAllowancePaygroupRatesComponent,
    FixedAllowanceEmployeeRatesComponent,
    FixedAllowanceGlobalRatesComponent,
    FixedAllowanceEmployeeRateViewerComponent,
    FixedAllowancePaygroupRateViewerComponent,
    FixedAllowanceGlobalRateViewerComponent,

    FixedDeductionRateEditorComponent,
    FixedDeductionEditorComponent,
    FixedDeductionsComponent,
    FixedDeductionViewerComponent,
    FixedDeductionGlobalRateViewerComponent,
    FixedDeductionPaygroupRateViewerComponent,
    FixedDeductionEmployeeRateViewerComponent,
    FixedDeductionConfigureEditorComponent,
    FixedDeductionPaygroupRatesComponent,
    FixedDeductionEmployeeRatesComponent,
    FixedDeductionGlobalRatesComponent,

    VariableAllowanceEditorComponent,
    VariableAllowancesComponent,
    VariableAllowanceViewerComponent,
    VariableAllowanceRateEditorComponent,
    VariableAllowanceRateViewerComponent,
    VariableAllowanceRatesComponent,

    VariableAllowanceTransactionEditorComponent,
    VariableAllowancesComponent,
    VariableAllowanceTransactionsComponent,
    VariableAllowanceTransactionViewerComponent,

    VariableDeductionTransactionsComponent,
    VariableDeductionTransactionEditorComponent,
    VariableDeductionTransactionViewerComponent,

    VariableDeductionEditorComponent,
    VariableDeductionsComponent,
    VariableDeductionViewerComponent,
    VariableDeductionRatesComponent,
    VariableDeductionRateViewerComponent,
    VariableDeductionRateEditorComponent,

    PayGroupsComponent,
    PayGroupEditorComponent,
    PayGroupViewerComponent,

    RolesPickerComponent,

    RunComponent,
    RunEditorComponent,
    LastRunItemsComponent,
    LastRunItemStatusViewerComponent,
    FigureViewerComponent,
    FinalizeEditorComponent,
    RecoverEditorComponent,

    ItemSelectionComponent,

    NewStaffArrearComponent,
    NewStaffEditorComponent,

    ExclusionsTransactionComponent,
    TransactionEditorComponent,
    ExclusionsCloseTransactionEditorComponent,
    TransactionConfigureComponent,
    TransactionConfigureEditorComponent,
    ReliefsAndExemptionsComponent,
    ReliefEditorComponent,
    AddReliefComponent,
    ConfigureReliefComponent,
    GradesEditorComponent,
    AddGradesEditorComponent,
    PaygroupEditorComponent,
    AddPayGroupEditorComponent,
    EmployeeEditorComponent,
    AddEmployeeEditorComponent,
    ViewReliefComponent,
    FixedDeductionComponent,
    NewStaffEditorComponent,
    TaxManagementComponent,
    PercentageGrossComponent,
    PercentageGrossEditorComponent,
    TaxStandardComponent,
    TaxStandardEditorComponent,
    RangePercentageComponent,
    RangePercentageEditorComponent,
    RangeValueComponent,
    RangeValueEditorComponent,
    FixDeductionComponent,
    TaxManagementProfileEditorComponent,
    TaxStandardViewComponent,
    RangePercentageViewComponent,
    RangeValueViewComponent,
    PercentageGrossViewComponent,

    PayrollIntegrationComponent,
    PayrollIntegrationEditorComponent,
    PayrollIntegrationViewerComponent,

    ReviewPlansComponent,
    ReviewPlanEditorComponent,
    ReviewPlanViewerComponent,
    ReviewPlanDetailsComponent,
    ReviewPlanDetailEditorComponent,
    ReviewGroupsComponent,
    ReviewGroupEditorComponent
  ],
  entryComponents: [ItemSelectionComponent],

  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})

export class FeatureModuleUiCompensationPayrollUiModule { }
