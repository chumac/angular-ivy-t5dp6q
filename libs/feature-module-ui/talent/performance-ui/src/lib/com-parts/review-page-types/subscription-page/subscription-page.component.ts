import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';

import { IReviewPageParameter, ISubscriptionRowData } from '../../../models';
import { IReviewPageComponent } from '../../../interfaces';
import { DxListComponent } from 'devextreme-angular';
import { CheckboxComponent, MdbTableService } from 'ng-uikit-pro-standard';
import { RoleTypes, PageStatus } from '../../../enumerations';
import { Subscription, Observable, from, of } from 'rxjs';
import { SubscriptionPageService } from './subscription-page.service';
import { ICourse, IReviewSubscriptionPage, IReviewer, IEmployeeReviewForm } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { IgxGridComponent } from 'igniteui-angular';
import { SubscriptionRowTemplateComponent } from '../../page-row-templates/subscription-row-template/subscription-row-template.component';
import { UtilService } from '@nutela/core-services';
import { ToastTypes } from '@nutela/shared/app-global';
import { ISubscriptions } from '@nutela/models/common';
import { take, map } from 'rxjs/operators';

const DEFAULT_PAGE_TITLE = 'Training';
const DEFAULT_PAGE_SUB_TITLE = 'The upper part of the form lists all currently selected courses. Use the lower part for course selection.';

@Component({
  selector: 'x365-fm-talent-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.scss'],
  providers: [SubscriptionPageService]
})
export class SubscriptionPageComponent implements OnInit, IReviewPageComponent {

  masterSelected:boolean;
  checklist:any;
  selectedAddedCourses:any;
  addedCourses: ICourse[];
  employeeSelectedCourses: ICourse[];
  dataSubscription: Subscription;
  pageDataSubscription: Subscription;
  supervisorSubscription: Subscription;
  completeSectionSubscription: Subscription;
  selectedSupervisorId = '';
  loading = false;
  disableButton: boolean = false

  private subscriptions: ISubscriptions = {};

  courseSubscription: Subscription;

  @Input() show: boolean;
  @Input() parameter: IReviewPageParameter;

  title: string = DEFAULT_PAGE_TITLE;
  subTitle: string = DEFAULT_PAGE_SUB_TITLE;

  @Output() saveAndContinueProcessingEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() completeSectionProcessingEmitter: EventEmitter<boolean> = new EventEmitter();

  @ViewChild("coursesList") public coursesList: DxListComponent;
  @ViewChild("ch") public ch: CheckboxComponent;
  @ViewChild("myCoursesDataGrid") public myCoursesDataGrid: IgxGridComponent;
  @ViewChild("subscriptionRowTemplate") public subscriptionRowTemplate: SubscriptionRowTemplateComponent;

  constructor(public service: SubscriptionPageService, private tableService: MdbTableService, private cdRef: ChangeDetectorRef, private utilservice: UtilService) {
    this.masterSelected = false;

  }

  ngOnInit() {
    this.setCourses();
    this.setData();
    this.setPageData();
    this.setSupervisors();
  }

  setPageTitle(value: string) {
    if (value !== '' && value !== null) {
      this.title = value;
    }
  }

  setPageSubTitle(value: string) {
    if (value !== '' && value !== null) {
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

  setCourses() {
    this.courseSubscription = this.service.getCourses().subscribe((data: IApiResult) => {
      if (data.Success && data.Results) {
        const courses = <ICourse[]>data.Results;
        this.service.courses = courses.map(course => ({
          ...course,
          isSelected: false,
          comment: ""
        }));
      }
    });
  }


  setData() {
    if (this.isPageReview === false && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.dataSubscription = this.service.getData(this.parameter, this.parameter.reviewForm.PlanningInfo.id).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          const page = <IReviewSubscriptionPage[]>data.Results;

          this.service.data = page;
          this.service.rowData = this.transformToRowData(page);

          // this.tableService.setDataSource(this.service.rowData);
          // this.service.rowData = this.tableService.getDataSource();
          // this.service.previousRowData = this.tableService.getDataSource();
        }
      });
      this.addedCourses = []
    }
  }

  transformToRowData(pages: IReviewSubscriptionPage[]): ISubscriptionRowData[] {
    let list: ISubscriptionRowData[] = [];

    if (pages) {
      pages.forEach(element => {
        const data: ISubscriptionRowData = {
          id: element.id,
          itemId: element.itemId,
          planId: element.itemId,
          FormBuilderInfo: element.FormBuilderInfo,
          widget_guid: element.widget_guid,
          subscription_type: element.subscription_type,
          subDefId: element.itemId,
          objectiveId: element.objective_id,
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
        }

        list.push(data);
      });
    }

    return list;
  }


  setSupervisors() {
    if (this.isPageReview === true && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.supervisorSubscription = this.service.getSupervisors(this.parameter, this.parameter.reviewForm.PlanningInfo.id).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          const supervisors = <IReviewer[]>data.Results;

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

  setDataBySupervisor(selectedSupervisorId: string) {
    if (this.isPageReview === true && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.loading = true;

      this.dataSubscription = this.service.getDataBySupervisor(this.parameter, this.parameter.reviewForm.PlanningInfo.id, selectedSupervisorId).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          const page = <IReviewSubscriptionPage[]>data.Results;

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
      this.pageDataSubscription = this.service.getPageData(this.parameter, this.parameter.pageId).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          this.service.pageData = <IEmployeeReviewForm>data.Results[0];

          if(this.service.pageData.status == 1) {
            this.disableButton = true;
          } else {
            this.disableButton = false;
          }
        }
      });
    }
  }


  completeSection(): void {
    if (this.service.data && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.completeSectionProcessingEmitter.emit(true);
      const planId = this.parameter.reviewForm.PlanningInfo.id;

      const body =  this.getCompleteSectionBody();

      this.completeSectionSubscription = this.service.completeSection(this.parameter, planId, body).subscribe(data => {
        if (data.Success) {
          this.utilservice.showToast('Complete Section', `Data was saved successfully.`, ToastTypes.SUCCESS);
          // Refresh
          this.setPageData();
        } else {
          this.utilservice.showToast('Complete Section: Error Occured', `Something went wrong. Data was not saved.`, ToastTypes.ERROR);
        }
      }, (error) => {
        this.completeSectionProcessingEmitter.emit(false);
        this.utilservice.showToast('Complete Section: Error Occured', `Something went wrong. Data was not saved.`, ToastTypes.ERROR);
      }, () => {
        this.completeSectionProcessingEmitter.emit(false);
      });
    } else {
      this.utilservice.showToast('Complete Section: Error Occured', `Something went wrong. Not enough data to proceed.`, ToastTypes.ERROR);
    }
  }

  getCompleteSectionBody(): ISubscriptionCompleteSectionBody[] | ISubscriptionLMCompleteSectionBody[] {
    switch (this.parameter.role) {
      case RoleTypes.EMPLOYEE:
        return this.getEmployeeCompleteSectionBody();
      case RoleTypes.LINE_MANAGER:
        return this.getLineManagerCompleteSectionBody();
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

  getEmployeeCompleteSectionBody(): ISubscriptionCompleteSectionBody[] {
    let list: ISubscriptionCompleteSectionBody[] = [];

    if (this.subscriptionRowTemplate.addedCourses) {
      this.subscriptionRowTemplate.addedCourses.forEach(element => {
        const data: ISubscriptionCompleteSectionBody = {
          asset_id: this.parameter.assetId,
          review_form_id: 9,
          plan_id: this.parameter.reviewForm.PlanningInfo.id,
          sub_def_id: 2,
          item_id: element.course_id,
          comment: element.comment
        }

        list.push(data);
      });
    }

    return list;
  }

  getLineManagerCompleteSectionBody(): ISubscriptionLMCompleteSectionBody[] {
    let list: ISubscriptionLMCompleteSectionBody[] = [];

    if (this.service.rowData) {
      this.service.rowData.forEach(element => {
        const data: ISubscriptionLMCompleteSectionBody = {
          asset_id: element.id,
          review_form_id: element.id,
          plan_id: element.planId,
          sub_def_id: element.subDefId,
          item_id: element.itemId,
          comment: element.comment
        }

        list.push(data);
      });
    }

    return list;
  }
  customClass: string;


  get isPageReview(): boolean {
    if (this.parameter) {
      if ( (this.parameter.role === RoleTypes.LINE_MANAGER) || (this.parameter.role === RoleTypes.REVIEWER_REVIEWING) ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  unsubscribe() {
    this.utilservice.unsubscribe(this.completeSectionSubscription);
    this.utilservice.unsubscribe(...Object.values(this.subscriptions));
  }

  get isCompleted(): boolean {
    if (this.service.pageData) {
      return this.service.pageData.status === PageStatus.COMPLETED? true: false;
    } else {
      return false;
    }
  }

  onDeleteIconClicked(event: any, rowId: number) {
    this.getRowData$(rowId)
    .pipe(take(1))
    .subscribe(course => {

    });
    if(!event.path[7].classList.contains('my__class')) {
      event.path[7].classList.add("my__class");
    }
  }

  onUndoIconClicked(event: any, rowId: number) {
    this.getRowData$(rowId)
    .pipe(take(1))
    .subscribe(course => {

    });
    if(event.path[7].classList.contains('my__class')) {
      event.path[7].classList.remove("my__class");
    }
  }

  getRowData$(rowId: number): Observable<ICourse> {
    return of(this.service.courses).pipe(
      map(d => d.filter(v => v.course_id === rowId)),
      map(e => e.shift()))
  }


  gOnDestroy() {
    this.unsubscribe();
  }
}

interface ISubscriptionCompleteSectionBody {
  asset_id: number,
  review_form_id: number,
  plan_id: number,
  sub_def_id: number,
  item_id: number,
  comment: string

}

interface ISubscriptionLMCompleteSectionBody {
  asset_id: number,
  review_form_id: number,
  plan_id: number,
  sub_def_id: number,
  item_id: number,
  comment: string
}
