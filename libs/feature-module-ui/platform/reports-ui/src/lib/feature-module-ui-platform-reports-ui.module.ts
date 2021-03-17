import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridsterModule } from 'angular-gridster2';
import { ChartModule } from 'angular-highcharts';

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { IgxGridModule } from 'igniteui-angular';

import { SharedAppGlobalModule } from '@nutela/shared/app-global';
import { SharedUiModule } from '@nutela/shared/ui';

import { ReportsComponent } from './components/reports/reports.component';
import { ReportDashboardComponent } from './components/report-dashboard/report-dashboard.component';
import { BarChartComponent } from './components/report-dashboard/comp-cards/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/report-dashboard/comp-cards/pie-chart/pie-chart.component';
import { LineChartComponent } from './components/report-dashboard/comp-cards/line-chart/line-chart.component';
import { LayoutItemDirective } from './directives/layout-item.directive';
import { DxDashboardControlModule } from 'devexpress-dashboard-angular';
@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    SharedUiModule,
    SharedAppGlobalModule,
    MDBBootstrapModulesPro,
    IgxGridModule,
    GridsterModule,
    DxDashboardControlModule,

    ChartModule,
    // StoreModule.forFeature('report', rootReducer),
    // EffectsModule.forRoot(rootEffects),
    RouterModule.forChild([
       { path: '', component: ReportsComponent, data: { state: 'reports', breadcrumb: 'Reports' } },
       { path: 'custom-dashboard', component: ReportDashboardComponent, data: { state: 'report-dashboard', breadcrumb: 'Report Dashboard' } }
    ])
  ],
  declarations: [
    ReportsComponent,
    ReportDashboardComponent,
    BarChartComponent,
    PieChartComponent,
    LineChartComponent,

    LayoutItemDirective
  ],
  exports: [RouterModule],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    BarChartComponent,
    PieChartComponent,
    LineChartComponent
  ]
})
export class FeatureModuleUiPlatformReportsUiModule {}
