import { Component, OnInit, Input } from '@angular/core';
import { IEmployeeReviewForm } from '@nutela/models/talent/performance';

@Component({
  selector: 'x365-fm-talent-summary-page-status-row',
  templateUrl: './summary-page-status-row.component.html',
  styleUrls: ['./summary-page-status-row.component.scss']
})
export class SummaryPageStatusRowComponent implements OnInit {
  @Input() data: IEmployeeReviewForm;
  @Input() completed: boolean;

  constructor() { }

  ngOnInit() {
  }

}
