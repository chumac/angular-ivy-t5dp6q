import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

import { Subscription } from 'rxjs/internal/Subscription';

import { ToastTypes } from '@nutela/shared/app-global';

import { IReviewPageParameter } from '../../../models';
import { ContractPageService } from './contract-page.service';
import { IApiResult } from '@nutela/models/core-data';
import { IReviewContractPage } from '@nutela/models/talent/performance';
import { UtilService } from '@nutela/core-services';
import { IReviewPageComponent } from '../../../interfaces';
import { PageStatus } from '../../../enumerations';

const DEFAULT_PAGE_TITLE = 'Training';

@Component({
  selector: 'x365-fm-talent-contract-page',
  templateUrl: './contract-page.component.html',
  styleUrls: ['./contract-page.component.scss'],
  providers: [ContractPageService]
})
export class ContractPageComponent implements OnInit, OnDestroy, IReviewPageComponent {
  @Input() show: boolean;
  @Input() parameter: IReviewPageParameter;

  @Output() saveAndContinueProcessingEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() completeSectionProcessingEmitter: EventEmitter<boolean> = new EventEmitter();

  dataSubscription: Subscription;
  completeSectionSubscription: Subscription;

  private form: FormGroup = new FormGroup({});

  constructor(public service: ContractPageService, private utilservice: UtilService) { }

  ngOnInit() {
    this.createFormGroup();
    this.setData();
  }

  setData() {
    if (this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.dataSubscription = this.service.getData(this.parameter, this.parameter.reviewForm.PlanningInfo.id).subscribe((data: IApiResult) => {
        if (data.Success && data.Results) {
          this.service.data = <IReviewContractPage>data.Results[0];

          if (this.service.data) {
            this.form.patchValue({
              agreeCheck: this.service.data.has_agreed
            });
          }
        }
      });
    }
  }
  createFormGroup() {
    this.form = new FormGroup({
      agreeCheck: new FormControl(false)
    });
  }

  completeSection(): void {
    if (this.service.data && this.service.data.ContractPageDTO && this.service.data.ContractPageDTO.must_agree && (this.agreeCheck.value === false)) {
      this.utilservice.showToast('Complete Section: Error Occured', `You must accept the contract by checking the box below.`, ToastTypes.ERROR);
      return;
    }

    if (this.service.data && this.service.data.ContractPageDTO && this.parameter && this.parameter.reviewForm && this.parameter.reviewForm.PlanningInfo) {
      this.completeSectionProcessingEmitter.emit(true);

      const pageId = this.parameter.pageId;
      const planId = this.parameter.reviewForm.PlanningInfo.id;

      const body =  {
        'contract_page_id': this.service.data.ContractPageDTO.id,
        'plan_id': planId,
        'has_agreed': this.agreeCheck.value
      };

      this.completeSectionSubscription = this.service.completeSection(this.parameter, pageId, body).subscribe(data => {
        if (data.Success) {
          this.utilservice.showToast('Complete Section', `Section was completed successfully.`, ToastTypes.SUCCESS);
          // Refresh
          this.setData();
        } else {
          this.utilservice.showToast('Complete Section: Error Occured', `Something went wrong. Section not completed.`, ToastTypes.ERROR);
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

  get isCompleted(): boolean {
    if (this.service.data && this.service.data.ContractPageDTO) {
      return this.service.data.status === PageStatus.COMPLETED? true: false;
    } else {
      return false;
    }
  }

  get f() {
    return this.form;
  }

  get agreeCheck(): AbstractControl {
    return this.form.get('agreeCheck');
  }

  unsubscribe() {
    this.utilservice.unsubscribe(this.dataSubscription);
    this.utilservice.unsubscribe(this.completeSectionSubscription);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
