import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ISalaryReviewPlan } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { ReviewPlanDetailEditorService } from './review-plan-detail-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import { IRootState } from '../../../../../store/root/root.state';
import { getAllowanceListReviewPlanDetails, getAllowanceRuleListReviewPlans, getDeductionListReviewPlanDetails, getItemTypeListReviewPlanDetails, getReviewPlans, getReviewRuleListReviewPlans, isProcessingReview, LoadAllowanceListReviewPlanDetails, LoadDeductionListReviewPlanDetails, LoadItemTypeListReviewPlanDetails, NotProcessingReview, ProcessingReview, SaveReviewPlanDetail, UpdateReviewPlanDetail } from '../../../../../store/salary-review';

@Component({
  selector: 'x365-fm-payrl-salary-review-plan-detail-editor',
  templateUrl: './review-plan-detail-editor.component.html',
  styleUrls: ['./review-plan-detail-editor.component.scss'],
  providers: [ReviewPlanDetailEditorService]
})

export class ReviewPlanDetailEditorComponent extends BaseFormComponent implements OnInit, OnChanges {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ISalaryReviewPlan;
  @Input() public planId: number;

  isProcessing$: Observable<boolean>;
  allowanceList$: Observable<ISelectOption[]>;
  deductionList$: Observable<ISelectOption[]>;
  reviewRuleList$: Observable<ISelectOption[]>;
  itemTypeList$: Observable<ISelectOption[]>;
  reviewPlans$: Observable<ISalaryReviewPlan[]>;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }

    if (this.show === true) {
      this.fs.patch({
        salary_review_id: +this.planId
      })
    }
  }


  constructor(
    public fs: ReviewPlanDetailEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingReview));
    this.allowanceList$ = this.store.pipe(select(getAllowanceListReviewPlanDetails));
    this.deductionList$ = this.store.pipe(select(getDeductionListReviewPlanDetails));
    this.reviewRuleList$ = this.store.pipe(select(getAllowanceRuleListReviewPlans));
    this.itemTypeList$ = this.store.pipe(select(getItemTypeListReviewPlanDetails));
    this.reviewPlans$ = this.store.pipe(select(getReviewPlans));
  }

  storeDispatches() {
    this.store.dispatch(new LoadAllowanceListReviewPlanDetails());
    this.store.dispatch(new LoadDeductionListReviewPlanDetails());
    this.store.dispatch(new LoadItemTypeListReviewPlanDetails());
    }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingReview());
      if (this.inEditMode()) {
        this.store.dispatch(new UpdateReviewPlanDetail({ data: this.fs.value, recordId: this.data.salary_review_id }));
      } else {
        this.store.dispatch(new SaveReviewPlanDetail({ data: this.fs.value }));
      }
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingReview());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.rebuildForm();
    this.fs.init(this.data);
    this.fs.showPaygroups = false
  }
}
