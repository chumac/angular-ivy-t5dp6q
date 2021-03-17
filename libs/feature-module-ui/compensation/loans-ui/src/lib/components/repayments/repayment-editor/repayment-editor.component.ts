import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ILoanRepayment, IApprovedLoan } from '@nutela/models/compensation/loans';
import { ISelectOption } from '@nutela/models/core-data';
import DataSource from 'devextreme/data/data_source';
import { FilePickerComponent } from '@nutela/shared/ui';
import { Observable } from 'rxjs';
import { UtilService, toastOptionsError, formatDate } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { Store, select } from '@ngrx/store';
import { isProcessingRepayments, getDataRepaymentTypes, getDataPaymentInstruments, getDefinitionsRepayment, ProcessingRepayments, LoadDataRepaymentTypes, LoadDataPaymentInstruments, LoadDefinitionsRepayment, SaveRepayment, NotProcessingRepayments, getRepaymentInterestRepayment, LoadDataRepaymentInterest } from '../../../store/repayments';
import { ShowToast } from '@nutela/store/shared';
import { RepaymentEditorService } from './repayment-editor.service';
import { ILoanState } from '../../../store';

@Component({
  selector: 'x365-fm-loans-repayment-editor',
  templateUrl: './repayment-editor.component.html',
  styleUrls: ['./repayment-editor.component.scss'],
  providers: [RepaymentEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepaymentEditorComponent extends BaseFormComponent
implements OnInit {
  activePersonnelDataSource: any = null;
  disablePartialAmount: boolean;

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IApprovedLoan;

  @Input() public activePersonnel: ISelectOption[];

  @Output() cancelClick = new EventEmitter<any>();

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

    if(this.show == true) {
      // this.fs.amount.setValue(this.data.initial_loan_amount);

    } else if(this.show == false) {
      this.reset();
      this.fs.form = this.fs.buildForm()
    }
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;

  isProcessing$: Observable<boolean>;
  repaymentTypes$: Observable<ISelectOption[]>
  paymentInstruments$: Observable<ISelectOption[]>
  loanDefinitions$: Observable<ISelectOption[]>;
  repaymentInterest$: Observable<any>;

  constructor(
    public fs: RepaymentEditorService,
    public utilService: UtilService,
    private store: Store<ILoanState>,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.disablePartialAmount = true;
    this.fs.repaymentType.setValue(0);
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingRepayments));
    this.repaymentTypes$ = this.store.pipe(select(getDataRepaymentTypes));
    this.paymentInstruments$ = this.store.pipe(select(getDataPaymentInstruments));
    this.loanDefinitions$ = this.store.pipe(select(getDefinitionsRepayment))
    this.repaymentInterest$ = this.store.pipe(select(getRepaymentInterestRepayment));
  }

  storeDispatches() {
    this.store.dispatch(new ProcessingRepayments());
    this.store.dispatch(new LoadDataRepaymentTypes())
    this.store.dispatch(new LoadDataPaymentInstruments());
    this.store.dispatch(new LoadDefinitionsRepayment());
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onEffectivePeriodSelected(event) {
    if(this.show == true && this.disablePartialAmount == true) {
      this.store.dispatch(new LoadDataRepaymentInterest({effectiveDate: formatDate(event), loandetailId: this.data.loandetail_id, returnInterestOnly: 0}));
      this.repaymentInterest$.subscribe(val => {
        this.data.loan_balance = val;
        this.fs.patch({
          amount: this.data.loan_balance,
          full_amount: this.data.loan_balance
        })
      })
    }
  }

  onFileSelected(data: any) {
    if (data) {
      this.fs.patch({
        document_image: data.content,
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
    }
  }

  onRepaymentTypeSelected(event) {
    if(event.value == 0) {
      this.disablePartialAmount = true;
      this.fs.patch({
        amount: this.data.loan_balance
      })
    } else {
      this.disablePartialAmount = false;
    }
  }

  onFileRemoved(data: any) {
    this.fs.patch({
      document_image: null,
    });
  }

  onSubmit() {
    this.fs.transformInputsToNumber();
    if(this.fs.effectivePeriod.value !== null) {
      this.fs.effectivePeriod.setValue(formatDate(this.fs.effectivePeriod.value));
    }
    if (this.fs.valid) {
      this.fs.f.removeControl('full_amount');
      this.store.dispatch(new ProcessingRepayments());
      this.store.dispatch(new SaveRepayment({data: <ILoanRepayment>this.fs.value}));
    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingRepayments());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    // this.filePicker.removeFile();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }
}
