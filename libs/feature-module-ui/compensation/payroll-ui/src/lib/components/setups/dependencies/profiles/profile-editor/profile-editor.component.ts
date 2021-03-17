import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { IProfile } from '@nutela/models/compensation/payroll';
import { Observable } from 'rxjs';
import { ProfileEditorService } from './profile-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../../store/root/root.state';
import { isProcessingProfile, ProcessingProfile, SaveProfile, NotProcessingProfile, LoadCostCenterSelectOptionData, isLoadingFormProfile, NotLoadingFormData, ShowTreeProfile, showTreeProfile, HideTreeProfile, UpdateProfile } from '../../../../../store/dependencies/profile';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-payrl-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss'],
  providers: [ProfileEditorService]
})
export class ProfileEditorComponent extends BaseFormComponent implements OnInit {
  isTaxable: boolean = false;
  showLocationtypeTree: boolean = false;
  showLocationDetailTree: boolean = false;
  showRoleSelect: boolean = false;
  showRuncycle: boolean = false;
  showCurrentPeriod: boolean = false;
  showCurrencies: boolean = false;

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IProfile;
  @Input() public cutoffDaySelectOption: ISelectOption[];
  @Input() public paymentRundaySelectOption: ISelectOption[];
  @Input() public taxOptionSelectOption: ISelectOption[];
  @Input() public taxModeSelectOption: ISelectOption[];
  @Input() public currencySelectOption: ISelectOption[];
  @Input() public payPeriodSelectOption: ISelectOption[];
  @Input() public enterpriseStructureSelectOption: ISelectOption[];
  @Input() public structureDetailsSelectOption: ISelectOption[];
  @Input() public costCenterSelectOption: ISelectOption[];
  @Input() public taxRuleSelectOption: ISelectOption[];
  @Input() public fixedDeductionSelectOption: ISelectOption[];
  @Input() public coinageRoundingSelectOption: ISelectOption[];
  @Input() public upfrontTreatmentSelectOption: ISelectOption[];
  @Input() public periodicProrationSelectOption: ISelectOption[];
  @Input() public allowNegativePaySelectOption: ISelectOption[];
  @Input() public runCycleSelectOption: ISelectOption[];
  @Input() public securityRoleSelectOption: ISelectOption[];
  @Input() public hasProfileAdminRole: boolean;
  @Input() public securityGroup: string;

  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  showTree$: Observable<boolean>;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
    if (this.show === false) {
      this.fs.form = this.fs.buildForm();
      this.showCurrencies = false;
    }
  }


  constructor(
    public fs: ProfileEditorService,
    public utilService: UtilService,
    private store: Store<IRootState>) {
    super();
  }
  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingProfile));
    this.isLoading$ = this.store.pipe(select(isLoadingFormProfile));
    this.showTree$ = this.store.pipe(select(showTreeProfile));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  setDynamicFields(locationDetail: number, useSecurityGroup: boolean, isRunnable: boolean) {
    if (locationDetail) {
      this.store.dispatch(new LoadCostCenterSelectOptionData({ structureId: locationDetail }));
    }
    this.showRoleSelect = useSecurityGroup;
    this.showRuncycle = isRunnable;
    this.fs.hasProfileAdminRole = this.hasProfileAdminRole;
  }

  onTreeButtonClick() {
    this.store.dispatch(new ShowTreeProfile());
  }

  onStructureSelected(event: any) {
    this.store.dispatch(new LoadCostCenterSelectOptionData({ structureId: event.structureDetail }));
    this.fs.patch({
      location_type_id: event.structureType,
      location_detail_id: event.costCenter,
    });

  };

  toggleLocationTypeTreeView() {
    this.showLocationtypeTree = !this.showLocationtypeTree
  }


  toggleLocationDetailTreeView() {
    this.showLocationDetailTree = !this.showLocationDetailTree
  }

  onSecurityGroupChanged(evt: any) {
    this.showRoleSelect = evt.target.checked;
    if(!this.showRoleSelect) {
      this.fs.securityGroup.setValue(null);
    }
  }

  onIncludeCurrentPeriodChecked(evt: any) {
    this.showCurrentPeriod = evt.target.checked;
    if (!evt.target.checked) {
      this.fs.currentPeriod.setValue(null);
    }
  }

  onUseMultiCurrencyChecked(evt: any) {
    this.showCurrencies = evt.target.checked;
    if (!evt.target.checked) {
      this.fs.currency.setValue(null);
    }
  }

  onRunnableChanged(evt: any) {
    this.showRuncycle = evt.target.checked;
    if (!this.showRoleSelect) {
      this.fs.runCycle.setValue(null);
    }
  }

  onSubmit() {
    if (this.fs.valid) {
      console.log(this.fs.value);
      this.store.dispatch(new ProcessingProfile());
      if (this.inEditMode()) {
        this.store.dispatch(new UpdateProfile({ data: this.fs.value, recordId: this.data.payroll_profile_id }));
      } else {
        this.store.dispatch(new SaveProfile({ data: this.fs.value }));
      }
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingProfile());
    this.store.dispatch(new NotLoadingFormData());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  onCancelStructurePicker() {
    this.store.dispatch(new HideTreeProfile());
  }

  onDoneButtonClicked() {
    this.onCancelStructurePicker();
  }


  reset() {
    this.fs.f.reset();
    this.fs.rebuildForm();
    this.fs.init(this.data);
    this.fs.showFixedDeduction = false;
    this.showRoleSelect = false;
    this.showRuncycle = false;
  }
}
