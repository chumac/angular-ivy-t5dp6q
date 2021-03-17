import { Component, OnInit, Input, ChangeDetectorRef,  ViewChild, HostListener, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { PageStatus, RoleTypes, RatingEditMode } from '../../../enumerations';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { IReviewPageParameter, IKPIRowData, IPageNavigatorData } from '../../../models';
import { KPIPageService } from './kpi-page.service';
import { MdbTableService, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { IReviewKPIPage, IObjectiveRating, IPerspective, IEmployeeReviewForm, IReviewer } from '@nutela/models/talent/performance';
import { UtilService } from '@nutela/core-services';
import { ToastTypes } from '@nutela/shared/app-global';
import { IReviewPageComponent } from '../../../interfaces';
import { Subscription } from 'rxjs/internal/Subscription';
import { take, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IPerformanceState } from '../../../store';
import { LoadEmployeeReviewFormsAppraisalForms, LoadPageNavigatorAppraisalForms, ReLoadPageNavigatorAppraisalForms } from '../../../store/reviews/appraisal-forms';
import { ReplaySubject } from 'rxjs';

const DEFAULT_PAGE_TITLE = 'Objective Rating';
const DEFAULT_PAGE_SUB_TITLE = 'For each objective, select a rating and enter an appropriate comment.';

@Component({
  selector: 'x365-fm-talent-kpi-page',
  templateUrl: './kpi-page.component.html',
  styleUrls: ['./kpi-page.component.scss'],
  providers: [KPIPageService]
})
export class KpiPageComponent implements OnInit, OnDestroy, IReviewPageComponent, AfterViewInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @Input() show: boolean;
  @Input() parameter: IReviewPageParameter;

  @Output() saveAndContinueProcessingEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() completeSectionProcessingEmitter: EventEmitter<boolean> = new EventEmitter();

  title: string = DEFAULT_PAGE_TITLE;
  subTitle: string = DEFAULT_PAGE_SUB_TITLE;

  selectedSupervisorId = '';
  loading = false;

  dataSubscription: Subscription;
  pageDataSubscription: Subscription;
  perspectiveSubscription: Subscription;
  ratingSubscription: Subscription;
  saveAndContinueSubscription: Subscription;
  completeSectionSubscription: Subscription;
  supervisorSubscription: Subscription;

  firstItemIndex;
  lastItemIndex;

  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;

  constructor(public service: KPIPageService, private store: Store<IPerformanceState>, private utilservice: UtilService, private tableService: MdbTableService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.setPerspectives();
    this.setRatings();
    this.setData();
    this.setPageData();
    this.setSupervisors();
  }

  ngAfterViewInit() {
    // this.mdbTablePagination.setMaxVisibleItemsNumberTo(2);

    // this.firstItemIndex = this.mdbTablePagination.firstItemIndex;
    // this.lastItemIndex = this.mdbTablePagination.lastItemIndex;

    // this.mdbTablePagination.calculateFirstItemIndex();
    // this.mdbTablePagination.calculateLastItemIndex();
    // this.cdRef.detectChanges();
  }

  setPageTitle(value: string) {
    if (value !== '') {
      this.title = value;
    }
  }

  setPageSubTitle(value: string) {
    if (value !== '') {
      this.subTitle = value;
    }
  }

  get pageTitle(): string {
    if (this.title === '') {
      return DEFAULT_PAGE_TITLE;
    } else {
      return this.title;
    }
  }

  get pageSubTitle(): string {
    if (this.subTitle === '') {
      return DEFAULT_PAGE_SUB_TITLE;
    } else {
      return this.subTitle;
    }
  }

  setPerspectives() {
    this.perspectiveSubscription = this.service.getPerspectives().pipe(takeUntil(this.destroyed$)).subscribe((data: IApiResult) => {
      if (data.Success && data.Results) {
        const perspectives = <IPerspective[]>data.Results;

        this.service.perspectives = perspectives;
        this.service.valueLabelPerspectives = this.utilservice.transformToSelectDataList(perspectives, 'id', 'description', true, {value: '0', label: 'Show All'})
      }
    });
  }

  setSupervisors() {
    if (this.isPageReview === true && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.supervisorSubscription = this.service.getSupervisors(this.parameter, this.parameter.reviewForm.PlanningInfo.id).pipe(takeUntil(this.destroyed$)).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          const supervisors = <IReviewer[]>data.Results;

          // console.log(data);

          this.service.supervisors = supervisors;
          this.service.valueLabelSupervisors = this.utilservice.transformToSelectDataList(supervisors, 'reviewer_id', 'reviewer_name', true, {value: '0', label: 'Show All'})

          if (this.service.supervisors.length > 0) {
            if (this.isPageReview) {
              const firstSupervisor = this.service.valueLabelSupervisors[0];
              this.selectedSupervisorId = firstSupervisor.value;
              this.setDataBySupervisor(this.selectedSupervisorId);
            }
          }
        }
      });
    }
  }

  setRatings() {
    this.ratingSubscription = this.service.getRatings().pipe(takeUntil(this.destroyed$)).subscribe((data: IApiResult) => {
      if (data.Success && data.Results) {
        const ratings = <IObjectiveRating[]>data.Results;

        // console.log('ratings', ratings);

        this.service.ratings = ratings;
        this.service.valueLabelRatings = this.utilservice.transformToSelectDataList(ratings, 'id', 'description');
      }
    });
  }

  setData() {
    if (this.isPageReview === false && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.dataSubscription = this.service.getData(this.parameter, this.parameter.reviewForm.PlanningInfo.id).pipe(takeUntil(this.destroyed$)).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          const page = <IReviewKPIPage[]>data.Results;

          this.service.data = page;
          this.service.rowData = this.transformToRowData(page);
          // this.tableService.setDataSource(this.service.rowData);
          // this.service.rowData = this.tableService.getDataSource();
          // this.service.previousRowData = this.tableService.getDataSource();
        }
      });
    }
  }

  setDataBySupervisor(selectedSupervisorId: string) {
    if (this.isPageReview === true && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.loading = true;

      this.dataSubscription = this.service.getDataBySupervisor(this.parameter, this.parameter.reviewForm.PlanningInfo.id, selectedSupervisorId).pipe(takeUntil(this.destroyed$)).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          const page = <IReviewKPIPage[]>data.Results;

          this.service.data = page;
          this.service.rowData = this.transformToRowData(page);


          // this.tableService.setDataSource(this.service.rowData);
          // this.service.rowData = this.tableService.getDataSource();
          // this.service.previousRowData = this.tableService.getDataSource();
        }
      }, (error) => {}, () => { this.loading = false; });
    }
  }

  setPageData() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.pageDataSubscription = this.service.getPageData(this.parameter, this.parameter.pageId).pipe(takeUntil(this.destroyed$)).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          this.service.pageData = <IEmployeeReviewForm>data.Results[0];
        }
      });
    }
  }

  transformToRowData(pages: IReviewKPIPage[]): IKPIRowData[] {
    let list: IKPIRowData[] = [];

    if (pages) {
      pages.forEach(element => {
        const data: IKPIRowData = {
          id: element.id,
          objectiveId: element.objective_id || element.ObjectiveInfo.id,
          objective: element.description,
          measure: element.metric,
          target: element.target,
          weight: element.weight,
          dueDate: element.due_date,
          trendRate: element.perc_complete,
          trendLowerIsBetter: element.lower_is_better,
          ratingIsRequired: element.req_rating,
          commentIsRequired: element.req_comments,
          ratingId: element.rating_id,
          comment: element.emp_comments,
          ratingValue: element.emp_rating_value,
          ratingText: element.emp_rating_text,
          errorText: element.error_comment,
          hasErrors: element.has_issues,
          lmComment: element.lm_comments,
          lmRatingText: element.lm_rating_text,
          lmRatingValue: element.lm_rating_value,
          lmRatingId: element.lm_rating_id,
          perspectiveId: element.PerspectiveInfo? element.PerspectiveInfo.id : -1,
          show: true,
          legend_info: element.legend_info,
          allowSelfRating: element.allow_self_rating
        }

        list.push(data);
      });
    }

    return list;
  }

  onSupervisorSelected($event) {
    this.selectedSupervisorId = $event.value;
    this.setDataBySupervisor(this.selectedSupervisorId);
  }

  saveAndContinue(): void {
    if (this.service.data && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.saveAndContinueProcessingEmitter.emit(true);

      const planId = this.parameter.reviewForm.PlanningInfo.id;

      const body =  this.getSaveAndContinueBody();
      // console.log('KPI getSaveAndContinueBody', body);


      this.saveAndContinueSubscription = this.service.saveAndContinue(this.parameter, planId, body).pipe(takeUntil(this.destroyed$)).subscribe(data => {
        if (data.Success) {
          this.utilservice.showToast('Save and Continue', `Data was saved successfully.`, ToastTypes.SUCCESS);
          // Refresh
          this.setPageData();
          this.setData();
        } else {
          this.setData();
          this.utilservice.showToast('Save and Continue: Error Occured', data.ErrorMessage, ToastTypes.ERROR);
        }
      }, (error) => {
        this.saveAndContinueProcessingEmitter.emit(false);
        // console.log(JSON.stringify(error))
        this.utilservice.showToast('Save and Continue: Error Occured', `Something went wrong. Data was not saved.`, ToastTypes.ERROR);
      }, () => {
        this.saveAndContinueProcessingEmitter.emit(false);
      });
    } else {
      this.utilservice.showToast('Save and Continue: Error Occured', `Something went wrong. Not enough data to proceed.`, ToastTypes.ERROR);
    }
  }

  completeSection(): void {
    if (this.service.data && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.completeSectionProcessingEmitter.emit(true);
      const pageId = this.parameter.pageId;
      const planId = this.parameter.reviewForm.PlanningInfo.id;
      const employeeId = this.parameter.reviewForm.EmployeeInfo.employee_id;

      this.completeSectionSubscription = this.service.completeSection(this.parameter, pageId, planId).pipe(takeUntil(this.destroyed$)).subscribe(data => {
        if (data.Success) {
          this.utilservice.showToast('Complete Section', `Section was completed successfully.`, ToastTypes.SUCCESS);
          // Refresh
          if(this.parameter.role === RoleTypes.EMPLOYEE){
            this.store.dispatch(new ReLoadPageNavigatorAppraisalForms({selectedPlan: planId, role: RoleTypes.EMPLOYEE, employeeId: employeeId}));
          }
          if(this.parameter.role === RoleTypes.LINE_MANAGER){
            this.store.dispatch(new ReLoadPageNavigatorAppraisalForms({selectedPlan: planId, role: RoleTypes.LINE_MANAGER, employeeId: employeeId}));
          }
          if(this.parameter.role === RoleTypes.REVIEWER_ASSESSING){
            this.store.dispatch(new ReLoadPageNavigatorAppraisalForms({selectedPlan: planId, role: RoleTypes.REVIEWER_ASSESSING, employeeId: employeeId}));
          }
          this.setPageData();
          this.setData();
        } else {
          this.setData();
          this.utilservice.showToast('Complete Section: Error Occured', data.ErrorMessage, ToastTypes.ERROR);
        }
      }, (error) => {
        this.completeSectionProcessingEmitter.emit(false);
        this.utilservice.showToast('Complete Section: Error Occured', `Something went wrong. Section not completed.`, ToastTypes.ERROR);
      }, () => {
        this.completeSectionProcessingEmitter.emit(false);
      });
    } else {
      this.utilservice.showToast('Complete Section: Error Occured', `Something went wrong. Not enough data to proceed.`, ToastTypes.ERROR);
    }
  }

  reOpenCompletedSection(): void {
    const pageId = this.parameter.pageId;
    const planId = this.parameter.reviewForm.PlanningInfo.id;
    const employeeId = this.parameter.reviewForm.EmployeeInfo.employee_id;
    this.service.reOpenCompletedSection(pageId, employeeId, planId).pipe(take(1)).pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      if(data.Success) {
        this.utilservice.showToast('Section', `Section was re-opened successfully.`, ToastTypes.SUCCESS);
        //Refresh
        if(this.parameter.role === RoleTypes.EMPLOYEE){
          this.store.dispatch(new ReLoadPageNavigatorAppraisalForms({selectedPlan: planId, role: RoleTypes.EMPLOYEE, employeeId: employeeId}));
        }
        if(this.parameter.role === RoleTypes.LINE_MANAGER){
          this.store.dispatch(new ReLoadPageNavigatorAppraisalForms({selectedPlan: planId, role: RoleTypes.LINE_MANAGER, employeeId: employeeId}));
        }
        if(this.parameter.role === RoleTypes.REVIEWER_ASSESSING){
          this.store.dispatch(new ReLoadPageNavigatorAppraisalForms({selectedPlan: planId, role: RoleTypes.REVIEWER_ASSESSING, employeeId: employeeId}));
        }
        this.setPageData();
        this.setData();
      } else {
        this.setData();
        this.utilservice.showToast('Section: Error Occured', data.ErrorMessage, ToastTypes.ERROR);
      }
    });
  }

  getSaveAndContinueBody(): IKPISaveAndContinueBody[] | IKPILMSaveAndContinueBody[] {
    switch (this.parameter.role) {
      case RoleTypes.EMPLOYEE:
        return this.getEmployeeSaveAndContinueBody();
      case RoleTypes.LINE_MANAGER:
        return this.getLineManagerSaveAndContinueBody();
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return null;
      case RoleTypes.REVIEWER_ASSESSING:
        return null;
      case RoleTypes.REVIEWER_REVIEWING:
        return null;
      case RoleTypes.MODERATION:
        return null;
      case RoleTypes.HR:
        return null;
    }
  }

  getEmployeeSaveAndContinueBody(): IKPISaveAndContinueBody[] {
    let list: IKPISaveAndContinueBody[] = [];

    if (this.service.rowData) {
      this.service.rowData.forEach(element => {
        const data: IKPISaveAndContinueBody = {
          self_review_id: element.id,
          rating_id: (element.ratingId===0 ? null : element.ratingId),
          emp_comments: element.comment,
          emp_rating_value: element.ratingValue,
          emp_rating_text: (this.parameter.useDirectObjectiveValueForPerformance === true) ? (element.ratingValue? element.ratingValue.toString(): null) : element.ratingText
        }

        list.push(data);
      });
    }

    return list;
  }

  getLineManagerSaveAndContinueBody(): IKPILMSaveAndContinueBody[] {
    let list: IKPILMSaveAndContinueBody[] = [];

    if (this.service.rowData) {
      this.service.rowData.forEach(element => {
        const data: IKPILMSaveAndContinueBody = {
          lm_review_id: element.id,
          lm_rating_id: (element.lmRatingId===0 ? null : element.lmRatingId),
          lm_comments: element.lmComment,
          lm_rating_value: element.lmRatingValue,
          lm_rating_text: (this.parameter.useDirectObjectiveValueForPerformance === true) ? String(element.lmRatingValue) : element.lmRatingText,
        }

        list.push(data);
      });
    }

    return list;
  }

  get isPageReview(): boolean {
    if (this.parameter) {
      if ((this.parameter.role === RoleTypes.EMPLOYEE_ACCEPT_REJECT) || (this.parameter.role === RoleTypes.REVIEWER_REVIEWING) || (this.parameter.role === RoleTypes.MODERATION) || (this.parameter.role === RoleTypes.HR)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get isCompleted(): boolean {
    if (this.service.pageData) {
      return this.service.pageData.status === PageStatus.COMPLETED? true: false;
    } else {
      return false;
    }
  }

  get getMode(): RatingEditMode {
    if (this.parameter) {
      switch (this.parameter.role) {
        case RoleTypes.EMPLOYEE:
          return this.getEmployeeMode;
        case RoleTypes.LINE_MANAGER:
          return this.getLineManagerMode;
        case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
          return this.getLineManagerMode;
        case RoleTypes.REVIEWER_ASSESSING:
          return 0;
        case RoleTypes.REVIEWER_REVIEWING:
          return this.getLineManagerMode;
        case RoleTypes.MODERATION:
          return this.getLineManagerMode;
        case RoleTypes.HR:
          return this.getLineManagerMode;
      }
    } else {
      return RatingEditMode.EMP_EDIT;
    }
  }

  get getEmployeeMode(): RatingEditMode{
    if (this.isCompleted) {
      return RatingEditMode.EMP_READ_ONLY;
    } else {
      return RatingEditMode.EMP_EDIT;
    }
  }

  get getLineManagerMode(): RatingEditMode{
    if (this.isCompleted) {
      return RatingEditMode.LMGR_READ_ONLY;
    } else {
      return RatingEditMode.LMGR_EDIT;
    }
  }

  onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
  }

  onPerspectiveSelected($event: ISelectOption) {
    if ($event.value === '0') {
      this.showAllItems();
    } else {
      this.service.rowData.forEach(element => {
        if (element.perspectiveId === Number($event.value)) {
          element.show = true;
        } else {
          element.show = false;
        }
      });
    }
  }

  showAllItems() {
    this.service.rowData.forEach(element => {
      element.show = true;
    });
  }

  unsubscribe() {
    this.utilservice.unsubscribe(this.dataSubscription);
    this.utilservice.unsubscribe(this.pageDataSubscription);
    this.utilservice.unsubscribe(this.supervisorSubscription);
    this.utilservice.unsubscribe(this.perspectiveSubscription);
    this.utilservice.unsubscribe(this.ratingSubscription);
    this.utilservice.unsubscribe(this.saveAndContinueSubscription);
    this.utilservice.unsubscribe(this.completeSectionSubscription);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.unsubscribe();
  }

}

interface IKPISaveAndContinueBody {
  self_review_id: number;
  rating_id: number;
  emp_comments: string;
  emp_rating_value: number;
  emp_rating_text: string;
}

interface IKPILMSaveAndContinueBody {
  lm_review_id: number;
  lm_rating_id: number;
  lm_comments: string;
  lm_rating_value: number;
  lm_rating_text: string;
}
