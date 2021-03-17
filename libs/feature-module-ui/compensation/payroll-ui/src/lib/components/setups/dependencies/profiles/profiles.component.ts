import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import {
  IgxGridComponent
} from 'igniteui-angular';
import { Observable } from 'rxjs';
import { IProfile } from '@nutela/models/compensation/payroll';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../store/root/root.state';
import { DialogService } from '@nutela/shared/ui';
import { LoadProfileData, LoadingProfile, getProfile, isLoadingProfile, showEditorProfile, ShowEditorProfile, HideEditorProfile, DeleteProfile, getDaysSelectOptionDataProfile, getTaxOptionSelectOptionDataProfile, getTaxModeSelectOptionDataProfile, getTaxRuleSelectOptionDataProfile, getPaymentCurrencySelectOptionDataProfile, getEnterpriseStructureSelectOptionDataProfile, getPayPeriodSelectOptionDataProfile, getStructureDetailsSelectOptionDataProfile, getCostCenterSelectOptionDataProfile, getFixedDeductionSelectOptionDataProfile, getCoinageRoundingSelectOptionDataProfile, getUpfrontTreatmentSelectOptionDataProfile, getPeriodicProrationSelectOptionDataProfile, LoadEnterpriseStructureSelectOptionData, LoadFixedDeductionSelectOptionData, LoadPaymentCurrencySelectOptionData, getAllowNegativePaySelectOptionDataProfile, LoadAllowNegativePaySelectOptionData, LoadTaxModeSelectOptionData, LoadTaxOptionSelectOptionData, LoadTaxRuleSelectOptionData, LoadRunCycleSelectOptionData, getRunCycleSelectOptionDataProfile, LoadPayPeriodSelectOptionData, LoadDaysSelectOptionData, LoadCoinageRoundingSelectOptionData, LoadUpfrontTreatmentSelectOptionData, LoadPeriodicProrationSelectOptionData, getsecurityRoleSelectOptionDataProfile, LoadSecurityRolesSelectOptionData, getUpdateSecurityGroupEligibilityProfile, HideViewerProfile, ShowViewerProfile, showViewerProfile, hasProfileAdminRole } from '../../../../store/dependencies/profile';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { ProfilesService } from './profiles.service';
import { map, take } from 'rxjs/operators';
import { ISelectOption } from '@nutela/models/core-data';
import { UtilService } from '@nutela/core-services';
import { Title } from '@angular/platform-browser';
import { ProfileViewerComponent } from './profile-viewer/profile-viewer.component';

@Component({
  selector: 'x365-fm-payrl-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
  providers: [ProfilesService]
})

export class ProfilesComponent implements OnInit {

  runCycles: any = [];

  profileData$: Observable<IProfile[]>;
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  daysSelectOption$: Observable<ISelectOption[]>;
  taxOptionSelectOption$: Observable<ISelectOption[]>;
  taxModeSelectOption$: Observable<ISelectOption[]>;
  currencySelectOption$: Observable<ISelectOption[]>;
  payPeriodSelectOption$: Observable<ISelectOption[]>;
  enterpriseStructureSelectOption$: Observable<ISelectOption[]>;
  structureDetailsSelectOption$: Observable<ISelectOption[]>;
  costCenterSelectOption$: Observable<ISelectOption[]>;
  taxRuleSelectOption$: Observable<ISelectOption[]>;
  fixedDeductionSelectOption$: Observable<ISelectOption[]>;
  coinageRoundingSelectOption$: Observable<ISelectOption[]>;
  upfrontTreatmentSelectOption$: Observable<ISelectOption[]>;
  periodicProrationSelectOption$: Observable<ISelectOption[]>;
  allowNegativePaySelectOption$: Observable<ISelectOption[]>;
  runCycleSelectOption$: Observable<any[]>;
  securityRoleSelectOption$: Observable<ISelectOption[]>;
  canUpdateSecurityGroup$: Observable<any>;
  hasProfileAdminRole$: Observable<boolean>;

  @ViewChild('editor') editor: ProfileEditorComponent;
  @ViewChild('viewer') viewer: ProfileViewerComponent;
  @ViewChild('profileGrid') profileGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, public service: ProfilesService, private store: Store<IRootState>,
    public utilService: UtilService, private dialogService: DialogService) {
    titleService.setTitle(
      `${'Payroll Profile Management'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.setRunCycles();
  }

  storeDispatches() {
    this.store.dispatch(new LoadingProfile());
    this.store.dispatch(new LoadProfileData());
    this.store.dispatch(new LoadEnterpriseStructureSelectOptionData());
    this.store.dispatch(new LoadFixedDeductionSelectOptionData());
    this.store.dispatch(new LoadPaymentCurrencySelectOptionData());
    this.store.dispatch(new LoadAllowNegativePaySelectOptionData());
    this.store.dispatch(new LoadTaxModeSelectOptionData());
    this.store.dispatch(new LoadTaxOptionSelectOptionData());
    this.store.dispatch(new LoadTaxRuleSelectOptionData());
    this.store.dispatch(new LoadRunCycleSelectOptionData());
    this.store.dispatch(new LoadPayPeriodSelectOptionData());
    this.store.dispatch(new LoadDaysSelectOptionData());
    this.store.dispatch(new LoadCoinageRoundingSelectOptionData());
    this.store.dispatch(new LoadUpfrontTreatmentSelectOptionData());
    this.store.dispatch(new LoadPeriodicProrationSelectOptionData());
    this.store.dispatch(new LoadSecurityRolesSelectOptionData());
    // this.store.dispatch(new LoadUpdateSecurityGroupEligibility());
  }

  storeSelects() {
    this.profileData$ = this.store.pipe(select(getProfile));
    this.isLoading$ = this.store.pipe(select(isLoadingProfile));
    this.showEditor$ = this.store.pipe(select(showEditorProfile))
    this.showViewer$ = this.store.pipe(select(showViewerProfile))
    this.canUpdateSecurityGroup$ = this.store.pipe(select(getUpdateSecurityGroupEligibilityProfile))
    this.hasProfileAdminRole$ = this.store.pipe(select(hasProfileAdminRole))

    this.daysSelectOption$ = this.store.pipe(select(getDaysSelectOptionDataProfile));
    this.taxOptionSelectOption$ = this.store.pipe(select(getTaxOptionSelectOptionDataProfile));
    this.taxModeSelectOption$ = this.store.pipe(select(getTaxModeSelectOptionDataProfile));
    this.currencySelectOption$ = this.store.pipe(select(getPaymentCurrencySelectOptionDataProfile));
    this.payPeriodSelectOption$ = this.store.pipe(select(getPayPeriodSelectOptionDataProfile));
    this.enterpriseStructureSelectOption$ = this.store.pipe(select(getEnterpriseStructureSelectOptionDataProfile));
    this.structureDetailsSelectOption$ = this.store.pipe(select(getStructureDetailsSelectOptionDataProfile));
    this.costCenterSelectOption$ = this.store.pipe(select(getCostCenterSelectOptionDataProfile));
    this.taxRuleSelectOption$ = this.store.pipe(select(getTaxRuleSelectOptionDataProfile));
    this.fixedDeductionSelectOption$ = this.store.pipe(select(getFixedDeductionSelectOptionDataProfile));
    this.coinageRoundingSelectOption$ = this.store.pipe(select(getCoinageRoundingSelectOptionDataProfile));
    this.upfrontTreatmentSelectOption$ = this.store.pipe(select(getUpfrontTreatmentSelectOptionDataProfile));
    this.periodicProrationSelectOption$ = this.store.pipe(select(getPeriodicProrationSelectOptionDataProfile));
    this.allowNegativePaySelectOption$ = this.store.pipe(select(getAllowNegativePaySelectOptionDataProfile));
    this.runCycleSelectOption$ = this.store.pipe(select(getRunCycleSelectOptionDataProfile));
    this.securityRoleSelectOption$ = this.store.pipe(select(getsecurityRoleSelectOptionDataProfile));
  }


  search() {
    let filterBy: string = '';
    let searchString: string = '';
    if (this.searchInput) {
      searchString = this.searchInput.nativeElement.value;
    }

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.profileGrid) {
      this.service.search(
        this.profileGrid,
        searchString,
        filterBy
      );
    }
  }

  getRowData$(rowId: number): Observable<IProfile> {
    return this.profileData$.pipe(
      map(d => d.filter(v => v.payroll_profile_id === rowId)),
      map(e => e.shift()))
  }

  getRunCycleData$(rowId: number): Observable<any> {
    return this.runCycleSelectOption$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  setRunCycles() {
    this.runCycleSelectOption$.subscribe(val => {
      this.runCycles = val
    })
  }

  getArchiveStaus(rowId: number) {
    let status: boolean;
    this.getRowData$(rowId).pipe(take(1)).subscribe(profile => {
      status = profile.archive_Status
    })
    return status;
  }

  getRunCycleText(rowId: number): string {
    let cycle: any;
    if ((typeof(rowId) === 'number') && this.runCycles) {
      cycle = this.runCycles.find(val => val.id === rowId);
    }
    return cycle ? cycle.description : null;
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.editor.setDynamicFields(result.location_detail_id, result.use_security_group, result.is_runnable);
        this.store.dispatch(new ShowEditorProfile());
      }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerProfile());
      }
      );
  }

  onArchiveIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), `Are you sure you want to delete this item?`);

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new LoadingProfile())
        this.store.dispatch(new DeleteProfile({ recordId: rowId }));
      }
    });
  }


  onAdd() {
    this.editor.reset();
    this.store.dispatch(new ShowEditorProfile());
  }

  onRefresh() {
    this.store.dispatch(new LoadProfileData());
    this.store.dispatch(new ShowToast({ title: null, message: ` Profile data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorProfile());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerProfile());
  }

}

