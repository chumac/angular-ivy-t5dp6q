import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs';
import { FilePickerComponent } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { ApplyEditorService } from './apply-editor.service';
import { UtilService, toastOptionsError, formatDate } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { isProcessingApplication, getLoanDefinitionsDataApplication, getLoanCurrenciesDataApplication, ProcessingApplication, SaveDataLoanApplication, NotProcessingApplication, LoadMonthlyDeductionAmount, getMonthlyDeductionAmount, LoadGenericScheduleData, ShowViewerGenericSchedule, showViewerGenericSchedule, getGenericSchedule, getLoanTypesSelect, saveSuccess } from '../../../store/applications';
import { IApplicationCreate, ILoanDefinition, ILoanRepayment } from '@nutela/models/compensation/loans';
import { ShowToast } from '@nutela/store/shared';
import { map, take, takeWhile } from 'rxjs/operators';
import { ILoanState } from '../../../store';
import { ISubscriptions } from '@nutela/models/common';

@Component({
  selector: 'x365-fm-loans-apply-editor',
  templateUrl: './apply-editor.component.html',
  styleUrls: ['./apply-editor.component.scss'],
  providers: [ApplyEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplyEditorComponent extends BaseFormComponent implements OnInit {

  private subscriptions: ISubscriptions = {};
  showInput: boolean;

  disableInput: boolean = true;
  // disableSubmitButton: boolean = !!this.fs.monthlyDeduction;
  currencySelected: boolean = true;
  showSecondaryButton: boolean = false

  @Input() public show: boolean;
  @Input() public loanTypes: ISelectOption[];
  @Input() public width: number;
  @Input() public data: any;
  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {

    }

    if (this.show == false) {
      this.reset();
      this.fs.form = this.fs.buildForm();
    } else {
      this.showSecondaryButton = false
    }
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;

  isProcessing$: Observable<boolean>;
  showViewerGenericSchedule$: Observable<boolean>;
  loanDefinitions$: Observable<ILoanDefinition[]>
  loanCurrencies$: Observable<ISelectOption[]>;
  monthlyDeductionAmount$: Observable<number>;
  genericSchedule$: Observable<ILoanRepayment[]>;
  loanTypesSelect$: Observable<ISelectOption[]>;
  saveSuccess$: Observable<boolean>;


  constructor(
    public fs: ApplyEditorService,
    public utilService: UtilService,
    private store: Store<ILoanState>,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  get enableSubmit(): boolean {
    return !!this.fs.monthlyDeduction.value
  }

  onFocus($event) {
    this.fs.monthlyDeduction.setValue(null)
  };


  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingApplication));
    this.showViewerGenericSchedule$ = this.store.pipe(select(showViewerGenericSchedule));
    this.loanDefinitions$ = this.store.pipe(select(getLoanDefinitionsDataApplication));
    this.loanCurrencies$ = this.store.pipe(select(getLoanCurrenciesDataApplication));
    this.monthlyDeductionAmount$ = this.store.pipe(select(getMonthlyDeductionAmount));
    this.genericSchedule$ = this.store.pipe(select(getGenericSchedule));
    this.loanTypesSelect$ = this.store.pipe(select(getLoanTypesSelect))
    this.saveSuccess$ = this.store.pipe(select(saveSuccess))
  }

  private dispatchMonthlyDeduction(interest: number, tenor: number, amount: number) {
    this.store.dispatch(new LoadMonthlyDeductionAmount({
      rate: interest,
      period: tenor,
      principal: amount
    }))
  }
  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  getDefinitionData$(rowId: number): Observable<ILoanDefinition> {
    return this.loanDefinitions$.pipe(
      map(d => d.filter(v => v.loan_id === rowId)),
      map(e => e.shift()))
  }

  onFileSelected(data: any) {
    if (data) {
      this.fs.patch({
        doc_binary: data.content,
        doc_extension: data.extension,
        doc_size: data.size,
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
    }
  }

  onFileRemoved() {
    this.fs.patch({
      doc_binary: null,
      doc_extension: null,
      doc_size: 0
    });
  }

  public onLoanTypeSelected(event: number) {
    this.subscriptions['definitionData'] = this.getDefinitionData$(event).subscribe(val => {
      this.currencySelected = true;
      val.charge_interest ? this.fs.interestRate.setValue(val.interest_rate) : this.fs.interestRate.setValue(0);
      this.disableInput = (val.allow_rules_variation === false);
      this.fs.tenor.setValue(val.tenor_months);
      this.fs.moratorium.setValue(val.moratorium);
    });

    if (this.fs.tenor.value != null && this.fs.loanAmount.value != null && this.fs.effectiveDate.value != null) {
      this.showSecondaryButton = true;
    }

    const tenor = (this.fs.tenor.value.toString().length > 0);
    const loanAmount = (this.fs.loanAmount.value && this.fs.loanAmount.value !== '');
    const interestRate = (this.fs.interestRate.value.toString().length > 0);
    if (tenor && loanAmount && interestRate) {
      this.dispatchMonthlyDeduction(this.fs.interestRate.value, this.fs.tenor.value, this.fs.loanAmount.value);
    }
  }

  onEffectiveDateSelected(event) {
    if (this.fs.tenor.value != null && this.fs.loanAmount.value != null && this.fs.loanId.value != null) {
      this.showSecondaryButton = true;
    }
  }
  onSecondaryButtonClicked() {
    if (this.fs.loanId.value != null && this.fs.loanAmount.value != null && this.fs.interestRate.value != null && this.fs.tenor.value != null && this.fs.effectiveDate.value != null) {
      this.store.dispatch(new LoadGenericScheduleData({
        loanId: this.fs.loanId.value,
        loanAmount: this.fs.loanAmount.value,
        interestRate: this.fs.interestRate.value,
        tenor: this.fs.tenor.value,
        effectiveDate: formatDate(this.fs.effectiveDate.value)
      }))

      this.store.dispatch(new ShowViewerGenericSchedule());
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: `Loan Type, Amount, Interest Rate, Tenor and Effective Date cannot be empty`, type: ToastTypes.ERROR }));
    }
  }

  onSubmit() {
    this.fs.transformInputsToNumber();
    this.fs.transformDatesInput();
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingApplication());
      this.store.dispatch(new SaveDataLoanApplication({ data: <IApplicationCreate>this.fs.value }));
      this.saveSuccess$.subscribe(success => {
        if (success) {
          this.utilService.unsubscribe(...Object.values(this.subscriptions));
        }
      })
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }


  public onEnteredAmount(event) {
    this.fs.monthlyDeduction.setValue(null);
    const tenor = (this.fs.tenor.value.toString().length > 0);
    const amount = (event.target.value.toString().length > 0);
    const interestRate = (this.fs.interestRate.value.toString().length > 0);
    if (amount) {
      if (tenor && interestRate) {
        if (this.fs.tenor.value > 0) {
          this.dispatchMonthlyDeduction(this.fs.interestRate.value, this.fs.tenor.value, event.target.value);
        } else {
          this.store.dispatch(new ShowToast({ title: 'Cannot Load Monthly Deduction', message: `Tenor field cannot be zero`, type: ToastTypes.ERROR }));
        }
      } else {
        this.store.dispatch(new ShowToast({ title: 'Cannot Load Monthly Deduction', message: `Tenor and/or Interest Rate and/or cannot be empty`, type: ToastTypes.ERROR }));
      }
    } else {
      this.store.dispatch(new ShowToast({ title: 'Cannot Load Monthly Deduction', message: `Amount field cannot be empty`, type: ToastTypes.ERROR }));
    }

    this.subscriptions['monthlyDeduction1'] = this.monthlyDeductionAmount$.subscribe(val => this.fs.monthlyDeduction.setValue(val));
    if (this.fs.tenor.value != null && this.fs.loanId.value != null && this.fs.effectiveDate != null) {
      this.showSecondaryButton = true;
    }
  }

  public onTenorEdited(event: any) {
    this.fs.monthlyDeduction.setValue(null);
    const loanAmount = (this.fs.loanAmount.value && this.fs.loanAmount.value !== '');
    const tenor = (event.target.value.toString().length > 0);
    const interestRate = (this.fs.interestRate.value.toString().length > 0);
    console.log(+event.target.value !== 0);
    if (tenor && +event.target.value !== 0) {
      if (loanAmount && interestRate) {
        this.dispatchMonthlyDeduction(this.fs.interestRate.value, event.target.value, this.fs.loanAmount.value);
      } else {
        this.store.dispatch(new ShowToast({ title: 'Cannot Load Monthly Deduction', message: `Amount and/or Interest Rate cannot be empty`, type: ToastTypes.ERROR }));
      }
    } else {
      this.store.dispatch(new ShowToast({
        title: 'Cannot Load Monthly Deduction', message: `Tenor field can neither be zero nor empty`, type: ToastTypes.ERROR }));
    }

    this.subscriptions['monthlyDeduction2'] = this.monthlyDeductionAmount$.subscribe(val => this.fs.monthlyDeduction.setValue(val));
    if (this.fs.loanAmount.value != null && this.fs.loanId.value != null && this.fs.effectiveDate != null) {
      this.showSecondaryButton = true;
    }
  }

  onCurrencySelected(event) {
    this.currencySelected = false;
  }

  onCancel() {
    this.store.dispatch(new NotProcessingApplication());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
    this.utilService.unsubscribe(...Object.values(this.subscriptions));
  }

  getValue($event) {
    this.showInput = $event.target.checked;
  }

  reset() {
    this.fs.f.reset();
    this.filePicker.removeFile();
    // this.fs.init(this.data);
  }


}
