import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IgxGridComponent } from 'igniteui-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { SelectComponent } from 'ng-uikit-pro-standard';

import { IFixedAllowancePaygroupRate, IFixedAllowanceRate } from '@nutela/models/compensation/payroll';
import { DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { DeleteGlobalRateFixedAllowance, LoadingFixedAllowance, isLoadingFixedAllowance, getGlobalRatesFixedAllowance, ShowRateEditorFixedAllowance, HideRateEditorFixedAllowance, showRateEditorFixedAllowance, LoadGlobalRatesFixedAllowance, showViewerGlobalRateFixedAllowance, ShowViewerGlobalRateFixedAllowance, HideViewerGlobalRateFixedAllowance } from '../../../../../store/pay-elements/fixed-allowance';
import { IRootState } from '../../../../../store/root/root.state';
import { FixedAllowanceGlobalRatesService } from './fixed-allowance-global-rates.service';
import { FixedAllowanceRateEditorComponent } from '../fixed-allowance-rate-editor/fixed-allowance-rate-editor.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemSelectionComponent } from '../../item-selection/item-selection.component';
import { FixedAllowanceGlobalRateViewerComponent } from './fixed-allowance-global-rate-viewer/fixed-allowance-global-rate-viewer.component';

@Component({
  selector: 'x365-fm-payrl-fixed-allowance-global-rates',
  templateUrl: './fixed-allowance-global-rates.component.html',
  styleUrls: ['./fixed-allowance-global-rates.component.scss'],
  providers: [FixedAllowanceGlobalRatesService]
})

export class FixedAllowanceGlobalRatesComponent implements OnInit {

  allowanceId: number
  globalRatesData$: Observable<IFixedAllowanceRate[]>;
  showRateEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  @ViewChild('rateEditor') rateEditor: FixedAllowanceRateEditorComponent;
  @ViewChild('viewer') viewer: FixedAllowanceGlobalRateViewerComponent;
  @ViewChild('dataGrid') dataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  paygroupDialogRef: MatDialogRef<ItemSelectionComponent>;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, private store: Store<IRootState>, private route: ActivatedRoute, private dialogService: DialogService, public service: FixedAllowanceGlobalRatesService, private location: Location, public dialog: MatDialog,) {
    titleService.setTitle(
      `${'Fixed Allowance Global Rates'}${this.partialDocumentTitle}`
    );
    this.route.params.pipe(take(1)).subscribe(val => {
        this.allowanceId = val.allowanceId
      })
    }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadingFixedAllowance());
    this.store.dispatch(new LoadGlobalRatesFixedAllowance());
  }

  storeSelects() {
    this.globalRatesData$ = this.store.pipe(select(getGlobalRatesFixedAllowance));
    this.isLoading$ = this.store.pipe(select(isLoadingFixedAllowance));
    this.showRateEditor$ = this.store.pipe(select(showRateEditorFixedAllowance));
    this.showViewer$ = this.store.pipe(select(showViewerGlobalRateFixedAllowance));
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

    if (this.dataGrid) {
      this.service.search(
        this.dataGrid,
        searchString,
        filterBy
      );
    }
  }

  getRowData$(rowId: number): Observable<IFixedAllowanceRate> {
    return this.globalRatesData$.pipe(
      map(d => d.filter(v => v.fa_groupspec_id === rowId)),
      map(e => e.shift()))
  }

  goBack() {
    this.location.back();
  };

  onAddButtonClicked() {
    this.rateEditor.employeeId = null;
    this.rateEditor.paygroupId = null;
    this.rateEditor.eligibility = 2;
    this.rateEditor.isGlobal = true;
    // this.rateEditor.fixedAllowanceId = +this.allowanceId;
    this.store.dispatch(new ShowRateEditorFixedAllowance());
  }

  onEditIconClicked(rowId: number) {
    this.rateEditor.data = null
    // this.rateEditor.fixedAllowanceId = +this.allowanceId;
    this.rateEditor.isGlobal = true;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateEditor.data = result;
        this.rateEditor.reset();
        this.store.dispatch(new ShowRateEditorFixedAllowance());
      }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerGlobalRateFixedAllowance());
      }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteGlobalRateFixedAllowance({ recordId: rowId }));
      }
    });
  }

  onRefreshButtonClicked() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({ title: null, message: ` Fixed Allowance data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerGlobalRateFixedAllowance());
  }

  onCancelEditor() {
    this.store.dispatch(new HideRateEditorFixedAllowance());
  }
}


