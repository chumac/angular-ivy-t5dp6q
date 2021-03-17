
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import { IPromotion, IPromotionSubmit } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { IStateSelectOption, ISelectOption } from '@nutela/models/core-data';
import { IEmployeesProfileState } from '../../../../../../store';
import { take } from 'rxjs/operators';
import { ProcessingPromotion, isProcessingPromotion, SubmitDataPromotion, getSelectedPromotion, HideSubmissionProcessEditorPromotion } from '../../../../../../store/hr-transactions/promotion';
import { SubmissionProcessEditorService } from './submission-process-editor.service';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';


@Component({
  selector: 'x365-fm-workforce-promotions-submission-process-editor',
  templateUrl: './submission-process-editor.component.html',
  styleUrls: ['./submission-process-editor.component.scss'],
  providers: [SubmissionProcessEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmissionProcessEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  processType: string;
  processId: number;
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public selectedPromotionIdList: IPromotion[];

  @Input() public submissionProcess: ISelectOption[];

  @Input() public data: IPromotion[];
  @Input() public employeeId: number;

  @Output() cancelClick = new EventEmitter<any>();
  @Output() selectGridRows = new EventEmitter<boolean>();


  payGroupSelectOption$: Observable<ISelectOption[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.show === false) {
      this.fs.form = this.fs.buildForm();
      this.selectGridRows.emit(this.show);
    }
  }


  isProcessing$: Observable<boolean>;
  selectedPromotion$: Observable<IPromotion[]>;

  stateList$: Observable<IStateSelectOption[]>;
  cityList$: Observable<ISelectOption[]>;

  constructor(
    public fs: SubmissionProcessEditorService,
    public utilService: UtilService,
    private store: Store<IEmployeesProfileState>,
    private cd: ChangeDetectorRef,
    private dialogBoxService: DialogBoxService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingPromotion));
    this.selectedPromotion$ = this.store.pipe(select(getSelectedPromotion));
  }

  onProcessSelected(event) {
    let ids = [];
    this.processId = event.value
    this.selectedPromotion$.subscribe(val => {
      if (val && val.length > 0) {
        ids = val.map(v => {
          return { promotion_id: v.id }
        })
      }
    })
    if (ids.length > 0) {
      this.fs.patch({
        selectedPromotions: ids
      })
    }
  }

  getSubmissionProcess(): string {
    let process: string;
    if (this.processId == 0) {
      process = "Individually";
    } else {
      process = "as a Batch"
    }
    return process;
  }

  onSubmit() {
    if (this.fs.valid) {
      this.dialogBoxService.show(`Are you sure you want to submit selected items ${this.getSubmissionProcess()}?`).pipe(take(1))
        .subscribe((command: string) => {
          if (command === DialogBoxCommandTypes.COMMAND1) {
            this.store.dispatch(new ProcessingPromotion());
            this.store.dispatch(new SubmitDataPromotion({ data: <IPromotionSubmit[]>this.fs.value.selectedPromotions, processId: this.processId }));
          } else {
            this.reset();
            this.store.dispatch(new HideSubmissionProcessEditorPromotion())
          }
        });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }

  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    // this.store.dispatch(new NotProcessingPromotion());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
    this.selectGridRows.emit(false);
  }

  reset() {
    this.fs.f.reset();
  }

  ngOnDestroy() {
  }
}
