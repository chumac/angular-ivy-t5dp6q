import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { IReviewPageParameter } from '../../../../models';
import { SupervisorTwoSummaryPageService } from './supervisor-two-summary-page.service';
import { UtilService } from '@nutela/core-services';
import { ISubscriptions } from '@nutela/models/common';
import { IApiResult, IBasicData } from '@nutela/models/core-data';
import { IEmployeeReviewForm, IReviewWorkflowProcess, IScore } from '@nutela/models/talent/performance';
import { IReviewPageComponent } from '../../../../interfaces';
import { ReviewWorkflowProcessService } from '../../../../services';
import { WorkflowProcessStatus, RoleTypes } from '../../../../enumerations';
import { BaseFormComponent, ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { Store } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ShowToast } from '@nutela/store/shared';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'x365-fm-talent-supervisor-two-summary-page',
  templateUrl: './supervisor-two-summary-page.component.html',
  styleUrls: ['./supervisor-two-summary-page.component.scss']
})
export class SupervisorTwoSummaryPageComponent extends BaseFormComponent implements OnInit, OnDestroy, IReviewPageComponent {
  @Input() show: boolean;
  @Input() parameter: IReviewPageParameter;

  @Output() saveAndContinueProcessingEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() completeSectionProcessingEmitter: EventEmitter<boolean> = new EventEmitter();

  @Output() formCompleteEmitter: EventEmitter<void> = new EventEmitter();

  completeProcessingStatus = false;

  private subscriptions: ISubscriptions = {};

  constructor(private router: Router, private utilService: UtilService, private store: Store<IAppState>, private reviewWorkflowProcessService: ReviewWorkflowProcessService, public fs: SupervisorTwoSummaryPageService, private dialogBoxService: DialogBoxService) {
    super();
  }

  ngOnInit() {
    this.setReviewWorkflowData();
    this.setData();
    this.setRecommendations();
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
    this.subscriptions['finalScore'] =  this.fs.getScore(this.parameter, this.parameter.reviewForm.PlanningInfo.id).subscribe((data: IApiResult) => {
      if (data.Success && data.Results) {
        if (data.Results.length === 0) {
          this.fs.score = 'N/A';
        } else {
          this.fs.score = `${(<IScore>data.Results[0].final_score_pre===null?0.00:<IScore>data.Results[0].final_score_pre)}%`;
        }
      }
    });
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

  get getScore(): string {
    return this.fs.score;
  }

  get showNextReviewer(): boolean {
    if (this.parameter) {
      if (this.parameter.role === RoleTypes.LINE_MANAGER) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  completeSection(): void {
    // No action. Required by interface.
  }

  get isCompleted(): boolean {
    return true; // Always true
  }

  get isSelfReviewCompleted(): boolean {
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

  completeButtonClicked() {
    if (this.fs.valid) {
      if (this.fs.nextReviewer.value === null || this.fs.nextReviewer.value === 0) {
        this.completeReviewPrompt();
      } else {
        this.completeReview();
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

  completeReviewPrompt() {
    this.subscriptions['completeReview'] = this.dialogBoxService.show(`You have not selected the 'Next Reviewer'. Are you sure you want to complete this review?`)
    .pipe(take(1)).subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.completeReview();
        }
      });
  }

  completeReview() {
    // Prompt user if sure they want to complete self review

    if (this.parameter && this.parameter.reviewWorkflowProcess) {
      this.completeProcessingStatus = true;

      const workflowProcessId = this.parameter.reviewWorkflowProcess.workflow_process_id;
      const body = this.getBody();

      console.log(body);

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
      next_reviewer_id: null,
      lm_comments: this.fs.comment.value,
      recommendation_id: this.fs.recommendation.value,
      one_on_one_completed: this.fs.oneOnOneCompleted.value,
      one_on_one_comments: this.fs.oneOnOneComment.value
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
