import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, SimpleChanges, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ILoanDefinition, IApprovedLoan, ILoanRepayment } from '@nutela/models/compensation/loans';
import { ISelectOption } from '@nutela/models/core-data';
import { FilePickerComponent } from '@nutela/shared/ui';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError, formatDate } from '@nutela/core-services';
import DataSource from 'devextreme/data/data_source';
import { ShowToast } from '@nutela/store/shared';
import { TransactionApplyEditorService } from './transaction-apply-editor.service';
import { map } from 'rxjs/operators';
import { getLoanTypesDataTransactions, isProcessingTransactions, getCurreciesDataTransactions, ProcessingDataTransactions, SaveDataTransactionApplication, NotProcessingTransactions, SaveUpdateDataTransactionApplication, getMonthlyDeductionAmount, LoadMonthlyDeductionAmountTransaction, showViewerGenericSchedule, getGenericSchedule, LoadGenericScheduleData, ShowViewerGenericScheduleTransaction, getTransactionLoanTypesSelect } from '../../../store/transactions';
import { ILoanState } from '../../../store';
import { ISubscriptions } from '@nutela/models/common';
import { saveSuccess } from '../../../store/applications';

@Component({
  selector: 'x365-fm-loans-trasaction-apply-editor',
  templateUrl: './transaction-apply-editor.component.html',
  styleUrls: ['./transaction-apply-editor.component.scss'],
  providers: [TransactionApplyEditorService]
})
export class TransactionApplyEditorComponent  extends BaseFormComponent
  implements OnInit, OnDestroy {

  private subscriptions: ISubscriptions = {};

activePersonnelDataSource: any = null;
disableInput: boolean = true;
showInput: boolean = true;
currencySelected: boolean = true;
showSecondaryButton: boolean = false

@Input() public show: boolean;
@Input() public width: number;

@Input() public data: IApprovedLoan;

@Input() public activePersonnel: ISelectOption[];
@Input() public loanTypesSelect: ISelectOption[];

@Output() cancelClick = new EventEmitter<any>();

@ViewChild('tenorValue') tenorValue:ElementRef;

ngOnChanges(changes: SimpleChanges): void {

  if(changes['activePersonnel']) {
    this.activePersonnelDataSource = new DataSource({
      paginate: true,
      pageSize: 50,
      store: this.activePersonnel
    });
  }

  if(changes['data']) {
    this.fs.init(this.data);
  }

  if( this.show == false) {
    this.reset();
    this.fs.form = this.fs.buildForm()
  }

  if(this.inEditMode()) {
    this.showSecondaryButton = true;
  }

}

@ViewChild('filePicker') filePicker: FilePickerComponent;

isProcessing$: Observable<boolean>;
loanDefinitions$: Observable<ILoanDefinition[]>;
essSource$: Observable<ISelectOption[]>;
currenciesData$: Observable<ISelectOption[]>;
monthlyDeductionAmount$: Observable<number>;
genericSchedule$: Observable<ILoanRepayment[]>;
showViewerGenericSchedule$: Observable<boolean>;
saveSuccess$: Observable<boolean>;

constructor(
  public fs: TransactionApplyEditorService,
  public utilService: UtilService,
  private store: Store<ILoanState>,
  private cd: ChangeDetectorRef
) {
  super();
}

ngOnInit() {
  this.storeSelects();
  this.showSecondaryButton = false
}

storeSelects() {
  this.isProcessing$ = this.store.pipe(select(isProcessingTransactions));
  this.showViewerGenericSchedule$ = this.store.pipe(select(showViewerGenericSchedule));
  this.loanDefinitions$ = this.store.pipe(select(getLoanTypesDataTransactions));
  this.currenciesData$ = this.store.pipe(select(getCurreciesDataTransactions));
  this.monthlyDeductionAmount$ = this.store.pipe(select(getMonthlyDeductionAmount));
  this.genericSchedule$ = this.store.pipe(select(getGenericSchedule));
  this.saveSuccess$ = this.store.pipe(select(saveSuccess))
}

  private dispatchMonthlyDeduction(interest: number, tenor: number, amount: number) {
    this.store.dispatch(new LoadMonthlyDeductionAmountTransaction({
      rate: interest,
      period: tenor,
      principal: amount
    }))
  }

  get enableSubmit(): boolean {
    return !!this.fs.monthlyDeduction.value
  }

  onFocus($event) {
    this.fs.monthlyDeduction.setValue(null)
  };

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

onProxyUserChecked($event) {
  this.showInput = $event.target.checked;
}

  public onLoanTypeSelected(event: number) {
    this.getDefinitionData$(event).subscribe(val => {
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
      if (+this.fs.tenor.value !== 0) {
        this.dispatchMonthlyDeduction(this.fs.interestRate.value, this.fs.tenor.value, this.fs.loanAmount.value);
      } else {
        this.store.dispatch(new ShowToast({ title: 'Cannot Load Monthly Deduction', message: `Tenor field cannot be zero`, type: ToastTypes.ERROR }));
      }
    }
  }

onEffectiveDateSelected(event) {
  if(this.fs.tenor.value != null && this.fs.loanAmount.value != null && this.fs.loanId.value != null) {
    this.showSecondaryButton = true;
  }
}

onSecondaryButtonClicked() {
  if (this.fs.loanId.value != null && this.fs.loanAmount.value != null && this.fs.interestRate.value != null && this.fs.tenor.value != null && this.fs.effectiveDate.value != null) {
    if (+this.fs.tenor.value > 0) {
      this.store.dispatch(new LoadGenericScheduleData({
        loanId: this.fs.loanId.value,
        loanAmount: this.fs.loanAmount.value,
        interestRate: this.fs.interestRate.value,
        tenor: this.fs.tenor.value,
        effectiveDate: formatDate(this.fs.effectiveDate.value)
      }))
      this.store.dispatch(new ShowViewerGenericScheduleTransaction());
    } else {
      this.store.dispatch(new ShowToast({ title: 'Cannot Load Monthly Deduction', message: `Tenor field cannot be zero`, type: ToastTypes.ERROR }));
    }
  } else {
    this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: `Loan Type, Amount, Interest Rate, Tenor and Effective Date cannot be empty`, type: ToastTypes.ERROR}));
  }
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
  }

  public onTenorEdited(event) {
    this.fs.monthlyDeduction.setValue(null);
    const loanAmount = (this.fs.loanAmount.value && this.fs.loanAmount.value !== '');
    const tenor = (event.target.value.toString().length > 0);
    const interestRate = (this.fs.interestRate.value.toString().length > 0);
    if (tenor && +event.target.value !== 0) {
      if (loanAmount && interestRate) {
        this.dispatchMonthlyDeduction(this.fs.interestRate.value, event.target.value, this.fs.loanAmount.value);
      } else {
        this.store.dispatch(new ShowToast({ title: 'Cannot Load Monthly Deduction', message: `Amount and/or Interest Rate cannot be empty`, type: ToastTypes.ERROR }));
      }
    } else {
      this.store.dispatch(new ShowToast({
        title: 'Cannot Load Monthly Deduction', message: `Tenor field can neither be zero nor empty`, type: ToastTypes.ERROR
      }));
    }

    this.subscriptions['monthlyDeduction2'] = this.monthlyDeductionAmount$.subscribe(val => this.fs.monthlyDeduction.setValue(val));
  };

  public onInterestRateEdited(event) {
    const loanAmount = (this.fs.loanAmount.value.toString().length > 0);
    const interestRate = (event.target.value.toString().length > 0);
    const tenor = (this.fs.tenor.value.toString().length > 0);
    if (interestRate) {
      if (loanAmount && tenor) {
        if (+this.fs.tenor.value > 0) {
          this.dispatchMonthlyDeduction(event.target.value, this.fs.tenor.value, this.fs.loanAmount.value);
        } else {
          this.store.dispatch(new ShowToast({ title: 'Cannot Load Monthly Deduction', message: `Tenor field cannot be zero`, type: ToastTypes.ERROR }));
        }
      } else {
        this.store.dispatch(new ShowToast({ title: 'Cannot Load Monthly Deduction', message: `Amount and/or Tenor cannot be empty`, type: ToastTypes.ERROR }));
      }
    } else {
      this.store.dispatch(new ShowToast({ title: 'Cannot Load Monthly Deduction', message: `Interest Rate field cannot be empty`, type: ToastTypes.ERROR }));
    }

    this.subscriptions['monthlyDeduction2'] = this.monthlyDeductionAmount$.subscribe(val => this.fs.monthlyDeduction.setValue(val));
  }


  onCurrencySelected(event) {
    this.currencySelected = false;
  }

getDefinitionValues(event) {
  this.getDefinitionData$(event.value).subscribe(val => {
    val.charge_interest? this.fs.interestRate.setValue(0): this.fs.interestRate.setValue(val.interest_rate);
    val.allow_rules_variation? this.disableInput = false : this.disableInput;
    this.fs.tenor.setValue(val.tenor_months);
    this.fs.moratorium.setValue(val.moratorium);
  })
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

onSubmit() {
  this.fs.transformDatesInput();
  this.fs.transformInputsToNumber();
  if(this.fs.valid) {
    if(this.inEditMode()) {
      const recordId = this.data? this.data.loandetail_id: null;
      const employeeId = this.data? this.data.EmployeeInfo.employee_id: null;
      this.store.dispatch(new ProcessingDataTransactions());
      this.store.dispatch(new SaveUpdateDataTransactionApplication({ data: <IApprovedLoan>this.fs.value, recordId: recordId, employeeId: employeeId, editMode: this.inEditMode() }))
      this.saveSuccess$.subscribe(success => {
        if (success) {
          this.utilService.unsubscribe(...Object.values(this.subscriptions));
        }
      })
    } else {
      this.store.dispatch(new ProcessingDataTransactions());
      this.store.dispatch(new SaveDataTransactionApplication({ data: <IApprovedLoan>this.fs.value }));
      this.saveSuccess$.subscribe(success => {
        if (success) {
          this.utilService.unsubscribe(...Object.values(this.subscriptions));
        }
      })
    }
  }  else {
    this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
  }
}


getErrorMessage() {
  return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
}

onCancel() {
  this.store.dispatch(new NotProcessingTransactions());
  this.data = null;
  this.reset();
  this.cancelClick.emit();
}

reset() {
  this.fs.f.reset();
  this.filePicker.removeFile();
  this.fs.init(this.data);
}

ngOnDestroy() {
}
}
