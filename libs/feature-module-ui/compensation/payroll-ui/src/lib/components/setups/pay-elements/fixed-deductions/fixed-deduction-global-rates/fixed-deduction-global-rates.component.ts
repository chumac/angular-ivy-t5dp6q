import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IgxGridComponent } from 'igniteui-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { SelectComponent } from 'ng-uikit-pro-standard';

import { IFixedDeductionRate } from '@nutela/models/compensation/payroll';
import { DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { DeleteGlobalRateFixedDeduction, LoadingFixedDeduction, isLoadingFixedDeduction, getGlobalRatesFixedDeduction, ShowRateEditorFixedDeduction, HideRateEditorFixedDeduction, showRateEditorFixedDeduction, LoadGlobalRatesFixedDeduction, showViewerGlobalRateFixedDeduction, ShowViewerGlobalRateFixedDeduction, HideViewerGlobalRateFixedDeduction } from '../../../../../store/pay-elements/fixed-deduction';
import { IRootState } from '../../../../../store/root/root.state';
import { FixedDeductionGlobalRatesService } from './fixed-deduction-global-rates.service';
import { FixedDeductionRateEditorComponent } from '../fixed-deduction-rate-editor/fixed-deduction-rate-editor.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemSelectionComponent } from '../../item-selection/item-selection.component';
import { FixedDeductionGlobalRateViewerComponent } from './fixed-deduction-global-rate-viewer/fixed-deduction-global-rate-viewer.component';

@Component({
  selector: 'x365-fm-payrl-fixed-deduction-global-rates',
  templateUrl: './fixed-deduction-global-rates.component.html',
  styleUrls: ['./fixed-deduction-global-rates.component.scss'],
  providers: [FixedDeductionGlobalRatesService]
})

export class FixedDeductionGlobalRatesComponent implements OnInit {

  deductionId: number
  globalRatesData$: Observable<IFixedDeductionRate[]>;
  showRateEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  @ViewChild('rateEditor') rateEditor: FixedDeductionRateEditorComponent;
  @ViewChild('viewer') viewer: FixedDeductionGlobalRateViewerComponent;
  @ViewChild('dataGrid') dataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  paygroupDialogRef: MatDialogRef<ItemSelectionComponent>;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, private store: Store<IRootState>, private route: ActivatedRoute, private dialogService: DialogService, public service: FixedDeductionGlobalRatesService, private location: Location, public dialog: MatDialog,) {
    titleService.setTitle(
      `${'Fixed Deduction Global Rates'}${this.partialDocumentTitle}`
    );
    this.route.params.pipe(take(1)).subscribe(val => {
        this.deductionId = val.deductionId
      })
    }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadingFixedDeduction());
    this.store.dispatch(new LoadGlobalRatesFixedDeduction());
  }

  storeSelects() {
    this.globalRatesData$ = this.store.pipe(select(getGlobalRatesFixedDeduction));
    this.isLoading$ = this.store.pipe(select(isLoadingFixedDeduction));
    this.showRateEditor$ = this.store.pipe(select(showRateEditorFixedDeduction));
    this.showViewer$ = this.store.pipe(select(showViewerGlobalRateFixedDeduction));
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

  getRowData$(rowId: number): Observable<IFixedDeductionRate> {
    return this.globalRatesData$.pipe(
      map(d => d.filter(v => v.fd_groupspec_id === rowId)),
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
    this.rateEditor.fixedDeductionId = +this.deductionId;
    this.store.dispatch(new ShowRateEditorFixedDeduction());
  }

  onEditIconClicked(rowId: number) {
    this.rateEditor.data = null
    this.rateEditor.fixedDeductionId = +this.deductionId;
    this.rateEditor.isGlobal = true;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateEditor.data = result;
        this.store.dispatch(new ShowRateEditorFixedDeduction());
      }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerGlobalRateFixedDeduction());
      }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeleteGlobalRateFixedDeduction({ recordId: rowId }));
      }
    });
  }

  onRefreshButtonClicked() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({ title: null, message: ` Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerGlobalRateFixedDeduction());
  }

  onCancelEditor() {
    this.store.dispatch(new HideRateEditorFixedDeduction());
  }
}


