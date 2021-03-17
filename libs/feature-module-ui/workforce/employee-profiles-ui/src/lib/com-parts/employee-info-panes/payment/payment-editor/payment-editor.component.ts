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
import { PaymentEditorService } from './payment-editor.service';
import { IAppState } from '@nutela/store/app-state';

import {
  SavePayment,
  ProcessingPayment,
  isProcessingPayment,
  NotProcessingPayment
} from '@nutela/store/modules/workforce/employee-profiles';
import { IPayment } from '@nutela/models/workforce/employee-profiles';

import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOptionData } from '@nutela/models/common';
import { DialogService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-workforce-payment-editor',
  templateUrl: './payment-editor.component.html',
  styleUrls: ['./payment-editor.component.scss'],
  providers: [PaymentEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  @Input() public show: boolean;
  @Input() public width: number;

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
    public fs: PaymentEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef,
    private dialogService: DialogService
  ) {
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingPayment));

    this.performInit();
    this.cd.markForCheck();
  }

  performInit() { }

  onSubmit() {

    if (this.fs.valid) {
      this.dialogService.show(this.dialogService.options(), 'This action will submit the record for approval. Continue?');

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new ProcessingPayment());
          this.store.dispatch(new SavePayment(<IPayment>this.utilService.convertEmptyStringObjectFieldsToNull(this.fs.value)));
        }
      });
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
    this.store.dispatch(new NotProcessingPayment());
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
