import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { FinalizeEditorService } from './finalize-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { FilePickerComponent, DialogBoxService } from '@nutela/shared/ui';
import { isProcessingLastRun, ProcessingLastRunItem, NotProcessingLastRunItem, SavePayrollRunFinalize } from '../../../../store/execution/last-run-item';
import { IRootState } from '../../../../store/root';

@Component({
  selector: 'x365-fm-payrl-finalize-editor',
  templateUrl: './finalize-editor.component.html',
  styleUrls: ['./finalize-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinalizeEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public payrollRunId: number;
  @Input() public payrollProfileId: number;
  @Input() public payrollPeriod: string;

  @Output() cancelClick = new EventEmitter<any>();

  @ViewChild('filePicker') filePicker: FilePickerComponent;

  isProcessing$: Observable<boolean>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) { }

    if (this.show === false) {
      this.reset();
    }
  }

  constructor(
    public fs: FinalizeEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>,
    private cd: ChangeDetectorRef, private dialogBoxService: DialogBoxService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingLastRun));

  }

  storeDispatches() {
    this.store.dispatch(new NotProcessingLastRunItem());
  }

  onSubmit() {

    if (this.fs.valid) {
      this.store.dispatch(new ProcessingLastRunItem());
      this.store.dispatch(new SavePayrollRunFinalize({ data: <any>this.fs.value, recordId: this.payrollRunId, payrollProfileID: this.payrollProfileId, payrollPeriod: this.payrollPeriod}));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }

  }


  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
  }

  ngOnDestroy() {
  }
}
