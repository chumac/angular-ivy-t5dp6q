import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ISalaryReviewGroup, ISalaryReviewPlan } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { ReviewPlanEditorService } from './review-plan-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { isProcessingReview, ProcessingReview, SaveReviewPlan, NotProcessingReview, UpdateReviewPlan, getEligibilityRuleListReviewPlans, getAllowanceRuleListReviewPlans, getAllowanceAffectedListReviewPlans, getDeductionRuleListReviewPlans, getDeductionAffectedListReviewPlans, getPayrollProfileListReviewPlans, LoadEligibilityRuleListReviewPlans, LoadAllowanceRuleListReviewPlans, LoadAllowanceAffectedListReviewPlans, LoadDeductionRuleListReviewPlans, LoadDeductionAffectedListReviewPlans, LoadPayrollProfileListReviewPlans, getReviewGroups } from '../../../../../store/salary-review';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import { IRootState } from '../../../../../store/root';

@Component({
  selector: 'x365-fm-payrl-salary-review-plan-editor',
  templateUrl: './review-plan-editor.component.html',
  styleUrls: ['./review-plan-editor.component.scss'],
  providers: [ReviewPlanEditorService]
})

export class ReviewPlanEditorComponent extends BaseFormComponent implements OnInit, OnChanges {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ISalaryReviewPlan;
  @Input() public reviewGroupId: number;
  @Input() public profileId: number;
  @Input() public selectedStatus: number;

  @Input() public eligibilityRuleList$: Observable<ISelectOption[]>;
  @Input() public allowanceRuleList$: Observable<ISelectOption[]>;
  @Input() public allowanceAffectedList$: Observable<ISelectOption[]>;
  @Input() public deductionRuleList$: Observable<ISelectOption[]>;
  @Input() public deductionAffectedList$: Observable<ISelectOption[]>;
  @Input() public payrollProfileList$: Observable<ISelectOption[]>;
  reviewGroups$: Observable<ISalaryReviewGroup[]>;


  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }

    if (this.show === true) {
      console.log(this.reviewGroupId)
      console.log(this.profileId)
      this.fs.patch({
        salary_review_group_id: +this.reviewGroupId,
        payroll_profile_id: +this.profileId
      })
      // this.fs.profile.setValue(this.profileId)
      // this.fs.group.setValue(this.reviewGroupId)
    }
  }


  isProcessing$: Observable<boolean>;
  constructor(
    public fs: ReviewPlanEditorService,
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
    this.eligibilityRuleList$ = this.store.pipe(select(getEligibilityRuleListReviewPlans));
    this.allowanceRuleList$ = this.store.pipe(select(getAllowanceRuleListReviewPlans));
    this.allowanceAffectedList$ = this.store.pipe(select(getAllowanceAffectedListReviewPlans));
    this.deductionRuleList$ = this.store.pipe(select(getAllowanceRuleListReviewPlans));
    this.deductionAffectedList$ = this.store.pipe(select(getDeductionAffectedListReviewPlans));
    this.payrollProfileList$ = this.store.pipe(select(getPayrollProfileListReviewPlans));
    this.reviewGroups$ = this.store.pipe(select(getReviewGroups));
  }

  storeDispatches() {
    this.store.dispatch(new LoadEligibilityRuleListReviewPlans())
    this.store.dispatch(new LoadAllowanceRuleListReviewPlans())
    this.store.dispatch(new LoadAllowanceAffectedListReviewPlans())
    // this.store.dispatch(new LoadDeductionRuleListReviewPlans())
    this.store.dispatch(new LoadDeductionAffectedListReviewPlans())
    this.store.dispatch(new LoadPayrollProfileListReviewPlans())
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
        this.store.dispatch(new UpdateReviewPlan({ data: this.fs.value, recordId: this.data.salary_review_id, groupId: this.reviewGroupId, profileId: this.profileId }));
      } else {
        this.store.dispatch(new SaveReviewPlan({ data: this.fs.value, groupId: this.reviewGroupId, profileId: this.profileId }));
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
