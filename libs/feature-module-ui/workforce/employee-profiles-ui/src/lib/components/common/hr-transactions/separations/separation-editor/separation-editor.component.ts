import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { ISeparation } from '@nutela/models/workforce/employee-profiles';
import { Observable } from 'rxjs';
import { SeparationEditorService } from './separation-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../../../store/root';
import { isProcessingSeparationTransaction, ProcessingSeparationTransaction, SaveSeparationTransaction,
         UpdateSeparationTransaction, NotProcessingSeparationTransaction, getEmployeeListSeparationTransaction, getStatusSeparationTransaction, getReasonSeparationTransaction, getAllowanceSeparationTransaction, getCurrencySeparationTransaction, isLoadingSeparationTransaction, LoadingSeparationTransaction, NotLoadingSeparationTransaction } from '../../../../../store/hr-transactions/separation';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import { SubmitExitSeparationTransaction } from 'libs/feature-module-ui/workforce/exit-ui/src/lib/store/hr-process';

@Component({
  selector: 'x365-fm-workforce-separation-editor',
  templateUrl: './separation-editor.component.html',
  styleUrls: ['./separation-editor.component.scss'],
  providers: [SeparationEditorService]
})

export class SeparationEditorComponent extends BaseFormComponent  implements OnInit{
  @Input() public show: boolean;
  @Input() public width: number;


  @Input() public data: ISeparation;
  @Input() public hrFinalizeExit: boolean = false;
  @Input() public disableEmployeeField: boolean = false;

  @Output() cancelClick = new EventEmitter<any>();


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if (this.show === false) {
      this.fs.form = this.fs.buildForm();
      this.fs.status = false;
      this.fs.showLumpsum = false;
    }else {
      this.fs.init(this.data);
    }
  }

  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  employeeList$: Observable<ISelectOption[]>;
  replaceList$: Observable<ISelectOption[]>;
  reasons$: Observable<ISelectOption[]>;
  allowance$: Observable<ISelectOption[]>;
  currency$: Observable<ISelectOption[]>;


  constructor(
    public fs: SeparationEditorService,
    public utilService: UtilService,
    private store: Store<IEmployeesProfileState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }



    storeSelects() {
       this.isProcessing$=this.store.pipe(select(isProcessingSeparationTransaction));
       this.isLoading$=this.store.pipe(select(isLoadingSeparationTransaction));
       this.employeeList$=this.store.pipe(select(getEmployeeListSeparationTransaction));
       this.replaceList$=this.store.pipe(select(getEmployeeListSeparationTransaction));
       this.reasons$=this.store.pipe(select(getReasonSeparationTransaction));
       this.allowance$=this.store.pipe(select(getAllowanceSeparationTransaction));
       this.currency$=this.store.pipe(select(getCurrencySeparationTransaction));
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
        this.fs.formatDate();
        this.store.dispatch(new ProcessingSeparationTransaction());
        if (this.hrFinalizeExit) {
          this.store.dispatch(new SubmitExitSeparationTransaction({ data: this.fs.value }));
        } else {
          const recordId = this.data ? this.data.separation_id : 0;

          this.inEditMode() ? this.store.dispatch(new UpdateSeparationTransaction({ data: this.fs.value, recordId: recordId })) : this.store.dispatch(new SaveSeparationTransaction({ data: this.fs.value }));
       }

      } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(),  type: ToastTypes.ERROR}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingSeparationTransaction());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }

  onProcessPayrollChecked(event) {
    if (event.target.checked) {
      this.fs.showLumpsum = true;

    } else {
      this.fs.showLumpsum = false;
      this.fs.status = false;

      this.fs.payLumpsum.setValue(false)
      this.fs.lumpsumAmount.setValue(null)
      this.fs.lumpsumAllowance.setValue(null)
      this.fs.currency.setValue(null)

      }
    }
    onClickLumpsum(event){
      if (event.target.checked) {
        this.fs.status = true
      } else {
        this.fs.status = false
        this.fs.lumpsumAmount.setValue(null)
        this.fs.lumpsumAllowance.setValue(null)
        this.fs.currency.setValue(null)
      }
    }
}
