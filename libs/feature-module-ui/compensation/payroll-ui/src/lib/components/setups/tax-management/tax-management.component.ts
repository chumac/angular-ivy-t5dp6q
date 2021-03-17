import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
// import { ITaxManagement, ITaxManagementProfile } from '@nutela/models/compensation/payroll';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { LoadListTaxManagementData, LoadListTaxManagementProfileData, HideEditorTaxManagementProfile, getTaxManagementProfileData, getTaxManagementData, showEditorTaxManagementProfile, ShowEditorTaxManagementProfile, getTaxFixedDeductionData, LoadTaxFixedDectionListData, ShowFixedDeduction, showTaxFixedDeduction, getTaxFixedDeductionValue, LoadTaxFixedDectionData, showTaxProfile, ShowTaxProfile } from '../../../store/setup/tax-management';
import { TaxManagementService } from './tax-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { STANDARD_ROUTES } from '@nutela/shared/app-global';
import { ITaxFixedDeduction } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-fixedDeduction.interface';
import { FixDeductionComponent } from './fix-deduction/fix-deduction.component';
import { ITaxFixedDeductionupdate } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-fixedDeduction-update.interface';
import { ITaxManagementProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-management-profile.interface';
import { ITaxManagement } from '@nutela/models/compensation/payroll';
import { TaxManagementProfileEditorComponent } from './tax-management-profile-editor/tax-management-profile-editor.component';

@Component({
  selector: 'x365-fm-payrl-tax-management',
  templateUrl: './tax-management.component.html',
  styleUrls: ['./tax-management.component.scss'],
  providers: [TaxManagementService]
})
export class TaxManagementComponent implements OnInit {

  taxManagementData$: Observable<ITaxManagement[]>;
  taxManagementProfileData$: Observable<ITaxManagementProfile[]>;
  taxFixedDeductionData$: Observable<ITaxFixedDeduction[]>;
  taxFixedDeductionValue$: Observable<ITaxFixedDeductionupdate[]>;

  dropDownFilterValue: string;
  showEditor$: Observable<boolean>;
  showtaxFixedDeduction$: Observable<boolean>;
  showtaxProfile$: Observable<boolean>;

  @ViewChild('grid') grid: IgxGridComponent;
  @ViewChild('fixedDeduction') fixedDeduction: FixDeductionComponent;
  @ViewChild('taxManagementProfile') taxManagementProfile: TaxManagementProfileEditorComponent;

  constructor(private store: Store<IAppState>, public service: TaxManagementService, private route: ActivatedRoute, private router: Router) {
    this.assignProfileId();
  }

  assignProfileId() {
    this.route.params.pipe(take(1)).subscribe(v => {
      this.showEditor$ = this.store.pipe(select(showEditorTaxManagementProfile));
      this.taxManagementData$ = this.store.pipe(select(getTaxManagementData));
      this.store.dispatch(new LoadListTaxManagementData());
    });
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadListTaxManagementData());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorTaxManagementProfile));
    this.taxManagementData$ = this.store.pipe(select(getTaxManagementData));
    this.showtaxFixedDeduction$ = this.store.pipe(select(showTaxFixedDeduction));
    this.showtaxProfile$ = this.store.pipe(select(showTaxProfile));
    this.taxFixedDeductionData$ = this.store.pipe(select(getTaxFixedDeductionData));
  }

  getRowData$(rowId: number): Observable<ITaxManagement> {
    return this.taxManagementData$.pipe(
      map(d => d.filter(v => v.payroll_profile_id === rowId)),
      map(e => e.shift()))
  }

  filterTaxManagementProfileData$(rowId: number): Observable<ITaxManagementProfile> {
    return this.taxManagementProfileData$.pipe(
      map(d => d.filter(v => v.payroll_profile_id === rowId)),
      map(e => e.shift()))
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorTaxManagementProfile());
  }

  onEditIconClicked(rowId: number, taxRule) {
    if (taxRule == 0 || taxRule == 5) {
      this.taxManagementProfileData$ = this.store.pipe(select(getTaxManagementProfileData));
      this.store.dispatch(new LoadListTaxManagementProfileData({ recordId: rowId }));

      this.filterTaxManagementProfileData$(rowId).subscribe((result) => {
        if (result) {
          this.taxManagementProfile.setFieldvalue(result);
        }
      }
      );
      
      this.getRowData$(rowId).subscribe((result) => {
        if (result) {
          this.taxManagementProfile.data = result;
          this.taxManagementProfile.setDefaultFields(result);
          this.store.dispatch(new ShowTaxProfile());
        }
      }
      );
    }
    else if (taxRule == 4) {
      this.taxFixedDeductionData$ = this.store.pipe(select(getTaxFixedDeductionData));
      this.store.dispatch(new LoadTaxFixedDectionListData({ recordId: rowId }));

      this.taxFixedDeductionValue$ = this.store.pipe(select(getTaxFixedDeductionValue));
      this.store.dispatch(new LoadTaxFixedDectionData({ recordId: rowId }));

      this.getFixedDeductionData$(rowId).subscribe((result) => {
        if (result) {
          this.fixedDeduction.setDefaultFields(result);
          this.store.dispatch(new ShowFixedDeduction());
        }
      }
      );
    }

  }

  getFixedDeductionData$(rowId: number): Observable<ITaxFixedDeductionupdate> {
    return this.taxFixedDeductionValue$.pipe(
      map(d => d.filter(v => v.payroll_profile_id === rowId)),
      map(e => e.shift()))
  }

  onViewConfigIconClicked(rowId: number, taxRule) {
    if (taxRule == 0 || taxRule == 5) {
      this.router.navigate([`${STANDARD_ROUTES.standard}/${rowId}`])
    }
    else if (taxRule == 1) {
      this.router.navigate([`${STANDARD_ROUTES.percentageGross}/${rowId}`])
    }
    else if (taxRule == 3) {
      this.router.navigate([`${STANDARD_ROUTES.rangePercentage}/${rowId}`])
    }
    else if (taxRule == 2) {
      this.router.navigate([`${STANDARD_ROUTES.rangeValue}/${rowId}`])
    }
  }


  filter(term: string, filterValue: string) {
    if (this.grid) {
      if (filterValue) {
        this.grid.clearFilter();
        this.grid.filteringLogic = FilteringLogic.Or;
        this.grid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.grid.clearFilter();
        this.grid.filteringLogic = FilteringLogic.Or;
        this.grid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }

}
