import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { PageStatus, RatingEditMode, RoleTypes } from '../../../enumerations';
import { IReviewPageParameter, IRatingRowData } from '../../../models';
import { IReviewPageComponent } from '../../../interfaces';
import { Subscription } from 'rxjs/internal/Subscription';
import { RatingPageService } from './rating-page.service';
import { UtilService } from '@nutela/core-services';
import { MdbTableService } from 'ng-uikit-pro-standard';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { IReviewRatingPage, IEmployeeReviewForm, IReviewer } from '@nutela/models/talent/performance';
import { ToastTypes } from '@nutela/shared/app-global';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IPerformanceState } from '../../../store';
import { ReLoadPageNavigatorAppraisalForms } from '../../../store/reviews/appraisal-forms';

const DEFAULT_PAGE_TITLE = 'General Rating Review';
const DEFAULT_PAGE_SUB_TITLE = 'For each line item, select a rating and enter an appropriate comment.';

@Component({
  selector: 'x365-fm-talent-rating-page',
  templateUrl: './rating-page.component.html',
  styleUrls: ['./rating-page.component.scss']
})
export class RatingPageComponent implements OnInit, IReviewPageComponent {
  @Input() show: boolean;
  @Input() parameter: IReviewPageParameter;

  @Output() saveAndContinueProcessingEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() completeSectionProcessingEmitter: EventEmitter<boolean> = new EventEmitter();

  title: string = DEFAULT_PAGE_TITLE;
  subTitle: string = DEFAULT_PAGE_SUB_TITLE;

  data: IReviewRatingPage[];
  pageData: IEmployeeReviewForm;
  rowData: IRatingRowData[];
  previousRowData: IRatingRowData[];

  supervisors: IReviewer[];
  valueLabelSupervisors: ISelectOption[];

  selectedSupervisorId = '';
  loading = false;

  dataSubscription: Subscription;
  pageDataSubscription: Subscription;
  saveAndContinueSubscription: Subscription;
  completeSectionSubscription: Subscription;
  supervisorSubscription: Subscription;

  constructor(public service: RatingPageService,  private store: Store<IPerformanceState>, private utilservice: UtilService, private tableService: MdbTableService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.setData();
    this.setPageData();
    this.setSupervisors();
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

  setData() {
    if (this.isPageReview === false && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.dataSubscription = this.service.getData(this.parameter, this.parameter.reviewForm.PlanningInfo.id).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
        //  console.log('999999', data);

          const page = <IReviewRatingPage[]>data.Results;

          this.data = page;
          this.rowData = this.transformToRowData(page);
          // console.log('RRRRRRR', this.rowData);

        }
      });
    }
  }

  setSupervisors() {
    if (this.isPageReview === true && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.supervisorSubscription = this.service.getSupervisors(this.parameter, this.parameter.reviewForm.PlanningInfo.id).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          const supervisors = <IReviewer[]>data.Results;

          this.supervisors = supervisors;
          this.valueLabelSupervisors = this.utilservice.transformToSelectDataList(supervisors, 'reviewer_id', 'reviewer_name', true, {value: '0', label: 'Show All'})

          if (this.supervisors.length > 0) {
            if (this.isPageReview) {
              const firstSupervisor = this.valueLabelSupervisors[0];
              this.selectedSupervisorId = firstSupervisor.value;
              this.setDataBySupervisor(this.selectedSupervisorId);
            }
          }
        }
      });
    }
  }

  setDataBySupervisor(selectedSupervisorId: string) {
    if (this.isPageReview === true && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.loading = true;

      this.dataSubscription = this.service.getDataBySupervisor(this.parameter, this.parameter.reviewForm.PlanningInfo.id, selectedSupervisorId).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          const page = <IReviewRatingPage[]>data.Results;

          this.data = page;
          this.rowData = this.transformToRowData(page);

          // console.log('this.rowData', this.rowData);

          // this.tableService.setDataSource(this.service.rowData);
          // this.service.rowData = this.tableService.getDataSource();
          // this.service.previousRowData = this.tableService.getDataSource();
        }
      }, (error) => {}, () => { this.loading = false; });
    }
  }

  setPageData() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.pageDataSubscription = this.service.getPageData(this.parameter, this.parameter.pageId).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          this.pageData = <IEmployeeReviewForm>data.Results[0];
        }
      });
    }
  }

  transformToRowData(pages: IReviewRatingPage[]): IRatingRowData[] {
    let list: IRatingRowData[] = [];

    pages.forEach(element => {
      const data: IRatingRowData = {
        id: element.id,
        title: element.title,
        detail: element.detail,
        weight: element.RatingAssetDetailsInfo ? element.RatingAssetDetailsInfo.weight : null,
        info: element.info,
        emp_comment: element.emp_comment,
        reviewer_comment: element.reviewer_comment,

        // empRating: element.emp_rating_list, // Non transformed ratings for empl
        // reviewrRatings: element.reviewer_rating_list, // Non transformed ratings for reviewer

        employeeRatings: this.getRatings(element.emp_rating_list),
        reviewerRatings: this.getRatings(element.reviewer_rating_list),

        empRatingValue: element.emp_rating_value,
        empRatingText: element.emp_rating,

        revRatingValue: element.reviewer_rating_value,
        revRatingText: element.reviewer_rating,

        errorText: element.error_comment,
        hasErrors: element.has_issues,
        show: true,
        allowSelfRating: element.allow_self_rating
      }

      list.push(data);
    });

    return list;
  }

  onSupervisorSelected($event) {
    this.selectedSupervisorId = $event.value;
    this.setDataBySupervisor(this.selectedSupervisorId);
  }

  saveAndContinue(): void {
    if (this.data && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.saveAndContinueProcessingEmitter.emit(true);

      const planId = this.parameter.reviewForm.PlanningInfo.id;

      const body =  this.getSaveAndContinueBody();
      // console.log('getSaveAndContinueBody', body);

      this.saveAndContinueSubscription = this.service.saveAndContinue(this.parameter, planId, body).subscribe(data => {
        if (data.Success) {
          this.utilservice.showToast('Save and Continue', `Data was saved successfully.`, ToastTypes.SUCCESS);
          // Refresh
          this.setPageData();
          this.setData();
        } else {
          this.utilservice.showToast('Save and Continue: Error Occured', data.ErrorMessage, ToastTypes.ERROR);
        }
      }, (error) => {
        this.saveAndContinueProcessingEmitter.emit(false);

        this.utilservice.showToast('Save and Continue: Error Occured', `Something went wrong. Data was not saved.`, ToastTypes.ERROR);
      }, () => {
        this.saveAndContinueProcessingEmitter.emit(false);
      });
    } else {
      this.utilservice.showToast('Save and Continue: Error Occured', `Something went wrong. Not enough data to proceed.`, ToastTypes.ERROR);
    }
  }

  completeSection(): void {
    if (this.data && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.completeSectionProcessingEmitter.emit(true);

      const pageId = this.parameter.pageId;
      const planId = this.parameter.reviewForm.PlanningInfo.id;
      const employeeId = this.parameter.reviewForm.EmployeeInfo.employee_id;

      this.completeSectionSubscription = this.service.completeSection(this.parameter, pageId, planId).subscribe(data => {
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
    this.service.reOpenCompletedSection(pageId, employeeId, planId).pipe(take(1)).subscribe((data) => {
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

  getSaveAndContinueBody(): IRatingSaveAndContinueBody[] | IRatingLMSaveAndContinueBody[] {
    switch (this.parameter.role) {
      case RoleTypes.EMPLOYEE:
        return this.getEmployeeSaveAndContinueBody();
      case RoleTypes.LINE_MANAGER:
        return this.getLineManagerSaveAndContinueBody();
      case RoleTypes.EMPLOYEE_ACCEPT_REJECT:
        return null;
      case RoleTypes.REVIEWER_ASSESSING:
        return this.getLineManagerSaveAndContinueBody();
      case RoleTypes.REVIEWER_REVIEWING:
        return null;
      case RoleTypes.MODERATION:
        return null;
      case RoleTypes.HR:
        return null;
    }
  }

  getEmployeeSaveAndContinueBody(): IRatingSaveAndContinueBody[] {
    let list: IRatingSaveAndContinueBody[] = [];

    if (this.rowData) {
      this.rowData.forEach(element => {
        const data: IRatingSaveAndContinueBody = {
          rating_id: element.id,
          emp_comment: element.emp_comment,
          emp_rating: (this.parameter.useDirectRatingValueForPerformance === true) ? element.empRatingValue : element.empRatingText,
          emp_rating_value: element.empRatingValue
        }

        list.push(data);
      });
    }

    return list;
  }

  getLineManagerSaveAndContinueBody(): IRatingLMSaveAndContinueBody[] {
    let list: IRatingLMSaveAndContinueBody[] = [];

    if (this.rowData) {
      this.rowData.forEach(element => {
        const data: IRatingLMSaveAndContinueBody = {
          rating_id: element.id,
          mgr_comment: element.reviewer_comment,
          mgr_rating: (this.parameter.useDirectRatingValueForPerformance === true) ? element.revRatingValue : element.revRatingText,
          mgr_rating_value: element.revRatingValue
        }

        list.push(data);
      });
    }

    return list;
  }

  getRatings(ratingString: string): ISelectOption[] {
    let list: ISelectOption[] = [];
    const ar = ratingString.split(',');
      ar.forEach(element => {
        const ay = element.split('=');
        const ap = {
          value: +ay[0].trim(),
          label: ay[1].trim()
        }

        list.push(ap);
      }
    );

    return list;
  }

  get isPageReview(): boolean {
    if (this.parameter) {
      if ((this.parameter.role === RoleTypes.EMPLOYEE_ACCEPT_REJECT) || (this.parameter.role === RoleTypes.REVIEWER_REVIEWING)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get isCompleted(): boolean {
    if (this.pageData) {
      return this.pageData.status === PageStatus.COMPLETED? true: false;
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
          return this.getLineManagerMode;
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

  get getEmployeeMode(): RatingEditMode {
    if (this.isCompleted) {
      return RatingEditMode.EMP_READ_ONLY;
    } else {
      return RatingEditMode.EMP_EDIT;
    }
  }

  get getLineManagerMode(): RatingEditMode {
    if (this.isCompleted) {
      return RatingEditMode.LMGR_READ_ONLY;
    } else {
      return RatingEditMode.LMGR_EDIT;
    }
  }
}

interface IRatingSaveAndContinueBody {
  rating_id: number;
  emp_comment: string;
  emp_rating: string;
  emp_rating_value: string;
}

interface IRatingLMSaveAndContinueBody {
  rating_id: number;
  mgr_comment: string;
  mgr_rating: string;
  mgr_rating_value: string;
}
