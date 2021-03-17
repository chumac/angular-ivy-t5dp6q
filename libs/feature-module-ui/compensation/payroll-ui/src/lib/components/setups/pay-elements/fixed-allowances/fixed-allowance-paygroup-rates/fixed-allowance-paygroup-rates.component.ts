import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IgxGridComponent } from 'igniteui-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { SelectComponent } from 'ng-uikit-pro-standard';

import { IFixedAllowance, IFixedAllowancePaygroupRate } from '@nutela/models/compensation/payroll';
import { DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { DeletePaygroupRateFixedAllowance, LoadingFixedAllowance, isLoadingFixedAllowance, getPaygroupRatesFixedAllowance, ShowRateEditorFixedAllowance, HideRateEditorFixedAllowance, showRateEditorFixedAllowance, LoadPaygroupRatesFixedAllowance, getPaygroupListFixedAllowance, LoadPaygroupListFixedAllowance, showViewerPaygroupRateFixedAllowance, ShowViewerPaygroupRateFixedAllowance, HideViewerPaygroupRateFixedAllowance, getDataFixedAllowance } from '../../../../../store/pay-elements/fixed-allowance';
import { IRootState } from '../../../../../store/root/root.state';
import { FixedAllowancePaygroupRatesService } from './fixed-allowance-paygroup-rates.service';
import { FixedAllowanceRateEditorComponent } from '../fixed-allowance-rate-editor/fixed-allowance-rate-editor.component';
import { ISelectOption } from '@nutela/models/core-data';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemSelectionComponent } from '../../item-selection/item-selection.component';
import { FixedAllowancePaygroupRateViewerComponent } from './fixed-allowance-paygroup-rate-viewer/fixed-allowance-paygroup-rate-viewer.component';

@Component({
  selector: 'x365-fm-payrl-fixed-allowance-paygroup-rates',
  templateUrl: './fixed-allowance-paygroup-rates.component.html',
  styleUrls: ['./fixed-allowance-paygroup-rates.component.scss'],
  providers: [FixedAllowancePaygroupRatesService]
})

export class FixedAllowancePaygroupRatesComponent implements OnInit {

  allowanceId: number
  paygroupRatesData$: Observable<IFixedAllowancePaygroupRate[]>;
  paygroupList$: Observable<ISelectOption[]>;
  showRateEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  fixedAllowanceData$: Observable<IFixedAllowance[]>;

  @ViewChild('rateEditor') rateEditor: FixedAllowanceRateEditorComponent;
  @ViewChild('viewer') viewer: FixedAllowancePaygroupRateViewerComponent;
  @ViewChild('dataGrid') dataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  paygroupDialogRef: MatDialogRef<ItemSelectionComponent>;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, private store: Store<IRootState>, private route: ActivatedRoute, private dialogService: DialogService, public service: FixedAllowancePaygroupRatesService, private location: Location, public dialog: MatDialog,) {
    titleService.setTitle(
      `${'Fixed Allowance Paygroup Rates'}${this.partialDocumentTitle}`
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
    this.store.dispatch(new LoadPaygroupRatesFixedAllowance({ allowanceId: this.allowanceId }));
    this.store.dispatch(new LoadPaygroupListFixedAllowance());

  }

  storeSelects() {
    this.paygroupRatesData$ = this.store.pipe(select(getPaygroupRatesFixedAllowance));
    this.paygroupList$ = this.store.pipe(select(getPaygroupListFixedAllowance));
    this.fixedAllowanceData$ = this.store.pipe(select(getDataFixedAllowance));
    this.isLoading$ = this.store.pipe(select(isLoadingFixedAllowance));
    this.showRateEditor$ = this.store.pipe(select(showRateEditorFixedAllowance));
    this.showViewer$ = this.store.pipe(select(showViewerPaygroupRateFixedAllowance));
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

  getFixedAllowanceData$(rowId: number): Observable<IFixedAllowance> {
    return this.fixedAllowanceData$.pipe(
      map(d => d.filter(v => v.allowance_id === rowId)),
      map(e => e.shift()))
  }

  getByPaygroupData$(rowId: number): Observable <IFixedAllowancePaygroupRate> {
    return this.paygroupRatesData$.pipe(
      map(d => d.filter(v => v.paygroup_id === rowId)),
      map(e => e.shift()))
  }

  getRowData$(rowId: number): Observable<IFixedAllowancePaygroupRate> {
    return this.paygroupRatesData$.pipe(
      map(d => d.filter(v => v.fa_groupspec_id === rowId)),
      map(e => e.shift()))
  }


  goBack() {
    this.location.back();
  };

  onSetRate(data: any) {
    this.rateEditor.data = null;
    this.rateEditor.reset();
    if (!data.is_cancel) {
      this.rateEditor.fixedAllowanceId = +this.allowanceId;
      this.rateEditor.isGlobal = false;
      this.getFixedAllowanceData$(+this.allowanceId).pipe(take(1)).subscribe(val => {
        this.getByPaygroupData$(data.paygroup).pipe(take(1))
          .subscribe((result) => {
            if (!result) {
              this.dialogService.show(this.dialogService.options(), `No rate chart exist for this paygroup. Do you want to create one?`);

              this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
                if (confirmed) {
                  this.rateEditor.paygroupId = data.paygroup;
                  this.rateEditor.employeeId = null;
                  this.rateEditor.eligibility = val.eligibility;
                  this.store.dispatch(new ShowRateEditorFixedAllowance());
                }
              })
            } else {
              this.rateEditor.data = result;
              this.rateEditor.employeeId = null;
              this.rateEditor.reset();
              this.store.dispatch(new ShowRateEditorFixedAllowance());
            }
          });
      })
    }
  }

  openModal(): void {
    this.paygroupList$.pipe(take(1)).subscribe(paygroupList => {
      this.paygroupDialogRef = this.dialog.open(ItemSelectionComponent, {
        maxWidth: '50%',
        maxHeight: '50%',
        data: { paygroupList, elementType: 'fixedAllowance' },
        panelClass: 'custom-dialog-container'
      });
    })
    this.paygroupDialogRef.afterClosed().subscribe(data => {
      this.onSetRate(data);
    })
  }

  onAddButtonClicked() {
    this.openModal()
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerPaygroupRateFixedAllowance());
      }
      );
  }

  onEditIconClicked(rowId: number) {
    this.rateEditor.data = null;
    this.getRowData$(rowId).pipe(take(1))
    .subscribe((result) => {
      this.rateEditor.isGlobal = false;
      this.rateEditor.fixedAllowanceId = +this.allowanceId;
      this.rateEditor.employeeId = null;
      this.rateEditor.data = result;
      this.rateEditor.reset();
      this.store.dispatch(new ShowRateEditorFixedAllowance());
      });
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeletePaygroupRateFixedAllowance({ recordId: rowId, allowanceId: this.allowanceId }));
      }
    });
  }

  onRefreshButtonClicked() {
    // this.storeDispatches();
    this.store.dispatch(new LoadPaygroupRatesFixedAllowance({ allowanceId: this.allowanceId }));
    this.store.dispatch(new ShowToast({ title: null, message: ` Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerPaygroupRateFixedAllowance());
  }

  onCancelEditor() {
    this.store.dispatch(new HideRateEditorFixedAllowance());
  }
}


