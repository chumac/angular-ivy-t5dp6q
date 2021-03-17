import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PageStatus, Roles } from '../../../enumerations';
import { IReviewPageParameter } from '../../../models';
import { IReviewPageComponent } from '../../../interfaces';
import { Subscription } from 'rxjs/internal/Subscription';
import { CustomPageService } from './custom-page.service';
import { IReviewCustomPage, IEmployeeReviewForm } from '@nutela/models/talent/performance';
import { IApiResult, IFormSectionData } from '@nutela/models/core-data';
import { ControlTypes } from '@nutela/shared/app-global';
import { UtilService } from '@nutela/core-services';

@Component({
  selector: 'x365-fm-talent-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss']
})
export class CustomPageComponent implements OnInit, IReviewPageComponent {
  @Input() show: boolean;
  @Input() parameter: IReviewPageParameter;

  @Output() saveAndContinueProcessingEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() completeSectionProcessingEmitter: EventEmitter<boolean> = new EventEmitter();

  dataSubscription: Subscription;
  pageDataSubscription: Subscription;
  saveAndContinueSubscription: Subscription;
  completeSectionSubscription: Subscription;

  constructor(public service: CustomPageService, private utilservice: UtilService) { }

  ngOnInit() {
    this.setData();
    this.setPageData();
  }

  setData() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.dataSubscription = this.service.getData(this.parameter, this.parameter.reviewForm.PlanningInfo.id).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          const page = <IReviewCustomPage[]>data.Results;

          this.service.data = page;
          this.service.rowData = this.transformToRowData(page);

          // this.tableService.setDataSource(this.service.rowData);
          // this.service.rowData = this.tableService.getDataSource();
          // this.service.previousRowData = this.tableService.getDataSource();
        }
      });
    }
  }

  setPageData() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.pageDataSubscription = this.service.getPageData(this.parameter, this.parameter.pageId).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          this.service.pageData = <IEmployeeReviewForm>data.Results[0];;
        }
      });
    }
  }

  transformToRowData(pages: IReviewCustomPage[]): IFormSectionData[] {
    let list: IFormSectionData[] = [
      {
        asset_type: 5,
        asset_key: 'key5',
        parent_id: 1,
        code: '00001',
        description: 'Section 1',
        widget: 11111,
        json_properties: '',
        eligibility: 1,
        rank: 1,
        perm_emp: 1,
        perm_lm: 1,
        perm_reviewer: 1,
        perm_moderator: 1,
        perm_hr: 1,
        perm_reviewer_assessing: 1,
        title: 'Section 1',
        sub_title: 'Fill the section below.',
        formRows: [
          {
            description: 'You may want to ask about their interests, hobbies, opinions or anything else that will help you learn more about your customers.',
            type: ControlTypes.TEXT
          },
          {
            description: 'How long does it take you to make a buying decision?',
            type: ControlTypes.TEXT
          },
          {
            description: 'Check all the options that correctly reflect your role in your team.',
            type: ControlTypes.CHECK,
            list: [
              'Manager',
              'Development',
              'UI Designer',
              'Tester',
              'Code Reviewer'
            ]
          },
        ]
      },



    ];


    // pages.forEach(element => {
    //   const data: IFormRowData = {
    //     id: 0
    //   }
    //   list.push(data);
    // });

    return list;
  }

  completeSection(): void {
    return;
  }

  get isCompleted(): boolean {
    return false;
  }

  unsubscribe() {
    this.utilservice.unsubscribe(this.dataSubscription);
    this.utilservice.unsubscribe(this.pageDataSubscription);
    this.utilservice.unsubscribe(this.saveAndContinueSubscription);
    this.utilservice.unsubscribe(this.completeSectionSubscription);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
