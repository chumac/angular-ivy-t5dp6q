import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { IReviewPageParameter } from '../../../../models';
import { EmployeeArSummaryPageService } from './employee-ar-summary-page.service';
import { UtilService } from '@nutela/core-services';
import { ISubscriptions } from '@nutela/models/common';
import { IApiResult } from '@nutela/models/core-data';
import { IEmployeeReviewForm, IReviewWorkflowProcess, IScore } from '@nutela/models/talent/performance';
import { IReviewPageComponent } from '../../../../interfaces';
import { BaseFormComponent, ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { Store } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ShowToast } from '@nutela/store/shared';
import { ReviewWorkflowProcessService } from '../../../../services';
import { WorkflowProcessStatus, RoleTypes } from '../../../../enumerations';
import { MatDialogRef, MatDialog } from '@angular/material';
import { PageScoreComponent } from '../../../../components/common/page-score/page-score.component';
import { LoadEmployeePageScoresAppraisalForms, ClearEmployeePageScoresAppraisalForms } from '../../../../store/reviews/appraisal-forms';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { take } from 'rxjs/operators';

const PAGE_COMPLETION_ACCEPT = 1;
const PAGE_COMPLETION_REJECT= 2;

@Component({
  selector: 'x365-fm-talent-employee-ar-summary-page',
  templateUrl: './employee-ar-summary-page.component.html',
  styleUrls: ['./employee-ar-summary-page.component.scss']
})
export class EmployeeArSummaryPageComponent extends BaseFormComponent implements OnInit, OnDestroy, IReviewPageComponent {
  @Input() show: boolean;
  @Input() parameter: IReviewPageParameter;

  @Output() saveAndContinueProcessingEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() completeSectionProcessingEmitter: EventEmitter<boolean> = new EventEmitter();

  @Output() formCompleteEmitter: EventEmitter<void> = new EventEmitter();

  completeProcessingStatusAccept = false;
  completeProcessingStatusReject = false;

  private subscriptions: ISubscriptions = {};

  scorePageDialogRef: MatDialogRef<PageScoreComponent>;
  
  constructor(private router: Router, private dialogBoxService: DialogBoxService, private utilService: UtilService, private store: Store<IAppState>, private reviewWorkflowProcessService: ReviewWorkflowProcessService, public fs: EmployeeArSummaryPageService, private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.setReviewWorkflowData();
    this.setData();
  }

  load() {
    this.setData();
  }

  setData() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.subscriptions['reviewForms'] =  this.fs.getReviewForms(this.parameter.role, this.parameter.reviewForm.PlanningInfo.id).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          this.fs.reviewForms = <IEmployeeReviewForm[]>data.Results;
        }
      });

      this.setScore();
    }
  }

  setScore() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.subscriptions['score'] =  this.fs.getScore(this.parameter.reviewForm.PlanningInfo.id).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          this.fs.score = <IScore>data.Results[0];
        }
      });
    }
  }

  get getEmployeeScore(): string {
    if (!this.fs.score) {
      return "";
    }
    return this.fs.score.employee_score;
  }

  get getEmployeeScoreDesc(): string {
    if (!this.fs.score) {
      return "";
    }
    return this.fs.score.employee_score_description;
  }

  get getSupervisorScore(): string {
    if (!this.fs.score) {
      return "";
    }
    return this.fs.score.pry_lm_score ;
  }

  get getSupervisorScoreDesc(): string {
    if (!this.fs.score) {
      return "";
    }
    return this.fs.score.pry_lm_score_description;
  }

  get getSecondarySupervisorScore(): string {
    if (!this.fs.score) {
      return "";
    }
    return this.fs.score.secondary_lm_score ;
  }

  get getSecondarySupervisorScoreDesc(): string {
    if (!this.fs.score) {
      return "";
    }
    return this.fs.score.secondary_lm_score_description;
  }

  get getTotalSupervisorScore(): string {
    if (!this.fs.score) {
      return "";
    }
    return this.fs.score.total_lm_score ;
  }

  get getTotalSupervisorScoreDesc(): string {
    if (!this.fs.score) {
      return "";
    }
    return this.fs.score.total_lm_score_description;
  }

  completeSection(): void {
    // No action. Required by interface.
  }

  get isCompleted(): boolean {
    return true; // Always true
  }

  get isReviewCompleted(): boolean {
    if (this.reviewWorkflowProcessService.reviewWorkflowProcess) {
      if (this.reviewWorkflowProcessService.reviewWorkflowProcess.status >= WorkflowProcessStatus.COMPLETED) {
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

  onSupervisorPrimaryClick() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.store.dispatch(new LoadEmployeePageScoresAppraisalForms({ selectedPlan: this.parameter.reviewForm.PlanningInfo.id, role: this.parameter.role, employeeId: this.parameter.reviewForm.EmployeeInfo.employee_id, roleScoreRequired: RoleTypes.LINE_MANAGER}));
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

  onSupervisorSecondaryClick() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.store.dispatch(new LoadEmployeePageScoresAppraisalForms({ selectedPlan: this.parameter.reviewForm.PlanningInfo.id, role: this.parameter.role, employeeId: this.parameter.reviewForm.EmployeeInfo.employee_id, roleScoreRequired: RoleTypes.REVIEWER_ASSESSING}));
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

  acceptButtonClicked() {
    if (this.fs.valid) { 
      this.dialogBoxService.show(`Are you sure you want to accept this summary statistics?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.completeReview(PAGE_COMPLETION_ACCEPT);        }
      });
    } else {
      this.store.dispatch(
        new ShowToast({
          title: 'Correct the following Errors',
          message: this.getErrorMessage(), type: ToastTypes.ERROR
        })
      );
    }
  }

  rejectButtonClicked() {
    if (this.fs.valid) {
      if (this.fs.comment.value === null || this.fs.comment.value === '') {
        this.store.dispatch(
          new ShowToast({
            title: 'Comment Is Required',
            message: 'Comment is required if rejecting.', type: ToastTypes.ERROR
          })
        );
      } else {
        this.dialogBoxService.show(`Are you sure you want to reject this summary statistics?`).pipe(take(1))
        .subscribe((command: string) => {
          if (command === DialogBoxCommandTypes.COMMAND1) {
            this.completeReview(PAGE_COMPLETION_REJECT);
          }
        });
      }
    } else {
      this.store.dispatch(
        new ShowToast({
          title: 'Correct the following Errors',
          message: this.getErrorMessage(), type: ToastTypes.ERROR
        })
      );
    }
  }

  completeReview(approvalStatus: number) {
    // Prompt user if sure they want to complete self review

    if (this.parameter && this.parameter.reviewWorkflowProcess) {
      this.completeProcessingStatusAccept = (approvalStatus === PAGE_COMPLETION_ACCEPT);
      this.completeProcessingStatusReject = (approvalStatus === PAGE_COMPLETION_REJECT);

      const workflowProcessId = this.parameter.reviewWorkflowProcess.workflow_process_id;
      const body = this.getBody();

      this.subscriptions['completeReview'] =  this.fs.completeReview(workflowProcessId, approvalStatus, body).subscribe(data => {
        if (data.Success) {
          this.utilService.showToast('Complete Review', `Review was completed successfully.`, ToastTypes.SUCCESS);
          this.setReviewWorkflowData();
          this.formCompleteEmitter.emit();  // Notify host parent (appraisal form)

          this.router.navigate([`${STANDARD_ROUTES.selfServiceReviewProgress}`]);
        } else {
          this.utilService.showToast('Review: Error Occured', data.ErrorMessage, ToastTypes.ERROR);
        }
      }, (error) => {
        // console.log(JSON.stringify(error));

        this.utilService.showToast('Review: Error Occured', `Something went wrong. Review not completed.`, ToastTypes.ERROR);
        this.completeProcessingStatusAccept = false;
        this.completeProcessingStatusReject = false;
      }, () => {
         this.completeProcessingStatusAccept = false;
         this.completeProcessingStatusReject = false;
      });
    } else {
      this.utilService.showToast('Review: Error Occured', `Something went wrong. Not enough data to proceed.`, ToastTypes.ERROR);
    }
  }

  private setReviewWorkflowData() {
    if (this.parameter && this.parameter.reviewWorkflowProcess) {
      this.subscriptions['reviewWorkflowProcess'] =  this.reviewWorkflowProcessService.getItem(this.parameter.reviewWorkflowProcess.workflow_process_id).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          this.reviewWorkflowProcessService.reviewWorkflowProcess = <IReviewWorkflowProcess>data.Results[0];
        }
      });
    }
  }

  getBody(): any {
    let planId = 0;
    let employeeId = 0;

    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      planId = this.parameter.reviewForm.PlanningInfo.id;
      employeeId = this.parameter.reviewWorkflowProcess.employee_id
    }

    return {
      plan_id: planId,
      employee_comments: this.fs.comment.value,
      emp_accepts: this.isAccepted,
      one_on_one_completed: this.fs.oneOnOneCompleted.value,
      one_on_one_comments: this.fs.oneOnOneComment.value
    }
  }

  get isAccepted(): boolean {
    if (this.fs.accepted.value === true) {
      return true;
    } else {
      return false;
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
