import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  Type,
  ComponentRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/internal/Observable';

import DataSource from 'devextreme/data/data_source';

import { DialogBoxService } from '@nutela/shared/ui';

import { IPerformanceState } from '../../../store/root';
import { IPageNavigatorData, IReviewPageParameter } from '../../../models';

import { LoadEmployeeReviewFormsAppraisalForms, getPageNavigatorList, getEmployeeReviewForms, ToggleSaveContinueDisabledStatusAppraisalForms, getSaveContinueDisabledStatus, LoadEmployeeInformationReportKeyAppraisalForms, LoadEmployeePageScoresAppraisalForms, LoadEmployeeConfirmationStatusAppraisalForms, getEmployeeConfirmationStatus } from '../../../store/reviews/appraisal-forms';

import { IEmployeeReviewForm, IComprehensiveReviewWorkflowProcessData, IPlan, IReviewWorkflowProcess } from '@nutela/models/talent/performance';
import { AssetTypes, WorkflowProcessStatus, PageStatus, RoleTypes } from '../../../enumerations';

import { CustomPageComponent } from '../../../com-parts/review-page-types/custom-page/custom-page.component';
import { KpiPageComponent } from '../../../com-parts/review-page-types/kpi-page/kpi-page.component';
import { RatingPageComponent } from '../../../com-parts/review-page-types/rating-page/rating-page.component';
import { ContractPageComponent } from '../../../com-parts/review-page-types/contract-page/contract-page.component';
import { CompetencyPageComponent } from '../../../com-parts/review-page-types/competency-page/competency-page.component';
import { SubscriptionPageComponent } from '../../../com-parts/review-page-types/subscription-page/subscription-page.component';
import { ThreeSixtyRatingPageComponent } from '../../../com-parts/review-page-types/three-sixty-rating-page/three-sixty-rating-page.component';
import { RatingFeedbackPageComponent } from '../../../com-parts/review-page-types/rating-feedback-page/rating-feedback-page.component';

import { ApprasalFormsService } from './appraisal-forms.service';
import { map, filter, take, takeUntil } from 'rxjs/operators';
import { PageNavigatorComponent } from '../../../com-parts/page-navigator/page-navigator.component';
import { IReviewPageComponent } from '../../../interfaces';
import { IPersonal } from '@nutela/models/workforce/employee-profiles';

import { ProfilePageComponent } from '../../../com-parts/pages/profile-page/profile-page.component';
import { EmployeeSummaryPageComponent } from '../../../com-parts/pages/summary-pages/employee-summary-page/employee-summary-page.component';
import { SupervisorSummaryPageComponent } from '../../../com-parts/pages/summary-pages/supervisor-summary-page/supervisor-summary-page.component';
import { SupervisorTwoSummaryPageComponent } from '../../../com-parts/pages/summary-pages/supervisor-two-summary-page/supervisor-two-summary-page.component';
import { EmployeeArSummaryPageComponent } from '../../../com-parts/pages/summary-pages/employee-ar-summary-page/employee-ar-summary-page.component';

import { ModeratorSummaryPageComponent } from '../../../com-parts/pages/summary-pages/moderator-summary-page/moderator-summary-page.component';
import { HrSummaryPageComponent } from '../../../com-parts/pages/summary-pages/hr-summary-page/hr-summary-page.component';
import { ReviewerSummaryPageComponent } from '../../../com-parts/pages/summary-pages/reviewer-summary-page/reviewer-summary-page.component';
import { ReviewWorkflowProcessService } from '../../../services';
import { ISubscriptions } from '@nutela/models/common';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { getActivePersonnel, performanceUseDirectRatingValue, performanceUseDirectObjectiveValue } from '@nutela/store/modules/foundation';
import { PageScoreComponent } from '../../common/page-score/page-score.component';
import { ASSET_TYPE_CONSTANTS } from '../../../constants';
import { ToastTypes } from '@nutela/shared/app-global';
import { UtilService } from '@nutela/core-services';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'x365-fm-talent-appraisal-forms',
  templateUrl: './appraisal-forms.component.html',
  styleUrls: ['./appraisal-forms.component.scss'],
  providers: [ApprasalFormsService],
})
export class AppraisalFormsComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  componentsMap = new Map<number, ComponentRef<IReviewPageComponent>>();
  selectedComponent: ComponentRef<IReviewPageComponent>;

  profilePageComponent: ComponentRef<IReviewPageComponent> = null;

  employeeSummaryPageComponent: ComponentRef<IReviewPageComponent> = null;
  supervisorSummaryPageComponent: ComponentRef<IReviewPageComponent> = null;
  supervisorTwoSummaryPageComponent: ComponentRef<IReviewPageComponent> = null;
  employeeArSummaryPageComponent: ComponentRef<IReviewPageComponent> = null;
  moderatorSummaryPageComponent: ComponentRef<IReviewPageComponent> = null;
  hrSummaryPageComponent: ComponentRef<IReviewPageComponent> = null;
  reviewerSummaryPageComponent: ComponentRef<IReviewPageComponent> = null;

  saveAndContinueProcessingStatus = false;
  completeSectionProcessingStatus = false;

  employeeReviewForms$: Observable<IEmployeeReviewForm[]>;
  pageNavigatorList$: Observable<IPageNavigatorData[]>;
  saveContinueDisabledStatus$: Observable<boolean>;
  activePersonnel$: Observable<ISelectOption[]>;
  performanceUseDirectRatingValue$: Observable<string>;
  performanceUseDirectObjectiveValue$: Observable<string>;
  performanceUseDirectRatingOrObjectiveValue$: Observable<any>;

  employeeConfirmationStatus$: Observable<string>;

  comprehensiveReviewWorkflowProcessData: IComprehensiveReviewWorkflowProcessData;

  @ViewChild('templateContainer', { read: ViewContainerRef }) templateContainer: ViewContainerRef;
  @ViewChild('pageNavigator') pageNavigator: PageNavigatorComponent;

  private subscriptions: ISubscriptions = {};

  scorePageDialogRef: MatDialogRef<PageScoreComponent>;

  constructor(public fs: ApprasalFormsService, private reviewWorkflowProcessService: ReviewWorkflowProcessService, private route: ActivatedRoute, private resolver: ComponentFactoryResolver, private store: Store<IPerformanceState>, private dialogBoxService: DialogBoxService, private dialog: MatDialog, private utilservice: UtilService) { }

  ngOnInit() {
    this.comprehensiveReviewWorkflowProcessData = this.route.snapshot.data.appraisalForms;
    this.storeSelects();
    this.storeDispatches();
    this.init();
  }

  storeDispatches() {
    if (this.comprehensiveReviewWorkflowProcessData && this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess) {
      this.store.dispatch(new LoadEmployeeReviewFormsAppraisalForms({ selectedPlan: this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess.plan_id, role: this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess.role, employeeId: this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess.employee_id }));
      this.store.dispatch(new LoadEmployeeConfirmationStatusAppraisalForms({ selectedPlan: this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess.plan_id, employeeId: this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess.employee_id }));
    }
  }

  storeSelects() {
    this.pageNavigatorList$ = this.store.pipe(select(getPageNavigatorList));
    this.employeeReviewForms$ = this.store.pipe(select(getEmployeeReviewForms));
    this.saveContinueDisabledStatus$ = this.store.pipe(select(getSaveContinueDisabledStatus));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));

    this.performanceUseDirectRatingValue$ = this.store.pipe(select(performanceUseDirectRatingValue));
    this.performanceUseDirectObjectiveValue$ = this.store.pipe(select(performanceUseDirectObjectiveValue));

    this.employeeConfirmationStatus$ = this.store.pipe(select(getEmployeeConfirmationStatus));
  }

  init() {
    this.performanceUseDirectObjectiveValue$.pipe(takeUntil(this.destroyed$)).subscribe((objectiveOption: any) => {
        this.performanceUseDirectRatingValue$.pipe(takeUntil(this.destroyed$)).subscribe((ratingOption: any) => {
            this.initAllComponnents(objectiveOption, ratingOption);
          }
        );
      }
    );
  }

  initAllComponnents(objectiveOption: string, ratingOption: string) {
    this.initComponents(this.useDirectObjectiveValueForPerformance(objectiveOption), this.useDirectRatingValueForPerformance(ratingOption));
    this.initStaticComponents();
    this.navigateToPage();
  }


  useDirectRatingValueForPerformance(value: string): boolean {
    if (value === 'YES') {
      return true;
    } else {
      return false;
    }
  }

  useDirectObjectiveValueForPerformance(value: string): boolean {
    if (value === 'YES') {
      return true;
    } else {
      return false;
    }
  }

  initComponents(useDirectObjectiveValueForPerformance: boolean, useDirectRatingValueForPerformance: boolean) {
    this.templateContainer.clear();

    this.employeeReviewForms$.pipe(takeUntil(this.destroyed$)).subscribe((list: IEmployeeReviewForm[]) => {
      list.forEach((data: IEmployeeReviewForm) => {
        if (data.AssetInfo) {
          const component = this.createComponent(data, useDirectObjectiveValueForPerformance, useDirectRatingValueForPerformance);
          this.componentsMap.set(data.id, component);

          this.setSaveAndContinueProcessingSubscription(component);
          this.setCompleteSectionProcessingSubscription(component);
        }
      });
    });
  }

  get role(): number {
    let role = 0;

    if (this.comprehensiveReviewWorkflowProcessData && this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess) {
      role = this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess.role;
    }

    return role;
  }

  initStaticComponents() {
    this.profilePageComponent = this.createStaticComponent(ProfilePageComponent);

    this.activePersonnel$
    .pipe(
      filter(personnel => (personnel !== null && (personnel.length > 0))),
      take(1)
    )
    .pipe(takeUntil(this.destroyed$)).subscribe((personnel: ISelectOption[]) => {
      if (personnel) {
        const activePersonnelDataSource = new DataSource({
          paginate: true,
          pageSize: 50,
          store: personnel
        });

        this.initStaticComponentsByRole(activePersonnelDataSource);
      }
    });
  }

  initStaticComponentsByRole(activePersonnelDataSource: any) {
    switch (this.role) {
      case RoleTypes.EMPLOYEE:
        this.employeeSummaryPageComponent = this.createStaticComponent(EmployeeSummaryPageComponent);
        this.setFormCompleteSubscription(this.employeeSummaryPageComponent);
        break;
      case RoleTypes.LINE_MANAGER:
        this.supervisorSummaryPageComponent = this.createStaticComponent(SupervisorSummaryPageComponent, activePersonnelDataSource);
        this.setFormCompleteSubscription(this.supervisorSummaryPageComponent);
        break;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        this.employeeArSummaryPageComponent = this.createStaticComponent(EmployeeArSummaryPageComponent);
        this.setFormCompleteSubscription(this.employeeArSummaryPageComponent);
        break;
      case RoleTypes.REVIEWER_ASSESSING:
        this.supervisorTwoSummaryPageComponent = this.createStaticComponent(SupervisorTwoSummaryPageComponent);
        this.setFormCompleteSubscription(this.supervisorTwoSummaryPageComponent);
        break;
      case RoleTypes.REVIEWER_REVIEWING:
        this.reviewerSummaryPageComponent = this.createStaticComponent(ReviewerSummaryPageComponent, activePersonnelDataSource);
        this.setFormCompleteSubscription(this.reviewerSummaryPageComponent);
        break;
      case RoleTypes.MODERATION:
        this.moderatorSummaryPageComponent = this.createStaticComponent(ModeratorSummaryPageComponent);
        this.setFormCompleteSubscription(this.moderatorSummaryPageComponent);
        break;
      case RoleTypes.HR:
        this.hrSummaryPageComponent = this.createStaticComponent(HrSummaryPageComponent);
        this.setFormCompleteSubscription(this.hrSummaryPageComponent);
        break;
    }
  }

  createComponent(data: IEmployeeReviewForm, useDirectObjectiveValueForPerformance: boolean, useDirectRatingValueForPerformance: boolean): ComponentRef<IReviewPageComponent> {
    if (data && data.AssetInfo) {
      const component = this.getComponent(data.AssetInfo.asset_type);
      const factory = this.resolver.resolveComponentFactory(component);
      const componentRef = this.templateContainer.createComponent(factory);

      // console.log('wwwwww', data);

      const parameter: IReviewPageParameter = {
        pageId: data.id,
        assetId: data.AssetInfo.id,
        status: data.status,
        role: data.reviewer_role,
        permission: data.perm_role,
        reviewerId: data.reviewer_id,
        reviewForm: data,
        reviewWorkflowProcess: null,
        useDirectObjectiveValueForPerformance: useDirectObjectiveValueForPerformance,
        useDirectRatingValueForPerformance: useDirectRatingValueForPerformance
      };

      // console.log('IReviewPageParameter', parameter);

      (<IReviewPageComponent>componentRef.instance).parameter = parameter;

      return componentRef;
    }
  }

  createStaticComponent(component: Type<IReviewPageComponent>, activePersonnelDataSource: any = null): ComponentRef<IReviewPageComponent> {
    if (component) {
      let plan: IPlan;
      let employee: IPersonal;
      let role: number;
      let reviewWorkflowProcess: IReviewWorkflowProcess = null;

      const factory = this.resolver.resolveComponentFactory(component);
      const componentRef = this.templateContainer.createComponent(factory);

      if (this.comprehensiveReviewWorkflowProcessData && this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess) {
        reviewWorkflowProcess = this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess;

        plan = {
          id: reviewWorkflowProcess.plan_id,
          description: reviewWorkflowProcess.plan_description,

          period_start_date: reviewWorkflowProcess.period_start_date,
          period_end_date: reviewWorkflowProcess.period_end_date,

          review_start_date: reviewWorkflowProcess.review_start_date,
          review_end_date: reviewWorkflowProcess.review_end_date,
        }

        employee = {
          employee_id: reviewWorkflowProcess.employee_id,
          emp_fullname: reviewWorkflowProcess.employee_name
        }

        role = reviewWorkflowProcess.role;
      }

      const parameter: IReviewPageParameter = {
        pageId: 0,
        assetId: 0,
        status: 0,
        role: role,
        permission: 0,
        reviewerId: 0,
        reviewForm: {
          id: null,
          EmployeeInfo: employee,
          ReviewerInfo: null,
          PerspectiveFilterInfo: null,
          asset_type: null,
          weight: null,
          status: null,
          score: null,
          weighted_score: null,
          AssetInfo: null,
          PlanningInfo: plan,
          page_rank: null,
          reviewer_role: null,
          reviewer_id: null,
          perm_role: null,
        },
        reviewForms: [],
        reviewWorkflowProcess: reviewWorkflowProcess,
        activePersonnelDataSource: activePersonnelDataSource,
        useDirectObjectiveValueForPerformance: false,
        useDirectRatingValueForPerformance: false
      };

      (<IReviewPageComponent>componentRef.instance).parameter = parameter;

      return componentRef;
    }
  }

  setSaveAndContinueProcessingSubscription(componentRef: ComponentRef<IReviewPageComponent>) {
    const instance = (<IReviewPageComponent>componentRef.instance);
    instance.saveAndContinueProcessingEmitter.pipe(takeUntil(this.destroyed$)).subscribe(data => {
      this.saveAndContinueProcessingStatus = data;
    });
  }

  setCompleteSectionProcessingSubscription(componentRef: ComponentRef<IReviewPageComponent>) {
    const instance = (<IReviewPageComponent>componentRef.instance);
    instance.completeSectionProcessingEmitter.pipe(takeUntil(this.destroyed$)).subscribe(data => {
      this.completeSectionProcessingStatus = data;
    });
  }

  setFormCompleteSubscription(componentRef: ComponentRef<IReviewPageComponent>) {
    const instance = (<IReviewPageComponent>componentRef.instance);
    instance.formCompleteEmitter.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.setReviewWorkflowData();
    });
  }

  getComponent(assetType: number): Type<IReviewPageComponent> {
    switch (assetType) {
      case AssetTypes.CUSTOM_PAGE:
        return CustomPageComponent;
      case AssetTypes.KPI_PAGE:
        return KpiPageComponent;
      case AssetTypes.RATING_PAGE:
        return RatingPageComponent;
      case AssetTypes.CONTRACT_PAGE:
        return ContractPageComponent;
      case AssetTypes.COMPETENCY_PAGE:
        return CompetencyPageComponent;
      case AssetTypes.SUBSCRIPTION_PAGE:
        return SubscriptionPageComponent;
      case AssetTypes.THREE_SIXTY_RATING_PAGE:
        return ThreeSixtyRatingPageComponent;
      case AssetTypes.RATING_FEEDBACK_PAGE:
        return RatingFeedbackPageComponent;
    }
  }

  navigateToPage() {
    if (this.comprehensiveReviewWorkflowProcessData && this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess) {
      if ((this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess.status === WorkflowProcessStatus.NOT_STARTED) || (this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess.status === WorkflowProcessStatus.STARTED)) {
        this.goToFirstUncompletedPage();
      } else if (this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess.status === WorkflowProcessStatus.SAVED) {
        this.showSummaryPage(this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess.role);
      }
    }
  }

  getUncompletedPageNavigatorList(): Observable<IPageNavigatorData[]>  {
    return this.pageNavigatorList$.pipe(map(data => data.filter(val => val.status === PageStatus.NOT_COMPLETED)));
  }

  goToFirstUncompletedPage() {
    this.getUncompletedPageNavigatorList()
      .pipe(takeUntil(this.destroyed$)).subscribe((list: IPageNavigatorData[]) => {
        if (list.length > 0 && <IPageNavigatorData>list[0]) {
          const page = <IPageNavigatorData>list[0];

          this.onPageNavigatorClicked(page);
          this.pageNavigator.select(page);
        }
      });
  }

  onPageNavigatorClicked(pageNavData: IPageNavigatorData) {
    this.hideAllPages();
    this.showPage(pageNavData.id);
    this.toggleSaveContinueButton(pageNavData.assetType);

    const component = this.componentsMap.get(pageNavData.id);
    if (component) {
      this.selectedComponent = component;

      this.setPageTitle(pageNavData.title);
      this.setPageSubTitle(pageNavData.subTitle);

      // console.log(pageNavData);
    }
  }

  onReOpenIconClicked(pageNavData: IPageNavigatorData) {
    const component = this.componentsMap.get(pageNavData.id);
    if (component) {
      if(pageNavData.assetType == ASSET_TYPE_CONSTANTS.kpiPage || pageNavData.assetType == ASSET_TYPE_CONSTANTS.ratingPage) {
        this.selectedComponent = component;
        this.selectedComponent.instance.reOpenCompletedSection();
      } else {
        this.utilservice.showToast('Section', `Action Forbidden.`, ToastTypes.ERROR);
      }
    }
  }

  setPageTitle(title: string) {
    if (this.selectedComponent) {
      this.selectedComponent.instance.setPageTitle(title);
    }
  }

  setPageSubTitle(subTitle: string) {
    if (this.selectedComponent) {
      this.selectedComponent.instance.setPageSubTitle(subTitle);
    }
  }

  get isSectionCompleted(): boolean {
    if (this.selectedComponent) {
      const instance = (<IReviewPageComponent>this.selectedComponent.instance);
      return instance.isCompleted;
    } else {
      return false;
    }
  }

  toggleSaveContinueButton(assetType: number) {
    const status = this.getSaveContinueButtonDisabledStatus(assetType);
    this.store.dispatch(new ToggleSaveContinueDisabledStatusAppraisalForms(status));
  }

  getSaveContinueButtonDisabledStatus(assetType: number): boolean {
    switch (assetType) {
      case AssetTypes.CUSTOM_PAGE:
        return false;
      case AssetTypes.KPI_PAGE:
        return false;
      case AssetTypes.RATING_PAGE:
        return false;
      case AssetTypes.CONTRACT_PAGE:
        return true;
      case AssetTypes.COMPETENCY_PAGE:
        return false;
      case AssetTypes.SUBSCRIPTION_PAGE:
        return true;
      case AssetTypes.THREE_SIXTY_RATING_PAGE:
        return false;
      case AssetTypes.RATING_FEEDBACK_PAGE:
        return false;
      default:
        return true;
    }
  }

  showPage(pageId: number) {
    const component = this.componentsMap.get(pageId);

    if (component) {
      component.instance.show = true;
    }
  }

  hideAllPages() {
    this.hideDynamicPages();
    this.hideStaticPages();
  }

  hideDynamicPages() {
    for (let pageId of this.componentsMap.keys()) {
      const component = this.componentsMap.get(pageId);
      if (component) {
        component.instance.show = false;
      }
    }
  }

  hideStaticPages() {
    if (this.profilePageComponent) {
      this.profilePageComponent.instance.show = false;
    }

    if (this.employeeSummaryPageComponent) {
      this.employeeSummaryPageComponent.instance.show = false;
    }

    if (this.supervisorSummaryPageComponent) {
      this.supervisorSummaryPageComponent.instance.show = false;
    }

    if (this.supervisorTwoSummaryPageComponent) {
      this.supervisorTwoSummaryPageComponent.instance.show = false;
    }

    if (this.employeeArSummaryPageComponent) {
      this.employeeArSummaryPageComponent.instance.show = false;
    }

    if (this.reviewerSummaryPageComponent) {
      this.reviewerSummaryPageComponent.instance.show = false;
    }

    if (this.moderatorSummaryPageComponent) {
      this.moderatorSummaryPageComponent.instance.show = false;
    }

    if (this.hrSummaryPageComponent) {
      this.hrSummaryPageComponent.instance.show = false;
    }
  }

  saveButtonClicked() {
    if (this.selectedComponent) {
      this.selectedComponent.instance.saveAndContinue();
    }
  }

  completeSectionButtonClicked() {
    if (this.selectedComponent) {
      this.selectedComponent.instance.completeSection();
    }
  }

  onProfilePageClick() {
    this.hideAllPages();

    this.pageNavigator.deSelect();

    if (this.profilePageComponent) {
      this.profilePageComponent.instance.show = true;
      this.selectedComponent = this.profilePageComponent;
    }
  }

  onSummaryPageClick() {
    this.hideAllPages();
    this.pageNavigator.deSelect();

    if (this.comprehensiveReviewWorkflowProcessData && this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess) {
      this.showSummaryPage(this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess.role);
    }
  }

  onScoreInfoPageClick() {
    if (this.comprehensiveReviewWorkflowProcessData && this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess) {
      this.store.dispatch(new LoadEmployeePageScoresAppraisalForms({ selectedPlan: this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess.plan_id, role: this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess.role, employeeId: this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess.employee_id, roleScoreRequired: 0}));
    }

    this.scorePageDialogRef = this.dialog.open(PageScoreComponent, {
      width: '550px',
      data: null,
      panelClass: 'custom-dialog-container'
    });
  }

  onQuickInfoPageClick() {
    if (this.comprehensiveReviewWorkflowProcessData && this.comprehensiveReviewWorkflowProcessData.employeeData && this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess) {
      this.store.dispatch(new LoadEmployeeInformationReportKeyAppraisalForms(this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess.employee_id));
    }
  }

  showSummaryPage(role: number) {
    this.hideAllPages();
    this.pageNavigator.deSelect();

    switch (role) {
      case RoleTypes.EMPLOYEE:
        if (this.employeeSummaryPageComponent) {
          this.employeeSummaryPageComponent.instance.show = true;
          (<IReviewPageComponent>this.employeeSummaryPageComponent.instance).load();

          this.selectedComponent = this.employeeSummaryPageComponent;
        }
        break;
      case RoleTypes.LINE_MANAGER:
        if (this.supervisorSummaryPageComponent) {
          this.supervisorSummaryPageComponent.instance.show = true;
          (<IReviewPageComponent>this.supervisorSummaryPageComponent.instance).load();

          this.selectedComponent = this.supervisorSummaryPageComponent;
        }
        break;
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        if (this.employeeArSummaryPageComponent) {
          this.employeeArSummaryPageComponent.instance.show = true;
          (<IReviewPageComponent>this.employeeArSummaryPageComponent.instance).load();

          this.selectedComponent = this.employeeArSummaryPageComponent;
        }
        break;
      case RoleTypes.REVIEWER_ASSESSING:
        if (this.supervisorTwoSummaryPageComponent) {
          this.supervisorTwoSummaryPageComponent.instance.show = true;
          (<IReviewPageComponent>this.supervisorTwoSummaryPageComponent.instance).load();

          this.selectedComponent = this.supervisorTwoSummaryPageComponent;
        }
        break;
      case RoleTypes.REVIEWER_REVIEWING:
        if (this.reviewerSummaryPageComponent) {
          this.reviewerSummaryPageComponent.instance.show = true;
          (<IReviewPageComponent>this.reviewerSummaryPageComponent.instance).load();

          this.selectedComponent = this.reviewerSummaryPageComponent;
        }
        break;
      case RoleTypes.MODERATION:
        if (this.moderatorSummaryPageComponent) {
          this.moderatorSummaryPageComponent.instance.show = true;
          (<IReviewPageComponent>this.moderatorSummaryPageComponent.instance).load();

          this.selectedComponent = this.moderatorSummaryPageComponent;
        }
        break;
      case RoleTypes.HR:
        if (this.hrSummaryPageComponent) {
          this.hrSummaryPageComponent.instance.show = true;
          (<IReviewPageComponent>this.hrSummaryPageComponent.instance).load();

          this.selectedComponent = this.hrSummaryPageComponent;
        }
        break;
    }
  }

  private setReviewWorkflowData() {
    if (this.comprehensiveReviewWorkflowProcessData && this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess) {
      const planId = this.comprehensiveReviewWorkflowProcessData.reviewWorkflowProcess.plan_id;

      this.subscriptions['reviewWorkflowProcesses'] =  this.reviewWorkflowProcessService.getAll(planId).pipe(takeUntil(this.destroyed$)).subscribe((data: IApiResult) => {
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

  get isSelfReviewCompleted(): boolean {
    if (this.reviewWorkflowProcessService.firstReviewWorkflowProcess) {
      if (this.reviewWorkflowProcessService.firstReviewWorkflowProcess.status >= WorkflowProcessStatus.COMPLETED) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  destroyComponents() {
    for (let pageId of this.componentsMap.keys()) {
      const component = this.componentsMap.get(pageId);
      if (component) {
        component.destroy();
      }
    }
  }

  ngOnDestroy() {
    this.destroyComponents();
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
