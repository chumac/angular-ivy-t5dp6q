import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ISalaryReviewGroup } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { ReviewGroupEditorService } from './review-group-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { IRootState } from '../../../../store/root/root.state';
import { ProcessingReview, NotProcessingReview, isProcessingReview, UpdateReviewGroup, SaveReviewGroup } from '../../../../store/salary-review';

@Component({
  selector: 'x365-fm-payrl-salary-review-group-editor',
  templateUrl: './review-group-editor.component.html',
  styleUrls: ['./review-group-editor.component.scss'],
  providers: [ReviewGroupEditorService]
})

export class ReviewGroupEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ISalaryReviewGroup;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
    if (this.show === false) {
      this.fs.form = this.fs.buildForm();
    }
  }


  isProcessing$: Observable<boolean>;
  constructor(
    public fs: ReviewGroupEditorService,
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
  }

  storeDispatches() {  }

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
        this.store.dispatch(new UpdateReviewGroup({ data: this.fs.value, recordId: this.data.salary_review_id }));
      } else {
        this.store.dispatch(new SaveReviewGroup({ data: this.fs.value }));
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
    this.rebuildForm();
  }

  rebuildForm() {
    this.fs.form = this.fs.buildForm();
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
    this.fs.showPaygroups = false
  }
}
