import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { FilePickerComponent, DialogBoxService } from '@nutela/shared/ui';
import { IRootState } from '../../../../store/root';
import { PayDeskEditorService } from './pay-desk-editor.service';
import { IPaymentPlatform } from '@nutela/models/compensation/payment';
import { ProcessingData, SaveData, NotProcessingData, isProcessing } from '../../../../store/setup/pay-desk';

@Component({
  selector: 'x365-fm-cmp-payment-pay-desk-editor',
  templateUrl: './pay-desk-editor.component.html',
  styleUrls: ['./pay-desk-editor.component.scss'],
  providers: [PayDeskEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayDeskEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  activePersonnelDataSource: any = null;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IPaymentPlatform;
  @Input() public paymentPlatform: IPaymentPlatform[];

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
    public fs: PayDeskEditorService,
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
    this.isProcessing$ = this.store.pipe(select(isProcessing));

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
      this.store.dispatch(new ProcessingData());
      this.store.dispatch(new SaveData({ data: <IPaymentPlatform>this.fs.value }));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }

  }


  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingData());
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
