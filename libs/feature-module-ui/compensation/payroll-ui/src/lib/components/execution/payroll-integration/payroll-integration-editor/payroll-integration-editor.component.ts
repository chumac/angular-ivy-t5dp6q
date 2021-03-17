import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { PayrollIntegrationEditorService } from './payroll-integration-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { FilePickerComponent, DialogService } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { isProcessingPayrollIntegration, ProcessingPayrollIntegration, SavePayrollIntegrationData, NotProcessingPayrollIntegration, getSourceListPayrollIntegration, LoadSourceListPayrollIntegration, getMonthListPayrollIntegration, LoadMonthListPayrollIntegration, getFormatListPayrollIntegration, LoadFormatListPayrollIntegration, UpdatePayrollIntegrationData, getYearListPayrollIntegration, LoadYearListPayrollIntegration, getPayrollProfileListPayrollIntegration, LoadPayrollProfileListPayrollIntegration } from '../../../../store/execution/payroll-integration';
import { IRootState } from '../../../../store/root';

@Component({
  selector: 'x365-fm-payrl-payroll-integration-editor',
  templateUrl: './payroll-integration-editor.component.html',
  styleUrls: ['./payroll-integration-editor.component.scss'],
  providers: [PayrollIntegrationEditorService]
})
export class PayrollIntegrationEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  activePersonnelDataSource: any = null;
  @Input() public selectedFormat: any = null;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public selectedProfile: any = null;

  @Input() public data: any;

  @Input() public activePersonnel: ISelectOption[];
  @Input() public payrollGroupSelect: ISelectOption[];
  @Input() public paymentGroupSelect: ISelectOption[];
  @Input() public paymentGradeSelect: ISelectOption[];

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (this.show && this.data) {
      this.fs.init(this.data);
    }

    if (!this.show) {
      this.selectedProfile = null
      this.fs.rebuildForm();
    }

    if(this.show && !this.data) {
      // this.fs.payrollProfile.setValue(this.selectedProfile)
    }
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;

  isProcessing$: Observable<boolean>;
  integrationFormatList$: Observable<ISelectOption[]>;
  payrollProfileList$: Observable<ISelectOption[]>;
  customRuleSourceList$: Observable<ISelectOption[]>;
  monthList$: Observable<ISelectOption[]>;
  yearList$: Observable<ISelectOption[]>;
  sourceList$: Observable<ISelectOption[]>;

  constructor(
    public fs: PayrollIntegrationEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>,
    private cd: ChangeDetectorRef, private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingPayrollIntegration));
    this.integrationFormatList$ = this.store.pipe(select(getFormatListPayrollIntegration));
    this.customRuleSourceList$ = this.store.pipe(select(getSourceListPayrollIntegration));
    this.monthList$ = this.store.pipe(select(getMonthListPayrollIntegration));
    this.yearList$ = this.store.pipe(select(getYearListPayrollIntegration));
    this.sourceList$ = this.store.pipe(select(getSourceListPayrollIntegration));
    this.payrollProfileList$ = this.store.pipe(select(getPayrollProfileListPayrollIntegration));
  }

  storeDispatches() {
    this.store.dispatch(new LoadFormatListPayrollIntegration());
    this.store.dispatch(new LoadSourceListPayrollIntegration());
    this.store.dispatch(new LoadMonthListPayrollIntegration());
    this.store.dispatch(new LoadYearListPayrollIntegration());
    this.store.dispatch(new LoadPayrollProfileListPayrollIntegration());
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onFormatSelected(event) {
    console.log(event);
    this.selectedFormat = event.value;
  }

  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingPayrollIntegration());
      this.inEditMode() ? this.store.dispatch(new UpdatePayrollIntegrationData({data: this.fs.value, recordId: this.data.id})) : this.store.dispatch(new SavePayrollIntegrationData({data: this.fs.value }))
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
    }
  }


  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingPayrollIntegration());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.rebuildForm();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }
}
