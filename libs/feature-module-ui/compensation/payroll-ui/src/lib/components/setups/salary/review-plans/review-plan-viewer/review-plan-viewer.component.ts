
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IAppState } from '@nutela/store/app-state';
import { UtilService } from '@nutela/core-services';
import {  ISalaryReviewPlan } from '@nutela/models/compensation/payroll';

@Component({
  selector: 'x365-fm-payrl-salary-review-plan-viewer',
  templateUrl: './review-plan-viewer.component.html',
  styleUrls: ['./review-plan-viewer.component.scss']
})
export class ReviewPlanViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public dataDoc: any;
  @Input() public data: ISalaryReviewPlan;

  @Output() cancelClick = new EventEmitter<any>();

  constructor(public utilService: UtilService) {}

  ngOnInit() {}

  onDoneClicked() {
    this.cancelClick.emit();
  }
}
