import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { toastOptionsError, UtilService } from '@nutela/core-services';
import { ITaxManagement } from '@nutela/models/compensation/payroll';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ITaxManagementProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-management-profile.interface';
import { Observable } from 'rxjs';
import { IRootState } from '../../../../store/root';
import { HideTaxProfile, isProcessingTaxManagement, NotProcessingTaxManagement, ProcessingTaxManagement, SaveTaxManagementProfile } from '../../../../store/setup/tax-management';
import { TaxManagementProfileEditorService } from './tax-management-profile-editor.service';

@Component({
  selector: 'x365-fm-payrl-tax-management-profile-editor',
  templateUrl: './tax-management-profile-editor.component.html',
  styleUrls: ['./tax-management-profile-editor.component.scss']
})
export class TaxManagementProfileEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public warningMessage: string = null;
  // @Input() public data: ITaxManagementProfile;
  @Input() public data: ITaxManagement;

  showHidePercentage: boolean = true;

  isProcessing$: Observable<boolean>;

  constructor(
    public fs: TaxManagementProfileEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingTaxManagement));
  }

  storeDispatches() {
  }

  onSubmit() {
    console.log(this.data);
    console.log(this.fs.value);
    if(this.fs.value.tax_remainder_values == null)
    {
      this.fs.patch({ tax_remainder_values: false });
    }
    // localStorage.removeItem('taxManagementProfileData');
    if (this.fs.valid) {
      if (this.inEditMode()) {
        const recordId = this.fs.value.tax_id;
        this.store.dispatch(new ProcessingTaxManagement());
        this.store.dispatch(new SaveTaxManagementProfile({ data: <ITaxManagementProfile>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      }
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
    }
  }

  onCancel() {
    this.store.dispatch(new NotProcessingTaxManagement());
    this.store.dispatch(new HideTaxProfile());
    this.data = null;
    this.reset();
  }

  setDefaultFields(data: ITaxManagement) {
    this.fs.patch({ description: data.description });
    this.fs.patch({ payroll_profile_id: data.payroll_profile_id });
  }

  setFieldvalue(data: ITaxManagementProfile) {
    this.fs.patch({ tax_remainder_values: data.tax_remainder_values });
    this.fs.patch({ percentage: data.percentage });
    this.fs.patch({ tax_id: data.tax_id });
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }

    if (this.show === false) {
      this.reset();
    }
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  onReminderChange(isPercent) {
    if (!isPercent) {
      this.fs.patch({ percentage: 0 });
    }
  }

}
