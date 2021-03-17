import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { RecoverEditorService } from './recover-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { IPayrollProfile } from '@nutela/models/compensation/payment';
import { IRunState, isProcessingPayrollRun, ProcessingPayrollRun, NotProcessingPayrollRun, getListOfPossibleReturns, RecoverPayrollRun } from '../../../../store/execution/run';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-payrl-recover-editor',
  templateUrl: './recover-editor.component.html',
  styleUrls: ['./recover-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecoverEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  activePersonnelDataSource: any = null;
  selectedPayrollGroup: any = null;
  sessionToolTip: string;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public payrollProfileID: number = null;

  @Input() public data: IPayrollProfile;

  @Input() public possibleSessions$: Observable<any[]>;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {}

    if (this.show === false) {
      this.reset();
    }
  }

  isProcessing$: Observable<boolean>;

  constructor(
    public fs: RecoverEditorService,
    public utilService: UtilService,
    private store: Store<IRunState>,
    private cd: ChangeDetectorRef, private dialogBoxService: DialogBoxService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingPayrollRun));
    this.possibleSessions$ = this.store.pipe(select(getListOfPossibleReturns));
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
      this.dialogBoxService.show(`This action will submit the record for recovery. Continue?`).pipe(take(1))
          .subscribe((command: string) => {
            if (command === DialogBoxCommandTypes.COMMAND1) {
              this.store.dispatch(new ProcessingPayrollRun());
              this.store.dispatch(new RecoverPayrollRun({ data: this.fs.value, payrollProfileID: this.payrollProfileID }));
            }
          });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  onOpened($event) {
    this.resetToolTipTexts();
  }
  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingPayrollRun());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.resetToolTipTexts();
  }

  onSessionSelected(event) {
    this.sessionToolTip = event.label;
  }

  resetToolTipTexts() {
    this.sessionToolTip = '';
  }
  ngOnDestroy() {
  }
}
