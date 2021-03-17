import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges
} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { HrReboardPaymentEditorService } from './hr-reboard-payment-editor.service';
import { IAppState } from '@nutela/store/app-state';
import { IPayment } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOptionData } from '@nutela/models/common';
import { DialogService } from '@nutela/shared/ui';
import { take } from 'rxjs/operators';
import { isProcessingHrReboardPayment, ProcessingHrReboardPayment, SaveHrReboardPayment, NotProcessingHrReboardPayment, SaveUpdateHrReboardPayment } from '../../../../store/hr-reboard-data';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-payment-editor',
  templateUrl: './hr-reboard-payment-editor.component.html',
  styleUrls: ['./hr-reboard-payment-editor.component.scss'],
  providers: [HrReboardPaymentEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HrReboardPaymentEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public employeeId: number;

  @Input() public data: IPayment;

  @Input() public selectOptionData: ISelectOptionData;

  @Input() public permOption01: any;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
  }

  isProcessing$: Observable<boolean>;
  approvedData$: Observable<IPayment>;

  constructor(
    public fs: HrReboardPaymentEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingHrReboardPayment));

    this.performInit();
    this.cd.markForCheck();
  }

  performInit() { }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false
    }
  }
  onSubmit() {

    if (this.fs.valid) {
      this.store.dispatch(new ProcessingHrReboardPayment());
      this.store.dispatch(new SaveUpdateHrReboardPayment({data: <IPayment>this.fs.value, employeeId: this.employeeId}));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  onPFASelected(event) {
    this.fs.setToolTip('qualification', event.label);
  }

  onSelectorOpened(event) {
    this.fs.formToolTips.pfa = '';
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingHrReboardPayment());
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
