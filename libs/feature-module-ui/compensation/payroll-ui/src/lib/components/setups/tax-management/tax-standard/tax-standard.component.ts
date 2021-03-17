import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ITaxManagementProfile } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-management-profile.interface';
// import { ITaxManagementProfile } from '@nutela/models/compensation/payroll';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { IgxGridComponent } from 'igniteui-angular';
import { IRootState } from 'libs/feature-module-ui/platform/reports-ui/src/lib/store';
import { ITaxStandard } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-standard.interface';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DeleteTaxStandard, getTaxManagementProfileData, getTaxStandardData, HideTaxStandardEditor, isLoadingTaxManagement, LoadListTaxManagementProfileData, LoadTaxStandardData, showTaxStandardEditor, ShowTaxStandardEditor, ShowTaxStandardView, showTaxStandardView } from '../../../../store/setup/tax-management';
import { TaxStandardEditorComponent } from './tax-standard-editor/tax-standard-editor.component';
import { TaxStandardService } from './tax-standard.service';
import { TaxStandardViewComponent } from './tax-standard-view/tax-standard-view.component';

@Component({
  selector: 'x365-fm-payrl-tax-standard',
  templateUrl: './tax-standard.component.html',
  styleUrls: ['./tax-standard.component.scss']
})
export class TaxStandardComponent implements OnInit {

  isLoading$: Observable<boolean>;
  taxStandardData$: Observable<ITaxStandard[]>;
  showTaxStandardEditor$: Observable<boolean>;
  taxManagementProfileData$: Observable<ITaxManagementProfile[]>;
  taxStandardDefaultData$: ITaxManagementProfile;
  showTaxStandardView$: Observable<boolean>;

  @ViewChild("taxStandardDataGrid") taxStandardDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild("taxStndardEditor") taxStndardEditor: TaxStandardEditorComponent;
  @ViewChild("taxStndardView") taxStndardView: TaxStandardViewComponent;

  payrollProfileID: any;

  constructor(
    public service: TaxStandardService,
    private route: ActivatedRoute,
    private dialogBoxService: DialogBoxService,
    private router: Router,
    private store: Store<IRootState>) {
    this.assignProfileId();
  }

  assignProfileId() {
    this.route.params.pipe(take(1)).subscribe(v => {
      this.payrollProfileID = v.payrollProfileID;
      if (v.payrollProfileID != null) {
        this.payrollProfileID = parseInt(v.payrollProfileID);
        this.store.dispatch(new LoadTaxStandardData(v.payrollProfileID));
      }
    });
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
    this.getStandardDefaultData();
  }

  getStandardDefaultData() {
    this.taxManagementProfileData$ = this.store.pipe(select(getTaxManagementProfileData));
    this.store.dispatch(new LoadListTaxManagementProfileData({ recordId: this.payrollProfileID }));
    this.filterTaxManagementProfileData$(this.payrollProfileID).subscribe((result) => {
      if (result) {
        this.taxStandardDefaultData$ = result;
        console.log(this.taxStandardDefaultData$);
      }
    }
    );
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingTaxManagement));
    this.taxStandardData$ = this.store.pipe(select(getTaxStandardData));
    this.showTaxStandardEditor$ = this.store.pipe(select(showTaxStandardEditor));
    this.showTaxStandardView$ = this.store.pipe(select(showTaxStandardView));
  }

  storeDispatches() {
  }

  filterTaxManagementProfileData$(rowId: number): Observable<ITaxManagementProfile> {
    return this.taxManagementProfileData$.pipe(
      map(d => d.filter(v => v.payroll_profile_id === rowId)),
      map(e => e.shift()))
  }

  goBack() {
    this.router.navigate([`${STANDARD_ROUTES.backPercentageGross}`])
  }

  onRefresh() {
    this.store.dispatch(new LoadTaxStandardData(this.payrollProfileID));
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onAdd() {
    this.store.dispatch(new ShowTaxStandardEditor())
  }

  onCancelViewer() {
    this.store.dispatch(new HideTaxStandardEditor());
  }

  onEditIconClicked(rowId, taxpercentongross) {
    this.taxStndardEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.taxStndardEditor.data = result;
        this.taxStndardEditor.reset();
        this.store.dispatch(new ShowTaxStandardEditor());
      }
      );
  }

  onViewIconClicked(rowId) {
    this.taxStndardView.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.taxStndardView.data = result;
        this.store.dispatch(new ShowTaxStandardView());
      }
      );
  }

  getRowData$(rowId: number): Observable<ITaxStandard> {
    return this.taxStandardData$.pipe(
      map(d => d.filter(v => v.taxdetail_id === rowId)),
      map(e => e.shift()))
  }

  onDeleteIconClicked(row_id: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteTaxStandard({ taxdetail_id: row_id }));
          this.store.dispatch(new LoadTaxStandardData(this.payrollProfileID));
        }
      });
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

    if (this.taxStandardDataGrid) {
      this.service.search(
        this.taxStandardDataGrid,
        searchString,
        filterBy
      );
    }
  }

}
