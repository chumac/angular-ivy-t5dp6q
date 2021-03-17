import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { DashboardControlArgs, DashboardPanelExtension } from 'devexpress-dashboard/common';

import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';
import { ReportDashboardService, IComponent } from './report-dashboard.service';
import { CustomDashboardService } from './mocks/custom-dashboard.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { IDashboardConfig } from './mocks/dashboard';


@Component({
  selector: 'x365-fm-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.scss'],
  providers: [ReportDashboardService]
})
export class ReportDashboardComponent implements OnInit {

  @Input() dashboardId: string;
  @Input() viewMode: boolean = true;

  constructor(
    public service: ReportDashboardService,
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private location: Location,
    private dashboardService: CustomDashboardService
  ) {
    // this.route.params.pipe(take(1)).subscribe(param => {
    //   this.reportKey = +param.key
    // })
  }

  ngOnInit() {
  }

  onBeforeRender(args: DashboardControlArgs) {
    console.log(args)
    args.component.registerExtension(new DashboardPanelExtension(args.component));
  }

  onSwitchMode() {
    this.viewMode = !this.viewMode;
  }

  goBack() {
    this.location.back();
  }

}
