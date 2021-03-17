import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ICurrency } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { CurrencyEditorService } from './payment-currency-editor.service';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingCurrency, ProcessingCurrency, SaveCurrency, NotProcessingCurrency, UpdateCurrency } from '../../../../../store/dependencies/payment-currency';
import { ShowToast } from '@nutela/store/shared';

@Component({
  selector: 'x365-fm-payrl-payment-currency-editor',
  templateUrl: './payment-currency-editor.component.html',
  styleUrls: ['./payment-currency-editor.component.scss'],
  providers: [CurrencyEditorService]
})

export class PaymentCurrencyEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ICurrency;

  // @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
  }


  isProcessing$: Observable<boolean>;
  constructor(
    public fs: CurrencyEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingCurrency));
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
        const recordId = this.data? this.data.id: 0;
        this.store.dispatch(new ProcessingCurrency());
        if(this.inEditMode()===false){
        this.store.dispatch(new SaveCurrency({data: this.fs.value}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateCurrency({data: this.fs.value, recordId: recordId}));
        }
      } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
     return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingCurrency());
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
