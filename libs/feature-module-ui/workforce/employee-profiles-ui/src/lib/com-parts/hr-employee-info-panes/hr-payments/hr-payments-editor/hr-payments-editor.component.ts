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

import { UtilService, BusinessOptionService, toastOptionsError } from '@nutela/core-services';
import { PaymentEditorService } from './payment-editor.service';


import { IPayment } from '@nutela/models/workforce/employee-profiles';

import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOptionData } from '@nutela/models/common';
import { IBusinessOption } from '@nutela/models/core-data';
import { Dictionary } from '@ngrx/entity';
import { IEmployeesProfileState } from '../../../../store/root';
import { ProcessingPayment, SavePayment, NotProcessingPayment, isPaymentProcessing } from '../../../../store/employee-detailed-area';
import { DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { take } from 'rxjs/operators';


@Component({
  selector: 'x365-fm-workforce-hr-payments-editor',
  templateUrl: './hr-payments-editor.component.html',
  styleUrls: ['./hr-payments-editor.component.scss'],
  providers: [PaymentEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HrPaymentsEditorComponent  extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IPayment;
  @Input() employeeId: number;

  @Input() public selectOptionData: ISelectOptionData;

  @Input() public permOption01: string;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if (this.show && this.data) {
      this.data.compute_tax ? this.fs.tax.enable() : this.fs.tax.disable();
      this.data.compute_nhf ? this.fs.nhf.enable(): this.fs.nhf.disable();
      this.data.compute_pension ? this.fs.pfa.enable() : this.fs.pfa.disable();
      this.data.compute_pension ? this.fs.pensionAccount.enable() : this.fs.pensionAccount.disable();
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
  }

  isProcessing$: Observable<boolean>;
  approvedData$: Observable<IPayment>;

  constructor(
    public fs: PaymentEditorService,
    public utilService: UtilService,
    private businessOptionService: BusinessOptionService,
    private store: Store<IEmployeesProfileState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isPaymentProcessing));

    this.performInit();
    this.cd.markForCheck();
  }

  performInit() {}

  onSubmit() {
    if (this.fs.valid) {
      this.dialogService.show(this.dialogService.options(), 'This action will submit the record for approval. Continue?');

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          const employeeDetailId = this.data ? this.data.employeedetail_id : 0;
          this.store.dispatch(new ProcessingPayment());
          this.store.dispatch(new SavePayment({ employeeId: this.employeeId, employeeDetailId: employeeDetailId, data: <IPayment>this.utilService.convertEmptyStringObjectFieldsToNull(this.fs.value) }));
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
    this.store.dispatch(new NotProcessingPayment());
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
