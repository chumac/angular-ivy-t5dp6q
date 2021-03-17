import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { PageStatus, RatingEditMode, RoleTypes } from '../../../enumerations';
import { IReviewPageParameter, IRatingRowData, IThreeSixtyRatingRowData } from '../../../models';
import { IReviewPageComponent } from '../../../interfaces';
import { Subscription } from 'rxjs/internal/Subscription';
import { ThreeSixtyRatingPageService } from './three-sixty-rating-page.service';
import { UtilService } from '@nutela/core-services';
import { MdbTableService } from 'ng-uikit-pro-standard';
import { IApiResult, ISelectOption } from '@nutela/models/core-data';
import { IReviewRatingPage, IEmployeeReviewForm, IReviewPeer } from '@nutela/models/talent/performance';
import { ToastTypes } from '@nutela/shared/app-global';

const DEFAULT_PAGE_TITLE = '360 Rating Review';
const DEFAULT_PAGE_SUB_TITLE = 'For each line item, select a rating and enter an appropriate comment.';

@Component({
  selector: 'x365-fm-talent-three-sixty-rating-page',
  templateUrl: './three-sixty-rating-page.component.html',
  styleUrls: ['./three-sixty-rating-page.component.scss']
})
export class ThreeSixtyRatingPageComponent implements OnInit, IReviewPageComponent {
  @Input() show: boolean;
  @Input() parameter: IReviewPageParameter;

  @Output() saveAndContinueProcessingEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() completeSectionProcessingEmitter: EventEmitter<boolean> = new EventEmitter();

  title: string = DEFAULT_PAGE_TITLE;
  subTitle: string = DEFAULT_PAGE_SUB_TITLE;

  selectedPeerId = '';
  loading = false;

  dataSubscription: Subscription;
  pageDataSubscription: Subscription;
  saveAndContinueSubscription: Subscription;
  completeSectionSubscription: Subscription;

  constructor(public service: ThreeSixtyRatingPageService, private utilservice: UtilService, private tableService: MdbTableService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getReviewPeers();
    this.setDataEmployee();
    this.setPageData();
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

  rowData(): IThreeSixtyRatingRowData[] {
    if (this.isPeerReview) {
      return this.service.rowData(this.selectedPeerId);
    } else {
      return this.service.rowDataEmployee;
    }
  }

  setData(peerId: string) {
    if (!this.service.rowDataMap.has(peerId)) {
      if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
        this.loading = true;

        this.dataSubscription = this.service.getData(this.parameter, this.parameter.reviewForm.PlanningInfo.id, peerId).subscribe((data: IApiResult) => {
          if (data.Success && data.Results) {
            const result = <IReviewRatingPage[]>data.Results;
            const rowData = this.transformToRowData(result);
            this.service.rowDataMap[peerId] = rowData;
          }
        }, (error) => {}, () => { this.loading = false; } );
      }
    }
  }

  setDataEmployee() {
    if (!this.isPeerReview && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      const peerId = '';
      this.loading = true;

      this.dataSubscription = this.service.getData(this.parameter, this.parameter.reviewForm.PlanningInfo.id, peerId).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          const result = <IReviewRatingPage[]>data.Results;
          const rowData = this.transformToRowData(result);
          this.service.rowDataEmployee = rowData;

          // console.log('this.service.rowDataEmployee', this.service.rowDataEmployee);
        }
      }, (error) => {}, () => { this.loading = false; } );
    }
  }

  setPageData() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.pageDataSubscription = this.service.getPageData(this.parameter, this.parameter.pageId).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          this.service.pageData = <IEmployeeReviewForm>data.Results[0];
        }
      });
    }
  }

  getReviewPeers() {
    if (this.isPeerReview && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.dataSubscription = this.service.getReviewPeers(this.parameter).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          const peers = <IReviewPeer[]>data.Results;
          this.service.reviewPeers = this.transformToReviewPeerList(peers)

          if (this.service.reviewPeers.length > 0) {
            const firstPeer = this.service.reviewPeers[0];
            this.selectedPeerId = firstPeer.value;
            this.setData(this.selectedPeerId);
          }
        }
      });
    }
  }

  transformToReviewPeerList(reviewPeers: IReviewPeer[]): ISelectOption[] {
    let list: ISelectOption[] = [];

    reviewPeers.forEach(element => {
      const data: ISelectOption = {
        value: element.EmployeeInfo.employee_id.toString() ,
        label: `${element.EmployeeInfo.employee_firstname} ${element.EmployeeInfo.employee_surname}`
      }

      list.push(data);
    });

    return list;
  }

  transformToRowData(pages: IReviewRatingPage[]): IThreeSixtyRatingRowData[] {
    let list: IThreeSixtyRatingRowData[] = [];

    pages.forEach(element => {
      const data: IThreeSixtyRatingRowData = {
        id: element.id,
        title: element.title,
        detail: element.detail,
        weight: element.weight,
        info: element.info,
        emp_comment: element.emp_comment,
        reviewer_comment: element.reviewer_rating_list,
        employeeRatings: this.getRatings(element.emp_rating_list),
        reviewerRatings: this.getRatings(element.reviewer_rating_list),

        empRatingValue: element.emp_rating_value,
        empRatingText: element.emp_rating,

        revRatingValue: element.reviewer_rating_value,
        revRatingText: element.reviewer_rating,

        errorText: '',
        hasErrors: false,
        show: true
      }

      list.push(data);
    });

    return list;
  }

  saveAndContinue(): void {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.saveAndContinueProcessingEmitter.emit(true);

      const planId = this.parameter.reviewForm.PlanningInfo.id;

      const body =  this.getSaveAndContinueBody();

      this.saveAndContinueSubscription = this.service.saveAndContinue(this.parameter, planId, this.selectedPeerId, body).subscribe(data => {
        if (data.Success) {
          this.utilservice.showToast('Save and Continue', `Data was saved successfully.`, ToastTypes.SUCCESS);
          // Refresh
          this.setPageData();
        } else {
          this.utilservice.showToast('Save and Continue: Error Occured', data.ErrorMessage, ToastTypes.ERROR);
        }
      }, (error) => {
        this.utilservice.showToast('Save and Continue: Error Occured', `Something went wrong. Data was not saved.`, ToastTypes.ERROR);
      }, () => {
        this.saveAndContinueProcessingEmitter.emit(false);
      });
    } else {
      this.utilservice.showToast('Save and Continue: Error Occured', `Something went wrong. Not enough data to proceed.`, ToastTypes.ERROR);
    }
  }

  completeSection(): void {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.completeSectionProcessingEmitter.emit(true);

      const pageId = this.parameter.pageId;
      const planId = this.parameter.reviewForm.PlanningInfo.id;

      this.completeSectionSubscription = this.service.completeSection(this.parameter, pageId, planId).subscribe(data => {
        if (data.Success) {
          this.utilservice.showToast('Complete Section', `Section was completed successfully.`, ToastTypes.SUCCESS);
          // Refresh
          this.setPageData();
        } else {
          this.utilservice.showToast('Complete Section: Error Occured', data.ErrorMessage, ToastTypes.ERROR);
        }
      }, (error) => {
        this.utilservice.showToast('Complete Section: Error Occured', `Something went wrong. Section not completed.`, ToastTypes.ERROR);
      }, () => {
        this.completeSectionProcessingEmitter.emit(false);
      });
    } else {
      this.utilservice.showToast('Complete Section: Error Occured', `Something went wrong. Not enough data to proceed.`, ToastTypes.ERROR);
    }
  }

  getSaveAndContinueBody(): IThreeSixtyRatingSaveAndContinueBody[] {
    let list: IThreeSixtyRatingSaveAndContinueBody[] = [];

    const rowData = this.rowData();
    if (rowData) {
      rowData.forEach(element => {
        const data: IThreeSixtyRatingSaveAndContinueBody = {
          rating_id: element.id,
          emp_comment_rq: true,
          emp_comment: element.emp_comment,
          emp_rating: element.empRatingText,
          emp_rating_value: element.empRatingValue
        }

        list.push(data);
      });
    }

    return list;
  }

  onPeerSelected($event) {
    this.selectedPeerId = $event.value;
    this.setData(this.selectedPeerId);
  }

  getRatings(ratingString: string): ISelectOption[] {
    let list: ISelectOption[] = [];
    const ar = ratingString.split(',');
      ar.forEach(element => {
        const ay = element.split('=');
        const ap = {
          value: ay[0],
          label: ay[1]
        }

        list.push(ap);
      }
    );

    return list;
  }

  get isPeerReview(): boolean {
    if (this.parameter) {
      if (this.parameter.role === RoleTypes.EMPLOYEE) {
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
          return this.getEmployeeMode;
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
    return RatingEditMode.EMP_READ_ONLY;
  }
}

interface IThreeSixtyRatingSaveAndContinueBody {
  rating_id: number;
  emp_comment_rq: true;
  emp_comment: string;
  emp_rating: string;
  emp_rating_value: string;
}

