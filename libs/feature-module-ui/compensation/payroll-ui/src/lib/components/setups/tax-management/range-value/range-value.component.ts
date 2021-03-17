import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { IgxGridComponent } from 'igniteui-angular';
import { IRangePercent } from 'libs/models/compensation/payroll/src/lib/interfaces/range-percent.interface';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IRootState } from '../../../../store/root';
import { DeleteRangeValue, getRangeValueData, HideRangeValueEditor, isLoadingTaxManagement, LoadRangePercentData, LoadRangeValueData, ShowRangeValueEditor, showRangeValueEditor, showRangeValueView, ShowTaxRangeValueView } from '../../../../store/setup/tax-management';
import { RangeValueEditorComponent } from './range-value-editor/range-value-editor.component';
import { RangeValueViewComponent } from './range-value-view/range-value-view.component';
import { RangeValueService } from './range-value.component.service';

@Component({
  selector: 'x365-fm-payrl-range-value',
  templateUrl: './range-value.component.html',
  styleUrls: ['./range-value.component.scss']
})
export class RangeValueComponent implements OnInit {

  isLoading$: Observable<boolean>;
  rangeValueData$: Observable<IRangePercent[]>;
  showRangeValueEditor$: Observable<boolean>;
  showRangeValueView$: Observable<boolean>;

  @ViewChild("rangeValueDataGrid") rangeValueDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild("rangeValueEditor") rangeValueEditor: RangeValueEditorComponent;
  @ViewChild("rangeValueView") rangeValueView: RangeValueViewComponent;

  payrollProfileID: any;

  constructor(
    public service: RangeValueService,
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
        this.store.dispatch(new LoadRangeValueData(v.payrollProfileID));
      }
    });
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingTaxManagement));
    this.rangeValueData$ = this.store.pipe(select(getRangeValueData));
    this.showRangeValueEditor$ = this.store.pipe(select(showRangeValueEditor));
    this.showRangeValueView$ = this.store.pipe(select(showRangeValueView));
  }

  storeDispatches() {
  }

  goBack() {
    this.router.navigate([`${STANDARD_ROUTES.backPercentageGross}`])
  }

  onRefresh() {
    this.store.dispatch(new LoadRangeValueData(this.payrollProfileID));
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onAdd() {
    this.store.dispatch(new ShowRangeValueEditor())
  }

  onCancelViewer() {
    this.store.dispatch(new HideRangeValueEditor());
  }

  onEditIconClicked(rowId) {
    this.rangeValueEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rangeValueEditor.data = result;
        this.rangeValueEditor.reset();
        this.store.dispatch(new ShowRangeValueEditor());
      }
      );
  }

  onViewIconClicked(rowId) {
    this.rangeValueView.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rangeValueView.data = result;
        this.store.dispatch(new ShowTaxRangeValueView());
      }
      );
  }

  getRowData$(rowId: number): Observable<IRangePercent> {
    return this.rangeValueData$.pipe(
      map(d => d.filter(v => v.taxchart_id === rowId)),
      map(e => e.shift()))
  }

  onDeleteIconClicked(row_id: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteRangeValue({ taxchart_id: row_id }));
          this.store.dispatch(new LoadRangeValueData(this.payrollProfileID));
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

    if (this.rangeValueDataGrid) {
      this.service.search(
        this.rangeValueDataGrid,
        searchString,
        filterBy
      );
    }
  }

}
