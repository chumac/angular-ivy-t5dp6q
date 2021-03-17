import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild, OnChanges } from '@angular/core';

import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { RunEditorService } from './run-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { FilePickerComponent, DialogService } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { IPayrollProfile } from '@nutela/models/compensation/payment';
import { IRunState, isProcessingPayrollRun, ProcessingPayrollRun, SavePayrollRunData, NotProcessingPayrollRun, LoadCanRunDataSuccess } from '../../../../store/execution/run';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-payrl-run-editor',
  templateUrl: './run-editor.component.html',
  styleUrls: ['./run-editor.component.scss']
})
export class RunEditorComponent extends BaseFormComponent
  implements OnInit, OnChanges, OnDestroy {

  activePersonnelDataSource: any = null;
  selectedPayrollGroup: any = null;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public warningMessage: string = null;

  @Input() public data: IPayrollProfile;

  @Input() public activePersonnel: ISelectOption[];
  @Input() public payrollGroupSelect: ISelectOption[];
  @Input() public paymentGroupSelect: ISelectOption[];
  @Input() public paymentGradeSelect: ISelectOption[];

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      console.log(this.data)
      this.fs.init(this.data);
    }

    if (this.show === false) {
      this.reset();
    }
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;

  isProcessing$: Observable<boolean>;

  constructor(
    public fs: RunEditorService,
    public utilService: UtilService,
    private store: Store<IRunState>,
    private cd: ChangeDetectorRef, private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingPayrollRun));
  }

  storeDispatches() {

  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onPayrollGroupSelected(event) {
    this.selectedPayrollGroup = event.value;
  }

  onSubmit() {
    if (this.fs.valid) {
      const recordId = this.data ? this.data.payroll_profile_id : 0;
      if (this.warningMessage) {
        this.dialogService.show(this.dialogService.options(), `This action will overwrite an existing payroll run. Do you want to continue?`);

        this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
          if (confirmed) {
            this.store.dispatch(new ProcessingPayrollRun());
            this.store.dispatch(new SavePayrollRunData({ data: <any>this.fs.value, recordId }));
          }
        });
      } else {
        this.store.dispatch(new ProcessingPayrollRun());
        this.store.dispatch(new SavePayrollRunData({ data: <any>this.fs.value, recordId }));
      }
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
    }
  }


  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingPayrollRun());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
    this.setDefaultFields(null);
  }

  setDefaultFields(profileID: number) {
    this.fs.patch({
      grouprun: 0,
      use_payroll_acceleration: true,
      payroll_profile_id: profileID,
      exchange_rate: 1.0
    })
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
    this.store.dispatch(new LoadCanRunDataSuccess(false))
  }

  ngOnDestroy() {
  }
}
