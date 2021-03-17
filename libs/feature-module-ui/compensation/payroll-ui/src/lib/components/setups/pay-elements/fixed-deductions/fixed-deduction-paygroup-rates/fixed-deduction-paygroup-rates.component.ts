import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IgxGridComponent } from 'igniteui-angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { SelectComponent } from 'ng-uikit-pro-standard';

import { IFixedDeductionPaygroupRate, IFixedDeduction } from '@nutela/models/compensation/payroll';
import { DialogService } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { DeletePaygroupRateFixedDeduction, LoadingFixedDeduction, isLoadingFixedDeduction, getPaygroupRatesFixedDeduction, ShowRateEditorFixedDeduction, HideRateEditorFixedDeduction, showRateEditorFixedDeduction, LoadPaygroupRatesFixedDeduction, getPaygroupListFixedDeduction, LoadPaygroupListFixedDeduction, HideViewerPaygroupRateFixedDeduction, showViewerPaygroupRateFixedDeduction, ShowViewerPaygroupRateFixedDeduction, getDataFixedDeduction } from '../../../../../store/pay-elements/fixed-deduction';
import { IRootState } from '../../../../../store/root/root.state';
import { FixedDeductionPaygroupRatesService } from './fixed-deduction-paygroup-rates.service';
import { ISelectOption } from '@nutela/models/core-data';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ItemSelectionComponent } from '../../item-selection/item-selection.component';
import { FixedDeductionRateEditorComponent } from '../fixed-deduction-rate-editor/fixed-deduction-rate-editor.component';
import { FixedDeductionPaygroupRateViewerComponent } from './fixed-deduction-paygroup-rate-viewer/fixed-deduction-paygroup-rate-viewer.component';

@Component({
  selector: 'x365-fm-payrl-fixed-deduction-paygroup-rates',
  templateUrl: './fixed-deduction-paygroup-rates.component.html',
  styleUrls: ['./fixed-deduction-paygroup-rates.component.scss'],
  providers: [FixedDeductionPaygroupRatesService]
})

export class FixedDeductionPaygroupRatesComponent implements OnInit {

  deductionId: number
  paygroupRatesData$: Observable<IFixedDeductionPaygroupRate[]>;
  paygroupList$: Observable<ISelectOption[]>;
  showRateEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  fixedDeductionData$: Observable<IFixedDeduction[]>;

  @ViewChild('rateEditor') rateEditor: FixedDeductionRateEditorComponent;
  @ViewChild('rateViewer') rateViewer: FixedDeductionPaygroupRateViewerComponent;
  @ViewChild('dataGrid') dataGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  paygroupDialogRef: MatDialogRef<ItemSelectionComponent>;

  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, private store: Store<IRootState>, private route: ActivatedRoute, private dialogService: DialogService, public service: FixedDeductionPaygroupRatesService, private location: Location, public dialog: MatDialog,) {
    titleService.setTitle(
      `${'Fixed Deduction Paygroup Rates'}${this.partialDocumentTitle}`
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
    this.store.dispatch(new LoadPaygroupRatesFixedDeduction({ deductionId: this.deductionId }));
    this.store.dispatch(new LoadPaygroupListFixedDeduction());

  }

  storeSelects() {
    this.fixedDeductionData$ = this.store.pipe(select(getDataFixedDeduction));
    this.paygroupRatesData$ = this.store.pipe(select(getPaygroupRatesFixedDeduction));
    this.paygroupList$ = this.store.pipe(select(getPaygroupListFixedDeduction));
    this.isLoading$ = this.store.pipe(select(isLoadingFixedDeduction));
    this.showRateEditor$ = this.store.pipe(select(showRateEditorFixedDeduction));
    this.showViewer$ = this.store.pipe(select(showViewerPaygroupRateFixedDeduction));
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

  getFixedDeductionData$(rowId: number): Observable<IFixedDeduction> {
    return this.fixedDeductionData$.pipe(
      map(d => d.filter(v => v.deduction_id === rowId)),
      map(e => e.shift()))
  }

  getRowData$(rowId: number): Observable<IFixedDeductionPaygroupRate> {
    console.log(rowId);
    return this.paygroupRatesData$.pipe(
      map(d => d.filter(v => v.fd_groupspec_id === rowId)),
      map(e => e.shift()))
  }

  getByPaygroupData$(rowId: number): Observable<IFixedDeductionPaygroupRate> {
    return this.paygroupRatesData$.pipe(
      map(d => d.filter(v => v.paygroup_id === rowId)),
      map(e => e.shift()))
  }


  goBack() {
    this.location.back();
  };

  onAddButtonClicked() {
    this.openModal()
  }

  openModal(): void {
    this.paygroupList$.pipe(take(1)).subscribe(paygroupList => {
      this.paygroupDialogRef = this.dialog.open(ItemSelectionComponent, {
        maxWidth: '50%',
        maxHeight: '50%',
        data: { paygroupList, elementType: 'fixedDeduction' },
        panelClass: 'custom-dialog-container'
      });
    })
    this.paygroupDialogRef.afterClosed().subscribe(data => {
      this.onSetRate(data);
    })
  }

  onSetRate(data: any) {
    this.rateEditor.data = null;
    this.rateEditor.reset();
    if (!data.is_cancel) {
      this.rateEditor.fixedDeductionId = +this.deductionId;
      this.rateEditor.isGlobal = false;
      this.getFixedDeductionData$(+this.deductionId).pipe(take(1)).subscribe(val => {
        this.getByPaygroupData$(data.paygroup).pipe(take(1))
          .subscribe((result) => {
            if (!result) {
              this.dialogService.show(this.dialogService.options(), `No rate chart exist for this paygroup. Do you want to create one?`);

              this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
                if (confirmed) {
                  this.rateEditor.paygroupId = data.paygroup;
                  this.rateEditor.employeeId = null;
                  this.rateEditor.eligibility = val.eligibility;
                  this.store.dispatch(new ShowRateEditorFixedDeduction());
                }
              })
            } else {
              this.rateEditor.data = result;
              this.rateEditor.employeeId = null;
              this.rateEditor.reset();
              this.store.dispatch(new ShowRateEditorFixedDeduction());
            }
          });
      })
    }
  }

  onViewIconClicked(rowId: number) {
    this.rateViewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateViewer.data = result;
        this.store.dispatch(new ShowViewerPaygroupRateFixedDeduction());
      }
      );
  }

  onEditIconClicked(rowId: number) {
    this.rateEditor.data = null;
    this.rateEditor.reset();
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.rateEditor.isGlobal = false;
        this.rateEditor.fixedDeductionId = +this.deductionId;
        this.rateEditor.employeeId = null;
        this.rateEditor.data = result;
        this.store.dispatch(new ShowRateEditorFixedDeduction());
      });
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogService.show(this.dialogService.options(), 'Are you sure you want to delete this data?');

    this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new DeletePaygroupRateFixedDeduction({ recordId: rowId, deductionId: this.deductionId }));
      }
    });
  }

  onRefreshButtonClicked() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({ title: null, message: ` Data is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerPaygroupRateFixedDeduction());
  }

  onCancelEditor() {
    this.store.dispatch(new HideRateEditorFixedDeduction());
  }
}


