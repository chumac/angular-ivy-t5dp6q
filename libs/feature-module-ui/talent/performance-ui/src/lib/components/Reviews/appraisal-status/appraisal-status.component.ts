
import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import {MatDialog, MatDialogRef} from '@angular/material';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IgxGridComponent } from 'igniteui-angular';

import { Observable } from 'rxjs/internal/Observable';
import { filter, take, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { IPlan, IAppraisalStatus } from '@nutela/models/talent/performance';
import { IPerformanceState } from '../../../store/root';
import { LoadCurrentPlan, getCurrentPlan } from '../../../store';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { ISubscriptions } from '@nutela/models/common';
import { UtilService } from '@nutela/core-services';
import { LoadDataAppraisalStatus, getDataAppraisalStatus } from '../../../store/reviews/appraisal-status';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { LoadingDataReviewWorkflowProcess, InitializeAppraisalByPlanIdReviewWorkflowProcess, ReappraiseReviewWorkflowProcess, isLoadingDataReviewWorkflowProcess, RestartReviewWorkflowProcess, MoveToModerationReviewWorkflowProcess, MoveToHRReviewWorkflowProcess } from '../../../store/reviews/review-workflow-process';
import { AppraisalRerouteComponent } from '../../common/appraisal-reroute/appraisal-reroute.component';
import { IReRouteData } from '../../../models';
import { RoleTypes } from '../../../enumerations';
import { ApprasalStatusService } from './appraisal-status.service';

@Component({
  selector: 'x365-fm-talent-appraisal-status',
  templateUrl: './appraisal-status.component.html',
  styleUrls: ['./appraisal-status.component.scss'],
  providers: [ApprasalStatusService]
})
export class AppraisalStatusComponent implements  OnInit, OnDestroy  {
  appraisalStatus$: Observable<IAppraisalStatus[]>;
  currentPlan$: Observable<IPlan>;
  isLoadingDataReviewWorkflowProcess$: Observable<boolean>;

  commentDialogRef: MatDialogRef<AppraisalRerouteComponent>;

  private subscriptions: ISubscriptions = {};

  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild("grid") grid: IgxGridComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private router: Router,
    private utilService: UtilService,
    private titleService: Title,
    public service: ApprasalStatusService,
    private store: Store<IPerformanceState>,
    private dialogBoxService: DialogBoxService,
    public dialog: MatDialog
  ) {
    titleService.setTitle(`${'Appraisal Status'}${this.partialDocumentTitle}`)
  }

  ngOnInit() {
    this.storeSelects();
    this.currentPlanInit();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadCurrentPlan());
  }

  storeSelects() {
    this.appraisalStatus$ = this.store.pipe(select(getDataAppraisalStatus));
    this.currentPlan$ = this.store.pipe(select(getCurrentPlan));

    this.isLoadingDataReviewWorkflowProcess$ = this.store.pipe(select(isLoadingDataReviewWorkflowProcess));
  }

  currentPlanInit() {
    this.currentPlan$
      .pipe(
        filter(plan => plan !== null),
        take(1)
      )
      .subscribe((plan: IPlan) => {
        if (plan) {
          this.store.dispatch(new LoadDataAppraisalStatus(plan.id));
        }
      });
  }

  search() {
    let filterBy: string = '';
    const searchString = this.searchInput.nativeElement.value;

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.grid) {
      this.service.search(this.grid, searchString, filterBy);
    }
  }

  getCurrentPlan(): Observable<IPlan> {
    return this.currentPlan$.pipe(
      filter(plan => plan !== null),
      take(1)
    );
  }

  onInitialize() {
    this.subscriptions['initializeAppraisalPrompt'] = this.dialogBoxService.show(`Are you sure you want to initialize all employee appraisals? This action cannot be reversed.`)
    .pipe(take(1)).subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.subscriptions['InitializeAppraisalByPlanId'] = this.currentPlan$
            .pipe(
              filter(plan => plan !== null),
              take(1)
            )
            .subscribe((plan: IPlan) => {
              if (plan) {
                this.store.dispatch(new LoadingDataReviewWorkflowProcess());
                this.store.dispatch(new InitializeAppraisalByPlanIdReviewWorkflowProcess(plan.id));
              }
            });
        }
      });
  }

  onReAppraiseIconClicked(context: IAppraisalStatus) {
    this.subscriptions['ReAppraisePrompt'] = this.dialogBoxService.show(`Are you sure you want to reappraise ${context.emp_fullname}? This action cannot be reversed.`)
      .pipe(take(1)).subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.subscriptions['ReAppraise'] = this.getCurrentPlan().subscribe((plan: IPlan) => {
            if (plan) {
              this.store.dispatch(new ReappraiseReviewWorkflowProcess({employeeId: context.employee_id, planId: plan.id}));
            }
          });
        }
      });
  }

  onRestartIconClicked(context: IAppraisalStatus) {
    this.subscriptions['RestartPrompt'] = this.dialogBoxService.show(`Are you sure you want to restart appraisal for ${context.emp_fullname}? This action cannot be reversed.`)
      .pipe(take(1)).subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.subscriptions['ReStart'] = this.getCurrentPlan().subscribe((plan: IPlan) => {
            if (plan) {
              this.store.dispatch(new RestartReviewWorkflowProcess({employeeId: context.employee_id, planId: plan.id}));
            }
          });
        }
      });
  }

  onReRouteIconClicked(context: IAppraisalStatus) {
    this.subscriptions['ReRoute'] = this.getCurrentPlan().subscribe((plan: IPlan) => {
      if (plan) {
        const role = RoleTypes.HR;
        let employeeId = 0;
        let reviewerId = 0;

        if (context) {
          employeeId = context.employee_id;
          reviewerId = context.reviewer_id;
        }

        const data: IReRouteData = {role: role, planId: plan.id, employeeId: employeeId, reviewerId: reviewerId};

        this.commentDialogRef = this.dialog.open(AppraisalRerouteComponent, {
          width: '450px',
          data: data,
          panelClass: 'custom-dialog-container'
        });
      }
    });
  }

  onMoveToModerationIconClicked(context: IAppraisalStatus) {
    if (context.is_moveable_moderation) {
      this.subscriptions['MoveToModerationPrompt'] = this.dialogBoxService.show(`Are you sure you want to move appraisal to moderation for ${context.emp_fullname}?`)
        .pipe(take(1)).subscribe((command: string) => {
          if (command === DialogBoxCommandTypes.COMMAND1) {
            this.subscriptions['MoveToModeration'] = this.getCurrentPlan().subscribe((plan: IPlan) => {
              if (plan) {
                this.store.dispatch(new MoveToModerationReviewWorkflowProcess({employeeId: context.employee_id, planId: plan.id}));
              }
            });
          }
        });
    } else {
        this.store.dispatch(
          new ShowToast({
            title: null,
            message: `This appraisal cannot be moved to Moderation.`,
            type: ToastTypes.INFO
          })
        );
    }
  }

  onMoveToHRIconClicked(context: IAppraisalStatus) {
    if (context.is_moveable_hr) {
      this.subscriptions['MoveToHRPrompt'] = this.dialogBoxService.show(`Are you sure you want to move appraisal to moderation for ${context.emp_fullname}?`)
        .pipe(take(1)).subscribe((command: string) => {
          if (command === DialogBoxCommandTypes.COMMAND1) {
            this.subscriptions['MoveToHR'] = this.getCurrentPlan().subscribe((plan: IPlan) => {
              if (plan) {
                this.store.dispatch(new MoveToHRReviewWorkflowProcess({employeeId: context.employee_id, planId: plan.id}));
              }
            });
          }
        });
    } else {
        this.store.dispatch(
          new ShowToast({
            title: null,
            message: `This appraisal cannot be moved to HR.`,
            type: ToastTypes.INFO
          })
        );
    }
  }

  onRefresh() {
    this.currentPlan$
      .pipe(
        filter(plan => plan !== null),
        take(1)
      )
      .subscribe((plan: IPlan) => {
        if (plan) {
          this.store.dispatch(new LoadDataAppraisalStatus(plan.id));
          this.store.dispatch(
            new ShowToast({
              title: null,
              message: `Data is being refreshed.`,
              type: ToastTypes.INFO
            })
          );
        }
      });
  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
