import { Component, OnInit, Inject } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { ISelectOption } from '@nutela/models/core-data';

import { IPerformanceState } from '../../../store/root';
import { getActivePersonnel } from '@nutela/store/modules/foundation';
import { AppraisalReRouteService } from './appraisal-reroute.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IReRouteData } from '../../../models';
import { ShowToast } from '@nutela/store/shared';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { UtilService } from '@nutela/core-services';
import { ReRouteAppraisalWorkflowProcess, isLoadingDataReviewWorkflowProcess, LoadingDataReviewWorkflowProcess, getResultCommand, MutateResultReviewWorkflowProcess } from '../../../store/reviews/review-workflow-process';

@Component({
  selector: 'x365-fm-talent-appraisal-reroute',
  templateUrl: './appraisal-reroute.component.html',
  styleUrls: ['./appraisal-reroute.component.scss']
})
export class AppraisalRerouteComponent extends BaseFormComponent implements OnInit {
  isLoadingDataReviewWorkflowProcess$: Observable<boolean>;
  resultCommand$: Observable<number>;

  activePersonnel$: Observable<ISelectOption[]>;

  constructor(public fs: AppraisalReRouteService, public utilService: UtilService, private store: Store<IPerformanceState>, private dialogRef: MatDialogRef<AppraisalRerouteComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: IReRouteData) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.fs.f.setValue({employee: null});
  }

  storeDispatches() {
    this.store.dispatch(new MutateResultReviewWorkflowProcess(0));
  }

  storeSelects() {
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));
    this.isLoadingDataReviewWorkflowProcess$ = this.store.pipe(select(isLoadingDataReviewWorkflowProcess));
    this.resultCommand$ = this.store.pipe(select(getResultCommand));
  }

  initResultCommand() {
    this.resultCommand$.subscribe((data: number) => {
      if (data === 1) { // This is issued after Effect is completed.
        this.dialogRef.close();
      }
    });
  }

  onOkClick() {
    if (this.fs.valid) {
      const payload = {
        role: this.dialogData.role,
        employeeId : this.dialogData.employeeId,
        planId : this.dialogData.planId,
        rerouteFrom : this.dialogData.reviewerId,
        rerouteTo : this.fs.employee.value
      }

      this.store.dispatch(new ReRouteAppraisalWorkflowProcess(payload));

      this.fs.f.setValue({employee: null});
      this.dialogRef.close();
    } else {
      this.store.dispatch(
        new ShowToast({
          title: 'Correct the following Errors',
          message: this.getErrorMessage(), type: ToastTypes.ERROR
        })
      );
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.fs.f.setValue({employee: null});
    this.dialogRef.close();
  }
}

export interface IReRouteSaveData {
  employee_id : number;
  plan_id : number;
  reroute_from : number;
  reroute_to : number;
}
