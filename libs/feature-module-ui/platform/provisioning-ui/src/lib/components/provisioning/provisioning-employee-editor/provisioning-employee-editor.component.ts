import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import * as constants from '@nutela/shared/app-global';

import DataSource from 'devextreme/data/data_source';

import { isProcessingNewEmployee, ProcessingNewEmployee, NotProcessingNewEmployee, getStaffCategories, SaveNewEmployee, getStaffNumber, getEnterpriseStructureTypes, LoadEnterpriseStructurTypes, getEnterpriseStructureDetails, LoadEnterpriseStructureDetails, LoadCostCenters, getCostCenters, LoadPaygroups, getPayGroup, LoadUsername, getUsername, getDesignations, getPositions, LoadStaffCategories, LoadDesignations, LoadPositions, getPaygrade, LoadPaygrades, getUserTypes, getRecordCategories, getEmailsTo, LoadEmailsTo, LoadRecordCategories, LoadUserTypes, LoadStaffNumber, LoadRoleData, getRoleData, isLoadingNewEmployee, LoadingNewEmployee, NotLoadingNewEmployee, showTreeNewEmployee, ShowTreeNewEmployee, HideTreeNewEmployee } from '../../../store/new-employee';
import { ISelectOption } from '@nutela/models/core-data';

import { map } from 'rxjs/operators';
import { ISelectOptionData } from '@nutela/models/common';
import { ProvisioningEmployeeEditorService } from './provisioning-employee-editor.service';
import { IStaffCategory, IEnterpriseStructureType, IAnalysisDetail, IRolesTransform, IProvisioning } from '../../../models/interfaces';
import { Validators } from '@angular/forms';
import { RolesPickerComponent } from './roles-picker/roles-picker.component';
import { IProvisioningState } from '../../../store/root';

@Component({
  selector: 'x365-fm-plf-prov-provisioning-employee-editor',
  templateUrl: './provisioning-employee-editor.component.html',
  styleUrls: ['./provisioning-employee-editor.component.scss'],
  providers: [ProvisioningEmployeeEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProvisioningEmployeeEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  activePersonnelDataSourceReportsTo: any = null;
  activePersonnelDataSourceBackupOfficer: any = null;

  isProcessing$: Observable<boolean>;
  showStructurePicker$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  staffNumber$: Observable<string>;
  categoryDataSource$: Observable<IStaffCategory[]>;
  enterpriseStructureTypesData$: Observable<IEnterpriseStructureType[]>;
  enterpriseStructureDetailsData$: Observable<IAnalysisDetail[]>;
  costCentersData$: Observable<ISelectOption[]>;
  usernameData$: Observable<string>;
  staffCategoryData$: Observable<IStaffCategory[]>;
  designationData$: Observable<ISelectOption[]>;
  positionData$: Observable<ISelectOption[]>;
  paygradeData$: Observable<ISelectOption[]>;
  paygroupsData$: Observable<ISelectOption[]>;
  detailOptionsSelect$: Observable<ISelectOption[]>;
  recordCategoriesSelect$: Observable<ISelectOption[]>;
  userTypeOptionsSelect$: Observable<ISelectOption[]>;
  roles$: Observable<IRolesTransform[]>;

  entStrucTypeTransformed: ISelectOption[];
  entStrucDetailTransformed: ISelectOption[];
  paygroupsTransformed: ISelectOption[];
  paygradesTransformed: ISelectOption[];
  staffCategoriesTransformed: ISelectOption[];
  entStructure: any;
  costCenter: any;
  paygrades: any;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IProvisioning;
  @Input() public selectOptionData: ISelectOptionData;
  @Input() public activePersonnel: ISelectOption[];

  @Output() cancelClick = new EventEmitter<any>();
  @Output() showForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('num') nameInputRef: ElementRef;
  @ViewChild('rolesPicker') rolesPicker: RolesPickerComponent;
  @ViewChild('lookupContainer') lookupContainer: ElementRef;


  positionConfig = { my: 'top', at: 'bottom', of: this.lookupContainer }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activePersonnel']) {
      this.activePersonnelDataSourceReportsTo = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });
      this.activePersonnelDataSourceBackupOfficer = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });
    }

    if (changes['data']) {
      this.toggleStatusGender();
    }

    if (this.show === false) {
      this.reset();
    }
  }

  constructor(
    public fs: ProvisioningEmployeeEditorService,
    public utilService: UtilService,
    private store: Store<IProvisioningState>,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.storeDispatch();
    this.storeSelects();
    this.loadTransformedData();
  }

  storeDispatch() {
    this.store.dispatch(new LoadStaffCategories());
    this.store.dispatch(new LoadDesignations());
    this.store.dispatch(new LoadPaygrades())
    this.store.dispatch(new LoadUserTypes());
    this.store.dispatch(new LoadRecordCategories());
    this.store.dispatch(new LoadEmailsTo());
    this.store.dispatch(new LoadRoleData());
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingNewEmployee));
    this.isLoading$ = this.store.pipe(select(isLoadingNewEmployee));
    this.showStructurePicker$ = this.store.pipe(select(showTreeNewEmployee));
    this.staffNumber$ = this.store.pipe(select(getStaffNumber));
    this.enterpriseStructureTypesData$ = this.store.pipe(select(getEnterpriseStructureTypes));
    this.enterpriseStructureDetailsData$ = this.store.pipe(select(getEnterpriseStructureDetails));
    this.costCentersData$ = this.store.pipe(select(getCostCenters));
    this.usernameData$ = this.store.pipe(select(getUsername));
    this.staffCategoryData$ = this.store.pipe(select(getStaffCategories));
    this.designationData$ = this.store.pipe(select(getDesignations));
    this.positionData$ = this.store.pipe(select(getPositions));
    this.paygradeData$ = this.store.pipe(select(getPaygrade))
    this.paygroupsData$ = this.store.pipe(select(getPayGroup));
    this.detailOptionsSelect$ = this.store.pipe(select(getEmailsTo));
    this.recordCategoriesSelect$ = this.store.pipe(select(getRecordCategories));
    this.userTypeOptionsSelect$ = this.store.pipe(select(getUserTypes));
    this.roles$ = this.store.pipe(select(getRoleData))
  }

  loadTransformedData() {
    this.getTransformedEntStructureType();
    this.getTransformedStaffCategories();
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onArrowButtonClick(e) {
    this.store.dispatch(new LoadingNewEmployee());
    this.fs.patch({
      roleNames: e
    })
  }

  onAutogenerateClick() {
    if (this.fs.firstName.value != null && this.fs.surname.value != null) {
      this.store.dispatch(new LoadingNewEmployee());
      this.store.dispatch(new LoadUsername({ firstname: this.fs.firstName.value, surname: this.fs.surname.value, middlename: this.fs.middleName.value }))
      this.usernameData$
        .subscribe(val => {
          this.fs.employeeUsername.setValue(val);
        })
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: `First Name Surname and Middle Name cannot be empty`, type: ToastTypes.ERROR }));
    }
  }

  getTransformedEntStructureType() {
    this.store.dispatch(new LoadEnterpriseStructurTypes());
    this.enterpriseStructureTypesData$.subscribe(
      val => {
        this.entStrucTypeTransformed = this.utilService.transformToSelectDataList(val, 'analysis_id', 'description');
      }
    )
    this.enterpriseStructureDetailsData$.subscribe(
      val => {
        this.entStrucDetailTransformed = this.utilService.transformToSelectDataList(val, 'analysis_det_id', 'description');
      }
    )
  }

  getTransformedStaffCategories() {
    this.staffCategoryData$.subscribe(
      val => {
        this.staffCategoriesTransformed = this.utilService.transformToSelectDataList(val, 'category_id', 'description');
      }
    )
  }

  onDesignationSelected(event) {
    this.store.dispatch(new LoadPositions({ designationId: event.itemData.value }));
  }

  onPaygradeSelected(event: any) {
    // this.store.dispatch(new ProcessingNewEmployee());
    this.fs.payGroup.setValue(null);
    this.store.dispatch(new LoadPaygroups({ recordId: event.itemData.value }))
  }

  getRowEnterpriseStructureTypeData$(rowId: number): Observable<IEnterpriseStructureType> {
    return this.enterpriseStructureTypesData$.pipe(
      map(d => d.filter(v => v.analysis_id === rowId)),
      map(e => e.shift()))
  }
  onEnterpriseStructureTypeSelected(event) {

    this.fs.enterpriseStructureDetail.setValue(null);
    this.fs.costCentre.setValue(null);
    this.getRowEnterpriseStructureTypeData$(event.value)
      .subscribe((result) => {
        this.store.dispatch(new LoadingNewEmployee());
        this.entStructure = result.analysis_detailsInfo;
        this.store.dispatch(new LoadEnterpriseStructureDetails({ recordId: result.analysis_id }))
        this.enterpriseStructureDetailsData$ = this.store.pipe(select(getEnterpriseStructureDetails));
      }
      );
  }
  // onEnterpriseStructureTypeSelected(event) {
  //   this.fs.enterpriseStructureDetail.setValue(null);
  //   this.fs.costCentre.setValue(null);
  //   this.getRowEnterpriseStructureTypeData$(event.itemData.value)
  //     .subscribe((result) => {
  //       this.store.dispatch(new LoadingNewEmployee());
  //       this.entStructure = result.analysis_detailsInfo;
  //       this.store.dispatch(new LoadEnterpriseStructureDetails({ recordId: result.analysis_id }))
  //       this.enterpriseStructureDetailsData$ = this.store.pipe(select(getEnterpriseStructureDetails));
  //     }
  //     );
  // }

  onEnterpriseStructureSelected(event) {
    this.fs.enterpriseStructureDetail.setValue(null);
    this.store.dispatch(new LoadingNewEmployee());
    this.store.dispatch(new LoadCostCenters({ recordId: event.value }));
  }
  // onEnterpriseStructureSelected(event) {
  //   this.fs.enterpriseStructureDetail.setValue(null);
  //   this.store.dispatch(new LoadingNewEmployee());
  //   this.store.dispatch(new LoadCostCenters({ recordId: event.itemData.analysis_det_id }));
  // }

  getCategoryData$(rowId: number): Observable<IStaffCategory> {
    return this.staffCategoryData$.pipe(
      map(d => d.filter(v => v.category_id === rowId)),
      map(e => e.shift()))
  }

  onCategorySelected(event) {
    this.store.dispatch(new LoadingNewEmployee());
    this.getCategoryData$(event.itemData.value)
      .subscribe(result => {
        this.store.dispatch(new LoadStaffNumber({ scheme: result.numbering_scheme }))
      })
    this.fs.employeeNumber.setValue(null);
  }

  generateStaffNumber() {
    if (this.fs.staffCategory.value == null) {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: `Please select a staff category`, type: ToastTypes.ERROR }));
    }
    this.staffNumber$
      .subscribe(num => {
        this.fs.patch({
          employee_number: num
        })
      });
  }


  showToolTip(e) {
    var list = e.component.content().find(".dx-list");
    var items = list.find(".dx-item");
    // items.on("dxhoverstart", function (args) {
    //     if (isEllipsisActive($(this).find(".dx-list-item-content")[0])) {
    //         tooltip.content().text($(this).data().dxListItemData.text);
    //         tooltip.show(args.target);
    //     }
    // });
    // items.on("dxhoverend", function (args) {
    //     tooltip.hide();
    // });
  }

  onSubmit() {

    this.fs.transformDate();
    this.fs.endDateValidation();
    if (this.fs.middleName.value == null || this.fs.middleName.value == "") {
      this.fs.middleName.setValue('.');
    }
    if (this.fs.valid) {
      this.fs.f.removeControl('cost_centre_id');
      this.store.dispatch(new ProcessingNewEmployee());
      this.store.dispatch(new SaveNewEmployee({ data: <IProvisioning>this.fs.value }));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingNewEmployee());

    this.fs.form = this.fs.buildForm();
    this.cancelClick.emit();
  }

  getStatusValue($event) {
    if ($event.label === 'Custom') {
      this.fs.showEmailType = true;
    } else {
      this.fs.showEmailType = false;
    }
  }

  onUserOnActiveDirectoryChecked($event) {
    this.fs.showInput = $event.target.checked;
  }

  onEmploymentDatePicked(event) {
    this.fs.startDate.setValue(event);
  }

  onUserTypeSelected(event) {
    if (event.itemData.value === 1) {
      this.store.dispatch(new NotLoadingNewEmployee());
      this.fs.isAdmin = false;
    } else {
      this.fs.isAdmin = true;
    }
  }

  isPermanentStaff(event) {
    this.fs.permanentStaff = event.target.checked;
    if (event.target.checked) {
      this.fs.endDate.setValidators([Validators.nullValidator]);
    };
    this.fs.endDate.updateValueAndValidity();
  }

  isUserOnPayroll($event) {
    this.fs.userOnPayroll = $event.target.checked;
  }

  onEmployeeTitleSelected($event) {
    this.setTitleByGender($event.itemData.label);
    this.toggleStatusGender();
  }

  setTitleByGender(title: string) {
    if (title === constants.TITLE.mr) {
      this.fs.employeeGender.setValue(constants.GENDER.male);
    } else if (
      title === constants.TITLE.miss ||
      title === constants.TITLE.mrs ||
      title === constants.TITLE.ms
    ) {
      this.fs.employeeGender.setValue(constants.GENDER.female);
    }
  }

  toggleStatusGender() {
    if (this.isGenderNeutral()) {
      this.fs.employeeGender.enable();
    } else {
      this.fs.employeeGender.disable();
    }
  }

  isGenderNeutral(): boolean {
    const title = this.fs.employeeTitle.value || '';

    if (title === constants.TITLE.dr) {
      return true;
    } else {
      return false;
    }
  }

  reset() {
    this.fs.f.reset();
    this.rolesPicker.selectedRolesList = []
    this.store.dispatch(new LoadRoleData());
    this.fs.init();
  }

  onTreeButtonClick() {
    this.store.dispatch(new ShowTreeNewEmployee());
  }
  onStructureSelected(event) {
    this.store.dispatch(new LoadEnterpriseStructureDetails({ recordId: event.structureType }));
    this.store.dispatch(new LoadCostCenters({ recordId: event.structureDetail }));
    this.fs.patch({
      ent_struc_type_id: event.structureType,
      ent_struc_details_id: event.structureDetail,
      cost_centre_id: event.costCenter,
    });

  };

  onDoneButtonClicked() {
    this.onCancelStructurePicker();
  }

  onCancelStructurePicker() {
    this.store.dispatch(new HideTreeNewEmployee());
  }

  ngOnDestroy() {
  }
}
