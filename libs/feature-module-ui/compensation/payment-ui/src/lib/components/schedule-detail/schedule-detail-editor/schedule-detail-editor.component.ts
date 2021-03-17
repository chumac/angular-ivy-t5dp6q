import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { FilePickerComponent, DialogBoxService } from '@nutela/shared/ui';
import { IRootState } from '../../../store/root';
import { IPaymentPlatform, IScheduleDetail } from '@nutela/models/compensation/payment';
import { ScheduleDetailEditorService } from './schedule-detail-editor.service';
import { isProcessingScheduleDetail, ProcessingScheduleDetail, NotProcessingScheduleDetail, SaveUpdateDataScheduleDetail } from '../../../store/schedule-details';

@Component({
  selector: 'x365-fm-cmp-payment-schedule-detail-editor',
  templateUrl: './schedule-detail-editor.component.html',
  styleUrls: ['./schedule-detail-editor.component.scss'],
  providers: [ScheduleDetailEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDetailEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  activePersonnelDataSource: any = null;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public scheduleId: number;

  @Input() public data: IScheduleDetail;

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

  isProcessing$: Observable<boolean>;

  constructor(
    public fs: ScheduleDetailEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>,
    private cd: ChangeDetectorRef, private dialogBoxService: DialogBoxService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingScheduleDetail));
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

  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingScheduleDetail());
      this.store.dispatch(new SaveUpdateDataScheduleDetail({ scheduleID: this.scheduleId, scheduleDetailID: this.data.id, data: <IScheduleDetail>this.fs.value }));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }


  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingScheduleDetail());
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
