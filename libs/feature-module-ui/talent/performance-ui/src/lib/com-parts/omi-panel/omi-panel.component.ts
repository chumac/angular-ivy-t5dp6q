import { Component, OnInit, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { IObjectiveMaster } from '@nutela/models/talent/performance';
import { IName } from '@nutela/models/core-data';
import { UtilService, formatDate, APP_DATE_FORMAT_2 } from '@nutela/core-services';

@Component({
  selector: 'x365-fm-talent-omi-panel',
  templateUrl: './omi-panel.component.html',
  styleUrls: ['./omi-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OmiPanelComponent implements OnInit {
  @Input() public reportsToEmployeePhoto: any = null;
  @Input() public data: IObjectiveMaster;

  constructor(private util: UtilService) {}

  ngOnInit() {}

  getFullname(): string {
    const data = this.data;

    if (data && data.ReportToInfo) {
      const reportTo = data.ReportToInfo;
      const name: IName = this.util.getEmployeeFullName('', reportTo.employee_firstname, reportTo.employee_surname, reportTo.employee_midname);

      if (name !== null) {
        return name.displayName;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  get periodStartDate() {
    if (this.data && this.data.PlanInfo) {
      return formatDate(this.data.PlanInfo.period_start_date);
    }
  }

  get periodEndDate() {
    if (this.data && this.data.PlanInfo) {
      return formatDate(this.data.PlanInfo.period_end_date);
    }
  }
}
