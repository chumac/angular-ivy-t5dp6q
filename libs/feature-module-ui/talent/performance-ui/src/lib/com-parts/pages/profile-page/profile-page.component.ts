import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IReviewPageParameter } from '../../../models';
import { IReviewPageComponent } from '../../../interfaces';
import { IProfilePage } from '@nutela/models/talent/performance';
import { IApiResult } from '@nutela/models/core-data';
import { ProfilePageService } from './profile-page.service';
import { ISubscriptions } from '@nutela/models/common';
import { UtilService, formatDate } from '@nutela/core-services';
import { RoleTypes, WorkflowProcessStatus } from '../../../enumerations';
import { take } from 'rxjs/operators';
import { GENERAL, PROFILE_AVATAR } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-talent-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy, IReviewPageComponent {
  @Input() show: boolean;
  @Input() parameter: IReviewPageParameter;

  @Output() saveAndContinueProcessingEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() completeSectionProcessingEmitter: EventEmitter<boolean> = new EventEmitter();

  startProcessingStatus = false;

  private subscriptions: ISubscriptions = {};

  constructor(private utilService: UtilService, public service: ProfilePageService) { }

  ngOnInit() {
    this.setData();
  }

  setData() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.subscriptions['data'] =  this.service.getData(this.parameter, this.parameter.reviewForm.PlanningInfo.id).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          const page = <IProfilePage>data.Results[0];

          this.service.data = page;
          this.setProfileImages(page);
        }
      });
    }
  }

  setProfileImages(page: IProfilePage) {
    if (page) {
      if (!this.service.employeePhoto) {
        this.service.getPhoto(this.parameter.reviewForm.EmployeeInfo.employee_id).pipe(take(1)).subscribe((data: IApiResult) => {
          if (data.Success && data.Results) {
            this.service.employeePhoto = `${GENERAL.pngBase64Header}${data.Results[0]}`;
          } else {
            this.service.employeePhoto = PROFILE_AVATAR.uri;
          }
        });
      }

      // Get supervisor photo
      if (!this.service.reportsToPhoto) {
        this.service.getPhoto(1).pipe(take(1)).subscribe((data: IApiResult) => {
          if (data.Success && data.Results) {
            this.service.reportsToPhoto = `${GENERAL.pngBase64Header}${data.Results[0]}`;
          } else {
            this.service.employeePhoto = PROFILE_AVATAR.uri;
          }
        });
      }
    }
  }

  get reviewStartDate() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      return formatDate(this.parameter.reviewForm.PlanningInfo.review_start_date);
    }
  }

  get reviewEndDate() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      return formatDate(this.parameter.reviewForm.PlanningInfo.review_end_date);
    }
  }

  completeSection(): void {

  }

  get isCompleted(): boolean {
    return true;
  }

  get isStarted(): boolean {
    if (this.parameter && this.parameter.reviewForm) {
      if (this.parameter.reviewWorkflowProcess.status === WorkflowProcessStatus.NOT_STARTED) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  get isStartButtonVisible(): boolean {
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

  startButtonClicked() {

  }

  ngOnDestroy() {
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }
}
