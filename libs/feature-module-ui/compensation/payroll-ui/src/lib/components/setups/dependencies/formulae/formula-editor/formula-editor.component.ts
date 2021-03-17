import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { IFormula } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { FormulaEditorService } from './formula-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingFormula, ProcessingFormula, SaveFormula, NotProcessingFormula, UpdateFormula, getRoleData, LoadRoleData } from '../../../../../store/dependencies/formula';
import { ShowToast } from '@nutela/store/shared';
import { RolesPickerComponent } from '../../roles-picker/roles-picker.component';
import { ISelectOption } from '@nutela/models/core-data';
import { IRolesTransform } from 'libs/feature-module-ui/platform/provisioning-ui/src/lib/models/interfaces';
import { Validators } from '@angular/forms';

@Component({
  selector: 'x365-fm-payrl-formula-editor',
  templateUrl: './formula-editor.component.html',
  styleUrls: ['./formula-editor.component.scss'],
  providers: [FormulaEditorService]
})
export class FormulaEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IFormula;
  @Input() public payrollProfileSelectOption: ISelectOption[];
  @Input() public selectedProfile: number;
  @Input() public isAdmin: boolean;

  linkToPayroll: boolean;

  @Output() cancelClick = new EventEmitter<any>();
  // @ViewChild('rolesPicker') rolesPicker: RolesPickerComponent;

  // roles$: Observable<IRolesTransform[]>;

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
    public fs: FormulaEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    // this.storeDispatches();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingFormula));
    // this.roles$ = this.store.pipe(select(getRoleData))
  }

  // storeDispatches() {
  //   this.store.dispatch(new LoadRoleData());
  // }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onLinkToProfileChecked(event) {
    if (event.target.checked) {
      this.fs.patch({
        payroll_profile_id: this.selectedProfile
      })
      this.fs.profile.setValidators(Validators.required)
      this.fs.isLinkedToPayrollProfile.value = true;
      this.fs.isLinkedToPayrollProfile.profile_id = this.selectedProfile;
    } else {
      // this.fs.profile.setValue(null);
      console.log('validators')
      this.fs.isLinkedToPayrollProfile.value = false;
      this.fs.isLinkedToPayrollProfile.profile_id = null;
      this.fs.profile.clearValidators()
    }
    this.fs.profile.updateValueAndValidity();
  }

  setDynamicFieldsEdit(isLinked: boolean, profileId: number) {
    this.fs.isLinkedToPayrollProfile.value = isLinked;
    this.fs.isLinkedToPayrollProfile.profile_id = profileId;

    this.fs.isAdmin = this.isAdmin;
  }

  onArrowButtonClick(e) {
    // this.store.dispatch(new LoadingNewEmployee());
    this.fs.patch({
      role_list: e
    })
  }

  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingFormula());
      if (this.inEditMode()) {
        this.store.dispatch(new UpdateFormula({ data: this.fs.value, recordId: this.data.formula_id }))
      } else {
        this.store.dispatch(new SaveFormula({ data: this.fs.value }));
      }
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingFormula());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.rebuildForm();
    this.fs.init(this.data);
    this.fs.isLinkedToPayrollProfile.value = false
    this.fs.isLinkedToPayrollProfile.profile_id = null;
  }
}
