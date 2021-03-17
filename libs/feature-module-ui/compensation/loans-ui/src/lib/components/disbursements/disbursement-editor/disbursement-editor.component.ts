import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BaseFormComponent, ToastTypes, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';
import DataSource from 'devextreme/data/data_source';
import { FilePickerComponent } from '@nutela/shared/ui';
import { Observable } from 'rxjs';
import { UtilService, toastOptionsError, formatDate } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { isProcessingDisbursements, getDefinitions, ProcessingDisbursements, LoadDefinitions, SaveDisbursement, NotProcessingDisbursements } from '../../../store/disbursements';
import { IDisbursed } from '@nutela/models/compensation/loans';
import { ShowToast } from '@nutela/store/shared';
import { DisbursementEditorService } from './disbursement-editor.service';
import { ILoanState } from '../../../store';

@Component({
  selector: 'x365-fm-loans-disbursement-editor',
  templateUrl: './disbursement-editor.component.html',
  styleUrls: ['./disbursement-editor.component.scss'],
  providers: [DisbursementEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisbursementEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {
  activePersonnelDataSource: any = null;


  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IDisbursed;
  @Input() public activePersonnel: ISelectOption[];

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['activePersonnel']) {
      this.activePersonnelDataSource = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });
    }

    if (changes['data']) {
      this.fs.init(this.data);
    }

    if (this.show == true) {
      this.setFormValues();
    } else if (this.show == false) {
      this.reset();
      this.fs.form = this.fs.buildForm()
    }

  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;

  isProcessing$: Observable<boolean>;
  loanTypes$: Observable<ISelectOption[]>
  paymentInstruments$: Observable<ISelectOption[]>

  constructor(
    public fs: DisbursementEditorService,
    public utilService: UtilService,
    private store: Store<ILoanState>,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingDisbursements));
    this.loanTypes$ = this.store.pipe(select(getDefinitions));
  }

  storeDispatches() {
    this.store.dispatch(new ProcessingDisbursements());
    this.store.dispatch(new LoadDefinitions());
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onActualDateSelected(event) {
    this.fs.patch({
      first_deduction_date: formatDate(new Date(new Date(event).setMonth(new Date(event).getMonth() + this.data.moratorium)))
    })
    // this.fs.firstDeductionDate.setValue(new Date(new Date(event.value).setMonth(new Date(event.value).getMonth() + this.fs.moratorium.value)));
  }

  onFileSelected(data: any) {
    if (data) {
      this.fs.patch({
        attach_document: data.content,
        img_extension: data.fileExt || FILE_EXTENSIONS.png,
        img_size: data.size
      });
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: 'File format not supported', type: ToastTypes.ERROR }));
    }
  }

  setFormValues() {
    this.fs.patch({
      employee_id: this.data.employee_id,
      loandetail_id: this.data.loan_det_id,
      loan_id: this.data.loan_id,
      moratorium: this.data.moratorium,
      disburse_actual_date: this.data.disburse_actual_date
    })
    if (this.data.disburse_actual_date != null) {
      this.fs.patch({
        first_deduction_date: new Date(new Date(this.data.disburse_actual_date).setMonth(new Date(this.fs.actualDate.value).getMonth() + this.data.moratorium))
      })
    }
  }

  onFileRemoved(data: any) {
    this.fs.patch({
      attach_document: null,
      img_extension: '',
      img_size: null
    });
  }

  onSubmit() {

    this.fs.returnFormattedDate();
    if (this.fs.valid) {
      this.fs.f.removeControl('loan_id');
      this.fs.f.removeControl('moratorium');
      this.store.dispatch(new ProcessingDisbursements());
      this.store.dispatch(new SaveDisbursement({ data: <IDisbursed>this.fs.value }));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingDisbursements());
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
