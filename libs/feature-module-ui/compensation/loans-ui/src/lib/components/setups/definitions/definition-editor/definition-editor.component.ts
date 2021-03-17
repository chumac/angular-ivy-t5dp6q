import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, SimpleChanges, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ILoanDefinition, IPayrollProfileInfo } from '@nutela/models/compensation/loans';
import { ISelectOption } from '@nutela/models/core-data';
import { FilePickerComponent } from '@nutela/shared/ui';
import { Observable } from 'rxjs';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import DataSource from 'devextreme/data/data_source';
import { isProcessingDefinitions, getDataDeductionRules, getDataGroupNames, LoadDataDeductionRulesDefinition, LoadDataGroupNamesDefinition, ProcessingDataDefinitions, SaveUpdateDataDefinition, SaveDataDefinition, NotProcessingDefinitions, getDataAmortizationRules, LoadDataAmortizationRulesDefinition, LoadDataDeductionAllowancesDefinition, getDataDeductionAllowances, getDataPayrollProfiles, getPayrollProfileSelect, LoadIntDataDeductionAllowancesDefinition, LoadDataPayrollProfilesDefinition, LoadDataPayrollProfileListDefinition } from '../../../../store/definitions';
import { ShowToast } from '@nutela/store/shared';
import { DefinitionEditorService } from './definition-editor.service';
import { map, take } from 'rxjs/operators';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { ILoanState } from '../../../../store';

@Component({
  selector: 'x365-fm-loans-definition-editor',
  templateUrl: './definition-editor.component.html',
  styleUrls: ['./definition-editor.component.scss'],
  providers: [DefinitionEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefinitionEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy {

activePersonnelDataSource: any = null;
groupItem: boolean;
showInterestSettings: boolean;
deductFromAllowance: boolean;
payrollProfileId: number;
runCycle: number;

@Input() public show: boolean;
@Input() public width: number;

@Input() public data: ILoanDefinition;

@Input() public activePersonnel: ISelectOption[];
@Input() public payrollProfile: ISelectOption[];
@Input() public deductionProfile: ISelectOption[];

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

  if(this.show == false) {
    this.fs.form = this.fs.buildForm();
    this.groupItem = false;
    this.showInterestSettings = false;
    this.deductFromAllowance = false;
  }
}

@ViewChild('filePicker') filePicker: FilePickerComponent;
@ViewChild('deductionPeriod') deductionPeriod: SelectComponent;

isProcessing$: Observable<boolean>;
deductionRules$: Observable<ISelectOption[]>;
groupNames$: Observable<ISelectOption[]>;
amortizationRules$: Observable<ISelectOption[]>;
deductionAllowances$: Observable<ISelectOption[]>;
payrollProfiles$: Observable<IPayrollProfileInfo[]>;
payrollProfileSelect$: Observable<ISelectOption[]>;


constructor(
  public fs: DefinitionEditorService,
  public utilService: UtilService,
  private store: Store<ILoanState>,
  private cd: ChangeDetectorRef
) {
  super();
}

ngOnInit() {
  this.storeSelects();
  this.storeDispatches();
  this.fs.amortizationRule.setValue(0);
}

storeSelects() {
  this.isProcessing$ = this.store.pipe(select(isProcessingDefinitions));
  this.payrollProfileSelect$ = this.store.pipe(select(getPayrollProfileSelect))
  this.deductionRules$ = this.store.pipe(select(getDataDeductionRules));
  this.deductionAllowances$ = this.store.pipe(select(getDataDeductionAllowances));
  this.amortizationRules$ = this.store.pipe(select(getDataAmortizationRules));
  this.groupNames$ = this.store.pipe(select(getDataGroupNames));
  this.payrollProfiles$ = this.store.pipe(select(getDataPayrollProfiles));

}

storeDispatches() {
  this.store.dispatch(new LoadDataPayrollProfilesDefinition());
  this.store.dispatch(new LoadDataPayrollProfileListDefinition());
}

onPayrollProfileSelected(event) {
  this.payrollProfileId = event.value
  this.store.dispatch(new LoadDataDeductionAllowancesDefinition({payrollProfileId: event.value}))
  this.getPayrollProfileData$(event.value).subscribe(payrollProfile => {
    this.fs.patch({
      principal_deduction_period: payrollProfile.run_cycle
    });
  })
}

onInterestPayrollProfileSelected(event) {
  this.payrollProfileId = event.value
  // this.store.dispatch(new LoadIntDataDeductionAllowancesDefinition({intPayrollProfileId: event.value}))
  this.getPayrollProfileData$(event.value).subscribe(payrollProfile => {
    this.fs.patch({
      interest_deduction_period: payrollProfile.run_cycle
    });
  })
}

onGroupItemChecked(event) {
  this.groupItem = event.target.checked;
}

getPayrollProfileData$(rowId: number): Observable<IPayrollProfileInfo> {
  return this.payrollProfiles$.pipe(
    map(d => d.filter(v => v.payroll_profile_id === rowId)),
    map(e => e.shift()), take(1))
}

onChargeInterestChecked(event) {
 this.showInterestSettings = event.target.checked;
}
onDeductFormAllowanceChecked(event) {
  this.deductionAllowances$.subscribe(val => {
    if(val == null && this.payrollProfileId != undefined) {
      this.store.dispatch(new LoadDataDeductionAllowancesDefinition({payrollProfileId: this.payrollProfileId}));
    }
  })
  this.deductFromAllowance = event.target.checked;
}

inEditMode(): boolean {
  if (this.data) {
    return true;
  } else {
    return false;
  }
}

  onSubmit() {
  if(this.fs.chargeInterest.value == false) {
    this.fs.interestDeductionPeriod.setValue(this.fs.deductionPeriod.value);
    this.fs.interestPayrollProfile.setValue(this.fs.payrollProfile.value);
    this.fs.interestRate.setValue(0);
  }
  if(this.fs.valid) {
    this.fs.transformInputsToNumber();
    if(this.inEditMode()) {
      const recordId = this.data? this.data.loan_id: 0;
      this.store.dispatch(new ProcessingDataDefinitions());
      this.store.dispatch(new SaveUpdateDataDefinition({data: <ILoanDefinition>this.fs.value, recordId: recordId, editMode: this.inEditMode()}));
    } else {
    this.store.dispatch(new ProcessingDataDefinitions());
    this.store.dispatch(new SaveDataDefinition({data: <ILoanDefinition>this.fs.value}));
    }

  }  else {
    this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
  }
}


getErrorMessage() {
  return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
}

onCancel() {
  this.store.dispatch(new NotProcessingDefinitions());
  this.data = null;
  this.reset();
  this.cancelClick.emit();
}

reset() {
  this.fs.f.reset();
  this.fs.init(this.data);
}

ngOnDestroy() {
}
}
