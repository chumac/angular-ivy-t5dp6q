import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { IReviewPageParameter } from '../../../../models';
import { EmployeeSummaryPageService } from './employee-summary-page.service';
import { UtilService } from '@nutela/core-services';
import { ISubscriptions } from '@nutela/models/common';
import { IApiResult } from '@nutela/models/core-data';
import { IEmployeeReviewForm, IReviewWorkflowProcess, IScore } from '@nutela/models/talent/performance';
import { ReviewWorkflowProcessService } from '../../../../services';
import { IReviewPageComponent } from '../../../../interfaces';
import { WorkflowProcessStatus, RoleTypes } from '../../../../enumerations';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { Store } from '@ngrx/store';
import { IPerformanceState } from '../../../../store';
import { DialogBoxService } from '@nutela/shared/ui';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoadEmployeePageScoresAppraisalForms, ClearEmployeePageScoresAppraisalForms } from '../../../../store/reviews/appraisal-forms';
import { PageScoreComponent } from '../../../../components/common/page-score/page-score.component';


@Component({
  selector: 'x365-fm-talent-employee-summary-page',
  templateUrl: './employee-summary-page.component.html',
  styleUrls: ['./employee-summary-page.component.scss']
})
export class EmployeeSummaryPageComponent implements OnInit, OnDestroy, IReviewPageComponent {
  @Input() show: boolean;
  @Input() parameter: IReviewPageParameter;

  @Output() saveAndContinueProcessingEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() completeSectionProcessingEmitter: EventEmitter<boolean> = new EventEmitter();

  @Output() formCompleteEmitter: EventEmitter<void> = new EventEmitter();

  completeProcessingStatus = false;

  private subscriptions: ISubscriptions = {};

  scorePageDialogRef: MatDialogRef<PageScoreComponent>;
  
  constructor(private router: Router, private utilService: UtilService, private reviewWorkflowProcessService: ReviewWorkflowProcessService, public service: EmployeeSummaryPageService, private store: Store<IPerformanceState>, private dialog: MatDialog) { }

  ngOnInit() {
    this.setReviewWorkflowData();
    this.setData();
  }

  load() {
    this.setData();
  }

  setData() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.subscriptions['reviewForms'] =  this.service.getReviewForms(this.parameter, this.parameter.role, this.parameter.reviewForm.PlanningInfo.id).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          this.service.reviewForms = <IEmployeeReviewForm[]>data.Results;
        }
      });

      this.setScore();
    }
  }

  setScore() {
    if (this.parameter && this.parameter.reviewForm) {
      this.subscriptions['Score'] =  this.service.getScore(this.parameter.reviewForm.PlanningInfo.id).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          const score: IScore = <IScore>data.Results[0];

          const scoreEmployee: string = (score.employee_score === null?'N/A':score.employee_score);
          const scoreEmployeeDesc: string = (score.employee_score_description === null?'N/A':score.employee_score_description);

          this.service.score = scoreEmployee;
          this.service.scoreDesc = scoreEmployeeDesc;
        }
      });
    }
  }

  get getScore(): string {
    if (!this.service.score) {
      return "";
    }
    return this.service.score;
  }

  get getScoreDesc(): string {
    if (!this.service.score) {
      return "";
    }
    return this.service.scoreDesc;
  }

  completeSection(): void {
    // No action. Required by interface.
  }

  get isCompleted(): boolean {
    return true; // Always true
  }

  get isSelfReviewCompleted(): boolean {
    if (this.reviewWorkflowProcessService.firstReviewWorkflowProcess) {
      if (this.reviewWorkflowProcessService.firstReviewWorkflowProcess.status >= WorkflowProcessStatus.COMPLETED) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  onEmployeeClick() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      console.log(this.parameter, this.parameter.reviewForm, this.parameter.reviewForm.PlanningInfo)
      this.store.dispatch(new LoadEmployeePageScoresAppraisalForms({ selectedPlan: this.parameter.reviewForm.PlanningInfo.id, role: this.parameter.role, employeeId: this.parameter.reviewForm.EmployeeInfo.employee_id, roleScoreRequired: RoleTypes.EMPLOYEE}));
    }

    this.scorePageDialogRef = this.dialog.open(PageScoreComponent, {
      width: '550px',
      data: null,
      panelClass: 'custom-dialog-container'
    });

    this.scorePageDialogRef.afterClosed().subscribe(
      () => this.store.dispatch(new ClearEmployeePageScoresAppraisalForms())
    );  
  }

  get completeButtonStatus(): boolean {
    if (this.isSelfReviewCompleted) {
      return true
    } else if (this.service.allFormsAreCompleted) {
      return false;
    } else {
      return true;
    }
  }

  completeButtonClicked() {
    // Prompt user if sure they want to complete self review

    if (this.parameter && this.parameter.reviewWorkflowProcess) {
      this.completeProcessingStatus = true;
      // this.completeSectionProcessingEmitter.emit(true);

      const workflowProcessId = this.parameter.reviewWorkflowProcess.workflow_process_id;
      this.subscriptions['completeSelfReview'] =  this.service.completeSelfReview(workflowProcessId).subscribe(data => {
        if (data.Success) {
          this.utilService.showToast('Complete Self Review', `Self Review was completed successfully.`, ToastTypes.SUCCESS);
          this.setReviewWorkflowData();
          this.formCompleteEmitter.emit();  // Notify host parent (appraisal form)

          this.router.navigate([`${STANDARD_ROUTES.selfServiceReviewProgress}`]);
        } else {
          this.utilService.showToast('Complete Self Review: Error Occured', data.ErrorMessage, ToastTypes.ERROR);
        }
      }, (error) => {
        this.utilService.showToast('Complete Self Review: Error Occured', `Something went wrong. Self Review not completed.`, ToastTypes.ERROR);
      }, () => {
         this.completeProcessingStatus = false;
        // this.completeSectionProcessingEmitter.emit(false);
      });
    } else {
      this.utilService.showToast('Complete Self Review: Error Occured', `Something went wrong. Not enough data to proceed.`, ToastTypes.ERROR);
    }
  }

  private setReviewWorkflowData() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.subscriptions['reviewWorkflowProcesses'] =  this.reviewWorkflowProcessService.getAll(this.parameter.reviewForm.PlanningInfo.id).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          this.reviewWorkflowProcessService.reviewWorkflowProcesses = <IReviewWorkflowProcess[]>data.Results;
          this.reviewWorkflowProcessService.firstReviewWorkflowProcess = this.getFirstReviewWorkflowProcess(this.reviewWorkflowProcessService.reviewWorkflowProcesses);
        }
      });
    }
  }

  getFirstReviewWorkflowProcess(processes: IReviewWorkflowProcess[]): IReviewWorkflowProcess {
    return processes.filter((element) => element.step === 1).shift();
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
