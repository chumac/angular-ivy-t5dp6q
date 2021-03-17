
import {
  NgModule,
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

import { ApplicationsComponent } from './components/applications/applications.component';
import { ApplyEditorComponent } from './components/applications/apply-editor/apply-editor.component';
import { ProxyApplicationsComponent } from './components/proxy-applications/proxy-applications.component';
import { ProxyApplyEditorComponent } from './components/proxy-applications/proxy-apply-editor/proxy-apply-editor.component';
import { DefinitionsComponent } from './components/setups/definitions/definitions.component';
import { DefinitionEditorComponent } from './components/setups/definitions/definition-editor/definition-editor.component';
import { DisbursementsComponent } from './components/disbursements/disbursements.component';
import { DisbursementEditorComponent } from './components/disbursements/disbursement-editor/disbursement-editor.component';
import { RepaymentsComponent } from './components/repayments/repayments.component';
import { RepaymentEditorComponent } from './components/repayments/repayment-editor/repayment-editor.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

import { rootReducer, rootEffects } from './store/root';
import { ClosureComponent } from './components/closure/closure.component';
import { CloseEditorComponent } from './components/closure/close-editor/close-editor.component';
import { StandardScheduleViewerComponent } from './components/standard-schedule-viewer/standard-schedule-viewer.component';
import { RepaymentScheduleViewerComponent } from './components/repayment-schedule-viewer/repayment-schedule-viewer.component';
import { ActualScheduleViewerComponent } from './components/actual-schedule-viewer/actual-schedule-viewer.component';
import { TransactionApplyEditorComponent } from './components/transactions/transaction-apply-editor/transaction-apply-editor.component';
import { GenericScheduleViewerComponent } from './components/generic-schedule-viewer/generic-schedule-viewer.component';
import { PermittedGuard } from '@nutela/core';
import { ProxyApplyViewerComponent } from './components/proxy-applications/proxy-apply-viewer';
import { DisbursementViewerComponent } from './components/disbursements/disbursement-viewer';
import { CloseViewerComponent } from './components/closure/close-viewer';
import { ClosedComponent } from './components/closed/closed.component';
import { ClosedViewerComponent } from './components/closed/closed-viewer/closed-viewer.component';
import { TransactionApplyViewerComponent } from './components/transactions/transaction-apply-viewer';
import { ApplyViewerComponent } from './components/applications/apply-viewer';
import { RepaymentViewerComponent } from './components/repayments/repayment-viewer';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Loans' },
    children: [
      { path: '', component: ApplicationsComponent, data: { state: 'loans' } },
    ]
  },
  {
    path: 'admin', data: {
      role: 'HR_LOANS', breadcrumb: 'HR Loans' }, canActivateChild: [PermittedGuard],
    children: [
      { path: 'proxy-applications', component: ProxyApplicationsComponent, data: { state: 'proxy-applications', breadcrumb: 'Proxy Applications' } },
      { path: 'transactions', component: TransactionsComponent, data: { state: 'transactions', breadcrumb: 'Loan Transactions'  } },
      { path: 'disbursements', component: DisbursementsComponent, data: { state: 'disbursements', breadcrumb: 'Loan Disbursements'  } },
      { path: 'repayments', component: RepaymentsComponent, data: { state: 'repayments', breadcrumb: 'Loan Repayments'  } },

      { path: 'definitions', component: DefinitionsComponent, data: { state: 'definitions', breadcrumb: 'Loan Definitions'  } },
      { path: 'closure', component: ClosureComponent, data: { state: 'closure', breadcrumb: 'Closure'  } },
      { path: 'closed', component: ClosedComponent, data: { state: 'closed', breadcrumb: 'Closed Applications'  } }
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
    StoreModule.forFeature('loans', rootReducer),
    EffectsModule.forRoot(rootEffects),
    RouterModule.forChild(routes)
  ],
  declarations: [ApplicationsComponent, ApplyEditorComponent, ProxyApplicationsComponent, ProxyApplyEditorComponent, DefinitionsComponent, DefinitionEditorComponent, DisbursementsComponent, DisbursementEditorComponent, RepaymentsComponent, RepaymentEditorComponent, TransactionsComponent, ClosureComponent, CloseEditorComponent, StandardScheduleViewerComponent, RepaymentScheduleViewerComponent, ActualScheduleViewerComponent, TransactionApplyEditorComponent, GenericScheduleViewerComponent, ProxyApplyViewerComponent, DisbursementViewerComponent, CloseViewerComponent, ClosedComponent, ClosedViewerComponent, TransactionApplyViewerComponent, ApplyViewerComponent, RepaymentViewerComponent]
})
export class FeatureModuleUiCompensationLoansUiModule {}
