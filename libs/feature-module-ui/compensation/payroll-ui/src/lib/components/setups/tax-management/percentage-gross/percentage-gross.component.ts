import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { IgxGridComponent } from 'igniteui-angular';
import { IRootState } from 'libs/feature-module-ui/platform/reports-ui/src/lib/store';
import { ITaxPercentageGrossEditor } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-pecentage-gross-editor.interface';
import { ITaxPercentageGross } from 'libs/models/compensation/payroll/src/lib/interfaces/tax-pecentage-gross.interface';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { getPercentageGrossData, HidePercentGrossEditor, isLoadingTaxManagement, LoadPercentageGrossData, showGrossPercentView, ShowPercentGrossEditor, showPercentGrossEditor, ShowTaxGrossPercentView } from '../../../../store/setup/tax-management';
import { PercentageGrossEditorComponent } from './percentage-gross-editor/percentage-gross-editor.component';
import { PercentageGrossViewComponent } from './percentage-gross-view/percentage-gross-view.component';
import { PercentageGrossService } from './percentage-gross.service';

@Component({
  selector: 'x365-fm-payrl-percentage-gross',
  templateUrl: './percentage-gross.component.html',
  styleUrls: ['./percentage-gross.component.scss']
})
export class PercentageGrossComponent implements OnInit {

  @ViewChild("percentageGrossDataGrid") percentageGrossDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild("percentGrossEditor") percentGrossEditor: PercentageGrossEditorComponent;
  @ViewChild("percentGrossView") percentGrossView: PercentageGrossViewComponent;

  isLoading$: Observable<boolean>;
  percentageGrossData$: Observable<ITaxPercentageGross[]>;
  showPercentGrossEditor$: Observable<boolean>;
  percentGrossDataByid$: Observable<ITaxPercentageGross>;
  showPercentGrossView$: Observable<boolean>;

  percentGrossData: ITaxPercentageGrossEditor;

  payrollProfileID: any;
  paygroupid: number;
  subscribe: any;

  constructor(public service: PercentageGrossService, private route: ActivatedRoute, private router: Router, private store: Store<IRootState>) {
    this.assignProfileId();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingTaxManagement));
    this.percentageGrossData$ = this.store.pipe(select(getPercentageGrossData));
    this.showPercentGrossEditor$ = this.store.pipe(select(showPercentGrossEditor));
    this.showPercentGrossView$ = this.store.pipe(select(showGrossPercentView));
  }

  storeDispatches() {
  }

  assignProfileId() {
    this.route.params.pipe(take(1)).subscribe(v => {
      this.payrollProfileID = v.payrollProfileID;
      if (v.payrollProfileID != null) {
        this.payrollProfileID = parseInt(v.payrollProfileID);
        this.store.dispatch(new LoadPercentageGrossData(v.payrollProfileID));
      }
    });
  }

  onCancelViewer() {
    this.store.dispatch(new HidePercentGrossEditor());
  }

  goBack() {
    this.router.navigate([`${STANDARD_ROUTES.backPercentageGross}`])
  }

  onRefresh() {
    this.store.dispatch(new LoadPercentageGrossData(this.payrollProfileID));
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onEditIconClicked(val,taxpercentongross) {
    this.paygroupid = val;    
    this.percentGrossEditor.setDefaultFields(val,taxpercentongross,this.payrollProfileID);
    this.store.dispatch(new ShowPercentGrossEditor());
  }

  onViewIconClicked(val,taxpercentongross) {
    this.paygroupid = val;
    this.percentGrossView.data = null;
    
    this.getRowData$(val).pipe(take(1))
      .subscribe((result) => {
        this.percentGrossView.data = result;
        this.store.dispatch(new ShowTaxGrossPercentView());
      }
      );
  }

  getRowData$(rowId: number): Observable<ITaxPercentageGross> {
    return this.percentageGrossData$.pipe(
      map(d => d.filter(v => v.paygroup_id === rowId)),
      map(e => e.shift()))
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

    if (this.percentageGrossDataGrid) {
      this.service.search(
        this.percentageGrossDataGrid,
        searchString,
        filterBy
      );
    }
  }

}
