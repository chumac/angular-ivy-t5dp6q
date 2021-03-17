import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IPerfDashboardObjectives } from '@nutela/models/talent/performance';
import { MANAGE_OBJECTIVES_URLs } from '../../constants';
import { IPerformanceState, SetLMStatusProgressDefinition } from '../../store';

@Component({
  selector: 'x365-shared-ui-dashboard-objective-tile',
  templateUrl: './dashboard-objective-tile.component.html',
  styleUrls: ['./dashboard-objective-tile.component.scss']
})
export class DashboardObjectiveTileComponent implements OnInit {
  @Input() data: IPerfDashboardObjectives;
  @Input() canNavigate: boolean = false;

  constructor(public router: Router, private store: Store<IPerformanceState>) {}

  ngOnInit() {}

  gotoProgressReport(objectiveId: number, isLineManager: boolean) {
    this.store.dispatch(new SetLMStatusProgressDefinition({ status: isLineManager }));
    this.router.navigate([MANAGE_OBJECTIVES_URLs.progressReportUrl, objectiveId], { skipLocationChange: false });
  }
}
