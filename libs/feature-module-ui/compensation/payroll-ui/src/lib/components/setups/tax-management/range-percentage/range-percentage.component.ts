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
import { DeleteRangePercent, getRangePercentData, HideRangePercentEditor, isLoadingTaxManagement, LoadRangePercentData, ShowRangePercentEditor, showRangePercentEditor, showRangePercentView, ShowTaxRangePercentView } from '../../../../store/setup/tax-management';
import { RangePercentService } from './range-percent.service';
import { RangePercentageEditorComponent } from './range-percentage-editor/range-percentage-editor.component';
import { RangePercentageViewComponent } from './range-percentage-view/range-percentage-view.component';

@Component({
  selector: 'x365-fm-payrl-range-percentage',
  templateUrl: './range-percentage.component.html',
  styleUrls: ['./range-percentage.component.scss']
})
export class RangePercentageComponent implements OnInit {

  isLoading$: Observable<boolean>;
  rangePercentData$: Observable<IRangePercent[]>;
  showRangePercentEditor$: Observable<boolean>;
  showRangePercentView$: Observable<boolean>;

  @ViewChild("rangePercentDataGrid") rangePercentDataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild("rangePercentEditor") rangePercentEditor: RangePercentageEditorComponent;
  @ViewChild("rangePercentView") rangePercentView: RangePercentageViewComponent;

  payrollProfileID: any;

  constructor(
    public service: RangePercentService,
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
        this.store.dispatch(new LoadRangePercentData(v.payrollProfileID));
      }
    });
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingTaxManagement));
    this.rangePercentData$ = this.store.pipe(select(getRangePercentData));
    this.showRangePercentEditor$ = this.store.pipe(select(showRangePercentEditor));
    this.showRangePercentView$ = this.store.pipe(select(showRangePercentView));
  }

  storeDispatches() {
  }

  goBack() {
    this.router.navigate([`${STANDARD_ROUTES.backPercentageGross}`])
  }

  onRefresh() {
    this.store.dispatch(new LoadRangePercentData(this.payrollProfileID));
    this.store.dispatch(new ShowToast({ title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onAdd() {
    this.store.dispatch(new ShowRangePercentEditor())
  }

  onCancelViewer() {
    this.store.dispatch(new HideRangePercentEditor());
  }

  onEditIconClicked(rowId) {
    this.rangePercentEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rangePercentEditor.data = result;
        this.rangePercentEditor.reset();
        this.store.dispatch(new ShowRangePercentEditor());
      }
      );
  }

  onViewIconClicked(rowId) {
    this.rangePercentView.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rangePercentView.data = result;
        this.store.dispatch(new ShowTaxRangePercentView());
      }
      );
  }

  getRowData$(rowId: number): Observable<IRangePercent> {
    return this.rangePercentData$.pipe(
      map(d => d.filter(v => v.taxchart_id === rowId)),
      map(e => e.shift()))
  }

  onDeleteIconClicked(row_id: number) {
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteRangePercent({ taxchart_id: row_id }));
          this.store.dispatch(new LoadRangePercentData(this.payrollProfileID));
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

    if (this.rangePercentDataGrid) {
      this.service.search(
        this.rangePercentDataGrid,
        searchString,
        filterBy
      );
    }
  }

}
