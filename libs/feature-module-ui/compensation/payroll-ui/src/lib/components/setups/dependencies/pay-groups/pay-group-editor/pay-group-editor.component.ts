import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { IPayGroup } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { PayGroupEditorService } from './pay-group-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingPayGroup, ProcessingPayGroup, SavePayGroup, NotProcessingPayGroup, UpdatePayGroup } from '../../../../../store/dependencies/pay-group';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-payrl-pay-group-editor',
  templateUrl: './pay-group-editor.component.html',
  styleUrls: ['./pay-group-editor.component.scss'],
  providers: [PayGroupEditorService]
})

export class PayGroupEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IPayGroup;
  @Input() public gradeSelectOption: ISelectOption[];
  @Input() public confirmationSelectOption: ISelectOption[];
  @Input() public defaultCurrencySelectOption: ISelectOption[];
  @Input() public paygroupSelectOption: ISelectOption[];
  @Input() public payrollProfileSelectOption: ISelectOption[];
  @Input() public selectedStatus: any;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
    if (this.show === true && !this.data) {
      this.fs.form = this.fs.buildForm();
      this.fs.confirmationStatus.setValue(this.selectedStatus);
    }
  }


  isProcessing$: Observable<boolean>;
  constructor(
    public fs: PayGroupEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingPayGroup));
  }

  storeDispatches() {  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onConfirmationSelected(event) {
    event.value == 2 ? this.fs.showPaygroups = true : this.fs.showPaygroups = false;
  }

  setConfirmationStatus(status: number) {
    this.fs.patch({
      confirmation_status: status
    })
    // this.fs.confirmationStatus.setValue(status);
  }
  // onRestrictToRoleChecked(event) {
  //   this.fs.restrictToRole = event.target.checked;
  // }

  // onLinkToProfileChecked(event) {
  //   this.fs.isLinkedToPayrollProfile = event.target.checked;
  // }

  onArrowButtonClick(e) {
    // this.store.dispatch(new LoadingNewEmployee());
    this.fs.patch({
      roleNames: e
    })
  }

  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingPayGroup());
      if (this.inEditMode()) {
        this.store.dispatch(new UpdatePayGroup({ data: this.fs.value, recordId: this.data.paygroup_id }));
      } else {
        this.store.dispatch(new SavePayGroup({ data: this.fs.value }));
      }
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingPayGroup());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.rebuildForm();
    this.fs.init(this.data);
    this.fs.showPaygroups = false
  }
}
