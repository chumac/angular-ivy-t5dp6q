import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { IDefaultCurrency } from '@nutela/models/compensation/payroll';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs';
import { DefaultCurrencyEditorService } from './default-currency-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingDefaultCurrency, ProcessingDefaultCurrency, SaveDefaultCurrency, NotProcessingDefaultCurrency, UpdateDefaultCurrency } from '../../../../../store/dependencies/default-currency';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-payrl-default-currency-editor',
  templateUrl: './default-currency-editor.component.html',
  styleUrls: ['./default-currency-editor.component.scss'],
  providers: [DefaultCurrencyEditorService]
})

export class DefaultCurrencyEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IDefaultCurrency;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
    if (this.show === false) {
      this.fs.form = this.fs.buildForm();
    }
  }


  isProcessing$: Observable<boolean>;
  constructor(
    public fs: DefaultCurrencyEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
    super();
  }
  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingDefaultCurrency));
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
      const recordId = this.data ? this.data.currency_id : 0;
      this.store.dispatch(new ProcessingDefaultCurrency());
      if (this.inEditMode() === false) {
        this.store.dispatch(new SaveDefaultCurrency({ data: this.fs.value }));
      }
      else if (this.inEditMode() === true) {
        this.store.dispatch(new UpdateDefaultCurrency({ data: this.fs.value, recordId: recordId }));
      }
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingDefaultCurrency());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.rebuildForm();
    this.fs.init(this.data);
  }
}
