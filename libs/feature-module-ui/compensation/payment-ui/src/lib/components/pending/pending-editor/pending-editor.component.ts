import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { FilePickerComponent, DialogBoxService } from '@nutela/shared/ui';
import { IRootState } from '../../../store/root';
import { IPaymentPlatform, ISchedule, IPayrollProfile } from '@nutela/models/compensation/payment';
import { PendingEditorService } from './pending-editor.service';
import { SaveDataPendingSchedule, isProcessingPendingSchedule, ProcessingDataPendingSchedule, NotProcessingDataPendingSchedule, getPayrollDateData } from '../../../store/pending';
import { DxLookupComponent } from 'devextreme-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'x365-fm-cmp-payment-pending-editor',
  templateUrl: './pending-editor.component.html',
  styleUrls: ['./pending-editor.component.scss'],
  providers: [PendingEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendingEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  activePersonnelDataSource: any = null;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public fromSchedule: boolean;

  @Input() public data: ISchedule;
  @Input() public parent: string;

  @Input() public payDeskSelectOption: IPaymentPlatform[];
  @Input() public paymentSourceSelectOption: IPaymentPlatform[];
  @Input() public currencySelectOption: IPaymentPlatform[];
  @Input() public payrollProfileSelectOption: IPaymentPlatform[];
  @Input() public payrollSourceSelectOption: IPaymentPlatform[];
  @Input() public accountTypeSelectOption: IPaymentPlatform[];

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }

    if (this.show === false) {
      this.reset();
    }
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;
  @ViewChild('profile') profile: DxLookupComponent;

  isProcessing$: Observable<boolean>;
  payrollDate$: Observable<any>;

  constructor(
    public fs: PendingEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>,
    private cd: ChangeDetectorRef, private dialogBoxService: DialogBoxService, private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingPendingSchedule));
    this.payrollDate$ = this.store.pipe(select(getPayrollDateData));

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


  // getItemData$(id: number): Observable<ISchedule> {
  //   return this.newScheduleData$.pipe(
  //     map(d => d.filter(v => v.id === id)),
  //     map(e => e.shift()))
  // }

  onPayrollSourceSelected(event) {
    let item: IPayrollProfile;

    if (this.profile.value) {
      item = this.profile.selectedItem;
      this.fs.patch({
        payroll_period: item.current_period
      })
    };
  }

  isSourceTemporary(): boolean {
    let source = false;
    source = (this.fs.payrollSource.value === 0);
    return source;
  };
  onSubmit() {
    this.fs.validatePayroll()
    this.fs.transformDatesInput();
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingDataPendingSchedule());
      this.store.dispatch(new SaveDataPendingSchedule({ data: <ISchedule>this.fs.value }));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }

  }


  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingDataPendingSchedule());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }
}
