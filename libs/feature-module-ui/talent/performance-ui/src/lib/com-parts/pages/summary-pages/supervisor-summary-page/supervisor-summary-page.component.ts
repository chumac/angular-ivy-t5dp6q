import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { IReviewPageParameter } from '../../../../models';
import { SupervisorSummaryPageService } from './supervisor-summary-page.service';
import { UtilService } from '@nutela/core-services';
import { ISubscriptions } from '@nutela/models/common';
import { IApiResult, IBasicData } from '@nutela/models/core-data';
import { IEmployeeReviewForm, IReviewWorkflowProcess, IScore } from '@nutela/models/talent/performance';
import { IReviewPageComponent, ICommentBoxData } from '../../../../interfaces';
import { ReviewWorkflowProcessService } from '../../../../services';
import { WorkflowProcessStatus, RoleTypes } from '../../../../enumerations';
import { BaseFormComponent, ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { Store } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ShowToast } from '@nutela/store/shared';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { take } from 'rxjs/internal/operators/take';
import { MatDialogRef, MatDialog } from '@angular/material';
import { PageScoreComponent } from '../../../../components/common/page-score/page-score.component';
import { LoadEmployeePageScoresAppraisalForms, ClearEmployeePageScoresAppraisalForms } from '../../../../store/reviews/appraisal-forms';

@Component({
  selector: 'x365-fm-talent-supervisor-summary-page',
  templateUrl: './supervisor-summary-page.component.html',
  styleUrls: ['./supervisor-summary-page.component.scss']
})
export class SupervisorSummaryPageComponent extends BaseFormComponent implements OnInit, OnDestroy, IReviewPageComponent {
  @Input() show: boolean;
  @Input() parameter: IReviewPageParameter;

  @Output() saveAndContinueProcessingEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() completeSectionProcessingEmitter: EventEmitter<boolean> = new EventEmitter();

  @Output() formCompleteEmitter: EventEmitter<void> = new EventEmitter();

  completeProcessingStatus = false;
  cancelProcessingStatus = false;

  private subscriptions: ISubscriptions = {};

  scorePageDialogRef: MatDialogRef<PageScoreComponent>;
  
  constructor(private router: Router, private utilService: UtilService, private store: Store<IAppState>, private reviewWorkflowProcessService: ReviewWorkflowProcessService, public fs: SupervisorSummaryPageService, private dialogBoxService: DialogBoxService, private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.setReviewWorkflowData();
    this.setData();
    this.setRecommendations();
    this.setComments();
  }

  load() {
    this.setData();
  }

  setData() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.subscriptions['reviewForms'] =  this.fs.getReviewForms(this.parameter, this.parameter.role, this.parameter.reviewForm.PlanningInfo.id).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          this.fs.reviewForms = <IEmployeeReviewForm[]>data.Results;
        }
      });

      this.setScore();
    }
  }

  setScore() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.subscriptions['score'] =  this.fs.getScore(this.parameter, this.parameter.reviewForm.PlanningInfo.id).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          this.fs.score = <IScore>data.Results[0];
        }
      });
    }
  }

  setRecommendations() {
    this.subscriptions['getRecommendations'] =  this.fs.getRecommendations().subscribe((data: IApiResult) => {
      if (data.Success && data.Results) {
        this.fs.recommendations = this.utilService.transformToSelectDataList(<IBasicData[]>data.Results, 'id', 'description');
      }
    });
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

  setComments() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.subscriptions['comments'] =  this.fs.getComments(this.parameter, this.parameter.role, this.parameter.reviewForm.PlanningInfo.id).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          this.fs.comments = <ICommentBoxData[]>data.Results;
        }
      });
    }
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

  onSupervisorClick() {
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

  get isInEditMode(): boolean {
    if (this.reviewWorkflowProcessService.reviewWorkflowProcess) {
      if (this.reviewWorkflowProcessService.reviewWorkflowProcess.in_edit_mode === true) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  completeButtonClicked() {
    if (this.fs.valid) {
      this.completeReview();
    } else {
      this.store.dispatch(
        new ShowToast({
          title: 'Correct the following Errors',
          message: this.getErrorMessage(), type: ToastTypes.ERROR
        })
      );
    }
  }

  completeReview() {
    // Prompt user if sure they want to complete self review

    if (this.parameter && this.parameter.reviewWorkflowProcess) {
      this.completeProcessingStatus = true;

      const workflowProcessId = this.parameter.reviewWorkflowProcess.workflow_process_id;
      const body = this.getBody();

      // console.log('completeReview', body);

      this.subscriptions['completeSelfReview'] =  this.reviewWorkflowProcessService.completeReview(workflowProcessId, body).subscribe(data => {
        if (data.Success) {
          this.utilService.showToast('Complete Review', `Review was completed successfully.`, ToastTypes.SUCCESS);
          this.setReviewWorkflowData();
          this.formCompleteEmitter.emit();  // Notify host parent (appraisal form)

          this.router.navigate([`${STANDARD_ROUTES.teamReview}`]);
        } else {
          this.utilService.showToast('Supervisor Review: Error Occured', data.ErrorMessage, ToastTypes.ERROR);
        }
      }, (error) => {
        this.utilService.showToast('Supervisor Review: Error Occured', `Something went wrong. Review not completed.`, ToastTypes.ERROR);
        this.completeProcessingStatus = false;
      }, () => {
         this.completeProcessingStatus = false;
      });
    } else {
      this.utilService.showToast('Supervisor Review: Error Occured', `Something went wrong. Not enough data to proceed.`, ToastTypes.ERROR);
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
      employee_id: employeeId,
      next_reviewer_id: this.fs.nextReviewer.value,
      lm_comments: this.fs.comment.value,
      recommendation_id: this.fs.recommendation.value,
      one_on_one_completed: this.fs.oneOnOneCompleted.value,
      one_on_one_comments: this.fs.oneOnOneComment.value
    }
  }

  cancelButtonClicked() {
    this.subscriptions['cancelEditPrompt'] = this.dialogBoxService.show(`This will cancel appraisal edit. Do you want to continue?`)
    .pipe(take(1)).subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.cancelEdit();
        }
      });
  }

  cancelEdit() {
    if (this.parameter && this.parameter.reviewWorkflowProcess) {
      this.cancelProcessingStatus = true;

      const workflowProcessId = this.parameter.reviewWorkflowProcess.workflow_process_id;

      this.subscriptions['cancelEdit'] =  this.reviewWorkflowProcessService.cancelEdit(workflowProcessId).subscribe(data => {
        if (data.Success) {
          this.utilService.showToast('Cancel Review Edit', `Review edit was canceled successfully.`, ToastTypes.SUCCESS);
          this.setReviewWorkflowData();
          this.formCompleteEmitter.emit();  // Notify host parent (appraisal form)

          this.router.navigate([`${STANDARD_ROUTES.teamReview}`]);
        } else {
          this.utilService.showToast('Cancel Review Edit: Error Occured', data.ErrorMessage, ToastTypes.ERROR);
        }
      }, (error) => {
        this.utilService.showToast('Cancel Review Edit: Error Occured', `Something went wrong. Review edit not canceled.`, ToastTypes.ERROR);
        this.cancelProcessingStatus = false;
      }, () => {
         this.cancelProcessingStatus = false;
      });
    } else {
      this.utilService.showToast('Cancel Review Edit: Error Occured', `Something went wrong. Not enough data to proceed.`, ToastTypes.ERROR);
    }
  }

  onNoReviewerClicked($event) {
    if($event.checked) {
      this.fs.nextReviewer.setValue(this.reviewWorkflowProcessService.reviewWorkflowProcess.reviewer_id);
    } else {
      this.fs.nextReviewer.setValue(null);
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
